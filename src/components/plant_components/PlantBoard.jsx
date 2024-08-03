import React, { useState } from "react";
import Plant from './Plant';
import NewPlantForm from './NewPlantForm';

const PlantBoard = (props) => {
  const activeUsersPlants = props.activeUsersPlants;
  const plantsWateringAndRepottingSchedule= props.plantsWateringAndRepottingSchedule

  // callback functions
  const deletePlantCallbackFunction = props.deletePlantCallbackFunction;
  const updatePlantWateredOrRepottedCallbackFunction = props.updatePlantWateredOrRepottedCallbackFunction;
  const updatePlantCallbackFunction = props.updatePlantCallbackFunction;
  const createNewPlantForSelectedUserCallbackFunction = props.createNewPlantForSelectedUserCallbackFunction;

  // state variables
  const [createPlant, setCreatePlant] = useState(false);

  // TODO - uncomment commonName prop once implemented in backend
  // Loop builds list of Plant components using active user's Plant state variable 
  const activeUsersPlantComponents = []
  if (activeUsersPlants) {
    for (const plant of activeUsersPlants) {
      activeUsersPlantComponents.push(
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
  }

  // Toggle create plant form
  const toggleCreatePlant = () => {
    setCreatePlant(!createPlant);
  }


  return (
    <div>
      <h1>My Plants</h1>
      {/* Plant Creation Form */}
      <button onClick={()=>{toggleCreatePlant()}}>Create Plant</button>
      {createPlant && <NewPlantForm 
        createNewPlantForSelectedUserCallbackFunction={createNewPlantForSelectedUserCallbackFunction}
        toggleCreatePlantCallbackFunction={toggleCreatePlant}
      />}
      {/* Active User's Plant List */}
      <ul>{activeUsersPlantComponents}</ul>
    </div>
  );
}

export default PlantBoard;