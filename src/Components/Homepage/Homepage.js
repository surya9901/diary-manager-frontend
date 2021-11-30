import { Button } from 'bootstrap'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Homepage.css'

function Homepage() {
    let navigate = useNavigate()
    return (
        <>
            <div className="container mb-3" id="homepage_container">
                <div className="homepage_content">
                    <h1>Diary Manager</h1>
                    <h4>Manage your E-dairy</h4>
                    <h4>Save paper Save Earth!</h4>
                </div>
                <div className="login_register mt-5">
                    <button className="btn" onClick={() => window.localStorage.getItem("app_token") ? navigate("/DiaryPage") : navigate("/Login")}>Login</button>
                    <Link to="/Register">Register</Link>
                </div>
            </div>
        </>
    )
}

export default Homepage
