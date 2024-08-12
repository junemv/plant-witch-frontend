import React from "react";

const PlantsListForAI = (props) => {
    const activeUsersPlants = props.activeUsersPlants

for (const plant of activeUsersPlants) {
    const plantName = plant.name;
    const image = plant.image;
    return (
        <div>
            <p>{plantName}</p>
            <img src={image} alt="plant-image"></img>
        </div>
    )
    
}
}


export default PlantsListForAI;