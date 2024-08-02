import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import "./NewPlantForm.css"
import axios from "axios";
import debounce from "lodash.debounce";

/* eslint-env jest */

const PlantForm = (props) => {
  const defaultPlantsData = { name: "", image: "", description: "", waterDate: "", waterInterval: "", repotDate: "", repotInterval: ""};
  const [plantsData, setPlantsData] = useState(defaultPlantsData);

  const handleFormInput = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const newPlantsData = { ...plantsData };
    newPlantsData[name] = value;
    if (name === "name") {
      await debouncedFindImageUrl(value);
    }
    setPlantsData(newPlantsData);
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();
    const { name, waterDate, waterInterval, repotDate, repotInterval } = plantsData;
    if (name && waterDate && waterInterval > 0 && repotDate && repotInterval > 0) {
        props.handleFormSubmission(plantsData);
        setPlantsData(defaultPlantsData);
    } else {
        alert('Please fill in all required fields.Water and Repot intervals should be more than 0.');
    }
  };

  const findImageUrl = async (plantName) => {
    try {
      const response = await axios.get(`https://perenual.com/api/species-list?key=sk-FByX66acedc92197c6409&q=${plantName}`);
      const plantDetails = response.data.data[0];
      const imageURL = plantDetails.default_image.medium_url;
      // console.log("Plant", plantDetails.common_name);
      console.log("IM HERE 2", imageURL);;
      setPlantsData((prevData) => ({ ...prevData, image: imageURL }));
      
      } catch (error) {
        console.error("Error fetching plants data:", error);
    };
  };

  const debouncedFindImageUrl = useCallback(debounce(findImageUrl, 5000), []);


  return (
    <form onSubmit={handleFormSubmission} className="plant-submit-form">
      <div className="input-container">
      <label>Name</label>
      <input
        className="name-input"
        type="text"
        required
        name="name"
        maxLength={40}
        placeholder="Name"
        value={plantsData.name}
        onChange={handleFormInput}
      ></input>
      </div>
      <div className="input-container">
      <label>Description</label>
        <input
          className="description-input"
          type="text"
          name="description"
          maxLength={40}
          placeholder="Description"
          value={plantsData.description}
          onChange={handleFormInput}
      ></input>
      </div>
      <div className="input-container">
      <label>Last Watered</label>
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
      <label>Frequency</label>
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
      <label>Last Repoted</label>
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
      <label>Frequency</label>
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