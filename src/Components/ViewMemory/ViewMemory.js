import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import { useParams } from 'react-router'
import './ViewMemory.css'
import axios from 'axios'
import env from '../settings'
import { format } from '../utils'

function ViewMemory() {

    useEffect(() => {
        fecthViewData()
    }, [])

    const { id } = useParams()

    const [fetchedViewData, setFetchedViewData] = useState([])
    const fecthViewData = async () => {
        let data = await axios.get(`${env.api}/view-memory-toEdit/${id}`, {
            headers: {
                "Authorization": window.localStorage.getItem("app_token")
            }
        })
        setFetchedViewData([...data.data])
    }

    return (
        <>
            <Navbar />
            {
                fetchedViewData.map(obj => {
                    return (
                        <div className="container mt-4">
                            <div className="view_head">
                                <div className="row">
                                    <div className="col col-lg-8">
                                        <h5>Title: {obj.title} </h5>
                                    </div>
                                    <div className="col col-lg-3">
                                        <h5>Created On: {format(obj.date)}</h5>
                                    </div>
                                    <div className="col col-lg-1">
                                        <NavLink className="btn" to="/DiaryPage/SavedMemory" ><i className="fas fa-backward" style={{ "color": "white" }}></i></NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className="view_content">
                                <div className="mb-2">
                                    <label htmlFor="MemoryTextarea" className="form-label" id="memorytextlabel">Memory Content</label>
                                    <textarea className="form-control" id="MemoryTextarea" rows="13" style={{ "fontSize": "20px" }} value={obj.memory} disabled={true} />
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default ViewMemory
