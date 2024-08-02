import React from "react";
import Plant from './Plant';

const PlantBoard = (props) => {
  const activeUsersPlants = props.activeUsersPlants;
  const plantWateringAndRepottingIntervals= props.plantWateringAndRepottingIntervals

  // callback functions
  const fetchPlantById = props.fetchPlantByIdCallbackFunction;
  const deletePlantCallbackFunction = props.deletePlantCallbackFunction;
  const updatePlantWateredOrRepottedCallbackFunction = props.updatePlantWateredOrRepottedCallbackFunction;

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
        />
      )
    }
  }


  return (
    <div>
      <h1>Plant Board</h1>
      <ul>{activeUsersPlantComponents}</ul>
    </div>
  );
}

export default PlantBoard;