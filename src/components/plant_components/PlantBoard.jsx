import React, { useState } from "react";
import Plant from './Plant';
import NewPlantForm from './NewPlantForm';

const PlantBoard = (props) => {
  const activeUsersPlants = props.activeUsersPlants;
  const plantWateringAndRepottingIntervals= props.plantWateringAndRepottingIntervals

  // callback functions
  const fetchPlantById = props.fetchPlantByIdCallbackFunction;
  const deletePlantCallbackFunction = props.deletePlantCallbackFunction;
  const updatePlantWateredOrRepottedCallbackFunction = props.updatePlantWateredOrRepottedCallbackFunction;
  const updatePlantCallbackFunction = props.updatePlantCallbackFunction;
  const createNewPlantForSelectedUserCallbackFunction = props.createNewPlantForSelectedUserCallbackFunction;

  // state variables
  const [createPlant, setCreatePlant] = useState(false);

  // TODO - 
  const activeUsersPlantComponents = []
  if (activeUsersPlants) {
    for (const plant of activeUsersPlants) {
      activeUsersPlantComponents.push(
        <Plant 
          key={plant.id}
          id={plant.id}
          name={plant.name}
          image={plant.image}
          description={plant.description}
          waterDate={plant.waterDate}
          repotDate={plant.repotDate}
          waterInterval={plant.waterInterval}
          repotInterval={plant.repotInterval}
          plantWateringAndRepottingIntervals={plantWateringAndRepottingIntervals}
          deletePlantCallbackFunction={deletePlantCallbackFunction}
          updatePlantWateredOrRepottedCallbackFunction={updatePlantWateredOrRepottedCallbackFunction}
          updatePlantCallbackFunction={updatePlantCallbackFunction}
        />
      )
    }
  }

  const toggleCreatePlant = () => {
    setCreatePlant(!createPlant);
  }


  return (
    <div>
      <h1>Plant Board</h1>
      <button onClick={()=>{toggleCreatePlant()}}>Create Plant</button>
      {createPlant && <NewPlantForm 
        createNewPlantForSelectedUserCallbackFunction={createNewPlantForSelectedUserCallbackFunction}
      />}
      <ul>{activeUsersPlantComponents}</ul>
    </div>
  );
}

export default PlantBoard;