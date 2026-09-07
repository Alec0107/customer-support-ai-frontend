import { useEffect, useState } from "react";
import "./Homepage.css";
import ChatWidget from "./ChatWidget.jsx";
import ChatBox from "./ChatBox.jsx"
import DarkModeButton from "./DarkModeButton.jsx";
import Content from "./Content.jsx";


function Homepage(){

    const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);


  return(

    <main className={isDarkMode ? "homepage dark" : "homepage"}>

      <Content>

      </Content>

      <DarkModeButton 
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode} 
      />

      <ChatWidget
        isChatBoxOpen={isChatBoxOpen}
        setIsChatBoxOpen={setIsChatBoxOpen}
        isDarkMode={isDarkMode}
      />

      <ChatBox
        isChatBoxOpen={isChatBoxOpen}
        isDarkMode={isDarkMode}
      />

    </main>
  );

}

export default Homepage;