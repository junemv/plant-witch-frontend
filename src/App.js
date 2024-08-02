import { createContext, useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import PlantBoard from "./components/plant_components/PlantBoard";
import AIWitch from "./components/witch_components/AIWitch";
import NewPlantForm from "./components/plant_components/NewPlantForm";

import axios from "axios";

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
  const [activeUsersPlants, setActiveUsersPlants] = useState([]);
  // stored by {id: {daysUntilNextWatering: 0, daysUntilNextRepotting: 0}}
  const [plantWateringAndRepottingIntervals, setPlantWateringAndRepottingIntervals] = useState({});

  // USER FUNCTIONALITY:
  // Get all users - TODO: deprecate when userauth is added
  const fetchAllUsers = () => {
    axios
      .get(`${URL}/api/v1/users/all`)
      .then((res) => {
        setDemoUserData(res.data)
      })
      .catch((err) => {
        console.log(err)
    })
  }

  useEffect(fetchAllUsers, []);

  // PLANT FUNCTIONALITY:
  // Get all plants by user ID
  const fetchAllPlantsByUserId = (userId) => {
    axios
      .get(`${URL}/api/v1/plants/users/${userId}`)
      .then((res) => {
        setActiveUsersPlants(res.data);
        console.log("res.data", res.data);
        // createWateringAndRepottingEntry(res.data);

      })
      .catch((err) => {
        console.log(err)
    })
  }

  // Get one plant by ID
  const fetchPlantById = (plantId) => {
    axios
      .get(`${URL}/api/v1/plants/${plantId}`)
      .then((res) => {
        console.log("res.data", res.data)
      })
      .catch((err) => {
        console.log(err)
    })
  }

  // Add new plant
  const createNewPlantForSelectedUser = (data) => {
    axios
      .post(`${URL}/plants/users/1`, data)
      .then((response) => {
        // getPlantsForUser(activeUser.id);
        console.log("It worked!");
      })
      .catch((error) => {
        console.log(error, "create plant failed.");
      });
  };
  
  // Update plant name and description
  // TODO - Diana is building backend route
  const updatePlant = (plantId, updatedPlantData) => {
    // TODO - Uncomment once backend route is set up
    // axios
    //   .patch(`${URL}/api/v1/plants/${plantId}`, updatedPlantData)
    //   .then((res) => {
    //     // Frontend plant update logic goes here
    //   })
    //   .catch((err) => {
    //     console.log(err)
    // })
    const updatedPlantList = []
    for (const plant of activeUsersPlants) {
      if (plant.id === plantId) {
        plant.name = updatedPlantData.name;
        plant.description = updatedPlantData.description;
      }
      updatedPlantList.push(plant);
    }
    setActiveUsersPlants(updatedPlantList);
  }

  // Get Watering and Repotting Interval {daysUntilNextWatering : n, daysUntilNextRepotting : n}
  // TODO - may need to be refactored or deprecated once get all backend route is finished
  const fetchWateringAndRepottingInterval = async (plantId) => {
    await axios 
      .get(`${URL}/api/v1/plants/${plantId}/schedule`)
      .then((res) => {
        console.log("plant id:", plantId, "res.data:", res.data)
        return res.data;
      })
      .catch((err) => {
        console.log(err)
    })
  }
  
  // helper - Set watering and repotting interval by id
  // TODO - may need to be refactored or deprecated once get all backend route is finished
  const createWateringAndRepottingEntry = (res) => {
    const wateringAndRepottingEntry = {}
        for (const plant of res) {
          wateringAndRepottingEntry[plant.id] = fetchWateringAndRepottingInterval(plant.id);
        }
        console.log("THIS IS A WATERING AND REPOTTING ENTRY: ", wateringAndRepottingEntry)
        setPlantWateringAndRepottingIntervals(wateringAndRepottingEntry);
  }


  // Update plant when watered or repotted
    const updatePlantWateredOrRepotted = (plantId, endPoint) => {
      axios
        .patch(`${URL}/api/v1/plants/${plantId}/${endPoint}`)
        .then(()=>{
          const newPlantList = []
          for (const plant of activeUsersPlants) {
            if (plant.id === plantId) {
              if (endPoint === "water-date") {
                plant.waterDate = new Date().toString();
              } else if (endPoint === "repot-date") {
                plant.repotDate = new Date().toString();
              }
            }
            newPlantList.push(plant);
          }
        })
    }

  // Delete plant
  const deletePlant = (plantId) => {
    // TODO - Uncomment once backend route is set up
    // axios
    //   .delete(`${URL}/api/v1/plants/${plantId}`)
    //   .then((res) => {
    //     console.log("res.data", res.data)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    // })
    // TODO - move into .then condition once you have the delete route set up
    const newPlantList = []
    let deletedPlantName = "";
    for (const plant of activeUsersPlants) {
      if (plant.id !== plantId) {
        newPlantList.push(plant);
      } else {
        deletedPlantName = plant.name;
      }
    }
    setActiveUsersPlants(newPlantList);
    alert(`Goodbye, ${deletedPlantName} :(`)
  }


  // TODO -

  // Adrian Notes:
  // > State variables should live in app and be passed down.

  // Rough TODO Items:
  // - Build AI Functionality
  // - Build form for posting new plant record
  // - Build function for editing plant record



  return (
    <div className="App">
      <header className="App-header">
        {/* Header Component */}
        <Header 
        demoUserData={demoUserData}
        setActiveUserCallbackFunction={setActiveUser}
        activeUser={activeUser}
        fetchAllPlantsByUserIdCallbackFunction={fetchAllPlantsByUserId}
        />
      </header>
      <div className="body">
        {/* - AI Component */}
        <AIWitch />
        {/* - PlantBoard component */}
        <PlantBoard 
        activeUsersPlants={activeUsersPlants}
        plantWateringAndRepottingIntervals={plantWateringAndRepottingIntervals}
        fetchPlantByIdCallbackFunction={fetchPlantById}
        deletePlantCallbackFunction={deletePlant}
        updatePlantWateredOrRepottedCallbackFunction={updatePlantWateredOrRepotted}
        updatePlantCallbackFunction={updatePlant}
        />
      </div>
    </div>
  );
}

export default App;
