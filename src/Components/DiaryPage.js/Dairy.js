import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import './Diary.css'
import env from '../settings'
import Toastoptions from '../Toastoptions'
import { toastinfo, toastsuccess, toasterror } from '../utils'


function Dairy() {

    const [title, setTitle] = useState("")
    const [date, setDate] = useState("")
    const [memory, setMemory] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`${env.api}/create-memory`, { title, date, memory },{
                headers : {
                    "Authorization": window.localStorage.getItem("app_token")
                }
            })
            setTitle("")
            setDate("")
            setMemory("")
            toastsuccess()
        } catch (error) {
            toasterror()
            console.log(error)    
        }
    }

    let handleClear = () => {
        setTitle("")
        setDate("")
        setMemory("")
        toastinfo()
        
    }

    return (
        <>
            <Toastoptions />
            <Navbar />
            <div className="container mt-1" id="diaryBox">
                <div className="col col-lg-12">
                    <div className="diary" id="diary-content">
                        <div className="diary-head mb-2">
                        <h4>Add your Memory</h4>
                            <Link to="/DiaryPage/SavedMemory" className="btn" exact="true"><i className="fa fa-eye" aria-hidden="true"></i> Saved Memories</Link>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col col-lg-9">
                                    <div className="form-floating mb-2">
                                        <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title" required />
                                        <label htmlFor="floatingInput">Title</label>
                                    </div>
                                </div>
                                <div className="col col-lg-3">
                                    <div className="form-floating mb-2">
                                        <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
                                        <label htmlFor="floatingInput">Date</label>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-2">
                                        <label htmlFor="MemoryTextarea" className="form-label" id="memorytextlabel">Content</label>
                                        <textarea className="form-control" id="MemoryTextarea" rows="12" value={memory} onChange={(e) => setMemory(e.target.value)} required/>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="memory_action text-center">
                                        <button className="btn btn-success" type="submit">Submit</button>
                                        <button className="btn btn-danger" type="button" onClick={handleClear}>Clear</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dairy
