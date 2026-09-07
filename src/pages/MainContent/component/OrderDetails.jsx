import "../component/OrderDetails.css"
import closeDark from "../../../assets/cancel-dark.svg"
import { useEffect, useState } from "react";


function OrderDetails({ order, setSelectedOrder }) {

    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        fetch(API.ORDERID(order.orderId), {
            credentials: "include"
        })
        .then(response => {

            if (!response.ok) {
                throw new Error("Failed to fetch order details");
            }

            return response.json();
        })
        .then(data => {

            console.log("Order details:", data);

            setOrderDetails(data);
            setLoading(false);
        })
        .catch(error => {

            console.log("Error:", error);
            setLoading(false);
        });

    }, [order.orderId]);


    return (
        <div className="order-details-overlay">

            <div className="order-details-drawer">

                {loading && (
                    <p>Loading order details...</p>
                )}


                {!loading && orderDetails && (
                    <>

                        {/* HEADER */}
                        <div className="order-details-header">

                            <div>
                                <h2>
                                    Order #{orderDetails.orderId}
                                </h2>

                                <p>
                                    {orderDetails.orderStatus}
                                </p>
                            </div>

                            <img
                                className="close-details-button"
                                src={closeDark}
                                onClick={() => setSelectedOrder(null)}
                            />

                        </div>


                        {/* ORDER INFORMATION */}
                        <div className="order-information">

                            <h3>Order Information</h3>

                            <div className="information-row">
                                <span>Order Date</span>

                                <span>
                                    {orderDetails.orderDate}
                                </span>
                            </div>

                            <div className="information-row">
                                <span>Total</span>

                                <span>
                                    ${orderDetails.totalAmount}
                                </span>
                            </div>

                        </div>


                        {/* DELIVERY INFORMATION */}
                        <div className="delivery-information">

                            <h3>Delivery Information</h3>

                            <div className="information-row">
                                <span>Delivery Status</span>

                                <span>
                                    {orderDetails.delivery.status}
                                </span>
                            </div>

                            <div className="information-row">
                                <span>Carrier</span>

                                <span>
                                    {orderDetails.delivery.carrier}
                                </span>
                            </div>

                            <div className="information-row">
                                <span>Tracking Number</span>

                                <span>
                                    {orderDetails.delivery.trackingNumber}
                                </span>
                            </div>

                            <div className="information-row">
                                <span>Current Location</span>

                                <span>
                                    {orderDetails.delivery.currentLocation}
                                </span>
                            </div>

                            <div className="information-row">
                                <span>Estimated Arrival</span>

                                <span>
                                    {orderDetails.delivery.estimatedDelivery}
                                </span>
                            </div>

                        </div>


                        {/* ITEMS */}
                        <div className="items-information">

                            <h3>Items</h3>

                            {orderDetails.items.map((item) => (

                                <div
                                    className="item-row"
                                    key={item.productId}
                                >

                                    <div>
                                        <p className="item-name">
                                            {item.productName}
                                        </p>

                                        <p className="item-price">
                                            ${item.price} × {item.quantity}
                                        </p>
                                    </div>

                                    <p className="item-subtotal">
                                        ${item.subtotal}
                                    </p>

                                </div>

                            ))}

                        </div>


                        {/* TOTAL */}
                        <div className="details-total">

                            <span>Total</span>

                            <span>
                                ${orderDetails.totalAmount}
                            </span>

                        </div>

                    </>
                )}

            </div>

        </div>
    );
}

export default OrderDetails;