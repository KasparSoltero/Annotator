import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from "../../context/UserContext"
import { Line } from 'react-chartjs-2'

import styles from '../waveform.module.css'
import './training.css'


export default function Training() {
    const [networks, setNetworks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [token,] = useContext(UserContext)
    const [exportStart, setExportStart] = useState('2020-01-01')
    const [exportEnd, setExportEnd] = useState('2200-01-01')
    const [message, setMessage] = useState('')
    const [stats, setTrainingStats] = useState({
        labels: null,
        datasets: [{
            label: null,
            data: null,
        }]
      })

    useEffect(() => {
        const fetchNetworks = async () => {
          const requestOptions = {
            method: "GET",
            headers: {Authorization: "Bearer " + token}
          };
    
          try {
            const response = await fetch('http://localhost:8000/api/networks', requestOptions);
    
            if (response.ok) {
              const data = await response.json();
              setNetworks(data);
              setLoading(false);
            } else {
              console.error('Failed to fetch networks');
              setLoading(false);
            }
          } catch (error) {
            console.error("There was an error fetching the networks", error);
            setLoading(false);
          }
        };
    
        fetchNetworks();
      }, [token]);  // Dependency array contains 'token' to ensure re-fetching when the token changes

    const createNetwork = async () => {
        const requestOptions = {
            method: "POST",
            headers: {Authorization: "Bearer " + token,
                      'Content-Type': 'application/json'},
            body: JSON.stringify({
                "name" : "My New Network",
                "description" : "A description of my new network",
                "status": "active",
                "is_active": true,
                "accuracy": 0.0,
                "f1_score": 0.0,
                "configuration": "default"
            }),
        };
    
        try {
            const response = await fetch('http://localhost:8000/api/networks', requestOptions);
    
            if (response.ok) {
                const data = await response.json();
                console.log("New network created:", data);
                // Update the list of networks with the new network
                setNetworks([...networks, data]);
            } else {
                console.error('Failed to create network');
            }
        } catch (error) {
            console.error("There was an error creating the network", error);
        }
    };

    const activateNetwork = async (index) => {
        const requestOptions = {
            method: "PUT",
            headers: {Authorization: "Bearer " + token,
                      'Content-Type': 'application/json'},
            body: JSON.stringify({
                "status": "active",
                "is_active": true,
            }),
        };

        try {
            const response = await fetch('http://localhost:8000/api/networks/' + networks[index].id, requestOptions);
    
            if (response.ok) {
                const data = await response.json();
                console.log("Network activated:", data);
                // Update the list of networks with the new network
                setNetworks([...networks, data]);
            } else {
                console.error('Failed to activate network');
            }
        }
        catch (error) {
            console.error("There was an error activating the network", error);
        }
    }

    return (
        <div className={styles.noscroll}>
            <div className={styles.wrapper}>
                <div className={styles.blocks}>
                    <div className="network_selection">
                        <h1>Networks:</h1>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <ul>
                            {networks.map((network, index) => (
                                <li 
                                    key={index}
                                    className={network.status === 'active' ? 'active' : ''}
                                    onClick={() => activateNetwork(index)}
                                >
                                    <h2>{network.name}</h2>
                                </li>
                            ))}
                            </ul>
                        )}
                        <button className="create_network_button" onClick={()=>createNetwork()}></button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}