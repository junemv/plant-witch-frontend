import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import "./NewPlantForm.css"

/* eslint-env jest */

// TODO - uncomment commonName variable and form entry once implemented in backend
const PlantForm = (props) => {
  // callback Functions
  const createNewPlantForSelectedUser = props.createNewPlantForSelectedUserCallbackFunction
  
  const defaultPlantsData = { 
    name: "", 
    // commonName: "",
    image: "", 
    description: "", 
    waterDate: "", 
    waterInterval: "", 
    repotDate: "", 
    repotInterval: ""};
  const [plantsData, setPlantsData] = useState(defaultPlantsData);

  const handleFormInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const newPlantsData = { ...plantsData };
    newPlantsData[name] = value;
    setPlantsData(newPlantsData);
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();
    const { name, /* commonName, */ waterDate, waterInterval, repotDate, repotInterval } = plantsData;
    if (name && waterDate && waterInterval > 0 && repotDate && repotInterval > 0) {
        createNewPlantForSelectedUser(plantsData);
        setPlantsData(defaultPlantsData);
    } else {
        alert('Please fill in all required fields.Water and Repot intervals should be more than 0.');
    }
  };

  return (
    <form onSubmit={handleFormSubmission} className="plant-submit-form">
      <div className="input-container">
      <label>Nickname: </label>
      <input
        className="name-input"
        type="text"
        required
        name="name"
        maxLength={40}
        placeholder="Mr. Planty McPlantface, Kevin..."
        value={plantsData.name}
        onChange={handleFormInput}
      ></input>
      </div>
      {/* <div className="input-container">
      <label>Common Name: </label>
      <input
        className="commonName-input"
        type="text"
        required
        name="common-name"
        maxLength={40}
        placeholder="Snake Plant, Monstera Deliciosa..."
        value={plantsData.commonName}
        onChange={handleFormInput}
      ></input>
      </div> */}
      <div className="input-container">
      <label>Description: </label>
        <input
          className="description-input"
          type="text"
          name="description"
          maxLength={40}
          placeholder="The happy plant by the window..."
          value={plantsData.description}
          onChange={handleFormInput}
      ></input>
      </div>
      <div className="input-container">
      <label>Last Watered: </label>
        <input
          className="lastWatered-input"
          type="date"
          required
          name="waterDate"
          placeholder="Last watered"
          value={plantsData.waterDate}
          onChange={handleFormInput}
      ></input>
      </div>
      <div className="input-container">
      <label>Frequency: </label>
        <input
          className="waterFrequency-input"
          type="number"
          required
          name="waterInterval"
          placeholder="Days interval"
          value={plantsData.waterInterval}
          onChange={handleFormInput}
      ></input>
      </div>
      <div className="input-container">
      <label>Last Repoted: </label>
      <input
          className="lastRepoted-input"
          type="date"
          required
          name="repotDate"
          placeholder="Last repoted"
          value={plantsData.repotDate}
          onChange={handleFormInput}
      ></input>
      </div>
      <div className="input-container">
      <label>Frequency: </label>
        <input
          className="repotFrequency-input"
          type="number"
          required
          name="repotInterval"
          placeholder="Days interval"
          value={plantsData.repotInterval}
          onChange={handleFormInput}
      ></input>
      </div>
      <input className="button" type="submit" value="Submit" />
    </form>
  );
}

  PlantForm.propTypes = {
  handleFormSubmission: PropTypes.func.isRequired,
};

export default PlantForm;