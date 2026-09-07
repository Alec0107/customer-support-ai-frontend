import "../components/RecentOrders.css"

function RecentOrders({id, status, totalAmount, orderDate}){

    const date = new Date(orderDate);

    const day = date.getDate();
    const month = date.toLocaleDateString("en-US", {
       month: "short" 
    });

    return(
        
        <div className="recent-order-row">
            <div className="left">

                    <div className="date-div">
                        <h2>{day}</h2>
                        <p>{month}</p>
                    </div>

                    <div>
                        <p>Order#{id}</p>

                    </div>

                </div>

                <div className="right">

                    <p className={`status-badge ${status.toLowerCase()}`}>
                        {status}
                    </p>
                    <p>${totalAmount}</p>
            
                </div>
        </div>

    )
}

export default RecentOrders