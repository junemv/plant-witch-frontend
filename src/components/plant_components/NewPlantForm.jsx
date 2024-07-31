import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import "./NewPlantForm.css"
/* eslint-env jest */



const PlantForm = (props) => {
  const defaultPlant = { name: "", description: "", lastWatered: "", waterFrequency: "", lastRepoted: "", repotFrequency: ""};
  const [plants, setPlants] = useState(defaultPlant);

  return (
    <form onSubmit={handleFormSubmission} className="plant-submit-form">
      <label>Name</label>
      <input
        className="name-input"
        type="text"
        required
        name="name"
        maxLength={40}
        placeholder="Name"
        value={plants.name}
        onChange={handleFormInput}
      ></input>
        <input
          className="description-input"
          type="text"
          name="description"
          maxLength={40}
          placeholder="Description"
          value={plants.description}
          onChange={handleFormInput}
      ></input>
        <input
          className="lastWatered-input"
          type="date"
          required
          name="lastWatered"
          maxLength={40}
          placeholder="Last watered"
          value={plants.lastWatered}
          onChange={handleFormInput}
      ></input>
        <input
          className="waterFrequency-input"
          type="number"
          required
          name="waterFrequency"
          maxLength={40}
          placeholder="Water Frequency"
          value={plants.waterFrequency}
          onChange={handleFormInput}
      ></input>
      <input
          className="lastRepoted-input"
          type="date"
          required
          name="lastRepoted"
          maxLength={40}
          placeholder="Last repoted"
          value={plants.lastRepoted}
          onChange={handleFormInput}
      ></input>
        <input
          className="repotFrequency-input"
          type="number"
          required
          name="repotFrequency"
          maxLength={40}
          placeholder="Repot Frequency"
          value={plants.repotFrequency}
          onChange={handleFormInput}
      ></input>
      <input className="button" type="submit" value="Submit" />
    </form>
  );
}

  const handleFormInput = (event) => {
    const domNode = event.target;
    const message = domNode.name;
    const value = domNode.value;
    const newPlants = { ...plants };
    newPlants[message] = value;
    setPlants(newPlants);
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();
    props.handleFormSubmission(plants);
    setPlants(defaultPlant);
  };



  PlantForm.propTypes = {
  handleFormSubmission: PropTypes.func.isRequired,
};

export default PlantForm;