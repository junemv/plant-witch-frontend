import { createContext, useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import PlantBoard from "./components/plant_components/PlantBoard";
import AIWitch from "./components/witch_components/AIWitch";
import NewPlantForm from "./components/plant_components/NewPlantForm";

import axios from "axios";

export const UserContext = createContext(null);

function App() {
  const URL = process.env.REACT_APP_BACKEND_URL;

  // STATE VARIABLES:
  // User variables
  const [demoUserData, setDemoUserData] = useState([]);
  const [activeUser, setActiveUser] = useState({firstName: "Guest"});
  const [activeUsersPlants, setActiveUsersPlants] = useState([]);
  // stored by {id: {daysUntilNextWatering: 0, daysUntilNextRepotting: 0}}
  const [plantsWateringAndRepottingSchedule, setPlantsWateringAndRepottingSchedule] = useState({});

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

  // Add new plant - sets plant to plant list and updates watering and repotting schedule
  const createNewPlantForSelectedUser = (data) => {
    axios
      .post(`${URL}/api/v1/plants/users/${activeUser.id}`, data)
      .then((res) => {
        fetchWateringAndRepottingScheduleByPlant(res.data.id)
        console.log("plant data", res.data)

        alert(`Welcome, ${res.data.name}!`)
        // Delay timer included to allow for watering and repotting schedule to be updated
        setTimeout(() => {
          const newPlantList = [];
          for (const plant of activeUsersPlants) {
            newPlantList.push(plant);
          }
          newPlantList.push(res.data);

          setActiveUsersPlants(newPlantList);
        }, 1000)
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

  // Get all watering and repotting schedules by user ID - shape: {plantId: {wateringDate: n, repottingDate: n}}
  const fetchWateringAndRepottingScheduleByUserId = (userId) => {
    axios
      .get(`${URL}/api/v1/plants/users/${userId}/plants_schedule`)
      .then((res) => {
        // console.log("watering and repotting days: ", res.data)
        setPlantsWateringAndRepottingSchedule(res.data)
      })
      .catch((err) => {
        console.log(err)
    })
  }

  // Get Watering and Repotting Interval {daysUntilNextWatering : n, daysUntilNextRepotting : n}
  const fetchWateringAndRepottingScheduleByPlant = async (plantId) => {
    await axios 
      .get(`${URL}/api/v1/plants/${plantId}/schedule`)
      .then((res) => {
        // console.log("plant id:", plantId, "res.data:", res.data)
        const newPlantsWateringAndRepottingSchedule = createWateringAndRepottingEntry(plantId);
        newPlantsWateringAndRepottingSchedule[plantId] = res.data;

        // console.log("new Plant Schedule", newPlantsWateringAndRepottingSchedule)
        setPlantsWateringAndRepottingSchedule(newPlantsWateringAndRepottingSchedule);
      })
      .catch((err) => {
        console.log(err)
    })
  }
  
  // helper - Set watering and repotting interval by id
  // TODO - may need to be refactored or deprecated once get all backend route is finished
  const createWateringAndRepottingEntry = (plantId) => {
    const newPlantsWateringAndRepottingSchedule = plantsWateringAndRepottingSchedule;
    newPlantsWateringAndRepottingSchedule[plantId] = {};

    return newPlantsWateringAndRepottingSchedule
    
    // setPlantsWateringAndRepottingSchedule(newPlantWateringAndRepottingIntervals);
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
    axios
      .delete(`${URL}/api/v1/plants/delete/${plantId}`)
      .then((res) => {
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
      })
      .catch((err) => {
        console.log(err)
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* Header Component */}
        <Header 
        demoUserData={demoUserData}
        setActiveUserCallbackFunction={setActiveUser}
        activeUser={activeUser}
        fetchAllPlantsByUserIdCallbackFunction={fetchAllPlantsByUserId}
        fetchWateringAndRepottingScheduleByUserIdCallbackFunction={fetchWateringAndRepottingScheduleByUserId}
        />
      </header>
      { activeUser.id && (
        <div className="body">
        {/* - AI Component */}
        <AIWitch />
        {/* - PlantBoard component */}
        <PlantBoard 
        activeUsersPlants={activeUsersPlants}
        plantsWateringAndRepottingSchedule={plantsWateringAndRepottingSchedule}
        deletePlantCallbackFunction={deletePlant}
        updatePlantWateredOrRepottedCallbackFunction={updatePlantWateredOrRepotted}
        updatePlantCallbackFunction={updatePlant}
        createNewPlantForSelectedUserCallbackFunction={createNewPlantForSelectedUser}
        />
      </div>
      )}
    </div>
  );
}

export default App;
