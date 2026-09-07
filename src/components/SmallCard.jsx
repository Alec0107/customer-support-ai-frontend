import "../components/SmallCard.css"
function rightTopComponent({title, count, percentage}){
    return (
        <div className={`small-card ${title}`}>
           
           <h2>{count}</h2>

           <p>{title}</p>

           <div className="progress-div">

                <div className="progress-bar">

                    <div
                        className={`progress-fill ${title}`}
                        style={{ width: `${percentage}%`}}
                    />

                </div>

                <span>{percentage}%</span>

           </div>

        </div>
    )
}

export default rightTopComponent;