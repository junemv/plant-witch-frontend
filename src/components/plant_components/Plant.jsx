import React, { useEffect } from "react";

const Plant = (props) => {
  const key = props.key;
  const id = props.id;
  const name = props.name;
  const image = props.image;
  const description = props.description;
  const waterDate = props.waterDate;
  const repotDate = props.repotDate;
  const waterInterval = props.waterInterval;
  const repotInterval = props.repotInterval;
  const plantWateringAndRepottingIntervals = props.plantWateringAndRepottingIntervals;

  // callback functions
  const deletePlant = props.deletePlantCallbackFunction; // TODO - implement with edit and delete functionality
  const updatePlantWateredOrRepotted = props.updatePlantWateredOrRepottedCallbackFunction;

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`) === true) {
      deletePlant(id);
    }
  }

  return (
    <div>
      <li key={key}>
        <h3>Name: {name}</h3>
        <img src={image} alt={`${name} pic`} />
        <p>Description: {description}</p>
        {/* <p>Water Date: {waterDate}</p> 
        <p>Repot Date: {repotDate}</p>
        <p>Water Interval: {waterInterval}</p>
        <p>Repot Interval: {repotInterval}</p> */}
        {/* <p>Water Me in: {plantWateringAndRepottingIntervals[id].daysUntilNextWatering} days</p>
        <p>Repot Me in: {plantWateringAndRepottingIntervals[id].daysUntilNextRepotting} days</p> */}
        <button onClick={() => handleDelete(id)}>Delete</button>
      </li>
    </div>
  );
}

export default Plant;