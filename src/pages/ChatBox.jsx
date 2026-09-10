import "./ChatBox.css";
import chatIcon from "../assets/botIcon.png";
import sendIcon from "../assets/send.svg";
import Message from "./Message.jsx";

import { useState, useEffect, useRef} from "react";
import API from "../api/apiRoutes.js";


//ChatBox Component
function ChatBox({ isChatBoxOpen, setIsChatBoxOpen, isDarkMode }) {

    // 1. State
const [messages, setMessages] = useState([]);

const introAI = 
        {
            id: 1,
            role: "assistant",
            content: "Hi! I'm ShopFlow's AI customer support assistant. How can I help you today?",
            time: new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            })
        }

        // {
        //     id: 2,
        //     role: "user",
        //     content: "Where is my order?",
        //     time: "4:36 PM"
        // },
        // {
        //     id: 3,
        //     role: "assistant",
        //     content: "Let me check that for you.",
        //     time: "4:36 PM"
        // }

    const [isTyping, setIsTyping] = useState(false);
    const [input, setInput] = useState("");
    const bottomRef = useRef(null);


    useEffect(() => {

        fetch(API.CHAT_HISTORY, {
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            const formattedHistory = data.map((message, index) => {
                    return {
                        id: index + 1,

                        role:
                            message.role === "model"
                                ? "assistant"
                                : message.role,

                        content: message.content,

                        time: message.time
                    };
                });

            setMessages(formattedHistory);
        })
        .catch(error => {
          console.log("History error:", error);
        });
        

    }, []);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [messages, isTyping]);

async function handleSend(e){
        e.preventDefault();

       const currentTime = new Date().toLocaleTimeString("en-US",{
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
       })

       const newMessage = {
            id : messages.length + 1,
            role: "user",
            content: input,
            time: currentTime
       }

       setMessages(prev => [...prev, newMessage])

       setIsTyping(true);

        fetch(API.CHAT, {
            method: "POST",
            credentials: "include",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(newMessage)
        })
        .then(response => {
            if(!response.ok){
                throw new Error("Something went wrong")
            }

            return response.json();
        })
        .then(data => {
            console.log("Backend response:", data);

            // show AI response 
            setMessages(prev => [...prev, data]);
            setIsTyping(false);
        })
        .catch(error => {
            console.log("Error", error)
            setIsTyping(false);
        })

        // clean up
        setInput("")
    }


    // 2. Conditions
    // This checks if the chat box is open. If it is not open, it returns null and does not render the chat box.
    if(!isChatBoxOpen){
        return null;
    }


    // 3. JSX
    return (
        <div className={isDarkMode ? "chat-box dark" : "chat-box"}>

            {/* Header of the chat box */}
            <div className="chat-header">

                <h2>ShopFlow Customer AI Support</h2>

                <button
                    className="mobile-chat-close"
                    onClick={() => setIsChatBoxOpen(false)}
                    type="button"
                >
                    ✕
                </button>

            </div>

            {/* Message component inflated */}
            <div className="chat-messages">

                <Message
                    key={introAI.id}
                    message={introAI}
                />
                
                {messages.map((message) => (
                    <Message
                        key={message.id}
                        message={message}
                    />
                ))}

                {isTyping && (
                    <div className="typing-message">

                        <img
                            className="botIcon"
                            src={chatIcon}
                            alt="Chat AI"
                        />

                       
                        <div className="typing-bubble">
                            <div className="typing">
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                             </div>
                        </div>

                    </div>

                    
                )}

                <div ref={bottomRef}></div>

            </div>

            {/* Input component inflated */}
            <form 
                onSubmit={handleSend}
                className="chat-input">

                <input
                    type="text"
                    placeholder="Ask anything"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                {/* <button>send</button> */}
                <div 
                    typeof="submit"
                    className="send-div">
                    <img src={sendIcon}></img>
                </div>

            </form>


        </div>
    );
}

export default ChatBox;