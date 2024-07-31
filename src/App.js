import "./App.css";
import Header from "./components/Header";
import PlantBoard from "./components/plant_components/PlantBoard";
import AIWitch from "./components/witch_components/AIWitch";
import NewPlantForm from "./components/plant_components/NewPlantForm";
import { useEffect, useState } from "react";
import axios from "axios";
/* eslint-env jest */

function App() {
  // TODO -
  // - Build AI Functionality
  // - Build Logic for switching between users by ID
  // - Build Logic for
  //    - grabbing plant records by User ID
  //    - storing plant data in Plant components
  //    - storing Plant components as list in PlantBoard
  // - Build form for posting new plant record
  // - Build function for deleting plant record
  // - Build function for editing plant record
  // var selectedUser = 1;
  const [plantsData, setPlants] = useState([]);

  const createNewPlantForSelectedUser = (data) => {
    axios
      .post(`https://localhost:8080/api/v1/plants/users/1}`, data)
      .then((response) => {
        // getPlantsForUser(selectedUser);
        console.log("It worked!");
      })
      .catch((error) => {
        console.log(error, "create plant failed.");
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* What lives here? */}
        {/* - Header Component */}
        <Header />
        <h1>Hello</h1>
      </header>
      <body>
        {/* What lives here? */}
        {/* - AI Component */}
        <AIWitch />
        {/* - PlantBoard component */}
        <PlantBoard />
        <NewPlantForm handleFormSubmission={createNewPlantForSelectedUser} />
      </body>
    </div>
  );
}

export default App;
