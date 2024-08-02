import React, { useState } from "react";

// TODO - uncmment commonName in props once implemented
const Plant = (props) => {
  // props
  const key = props.key;
  const id = props.id;
  const name = props.name;
  // const commonName = props.commonName;
  const image = props.image;
  const description = props.description;
  const waterDate = props.waterDate;
  const repotDate = props.repotDate;
  const waterInterval = props.waterInterval;
  const repotInterval = props.repotInterval;
  const plantWateringAndRepottingIntervals = props.plantWateringAndRepottingIntervals;

  // callback functions
  const deletePlant = props.deletePlantCallbackFunction; // TODO - implement with edit and delete functionality
  const updatePlant = props.updatePlantCallbackFunction;
  const updatePlantWateredOrRepotted = props.updatePlantWateredOrRepottedCallbackFunction;

  // state variables
  const [editMode, setEditMode] = useState(false);
  const [updatedPlantFormFields, setUpdatedPlantFormFields] = useState({
    name: name,
    description: description
  });

  // Switches between edit and view modes
  const toggleEditMode = () => {
    setEditMode(!editMode);
  }

  // event handler for deleting plants
  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`) === true) {
      deletePlant(id);
    }
  }

  // FORM FUNCTIONS
  const onPlantNameChange = (e) => {
    setUpdatedPlantFormFields({
      ...updatedPlantFormFields,
      name: e.target.value
    })
  }

  const onPlantDescriptionChange = (e) => {
    setUpdatedPlantFormFields({
      ...updatedPlantFormFields,
      description: e.target.value
    })
  }

  const onPlantCommonNameChange = (e) => {
    setUpdatedPlantFormFields({
      ...updatedPlantFormFields,
      commonName: e.target.value
    })
  }

  const onSubmit = (e) => {
    console.log("onSubmit")
    e.preventDefault();
    updatePlant(id, updatedPlantFormFields);
    toggleEditMode(!editMode);
  }

  const preventEnterSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
    };
  }

  return (
    <div>
      <li key={key}>
        <img src={image} alt={`${name} pic`} />
        { !editMode && (
          <div>
            <h2>Nickname: {name}</h2>
            {/* TODO - uncomment Common Name once implemented */}
            {/* <h3>Common Name: {commonName}</h3> */}
            <p>Description: {description}</p>
          </div>
        )}
        { editMode && (
          <form onSubmit={onSubmit} onKeyDown={preventEnterSubmit}>
            <div>
              <h2>
                Name:
                <input name="name"
                value={updatedPlantFormFields.name}
                placeholder="Mr. Planty McPlantface, Kevin..." 
                onChange={onPlantNameChange}
                />
              </h2>
            </div>
            {/* TODO - uncomment once implemented in backend */}
            {/* <div>
              <h2>
                Common Name:
                <input name="common-name"
                value={updatedPlantFormFields.commonName}
                placeholder="Snake Plant, Monstera Deliciosa..." 
                onChange={onPlantNameChange}
                />
              </h2>
            </div> */}
            <div>
              <p>
                Description:
                <input name="description"
                value={updatedPlantFormFields.description}
                placeholder="The happy plant by the window..." 
                onChange={onPlantDescriptionChange}
                />
              </p>
            </div>
            <button onClick={() => {toggleEditMode()}}>
              Cancel
            </button>
            <input type="submit" value="Save Changes" />
          </form>
        )}
        {/* <p>Water Date: {waterDate}</p> 
        <p>Repot Date: {repotDate}</p>
        <p>Water Interval: {waterInterval}</p>
        <p>Repot Interval: {repotInterval}</p> */}
        {/* <p>Water Me in: {plantWateringAndRepottingIntervals[id].daysUntilNextWatering} days</p>
        <p>Repot Me in: {plantWateringAndRepottingIntervals[id].daysUntilNextRepotting} days</p> */}
        { !editMode && (
          <button onClick={() => {toggleEditMode()}}>
            Edit Plant
            </button>)}
        { editMode && (
          <div>
            <button onClick={() => handleDelete(id)}>
              Delete Plant
            </button>
          </div>
        )
        }
      </li>
    </div>
  );
}

export default Plant;