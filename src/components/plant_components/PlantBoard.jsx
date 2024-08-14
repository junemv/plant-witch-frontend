import React from "react";
import Plant from './Plant';
import './PlantBoard.css';

const PlantBoard = (props) => {
  const activeUsersPlants = props.activeUsersPlants;
  const plantsWateringAndRepottingSchedule= props.plantsWateringAndRepottingSchedule
  const activeUserPlantComponents = props.activeUserPlantComponents;
  const displayPlantsComponents = props.displayPlantsComponents;
  const aiPlantHistory = props.aiPlantHistory;
  const fetchAllWitchResponsesForPlantCallbackFunction = props.fetchAllWitchResponsesForPlantCallbackFunction;


  // callback functions
  const deletePlantCallbackFunction = props.deletePlantCallbackFunction;
  const updatePlantWateredOrRepottedCallbackFunction = props.updatePlantWateredOrRepottedCallbackFunction;
  const updatePlantCallbackFunction = props.updatePlantCallbackFunction;
  const setActiveUserPlantComponents = props.setActiveUserPlantComponentsCallbackFunction;
  const calculateDaysUntilNextWateringRepottingCallbackFunction = props.calculateDaysUntilNextWateringRepottingCallbackFunction;

  // Loop builds list of Plant components using active user's Plant state variable
  setTimeout(() => {
    const newActiveUsersPlantComponents = []
  
    if (activeUsersPlants) {
      for (const plant of activeUsersPlants) {
        newActiveUsersPlantComponents.push(
          <Plant
            plant={plant}
            key={plant.id}
            id={plant.id}
            name={plant.name}
            commonName={plant.commonName}
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
            aiPlantHistory={aiPlantHistory}
            fetchAllWitchResponsesForPlantCallbackFunction={fetchAllWitchResponsesForPlantCallbackFunction}
            calculateDaysUntilNextWateringRepottingCallbackFunction={calculateDaysUntilNextWateringRepottingCallbackFunction}
          />
        )
      }
      setActiveUserPlantComponents(newActiveUsersPlantComponents)
    } else {
      setActiveUserPlantComponents([])
    }
  }, 500)


  return (
    <div className="big-section">
      <h1 className="large-heading">My Plants</h1>
      {/* Active User's Plant List */}
      {displayPlantsComponents && <ul id="plant-list">{activeUserPlantComponents}</ul>}
    </div>
  );
}

export default PlantBoard;