import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react/cjs/react.development'
import Navbar from '../Navbar/Navbar'
import './Memory.css'
import env from '../settings'
import { useNavigate } from 'react-router-dom'
import { format } from '../utils'

function Memory() {

    let navigate = useNavigate()

    useEffect(() => {
        fetchData()
    }, [])

    const [filterDropDown, setFilterDropDown] = useState(false)
    const toggleDrop = () => {
        setFilterDropDown(!filterDropDown)
        setFetchedMemory("")
        if (filterDropDown) {
            fetchData()
        }
    }

    const [filterMenuDrop, setFilterMenuDrop] = useState(false)
    const [titleBox, setTitleBox] = useState(false)
    const dateDrop = () => {
        setFilterDropDown(!filterDropDown)
        setFilterMenuDrop(!filterMenuDrop)
        setTitleBox(!titleBox)
    }

    const [dateBox, setDateBox] = useState(false)
    const titleDrop = () => {
        setFilterDropDown(!filterDropDown)
        setFilterMenuDrop(!filterMenuDrop)
        setDateBox(!dateBox)
    }


    const [dateValue, setDateValue] = useState("")
    const [titleValue, setTitleValue] = useState("")
    const [filteredData, setFilteredData] = useState([])
    const fetchfilterData = async (e) => {
        e.preventDefault()
        if (!dateValue == "") {
            let filterData = await axios.get(`${env.api}/filtered-data?q=${dateValue}`, {
                headers: {
                    "Authorization": window.localStorage.getItem("app_token")
                }
            })
            setFilteredData([...filterData.data])
        } else {
            let filterData = await axios.get(`${env.api}/filtered-data?q=${titleValue}`, {
                headers: {
                    "Authorization": window.localStorage.getItem("app_token")
                }
            })
            setFilteredData([...filterData.data])
        }
    }


    const [filterDisable, setFilterDisable] = useState(false)
    const [fetchedMemory, setFetchedMemory] = useState([])
    const fetchData = async () => {
        try {
            let data = await axios.get(`${env.api}/view-memory`, {
                headers: {
                    "Authorization": window.localStorage.getItem("app_token")
                }
            })
            if ([data.data] == "") {
                setFilterDisable(true)
            } else {
                setFilterDisable(false)
                setFetchedMemory([...data.data])
            }
        } catch (error) {
            console.log(error)
        }
    }

    const cleartoggles = () => {
        setFilterDropDown(false)
        setFilterMenuDrop(false)
        setTitleBox(false)
        setDateBox(false)
        setDateValue("")
        setTitleValue("")
        setFilteredData("")
        fetchData()
    }

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="viewMemory-head mb-2">
                    <h4>View your Memories:</h4>
                    <div className="row">
                        <div className="col col-lg-6">
                            <div className="dropdown">
                                {
                                    filterMenuDrop ? <button className="btn" onClick={cleartoggles}><i className="fas fa-times" style={{ "color": "red" }}></i></button> :
                                        <button className="btn dropdown-toggle" onClick={toggleDrop} id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{ "color": "white" }} disabled={filterDisable}>
                                            <i className="fas fa-filter"></i>
                                        </button>
                                }

                                <ul className={`dropdown-menu ${filterDropDown ? "show" : ""}`} aria-labelledby="dropdownMenuButton1">
                                    <li><button className="dropdown-item" onClick={dateDrop}>Date</button></li>
                                    <li><button className="dropdown-item" onClick={titleDrop} >Title</button></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col col-lg-6">
                            <button className="btn btn-danger" onClick={() => navigate("/DiaryPage")}><i className="fas fa-backward"></i></button>
                        </div>
                    </div>
                </div>
                {
                    !filterMenuDrop ? "" :
                        <form onSubmit={fetchfilterData}>
                            <div className="row">
                                <div className="col col-lg-3">
                                    <div className="form-floating mb-3">
                                        <input type="date" className="form-control" placeholder="2005-10-10" disabled={dateBox} value={dateValue} onChange={(e) => setDateValue(e.target.value)} />
                                        <label htmlFor="floatingInput">Date</label>
                                    </div>
                                </div>
                                <div className="col-lg-9">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" placeholder="text" disabled={titleBox} value={titleValue} onChange={(e) => setTitleValue(e.target.value)} />
                                        <label htmlFor="floatingPassword">Title</label>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-2 mb-2">
                                <button className="btn btn-success" type="Submit"><i className="fas fa-search"></i> Search</button>
                            </div>
                        </form>
                }

                <div className="memories_result mt-3 mb-3">
                    <div className="row">
                        {
                            fetchedMemory == "" && filteredData == "" ? <h4 className="text-center mt-5" style={{ "color": "white" }}>No Data Found</h4> :
                                <>
                                    {
                                        (fetchedMemory == "" ? filteredData : fetchedMemory).map(obj => {
                                            return (
                                                <div className="col-lg-3 mb-3">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <h6>{obj.title}</h6>
                                                            <p className="text-muted">Created On: {format(obj.date)}</p>
                                                            <div className="text-center">
                                                                <button className="btn" onClick={() => navigate(`/DiaryPage/SavedMemory/EditDeleteMemory/${obj._id}`)}><i className="fas fa-edit"></i></button>
                                                                <button className="btn" onClick={() => navigate(`/DiaryPage/SavedMemory/ViewMemory/${obj._id}`)}><i className="fas fa-eye"></i></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Memory
