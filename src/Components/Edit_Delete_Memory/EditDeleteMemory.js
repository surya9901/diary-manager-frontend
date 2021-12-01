import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Navbar from '../Navbar/Navbar'
import env from '../settings'
import { format } from '../utils'
import { useNavigate } from 'react-router-dom'
import './EditDeleteMemory.css'
import { toastsuccess, toasterror } from '../utils'
import Toastoptions from '../Toastoptions'
import Loader from '../loader'

function EditDeleteMemory() {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fecthdataEditDelete()
    }, [])

    const [editTitle, setEditTitle] = useState("")
    const [editDate, setEditDate] = useState("")
    const [editMemory, setEditMemory] = useState("")

    const { id } = useParams()
    const fecthdataEditDelete = async () => {
        let data = await axios.get(`${env.api}/view-memory-toEdit/${id}`, {
            headers: {
                "Authorization": window.localStorage.getItem("app_token")
            }
        })
        const fetchedData = data.data[0]
        setEditTitle(fetchedData.title)
        setEditDate(fetchedData.date)
        setEditMemory(fetchedData.memory)
        setLoading(false)
    }

    const saveEdit = async () => {
        try {
            await axios.put(`${env.api}/edited-data/${id}`, { title: editTitle, date: editDate, memory: editMemory }, {
                headers: {
                    "Authorization": window.localStorage.getItem("app_token")
                }
            })
            setEditMemory("")
            setEditTitle("")
            setEditDate("")
            setTitleDisable(true)
            setMemoryDisable(true)
            setLoading(false)
            toastsuccess()
            setTimeout(() => {
                navigate("/DiaryPage/SavedMemory")
            }, 3000);
        } catch (error) {
            console.log(error)
            toasterror()
        }
    }

    const deleteMemory = async () => {
        try {
            await axios.delete(`${env.api}/delete-data/${id}`, {

                headers: {
                    "Authorization": window.localStorage.getItem("app_token")
                }
            })
            setEditMemory("")
            setEditTitle("")
            setEditDate("")
            setTitleDisable(true)
            setMemoryDisable(true)
            setLoading(false)
            toastsuccess()
            setTimeout(() => {
                navigate("/DiaryPage/SavedMemory")
            }, 3000);
        } catch (error) {
            console.log(error)
            toasterror()
        }
    }

    const [titleDisable, setTitleDisable] = useState(false)
    const [memoryDisable, setMemoryDisable] = useState(false)
    return (
        <>
            <Toastoptions />
            <Navbar />
            <div className="container mb-3">
                {
                    loading ? <div className="text-center" style={{ "alignItems": "center" }}>
                        <Loader />
                    </div> : <>
                        <div className="editDelete-head">
                            <h4>Edit/Delete your Saved Memory</h4>
                            <div>
                                <button className="btn btn-danger" onClick={() => navigate("/DiaryPage/SavedMemory")}><i className="fas fa-backward"></i></button>
                            </div>
                        </div>
                        <div className="diaryEditDelete_head mt-3">
                            <div className="row" style={{ "alignItems": "center" }}>
                                <div className="col col-lg-8">
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" placeholder="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} disabled={titleDisable} />
                                        <label htmlFor="floatingInput">Title</label>
                                    </div>
                                </div>
                                <div className="col col-lg-3">
                                    <h4 className="text-muted">Created On: {format(editDate)}</h4>
                                </div>
                                <div className="col col-lg-1">
                                    <button className="btn" type="button" style={{ "color": "red", "fontSize": "35px" }} onClick={deleteMemory} ><i className="fas fa-trash"></i></button>
                                </div>

                                <div className="col-lg-12">
                                    <div className="mb-2">
                                        <label htmlFor="MemoryTextarea" className="form-label" id="memorytextlabel">Content</label>
                                        <textarea className="form-control" id="MemoryTextarea" rows="12" value={editMemory} onChange={(e) => setEditMemory(e.target.value)} disabled={memoryDisable} />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="memory_action text-center">
                                        <button className="btn btn-success" type="button" onClick={saveEdit}>Save Edited</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>}
            </div>
        </>
    )
}

export default EditDeleteMemory
