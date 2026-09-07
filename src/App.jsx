import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import HomePage from './pages/Homepage'
import LoginPage from './pages/Loginpage'
import ProtectedRoute from './pages/ProtectedRoute'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";




function App(){

  return (

    <BrowserRouter>
    
      <Routes>

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/homepage/*"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>


  )
}
export default App;


















// function App() {

//   const [reply, setReply] = useState("");

//   async function callbackend(){
//     console.log("Button Clicked")
//     const response = await fetch("http://localhost:8080/fetch/people");

//     const data = await response.json();
//     console.log(data);

//     for(const person of data){
//       console.log(person.name);
//     }


//     //setReply(text);
//   }


//   return (
//    <div>

//       <h1>Customer Support AI</h1>

//       <button onClick={callbackend}>
//         Click Me
//       </button>

//      {/* {/* <p>{reply}</p> */}

//    </div>
//   )

// }

// export default App;