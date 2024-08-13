import { createContext, useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import PlantBoard from "./components/plant_components/PlantBoard";
import NewPlantForm from "./components/plant_components/NewPlantForm";
import sproutIcon from "./sprout.png";
import AboutModal from "./components/AboutModal";

import axios from "axios";
import Modal from "./components/Modal";

export const UserContext = createContext(null);

function App() {
  const URL = process.env.REACT_APP_BACKEND_URL;

  // STATE VARIABLES:
  // User variables
  const [demoUserData, setDemoUserData] = useState([]);
  const [activeUser, setActiveUser] = useState({ firstName: "Guest" });

  // Plant Variables
  const [activeUsersPlants, setActiveUsersPlants] = useState([]);
  // stored by {id: {daysUntilNextWatering: 0, daysUntilNextRepotting: 0}}
  const [
    plantsWateringAndRepottingSchedule,
    setPlantsWateringAndRepottingSchedule,
  ] = useState({});

  //AI Witch variable
  const [aiResponse, setAiResponse] = useState(null);

  const [activeUserPlantComponents, setActiveUserPlantComponents] = useState(
    []
  );
  const [displayPlantsComponents, setDisplayPlantsComponents] = useState(false);

  // Modal variables
  const [showModal, setShowModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);

  // USER FUNCTIONALITY:
  // Get all users - TODO: deprecate when userauth is added
  const fetchAllUsers = () => {
    axios
      .get(`${URL}/api/v1/users/all`)
      .then((res) => {
        setDemoUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(fetchAllUsers, []);

  // PLANT FUNCTIONALITY:
  // Get all plants by user ID
  const fetchAllPlantsByUserId = (userId) => {
    axios
      .get(`${URL}/api/v1/plants/users/${userId}`)
      .then((res) => {
        setActiveUsersPlants(res.data);
        // console.log("plants:", res.data);
        buildScheduleFromPlants(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const buildScheduleFromPlants = (plants) => {
    // console.log("plants", plants)
    const newPlantsWateringAndRepottingSchedule = {};
    for (const plant of plants) {
      // console.log("plant", plant)
      newPlantsWateringAndRepottingSchedule[plant.id] = calculateDaysUntilNextWateringRepotting(plant)
    }

    // console.log("newPlantData", newPlantsWateringAndRepottingSchedule)
    setPlantsWateringAndRepottingSchedule(newPlantsWateringAndRepottingSchedule);
  }

  // Add new plant - sets plant to plant list and updates watering and repotting schedule
  const createNewPlantForSelectedUser = (data) => {
    axios
      .post(`${URL}/api/v1/plants/users/${activeUser.id}`, data)
      .then((res) => {
        // fetchWateringAndRepottingScheduleByPlant(res.data.id);
        const plantWateringRepottingSchedule = calculateDaysUntilNextWateringRepotting(res.data);
        const newWateringRepottingSchedule = createWateringAndRepottingEntry(res.data.id)
        newWateringRepottingSchedule[res.data.id] = plantWateringRepottingSchedule;
        setPlantsWateringAndRepottingSchedule(newWateringRepottingSchedule);

        alert(`Welcome, ${res.data.name}!`);
        const newPlantList = [];
          for (const plant of activeUsersPlants) {
            newPlantList.push(plant);
          }
          newPlantList.push(res.data);

          setActiveUsersPlants(newPlantList);
        // Delay timer included to allow for watering and repotting schedule to be updated
        // setTimeout(() => {
        //   const newPlantList = [];
        //   for (const plant of activeUsersPlants) {
        //     newPlantList.push(plant);
        //   }
        //   newPlantList.push(res.data);

        //   setActiveUsersPlants(newPlantList);
        // }, 500);
      })
      .catch((error) => {
        console.log(error, "create plant failed.");
      });
  };

  // Update plant name, common name and description
  const updatePlant = (plantId, updatedPlantData) => {
    axios
      .patch(`${URL}/api/v1/plants/updates/${plantId}`, updatedPlantData)
      .then((res) => {
        const updatedPlantList = [];
        for (const plant of activeUsersPlants) {
          if (plant.id === plantId) {
            plant.name = updatedPlantData.name;
            plant.description = updatedPlantData.description;
            plant.commonName = updatedPlantData.commonName;
          }
          updatedPlantList.push(plant);
        }
        setActiveUsersPlants(updatedPlantList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Get all watering and repotting schedules by user ID - shape: {plantId: {wateringDate: n, repottingDate: n}}
  // const fetchWateringAndRepottingScheduleByUserId = (userId) => {
  //   axios
  //     .get(`${URL}/api/v1/plants/users/${userId}/plants_schedule`)
  //     .then((res) => {
  //       // console.log("watering and repotting days: ", res.data)
  //       setPlantsWateringAndRepottingSchedule(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // Get and Set Watering and Repotting Interval - shape: {daysUntilNextWatering : n, daysUntilNextRepotting : n}
  // const fetchWateringAndRepottingScheduleByPlant = async (plantId) => {
  //   await axios
  //     .get(`${URL}/api/v1/plants/${plantId}/schedule`)
  //     .then((res) => {
  //       // console.log("plant id:", plantId, "res.data:", res.data)
  //       const newPlantsWateringAndRepottingSchedule =
  //         createWateringAndRepottingEntry(plantId);
  //       newPlantsWateringAndRepottingSchedule[plantId] = res.data;

  //       // console.log("new Plant Schedule", newPlantsWateringAndRepottingSchedule)
  //       setPlantsWateringAndRepottingSchedule(
  //         newPlantsWateringAndRepottingSchedule
  //       );
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // calculate days until next watering or repotting - returns { daysUntilNextWatering : n, daysUntilNextRepotting : n }
  const calculateDaysUntilNextWateringRepotting = (plant) => {
    const todaysDate = new Date();

    const prevWaterDate = new Date(plant.waterDate);
    const prevRepotDate = new Date(plant.repotDate);
    const waterInterval = plant.waterInterval;
    const repotInterval = plant.repotInterval;

    const daysUntilNextWatering = waterInterval - Math.floor(
      (todaysDate - prevWaterDate) / (1000 * 60 * 60 * 24)
    );
    const daysUntilNextRepotting = repotInterval - Math.floor(
      (todaysDate - prevRepotDate) / (1000 * 60 * 60 * 24)
    );

    return {daysUntilNextWatering : daysUntilNextWatering, daysUntilNextRepotting : daysUntilNextRepotting};
  };

  // helper - Adds empty dictionary entry for plantId - shape: {plantId: {}}
  const createWateringAndRepottingEntry = (plantId) => {
    const newPlantsWateringAndRepottingSchedule =
      plantsWateringAndRepottingSchedule;
    newPlantsWateringAndRepottingSchedule[plantId] = {};

    return newPlantsWateringAndRepottingSchedule;
  };

  // Updates watering and repotting dates in frontend
  // maybe can be deprecated since we're handling this in Plant? Triple check my spaghetti code - June
  const updateWateringAndRepottingEntry = (plantId, endPoint, interval) => {
    const newPlantsWateringAndRepottingSchedule =
      plantsWateringAndRepottingSchedule;

    if (endPoint === "water-date") {
      newPlantsWateringAndRepottingSchedule[plantId]["daysUntilNextWatering"] =
        interval;
      setPlantsWateringAndRepottingSchedule(
        newPlantsWateringAndRepottingSchedule
      );
    } else if (endPoint === "repot-date") {
      newPlantsWateringAndRepottingSchedule[plantId]["daysUntilNextRepotting"] =
        interval;
      setPlantsWateringAndRepottingSchedule(
        newPlantsWateringAndRepottingSchedule
      );
    }
  };

  // Update plant when watered or repotted
  const updatePlantWateredOrRepotted = (plantId, endPoint) => {
    axios.patch(`${URL}/api/v1/plants/${plantId}/${endPoint}`).then(() => {
      console.log("old plant schedule", plantsWateringAndRepottingSchedule);
      const newPlantList = [];
      for (const plant of activeUsersPlants) {
        if (plant.id === plantId) {
          if (endPoint === "water-date") {
            plant.waterDate = new Date().toString();
            updateWateringAndRepottingEntry(
              plantId,
              endPoint,
              plant.waterInterval
            );
          } else if (endPoint === "repot-date") {
            plant.repotDate = new Date().toString();
            updateWateringAndRepottingEntry(
              plantId,
              endPoint,
              plant.repotInterval
            );
          }
        }
        newPlantList.push(plant);
      }
      setActiveUsersPlants(newPlantList);
    });
  };

  // Delete plant
  const deletePlant = (plantId) => {
    axios
      .delete(`${URL}/api/v1/plants/delete/${plantId}`)
      .then((res) => {
        const newPlantList = [];
        let deletedPlantName = "";
        for (const plant of activeUsersPlants) {
          if (plant.id !== plantId) {
            newPlantList.push(plant);
          } else {
            deletedPlantName = plant.name;
          }
        }
        setActiveUsersPlants(newPlantList);
        alert(`Goodbye, ${deletedPlantName} :(`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // AI FUNCTIONALITY:
  // Call WitchAI
  const askWitchAI = (prompt) => {
    const userId = activeUser.id;

    axios
      .post(`${URL}/api/v1/witch_ai/ask_witch/${userId}`, { prompt })
      .then((res) => {
        setAiResponse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Handle Modal show up
  const handleCreateNewPlant = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowAboutModal = () => {
    setShowAboutModal(!showAboutModal);
  }

  return (
    <div>
      <div id="App">
        <Modal show={showAboutModal} onClose={handleShowAboutModal}>
          <AboutModal></AboutModal>
        </Modal>
        <header className="big-section">
          {/* Header Component */}
          <Header
            demoUserData={demoUserData}
            activeUser={activeUser}
            aiResponse={aiResponse}
            setActiveUserCallbackFunction={setActiveUser}
            fetchAllPlantsByUserIdCallbackFunction={fetchAllPlantsByUserId}
            setActiveUsersPlantsCallbackFunction={setActiveUsersPlants}
            setDisplayPlantsComponentsCallbackFunction={
              setDisplayPlantsComponents
            }
            askWitchAICallbackFunction={askWitchAI}
            setPlantsWateringAndRepottingScheduleCallbackFunction={setPlantsWateringAndRepottingSchedule}
          />
        </header>
        {activeUser.id && (
          <div id="App-body">
            {/* - Create New Plant component (using Modal component) */}
            <button className="add-new-plant-btn" onClick={handleCreateNewPlant}>
              <img
                className="sprout-icon"
                src={sproutIcon}
                alt="new-sprout-icon"
              />
              Add New Plant
            </button>
            <Modal show={showModal} onClose={handleCloseModal}>
              <NewPlantForm
                createNewPlantForSelectedUserCallbackFunction={
                  createNewPlantForSelectedUser
                }
                handleCloseModalCallbackFunction={handleCloseModal}
              />
            </Modal>
            {/* - PlantBoard component */}
            <PlantBoard
              activeUsersPlants={activeUsersPlants}
              plantsWateringAndRepottingSchedule={
                plantsWateringAndRepottingSchedule
              }
              activeUserPlantComponents={activeUserPlantComponents}
              displayPlantsComponents={displayPlantsComponents}
              deletePlantCallbackFunction={deletePlant}
              updatePlantWateredOrRepottedCallbackFunction={
                updatePlantWateredOrRepotted
              }
              updatePlantCallbackFunction={updatePlant}
              setActiveUserPlantComponentsCallbackFunction={
                setActiveUserPlantComponents
              }
            />
          </div>
        )}
      </div>
      {activeUser.id && (
        <div id="footer">
          <div id="footer-1">
            ©2024 Plant Witch Team
          </div>
          <div>
            <button id="about-btn" onClick={()=>{handleShowAboutModal()}}>About</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
