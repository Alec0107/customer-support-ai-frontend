import "../css/Track.css"
import { useState, useEffect } from "react";
import TrackDetails from "../component/TrackDetails.jsx"
import "../../../pages/loader.css"
import { use } from "react";

function Track(){

    // const [deliveries, setDeliveries] = useState([
    //     {
    //         orderId: 1,
    //         carrier: "J&T Express",
    //         trackingNumber: "JT202608080001",
    //         status: "IN_TRANSIT",
    //         currentLocation: "Davao City Sorting Hub",
    //         estimatedDelivery: "Aug 21, 2026"
    //     },
    //     {
    //         orderId: 2,
    //         carrier: "LBC Express",
    //         trackingNumber: "LBC202608090002",
    //         status: "OUT_FOR_DELIVERY",
    //         currentLocation: "Davao City",
    //         estimatedDelivery: "Aug 20, 2026"
    //     },
    //     {
    //         orderId: 3,
    //         carrier: "J&T Express",
    //         trackingNumber: "JT202608050003",
    //         status: "DELIVERED",
    //         currentLocation: "Delivered to Customer",
    //         estimatedDelivery: "Aug 15, 2026"
    //     }
    // ]);

        const [deliveries, setDeliveries] = useState([])
        const [loading, setLoading] = useState(true);

        const [selectedDelivery, setSelectedDelivery] = useState(null);
        const [search, setSearch] = useState("");

        // Mock up Test with delay timer
        // useEffect(() => {
        //     const timer = setTimeout(()=>{
                
        //             fetch("http://localhost:8080/deliveries/my-deliveries", {
        //                 credentials: "include"
        //             })
        //             .then(response => {

        //                 if (!response.ok) {
        //                     throw new Error("Failed to fetch deliveries");
        //                 }

        //             return response.json();
        //             })
        //             .then(data => {
        //                 console.log("Deliveries from backend:", data);

        //                 setDeliveries(data);
        //                 setLoading(false);
        //             })
        //             .catch(error => {
        //                 console.log("Error:", error);
        //                 setLoading(false);
        //             })

        //     }, 1500)

        //     return () => clearTimeout(timer)
        // })

        useEffect(() => {

            fetch("http://localhost:8080/deliveries/my-deliveries", {
                credentials: "include"
            })
            .then(response => {

                if (!response.ok) {
                     throw new Error("Failed to fetch deliveries");
                }

            return response.json();
            })
            .then(data => {
                console.log("Deliveries from backend:", data);

                setDeliveries(data);
                setLoading(false);
            })
            .catch(error => {
                console.log("Error:", error);
                setLoading(false);
            })

        }, []);

        const filteredDeliveries = deliveries.filter((delivery) => {

            return (
                delivery.trackingNumber
                    .toLowerCase()
                    .includes(search.toLowerCase())

                ||

                delivery.orderId
                    .toString()
                    .includes(search)
                    
            );
        });

        const activeDeliveries = filteredDeliveries.filter(
            delivery => delivery.status !== "DELIVERED"
        );

        const deliveredDeliveries = filteredDeliveries.filter(
            delivery => delivery.status === "DELIVERED"
        );


    return(
        <div className="track-page">

            <div className="track-header">
                <h2>Track</h2>
                <p>Track and monitor your deliveries</p>
            </div>

            <input
                type="text"
                placeholder="Search order or tracking number"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

       
            {loading && (
                <div className="loader-div">
                    <div className="loader"></div>
                </div>
            )}


            {!loading && deliveries.length === 0 && (
                <div className="no-deliveries-div">
                    <p className="shaded-text">No deliveries found.</p>
                </div>
            )}
                                     

            {!loading && deliveries.length > 0 && (
                <>
                        <section className="shipment-section">
                            <h3>Active Shipments</h3>

                            {/* activeDeliveries.map(...) */}

                            {activeDeliveries.length === 0 ? (

                                <p className="no-shipments"
                                >No active shipments found for "{search}"
                                </p>

                            ) : (

                                activeDeliveries.map((delivery) => (

                                <div
                                    className="shipment-card"
                                    key={delivery.orderId}
                                >

                                    <div className="shipment-card-header">

                                        <h3>
                                            Order #{delivery.orderId}
                                        </h3>

                                        <span className="shipment-status">
                                            {delivery.status}
                                        </span>

                                    </div>

                                    <p>{delivery.carrier}</p>

                                    <p>
                                        Tracking: {delivery.trackingNumber}
                                    </p>

                                    <p>
                                        Location: {delivery.currentLocation}
                                    </p>

                                    <p>
                                        Estimated Delivery: {delivery.estimatedDelivery}
                                    </p>

                                    <button
                                        onClick={() => setSelectedDelivery(delivery)}
                                    >
                                        View Details
                                    </button>

                                </div>

                                ))

                            )}
                        
                        </section>


                        <section className="shipment-section">
                            <h3>Delivered</h3>

                            {/* deliveredDeliveries.map(...) */}
                            {deliveredDeliveries.length === 0 ? (

                                <p className="no-shipments">No delivered shipments found for "{search}"</p>

                            ) : (

                                    deliveredDeliveries.map((delivery) => (

                                    <div
                                        className="shipment-card"
                                        key={delivery.orderId}
                                    >

                                        <h3>
                                            Order #{delivery.orderId}
                                        </h3>

                                        <p>{delivery.carrier}</p>

                                        <p>
                                            Tracking: {delivery.trackingNumber}
                                        </p>

                                        <p>
                                            Location: {delivery.currentLocation}
                                        </p>

                                        <button
                                            onClick={() => setSelectedDelivery(delivery)}
                                        >
                                            View Details
                                        </button>

                                    </div>

                                ))
                            )}
                        </section>
                </>
            ) }



            {selectedDelivery && (
                <TrackDetails
                    delivery={selectedDelivery}
                    setSelectedDelivery={setSelectedDelivery}
                />
            )}



        </div>
    )
}

export default Track;