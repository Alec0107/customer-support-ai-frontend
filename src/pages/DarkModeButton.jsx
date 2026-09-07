import "./buttons.css";
import moon from "../assets/moon.svg";
import sun from "../assets/sun.svg";

function DarkModeButton({ isDarkMode, setIsDarkMode, }) {


    return (
        <button className={!isDarkMode ? "theme-button light" : "theme-button"}
            onClick={() => {setIsDarkMode(prev => !prev)} }>
                
            <img src={isDarkMode ? sun : moon} alt="Toggle Theme" />

        </button>
    );
}

export default DarkModeButton;