import React, { useState } from "react";
import Plant from './Plant';
import NewPlantForm from './NewPlantForm';
import './PlantBoard.css';

const PlantBoard = (props) => {
  const activeUsersPlants = props.activeUsersPlants;
  const plantsWateringAndRepottingSchedule= props.plantsWateringAndRepottingSchedule
  const activeUserPlantComponents = props.activeUserPlantComponents;
  const displayPlantsComponents = props.displayPlantsComponents

  // callback functions
  const deletePlantCallbackFunction = props.deletePlantCallbackFunction;
  const updatePlantWateredOrRepottedCallbackFunction = props.updatePlantWateredOrRepottedCallbackFunction;
  const updatePlantCallbackFunction = props.updatePlantCallbackFunction;
  const createNewPlantForSelectedUserCallbackFunction = props.createNewPlantForSelectedUserCallbackFunction;
  const setActiveUserPlantComponents = props.setActiveUserPlantComponentsCallbackFunction;

  // state variables
  const [createPlant, setCreatePlant] = useState(false);

  // TODO - uncomment commonName prop once implemented in backend
  // Loop builds list of Plant components using active user's Plant state variable 

  // TODO - I'm thinking instead of rendering with this loop I will build a handlePlantComponents function
  // that I can call on login that sets the plant components
  const handlePlantComponents = () => {
    
  }
  setTimeout(() => {
    const newActiveUsersPlantComponents = []
  
    if (activeUsersPlants) {
      for (const plant of activeUsersPlants) {
        console.log("IN THE LOOP")
        newActiveUsersPlantComponents.push(
          <Plant 
            key={plant.id}
            id={plant.id}
            name={plant.name}
            // commonName={plant.commonName}
            image={plant.image}
            description={plant.description}
            waterDate={plant.waterDate}
            repotDate={plant.repotDate}
            waterInterval={plant.waterInterval}
            repotInterval={plant.repotInterval}
            plantsWateringAndRepottingSchedule={plantsWateringAndRepottingSchedule}
            deletePlantCallbackFunction={deletePlantCallbackFunction}
            updatePlantWateredOrRepottedCallbackFunction={updatePlantWateredOrRepottedCallbackFunction}
            updatePlantCallbackFunction={updatePlantCallbackFunction}
          />
        )
      }
      setActiveUserPlantComponents(newActiveUsersPlantComponents)
    } else {
      setActiveUserPlantComponents([])
    }
  }, 500)
  

  // Toggle create plant form
  const toggleCreatePlant = () => {
    setCreatePlant(!createPlant);
  }


  return (
    <div id="plant-board">
      <h1>My Plants</h1>
      {/* Plant Creation Form */}
      <button onClick={()=>{toggleCreatePlant()}}>Create Plant</button>
      {createPlant && <NewPlantForm 
        createNewPlantForSelectedUserCallbackFunction={createNewPlantForSelectedUserCallbackFunction}
        toggleCreatePlantCallbackFunction={toggleCreatePlant}
      />}
      {/* Active User's Plant List */}
      {displayPlantsComponents && <ul id="plant-list">{activeUserPlantComponents}</ul>}
    </div>
  );
}

export default PlantBoard;