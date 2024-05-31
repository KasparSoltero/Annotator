import sqlalchemy.orm as orm
import models
import schemas
import librosa
import os
import time
import numpy as np

# CRUD operations for networks
async def add_network(network: schemas.NetworkCreate, user: schemas.User, db: orm.Session):
    network = models.Network(**network, owner_id=user.id)
    db.add(network)
    db.commit()
    db.refresh(network)
    return schemas.Network.from_orm(network)

async def get_networks(user: schemas.User, db: orm.Session):
    networks = db.query(models.Network).filter_by(owner_id=user.id).all()
    print(networks)
    return list(map(schemas.Network.from_orm, networks))

async def update_networks(network: schemas.NetworkCreate, user: schemas.User, db: orm.Session):
    network_db = db.query(models.Network).filter_by(owner_id=user.id).filter(models.Network.id == network.id).first()
    network_db.status = network.status
    network_db.accuracy = network.accuracy
    network_db.f1_score = network.f1_score
    network_db.configuration = network.configuration
    network_db.is_active = network.is_active
    db.commit()
    db.refresh(network_db)
    return schemas.Network.from_orm(network_db)

async def delete_networks(network: schemas.NetworkCreate, user: schemas.User, db: orm.Session):
    network_db = db.query(models.Network).filter_by(owner_id=user.id).filter(models.Network.name == network.name).first()
    db.delete(network_db)
    db.commit()
    return schemas.Network.from_orm(network_db)