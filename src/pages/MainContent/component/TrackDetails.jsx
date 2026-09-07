import "../component/TrackDetails.css"

function TrackDetails({
    delivery,
    setSelectedDelivery
}) {

    return (
      <div className="track-details-overlay">

        <div className="track-details-drawer">

            <div className="track-details-header">

                <div>
                    <h2>Order #{delivery.orderId}</h2>

                    <p className="track-status-badge">
                        {delivery.status}
                    </p>
                </div>

                <button
                    className="track-close-button"
                    onClick={() => setSelectedDelivery(null)}
                >
                    ✕
                </button>

            </div>


            <div className="track-information">

                <h3>Tracking Information</h3>

                <div className="track-info-row">
                    <span>Carrier</span>
                    <span>{delivery.carrier}</span>
                </div>

                <div className="track-info-row">
                    <span>Tracking Number</span>
                    <span>{delivery.trackingNumber}</span>
                </div>

                <div className="track-info-row">
                    <span>Current Location</span>
                    <span>{delivery.currentLocation}</span>
                </div>

                <div className="track-info-row">
                    <span>Estimated Delivery</span>
                    <span>{delivery.estimatedDeliver}</span>
                </div>

            </div>

        </div>

    </div>
    );
}

export default TrackDetails;