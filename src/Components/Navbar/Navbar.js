import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import env from '../settings'

function Navbar() {
    useEffect(() => {
        usermailid()
    }, [])

    const [logOutDropDown, setLogOutDropDown] = useState(false)

    const logouttoggleopen = () => {
        setLogOutDropDown(!logOutDropDown)
    }


    const [mailid, setMailID] = useState("")

    const usermailid = async () => {
        let emailid = await axios.get(`${env.api}/userName`, {
            headers: {
                "Authorization": window.localStorage.getItem("app_token")
            }
        })
        setMailID(emailid.data[0].email)
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
                <h4 className="navbar-brand">E-Diary</h4>
                <div className="dropdown">
                    <button className="btn dropdown-toggle" onClick={logouttoggleopen} id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        Hi, {mailid}
                    </button>
                    <ul className={`dropdown-menu ${logOutDropDown ? "show" : ""}`} aria-labelledby="dropdownMenuLink">
                        <li>
                            <Link to="/DiaryPage" className="dropdown-item" exact="true">Home</Link>
                            <Link to="/DiaryPage/SavedMemory" className="dropdown-item" exact="true">Memories</Link>
                            <Link to="/" className="dropdown-item" exact="true" onClick={() => { window.localStorage.removeItem("app_token") }}>Log Out</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
