import "./Content.css"
import dashboardIconDis from "../assets/dashboard-disable.svg"
import dashboardIconEn from "../assets/dashboard-enable.svg"
import orderEn from "../assets/order-enable.svg"
import orderDis from "../assets/order-disable.svg"
import trackEn from "../assets/truck-enable.svg"
import trackDis from "../assets/truck-disable.svg"
import profileEn from "../assets/profile-enable.svg"
import profileDis from "../assets/profile-disable.svg"
import { useState } from "react"

import { useLocation, useNavigate } from "react-router-dom"

import Dashboard from "./MainContent/jsx/Dashboard.jsx"
import Orders from "./MainContent/jsx/Orders.jsx"
import Track from "./MainContent/jsx/Track.jsx"
import Profile from "./MainContent/jsx/Profile.jsx"

function Content(){

    const location = useLocation()

    const activePage = location.pathname.split("/").pop()

    const navigate = useNavigate();


    return(

        <div className="parent-of-two">

            {/* Div for navbar (left-side) */}
             <div className="navbar">

                {/* App name */}
                <h2 className="logo">
                    ShopFlow
                </h2>

                {/* Navigation buttons */}
                <div className="nav-links">

                    <button  className={                        
                        activePage === "profile"
                            ? "nav-button active"
                            : "nav-button"
                        }
                        onClick={() => {
                            navigate("/homepage/profile")
                        }}
                    >

                        <img src={
                            activePage === "profile"
                                ? profileEn
                                : profileDis    
                        } 
                        className="icons"/>

                        <span>Profile / Dashboard</span>
                    </button>

                    <button className={                        
                        activePage === "orders"
                            ? "nav-button active"
                            : "nav-button"
                        }
                        onClick={() => {
                            navigate("/homepage/orders")
                        }}
                    >

                         <img src={
                            activePage === "orders"
                                ? orderEn
                                : orderDis
                         } 
                         className="icons"/>

                        <span>Orders</span>

                    </button>

                    <button className={                        
                        activePage === "track"
                            ? "nav-button active"
                            : "nav-button"
                        }
                        onClick={() => {
                            navigate("/homepage/track")
                        }}
                    >

                        <img src={
                            activePage === "track"
                                ? trackEn
                                : trackDis
                        } 
                        className="icons"/>

                        <span>Track</span>

                    </button>

                </div>

            </div>


            {/* Div for main content (right-side)  */}
            <div className="content">

                {activePage === "dashboard"
                    ?<Dashboard />
                    :null
                }


                {activePage === "orders"
                    ?<Orders />
                    :null
                }


                {activePage === "track"
                    ?<Track />
                    :null
                }


                {activePage === "profile"
                    ?<Profile />
                    :null
                }

            </div>

        </div>


    )
}

export default Content;