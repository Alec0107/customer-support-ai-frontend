import { useState, useEffect } from "react";
import "../css/Profile.css"
import "../../../pages/loader.css"
import SmallCard from "../../../components/SmallCard.jsx"
import RecentOrders from "../../../components/RecentOrders.jsx"


function Profile(){


    function getSmallCardData(orders){

        console.log("Orders inside function:", orders);

        const totalOrders = orders.length;

        const deliveredCount = orders.filter(
            order => order.status === "DELIVERED"
        ).length

        const processingCount = orders.filter(
            order => order.status === "PROCESSING"
        ).length

        const shippedCount = orders.filter(
            order => order.status === "SHIPPED"
        ).length

        const deliveredPercentage = 
            (deliveredCount / totalOrders) * 100;


        const processingPercentage = 
            (processingCount / totalOrders) * 100;

        const shippedPercentage = 
            (shippedCount / totalOrders) * 100;

        const orderStats = [
            {
                title: "Delivered",
                count: deliveredCount,
                percentage: deliveredPercentage
            },
            {
                title: "Processing",
                count: processingCount,
                percentage: processingPercentage
            },
            {
                title: "Shipped",
                count: shippedCount,
                percentage: shippedPercentage
            }
        ]

        return orderStats;
    }

    function getRecentOrders(orders){

        const sortedOrders = [...orders];

        sortedOrders.sort((a, b) => {

            const dateA = new Date(a.orderDate);
            const dateB = new Date(b.orderDate);

            return dateB - dateA;
        });

        return sortedOrders;

    }

    
    const [userProfile, setUserProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(true)

    const [orders, setOrders] = useState([]);

    const orderStats = getSmallCardData(orders);
    const recentOrdersDisplay = getRecentOrders(orders)

    
    // FETCH PROFILE
    useEffect(() => {
        fetch(API.USER_PROFILE,{
                    credentials: "include"
                })
                .then(response => {
                    if(!response.ok){
                        throw new Error("Failed to load profile user");
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("user Profile from backend: ", data);
                    setUserProfile(data);
                    setLoadingProfile(false);
                })
                .catch(error => {
                    console.log("Error", error);
                    setLoadingProfile(false);
                })
    },[])

    // FETCH PROFILE DASHBOARD DATA
    useEffect(() => {
        fetch("https://customer-support-ai-backend-production.up.railway.app/orders/partial",{
                    credentials: "include"
                })
                .then(response => {
                    if(!response.ok){
                        throw new Error("Failed to load data for dashboard");
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Orders from backend: ", data);
                    setOrders(data);
                })
                .catch(error => {
                    console.log("Error", error);
                })
    },[])





    function getInitials(name){
        const words = name.split(" ");

        let initials = "";

        for(let word of words){
            initials += word[0]
        }
        return initials;
    }




    return(
        <div className="profile-page">

            <div className="profile-header">
                <h2>Profile / Dashboard</h2>
                <p className="profile-subtitle">
                    Manage your account information
                </p>
            </div>

            <div className="container">

                    {/* PROFILE CARD */}
                    <div className={`profile-card${loadingProfile ? " loading" : ""}`}>

                        {/* LOADING */}
                        {loadingProfile && (
                            <tr>
                                <td className="loader-td" colSpan="6">
                                    <div className="loader"></div>
                                </td>
                            </tr>
                        )} 

                        {/* PROFILE DATA */}
                        {!loadingProfile && userProfile != null && (
                            <>
                                <div className="profile-avatar">
                                    <span>{getInitials(userProfile.name)}</span>
                                </div>

                            
                                <div className="profile-info">

                                    <div className="profile-row">
                                        <span>Name</span>
                                        <p>{userProfile.name}</p>
                                    </div>

                                    <div className="profile-row">
                                        <span>Email Account</span>
                                        <p>{userProfile.email}</p>
                                    </div>

                                    <div className="profile-row">
                                        <span>Mobile number</span>
                                        <p>{userProfile.phone}</p>
                                    </div>

                                    <div className="profile-row">
                                        <span>Address</span>
                                        <p>Singapore</p>
                                    </div>

                                </div>
                            </>
                        )}

                    </div>

                    {/* DASHBOARD DATA */}
                    <div className="right-container">

                        <div className="right-top">

                           {orderStats.map((stat) => (
                                <SmallCard
                                  key={stat.title}
                                  title={stat.title}
                                  count={stat.count}
                                  percentage={stat.percentage}
                                />
                           ))}

                        </div>

                        <div className="right-bot">
                        
                           <div className="header">
                                <p>Recent Orders</p>
                                <p>View All</p>
                           </div>

                           <div className="row-container"> 

                                {recentOrdersDisplay.map((recentOrder) => (
                                    <RecentOrders
                                        key={recentOrder.id}
                                        id={recentOrder.id}
                                        status={recentOrder.status}
                                        totalAmount={recentOrder.totalAmount}
                                        orderDate={recentOrder.orderDate}
                                    />
                                ))}
                             
                
                           </div>

                        </div>

                           

                    </div>

            </div>

        </div>

    )
}

export default Profile;