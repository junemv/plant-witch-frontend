import React, { useState } from "react";
import './Plant.css';
import defaultImg from '../../assets/potted-plant-doodle.jpg';

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
  const plantsWateringAndRepottingSchedule = props.plantsWateringAndRepottingSchedule;
  const thisPlantsNextWatering = plantsWateringAndRepottingSchedule[id].daysUntilNextWatering
  const thisPlantsNextRepotting = plantsWateringAndRepottingSchedule[id].daysUntilNextRepotting

  // callback functions
  const deletePlant = props.deletePlantCallbackFunction;
  const updatePlant = props.updatePlantCallbackFunction;
  const updatePlantWateredOrRepotted = props.updatePlantWateredOrRepottedCallbackFunction;

  // state variables
  const [editMode, setEditMode] = useState(false);
  const [updatedPlantFormFields, setUpdatedPlantFormFields] = useState({
    name: name,
    // commonName: commonName,
    description: description
  });
  const [scheduleBtnStyle, setScheduleBtnStyle] = useState("green");
  // TODO 8/7 - 
  // 1. create a state variable to store the three CSS style states for watering/repotting
  //  > green = 3+ days
  //  > yellow = 0-2 days
  //  > red = -n days
  // 2. Figure out margin issue 
  // 3. build function to calculate watering/repotting days on frontend
  // calc: watering interval - (current date - last watered/repotted date)
  // 4. styling

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

  // event handler for watering and repotting plants
  const handleWateringAndRepotting = (id, name, type) => {
    let waterOrRepot = ""
    if (type === "water-date") {
      waterOrRepot = "water"
    } else if (type === "repot-date") {
      waterOrRepot = "repot"
    }
    if (window.confirm(`Did you ${waterOrRepot} ${name}?`) === true) {
      updatePlantWateredOrRepotted(id, type);
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
    e.preventDefault();
    updatePlant(id, updatedPlantFormFields);
    toggleEditMode(!editMode);
  }

  const preventEnterSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
    };
  }

  // TODO - 
  // > turn watering and repotting days into button to reset to current date

  return (
    <div id="plant-component">
      <li key={key}>
        <img src={ 
          !image && (defaultImg || image)
          // defaultImg
          } alt={`${name}`} />
        { !editMode && (
          <div>
            <h2>{name}</h2>
            {/* TODO - uncomment Common Name once implemented */}
            {/* <h3>Common Name: {commonName}</h3> */}
            <p>Description: {description}</p>
          </div>
        )}
        { editMode && (
          <form onSubmit={onSubmit} onKeyDown={preventEnterSubmit}>
            <div>
              <h3>
                Nickname:
                <input name="name"
                value={updatedPlantFormFields.name}
                placeholder="Mr. Planty McPlantface, Kevin..." 
                onChange={onPlantNameChange}
                />
              </h3>
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
        <p onClick={() => handleWateringAndRepotting(id, name, "water-date")} className={scheduleBtnStyle}>Water Me in: {thisPlantsNextWatering} days</p>
        <p onClick={() => handleWateringAndRepotting(id, name, "repot-date")} className={scheduleBtnStyle}>Repot Me in: {thisPlantsNextRepotting} days</p>
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