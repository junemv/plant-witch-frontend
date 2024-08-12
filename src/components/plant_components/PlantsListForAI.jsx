import React from "react";
import './PlantsListForAI.css';
import defaultImg from "../../assets/potted-plant-doodle.jpg";


const PlantsListForAI = (props) => {
    const activeUsersPlants = props.activeUsersPlants;
    const aiResponse = props.aiResponse;
    const saveWitchResponseToPlant = props.saveWitchResponseToPlantCallbackFunction;
    const handleCloseModal = props.handleCloseModalCallbackFunction;

    const handleSubmit = async (plantId) => {
        if (aiResponse && aiResponse.id) {
            try {
                await saveWitchResponseToPlant(plantId, aiResponse.id);
                handleCloseModal();
            } catch (error) {
                console.error("Failed to save response:", error);
            }
        } else {
            console.error("AI response is not available.");
        }
    };
    


    if (!activeUsersPlants || activeUsersPlants.length === 0) {
        return <p className="no-plants-msg">You don't have any plants yet!</p>;
    }

    return (
        <div className="btns-container">
            {activeUsersPlants.map((plant) => (
                <button className="plant-btn" key={plant.id} 
                    onClick={() => handleSubmit(plant.id)}>
                    <p className="plant-name">{plant.name}</p>
                    <img className="plant-image" src={plant.image || defaultImg} alt={`${plant.name}`} />
                </button>
            ))}
        </div>
    );
};



export default PlantsListForAI;