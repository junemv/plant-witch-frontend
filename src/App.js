import { createContext, useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import PlantBoard from './components/plant_components/PlantBoard';
import AIWitch from './components/witch_components/AIWitch';

import axios from 'axios';

export const UserContext = createContext(null);

// const userDataTemp = [
//   {
//     id: 1,
//     firstName: "June",
//     LastName: "Valentino",
//     email: "junemvalentino@gmail.com"
//   },
//   {
//     id: 2,
//     firstName: "Natasha",
//     LastName: "Zakharova",
//     email: "natashaz@gmail.com"
//   },
//   {
//     id: 3,
//     firstName: "Diana",
//     LastName: "M",
//     email: "dianam@gmail.com"
//   }
// ]

function App() {
  const URL = process.env.REACT_APP_BACKEND_URL;

  // STATE VARIABLES:
  // User variables
  const [demoUserData, setDemoUserData] = useState([]);
  const [activeUser, setActiveUser] = useState({firstName: "Guest"});


  // USER FUNCTIONALITY:
  // - Get all users - TODO: deprecate when userauth is added
  const fetchAllUsers = () => {
    axios
      .get(`${URL}/user/all`)
      .then((res) => {
        setDemoUserData(res.data)
        console.log("res.data", res.data)
      })
      .catch((err) => {
        console.log(err)
    })
  }

  useEffect(fetchAllUsers, []);

  // PLANT FUNCTIONALITY:


  // TODO -
  // 1. Start with building out Active User functionality x
  // 2. Build out PlantBoard Component
  // 3. Build out Plant Component

  // Adrian Notes:
  // > State variables should live in app and be passed down.

  // Rough TODO Items:
  // - Build AI Functionality
  // - Build Logic for switching between users by ID x
  // - Build Logic for 
  //    - grabbing plant records by User ID
  //    - storing plant data in Plant components
  //    - storing Plant components as list in PlantBoard
  // - Build form for posting new plant record
  // - Build function for deleting plant record
  // - Build function for editing plant record



  return (
    <div className="App">
      <header className="App-header">
        {/* Header Component */}
        <Header 
        demoUserData={demoUserData}
        setActiveUserCallbackFunction={setActiveUser}
        activeUser={activeUser}
        />
      </header>
      <div className="body">
        {/* What lives here? */}
        {/* - AI Component */}
        <AIWitch />
        {/* - PlantBoard component */}
        <PlantBoard />
      </div>
    </div>
  );
}

export default App;
