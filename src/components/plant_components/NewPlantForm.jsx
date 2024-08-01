import React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./NewPlantForm.css"
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import axios from "axios";

/* eslint-env jest */

const getListOfAllPlants = async () => {
  try {
    const response = await axios.get(`https://perenual.com/api/species-list?key=sk-y6bd66a7fd00b2eb36377`);
    console.log("HEre",response.data.common_name)

    return response.data;
  } catch (error){
    console.log("Error fetching all plants")
    return [];
  }

};

// const plantsList = [
//   {
//     name: 'Aloe Vera',
//     description: 'A succulent plant species of the genus Aloe.',
//   },
//   {
//     name: 'Spider Plant',
//     description: 'An evergreen perennial with long, thin leaves.',
//   },
//   {
//     name: 'Snake Plant',
//     description: 'A species of flowering plant in the family Asparagaceae.',
//   }
// ];

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value, plantsList) {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('\\b' + escapedValue, 'i');
  console.log("LIST", plantsList)
  return plantsList.filter(plant => regex.test(plant.common_name));
}

function getSuggestionValue(suggestion) {
  return suggestion.common_name;
}

function renderSuggestion(suggestion, { query }) {
  const suggestionText = suggestion.common_name;
  const matches = AutosuggestHighlightMatch(suggestionText, query);
  const parts = AutosuggestHighlightParse(suggestionText, matches);

  return (
    <span className="suggestion-content">
      <span className="name">
        {
          parts.map((part, index) => {
            const className = part.highlight ? 'highlight' : null;

            return (
              <span className={className} key={index}>{part.text}</span>
            );
          })
        }
      </span>
    </span>
  );
}

const PlantForm = (props) => {
  const defaultPlantsData = { name: "", description: "", lastWatered: "", waterFrequency: "", lastRepoted: "", repotFrequency: ""};
  const [plantsData, setPlantsData] = useState(defaultPlantsData);
  const [suggestions, setSuggestions] = useState([]);
  const [plantsList, setPlantsList] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      const plants = await getListOfAllPlants();
      // const newPlants = plants
      setPlantsList(plants);
      console.log("PLANTS LIST", plantsList);
    };
    fetchPlants();
  }, []);

  const onSuggestionsFetchRequested = ({ value }) => {
    
    setSuggestions(getSuggestions(value, plantsList));
    
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "Type a plant name",
    value: plantsData.name,
    onChange: (event, { newValue }) => {
      setPlantsData((prevPlantsData) => ({
        ...prevPlantsData,
        name: newValue,
      }));
    },
    name: 'name'
  };

  return (
    <form onSubmit={handleFormSubmission} className="plant-submit-form">
      <label>Common name</label>
      <Autosuggest 
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        // className="name-input"
        // type="text"
        // required
        // name="commonName"
        // maxLength={40}
        // placeholder="Type a plant name"
        // value={plantsData.commonName}
        // onChange={handleFormInput}
      />
      {/* <label>Nickname</label>
      <input
        className="name-input"
        type="text"
        required
        name="name"
        maxLength={40}
        placeholder="Name"
        value={plantsData.name}
        onChange={handleFormInput}
      ></input> */}
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
      <label>Last Watered</label>
        <input
          className="lastWatered-input"
          type="date"
          required
          name="lastWatered"
          maxLength={40}
          placeholder="Last watered"
          value={plantsData.lastWatered}
          onChange={handleFormInput}
      ></input>
      <label>Frequency</label>
        <input
          className="waterFrequency-input"
          type="number"
          required
          name="waterFrequency"
          maxLength={40}
          placeholder="Water Frequency"
          value={plantsData.waterFrequency}
          onChange={handleFormInput}
      ></input>
      <label>Last Repoted</label>
      <input
          className="lastRepoted-input"
          type="date"
          required
          name="lastRepoted"
          maxLength={40}
          placeholder="Last repoted"
          value={plantsData.lastRepoted}
          onChange={handleFormInput}
      ></input>
      <label>Frequency</label>
        <input
          className="repotFrequency-input"
          type="number"
          required
          name="repotFrequency"
          maxLength={40}
          placeholder="Repot Frequency"
          value={plantsData.repotFrequency}
          onChange={handleFormInput}
      ></input>
      <input className="button" type="submit" value="Submit" />
    </form>
  );
}

  const handleFormInput = (event) => {
    // const domNode = event.target;
    // const message = domNode.name;
    // const value = domNode.value;
    // const newPlantsData = { ...plantsData };
    // newPlantsData[message] = value;
    // setPlantsData(newPlantsData);
  };

  const handleFormSubmission = (event) => {
    // event.preventDefault();
    // props.handleFormSubmission(plantsData);
    // setPlantsData(defaultPlantsData);
  };



  PlantForm.propTypes = {
  handleFormSubmission: PropTypes.func.isRequired,
};

export default PlantForm;