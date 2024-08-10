import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import "./NewPlantForm.css"
import axios from "axios";
import debounce from "lodash.debounce";

/* eslint-env jest */

const PlantForm = (props) => {
  const createNewPlantForSelectedUser = props.createNewPlantForSelectedUserCallbackFunction
  const handleCloseModal = props.handleCloseModalCallbackFunction;

  const defaultPlantsData = { 
    name: "", 
    commonName: "",
    image: "", 
    description: "", 
    waterDate: "", 
    waterInterval: "", 
    repotDate: "", 
    repotInterval: ""};
  const [plantsData, setPlantsData] = useState(defaultPlantsData);

  const handleFormInput = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const newPlantsData = { ...plantsData };
    newPlantsData[name] = value;
    if (name === "commonName") {
      await debouncedFindImageUrl(value);
    }
    setPlantsData(newPlantsData);
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();
    const { name, commonName, waterDate, waterInterval, repotDate, repotInterval } = plantsData;
    if (name && waterDate && waterInterval > 0 && repotDate && repotInterval > 0) {
        createNewPlantForSelectedUser(plantsData);
        setPlantsData(defaultPlantsData);
        handleCloseModal();
    } else {
        alert('Please fill in all required fields.Water and Repot intervals should be more than 0.');
    }
  };

  const findImageUrlAndCommonName = async (plantName) => {
    try {
      const response = await axios.get(`https://perenual.com/api/species-list?key=sk-FByX66acedc92197c6409&q=${plantName}`);
      const plantDetails = response.data.data[0];
      const imageURL = plantDetails.default_image.small_url;
      const commonNameFetched = plantDetails.common_name;
      // console.log("Plant", plantDetails);
      // console.log("Photo", imageURL);
      if (imageURL !== "https://perenual.com/storage/image/upgrade_access.jpg") {
        setPlantsData((prevData) => ({ ...prevData, image: imageURL }));
      }
      setPlantsData((prevData) => ({ ...prevData, commonName: commonNameFetched }));
      } catch (error) {
        console.error("Error fetching plants data:", error);
        if (error === TypeError) {
          setPlantsData((prevData) => ({ ...prevData, commonName: plantsData.commonName }));
        }
    };
  };

  const debouncedFindImageUrl = useCallback(debounce(findImageUrlAndCommonName, 5000), []);


  return (
    <form onSubmit={handleFormSubmission} className="plant-submit-form">
      <h1>Create New Plant</h1>
      <div className="input-container">
      <label>Nickname: </label>
      <input
        className="input-item name-input"
        type="text"
        required
        name="name"
        maxLength={40}
        placeholder="Mr. Planty McPlantface, Kevin..."
        value={plantsData.name}
        onChange={handleFormInput}
      ></input>
      </div>
      <div className="input-container">
      <label>Common Name: </label>
      <input
        className=" input-item commonName-input"
        type="text"
        required
        name="commonName"
        maxLength={40}
        placeholder="Snake Plant, Monstera Deliciosa..."
        value={plantsData.commonName}
        onChange={handleFormInput}
      ></input>
      </div>
      <div className="input-container">
      <label>Description: </label>
        <input
          className="input-item description-input"
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
          className="input-item lastWatered-input"
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
          className="input-item waterFrequency-input"
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
          className="input-item lastRepoted-input"
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
          className="input-item repotFrequency-input"
          type="number"
          required
          name="repotInterval"
          placeholder="Days interval"
          value={plantsData.repotInterval}
          onChange={handleFormInput}
      ></input>
      </div>
      <div className="buttons">
        <input className="button" type="submit" value="Submit" />
        <button type="button" className="cancel-button" onClick={handleCloseModal}>Cancel</button>      
      </div>
    </form>
  );
}

  PlantForm.propTypes = {
  handleFormSubmission: PropTypes.func.isRequired,
};

export default PlantForm;