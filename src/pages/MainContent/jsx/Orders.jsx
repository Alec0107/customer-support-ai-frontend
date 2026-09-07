import "../css/Orders.css"
import { useEffect, useState } from "react";
import "../../../pages/loader.css"
import OrderDetails from "../component/OrderDetails.jsx"
import API from "../api/apiRoutes.js";

function Orders(){

    const [loading, setLoading] = useState(true);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);


    const [orders, setOrders] = useState([])

     // Mock up Test with delay timer
    //     useEffect(() => {
    //     const timer = setTimeout(()=>{
        
    //         setOrders([{
    //             "orderId": 1,
    //             "orderDate": "2026-08-08T10:30:00",
    //             "currentLocation": "Davao City",
    //             "totalAmount": 1299.00,
    //             "status": "PROCESSING"
    //         },{    "orderId": 2,
    //             "orderDate": "2026-08-08T10:30:00",
    //             "currentLocation": "Davao City",
    //             "totalAmount": 1299.00,
    //             "status": "PROCESSING"}, {    "orderId": 3,
    //             "orderDate": "2026-08-08T10:30:00",
    //             "currentLocation": "Davao City",
    //             "totalAmount": 1299.00,
    //             "status": "PROCESSING"},
    //         {    "orderId": 4,
    //             "orderDate": "2026-08-08T10:30:00",
    //             "currentLocation": "Davao City",
    //             "totalAmount": 1299.00,
    //             "status": "PROCESSING"}]
    //         )
    //         setLoading(false)

    //     }, 1500)

    //     return () => clearTimeout(timer)
    // })

    useEffect(() => {

        fetch(API.ORDERS,{
            credentials: "include"
        })
        .then(response => {
            if(!response.ok){
                throw new Error("Failed to fetch orders");
            }
            return response.json();
        })
        .then(data => {
            console.log("Orders from backend: ", data);
            setOrders(data);
            setLoading(false)
        })
        .catch(error => {
            console.log("Error", error);
            setLoading(false)
        })

    },[])


    return(

        <div className="orders-page">


            <div className="orders-header">
                <h2>Orders</h2>
                <p>Here is your order list data</p>
            </div>


            <div className="orders-table-container">

                <table className="orders-table">

                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Location</th>
                            <th>Amount</th>
                            <th>Status Order</th>
                            <th></th>
                        </tr>
                    </thead>


                    <tbody>  

                        {loading && (
                            <tr>
                                <td className="loader-td" colSpan="6">
                                    <div className="loader"></div>
                                </td>
                            </tr>
                        )}

                        {!loading && orders.length === 0 && (
                            <tr>
                                <td className="loader-td" colSpan="6">
                                    <p>No orders found.</p>
                                </td>
                            </tr>
                        )}


                        {/* ← actual data */} 
                                    

                        {!loading && orders.length > 0 &&(
                                orders.map((order) => (

                                <tr key={order.orderId}>

                                    <td>#{order.orderId}</td>

                                    <td>{order.orderDate}</td>

                                    <td>{order.currentLocation}</td>

                                    <td>${order.totalAmount}</td>

                                    <td className="status">
                                        <p className={`status-badge ${order.status.toLowerCase()}`}>
                                            {order.status}
                                        </p>
                                    </td>

                                    <td className="action-cell">

                                        <button 
                                            className="more-button"
                                            onClick={() => 
                                                setOpenMenuId( prev => 
                                                    prev === order.orderId
                                                         ? null
                                                         : order.orderId
                                                )
                                            }
                                        >
                                            •••
                                        </button>

                                        {openMenuId === order.orderId && (
                                            <div className="order-menu">
                                                <button onClick={() => setSelectedOrder(order)}>
                                                    View Details
                                                </button>
                                                   <button>Esmiringhoy
                                                </button>
                                            </div>
                                        )}

                                            

                                    </td>

                                </tr>            

                            ))
                        )}

                    </tbody>


                </table>


            </div>


            {selectedOrder && (
                <OrderDetails 
                    order={selectedOrder}
                    setSelectedOrder={setSelectedOrder}
                />
            )}





        </div>

        

    )
}

export default Orders;