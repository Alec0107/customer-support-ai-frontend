import "./ChatWidget.css";
import chatIcon from "../assets/botIcon.png";
import cancelDark from "../assets/cancel-dark.svg";
import cancelLight from "../assets/cancel-light.svg";

// ChatWidget Component
function ChatWidget({ isChatBoxOpen, setIsChatBoxOpen, isDarkMode }) {
   
    let widgetIcon;
    let cancelSize;

    // function handleStateOfChatBox() {
    //     console.log("Chat Widget Clicked");
    //     if(isChatBoxOpen == false){
    //         setIsChatBoxOpen(true);
    //     }else{
    //         setIsChatBoxOpen
    //     }
    // }


    if(isChatBoxOpen){
        if(isDarkMode){
            widgetIcon = cancelLight;
        }else{
            widgetIcon = cancelDark;
        }
    }else{
        widgetIcon = chatIcon;
    }

    return (
        <div
            className={isDarkMode ? "chat-widget dark" : "chat-widget"}
            onClick={() => setIsChatBoxOpen(prev => !prev)} // or call the handleStateOfChatBox function here
        >
          <img className={isChatBoxOpen ? "closeIcon" : "botIconWidget" } src={widgetIcon} alt="Chat Icon"  />    
        </div>
  );
}

export default ChatWidget;