import "./Message.css";
import chatIcon from "../assets/botIcon.png";


function Message({ message }) {

    return (
        <div className={`message ${message.role}`}>

            {message.role === "assistant" && (
                <img className="botIcon" 
                src={chatIcon} 
                alt="Chat AI"></img>
            )}

            <div className="message-content">
                <div className="message-bubble">
                    {message.content}
                </div>

                <div className="message-time">
                    {message.time}
                </div>
            </div>
        </div>
    );

}

export default Message;