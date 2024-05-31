import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from "../context/UserContext"
import { Line } from 'react-chartjs-2'

// import styles from './waveform.module.css'
import styles from './waveforminfopanel.css'

// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
//   } from 'chart.js';

//   ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend
//   );

export default function WaveformInfoPanel(audio_file,audio_id,id,classes,search,reload,update,edit,playing,x,y,state,start,end,label,duration,time,editRegion,playlist,settings,training,grid,gridFalse,tag,info,point,cluster,colours,restart) {

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

    const [valStats, setValStats] = useState({
        labels: null,
        datasets: [{
            label: ['validation'],
            data: null,
        }]
        })

    const [loss, setLoss] = useState(null)
    const [accuracy, setAcc] = useState(null)
    const [valLoss, setValLoss] = useState(null)
    const [valAccuracy, setValAcc] = useState(null)

    useEffect(() => {
        // console.log("audio_file: ", audio_file)
        // console.log("audio_id: ", audio_id)
        // console.log("id: ", id)
        // console.log("classes: ", classes)
        // console.log("search: ", search)
        // console.log("reload: ", reload)
        // console.log("update: ", update)
        // console.log("edit: ", edit)
        // console.log("playing: ", playing)
        // console.log("x: ", x)
        // console.log("y: ", y)
        // console.log("state: ", state)
        // console.log("start: ", start)
        // console.log("end: ", end)
        // console.log("label: ", label)
        // console.log("duration: ", duration)
        // console.log("time: ", time)
        // console.log("editRegion: ", editRegion)
        // console.log("playlist: ", playlist)
        // console.log("settings: ", settings)
        // console.log("training: ", training)
        // console.log("grid: ", grid)
        // console.log("gridFalse: ", gridFalse)
        // console.log("tag: ", tag)
        // console.log("info: ", info)
        // console.log("point: ", point)
        // console.log("cluster: ", cluster)
        // console.log("colours: ", colours)
        // console.log("restart: ", restart)
        console.log(audio_file.audio_file)
        console.log(audio_file.editRegion)
    })

    return (
        <div className="info_panel_container">
            <h1>Info Panel</h1>
            <p>Audio file: {audio_file.audio_file!=null ? audio_file.audio_file : "none selected"}</p>
            <p>Region: {audio_file.editRegion!=null ? audio_file.editRegion.attributes.filename.slice(-6,-4) : "none selected"}</p>
            {audio_file.editRegion!=null ? <p>
                {/* <button className="export" onClick={() => handleExport()}>Export Annotations</button>
                <input type="" value={exportStart} onChange={(e) => setExportStart(e.target.value)}></input>
                <input type="date" value={exportEnd} onChange={(e) => setExportEnd(e.target.value)}></input> */}
                <p>Duration (s): {Math.round((audio_file.editRegion.end - audio_file.editRegion.start)*100)/100}</p>
                <p>Label: {audio_file.editRegion.attributes.label}</p>
            </p> : null}
        </div>
    )
}