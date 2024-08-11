import React, { useEffect, useState } from "react";
import './Plant.css';
import defaultImg from '../../assets/potted-plant-doodle.jpg';

const Plant = (props) => {
  // props
  const key = props.key;
  const id = props.id;
  const name = props.name;
  const commonName = props.commonName;
  const image = props.image;
  const description = props.description;
  const waterDate = props.waterDate;
  const repotDate = props.repotDate;
  const waterInterval = props.waterInterval;
  const repotInterval = props.repotInterval;
  const plantsWateringAndRepottingSchedule = props.plantsWateringAndRepottingSchedule;

  // variables
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
    commonName: commonName,
    description: description
  });
  const [scheduleBtnStyle, setScheduleBtnStyle] = useState({
    watering: {style: "schedule-green", msg: `Water Me in: ${thisPlantsNextWatering} days`}, 
    repotting: {style: "schedule-green", msg: `Repot Me in: ${thisPlantsNextWatering} days`}
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

  // allows user to set the last watered or repotted date to current date
  const handleWateringAndRepotting = (id, name, type) => {
    let waterOrRepot = ""
    if (type === "water-date") {
      waterOrRepot = "water"
    } else if (type === "repot-date") {
      waterOrRepot = "repot"
    }
    if (window.confirm(`Did you ${waterOrRepot} ${name}?`) === true) {
      updatePlantWateredOrRepotted(id, type);
      if (type === "water-date") {
        handleWateringAndRepottingStyle(waterInterval, type)
      } else if (type === "repot-date") {
        handleWateringAndRepottingStyle(repotInterval, type)
      }
    }
  }

  // updating watering and repotting CSS styling and message
  const handleWateringAndRepottingStyle = (days, type) => {
    const newScheduleBtnStyle = scheduleBtnStyle;
    // TODO - dry up this code, can we use this set of conditions and identify if the days coming in are watering or repotting?

    if (type === "water-date") {
      if (days > 2) {
        newScheduleBtnStyle.watering.style = "schedule-green";
        newScheduleBtnStyle.watering.msg = `Water Me in: ${days} days`;
      } else if (days === 2) {
        newScheduleBtnStyle.watering.style = "schedule-yellow";
        newScheduleBtnStyle.watering.msg = `Water Me in: ${days} days`;
      } else if (days === 1) {
        newScheduleBtnStyle.watering.style = "schedule-yellow";
        newScheduleBtnStyle.watering.msg = `Water Me in: ${days} day`;
      } else if (days === 0) {
        newScheduleBtnStyle.watering.style = "schedule-red";
        newScheduleBtnStyle.watering.msg = `Water Me Today!`;
      } else if (days === -1) {
        newScheduleBtnStyle.watering.style = "schedule-red";
        newScheduleBtnStyle.watering.msg = `Water me! ${days * -1} day late!`;
      } else {
        newScheduleBtnStyle.watering.style = "schedule-red";
        newScheduleBtnStyle.watering.msg = `Water me! ${days * -1} days late!`;
      }
    } else if (type === "repot-date") {
      if (days > 2) {
        newScheduleBtnStyle.repotting.style = "schedule-green";
        newScheduleBtnStyle.repotting.msg = `Repot Me in: ${days} days`;
      } else if (days === 2) {
        newScheduleBtnStyle.repotting.style = "schedule-yellow";
        newScheduleBtnStyle.repotting.msg = `Repot Me in: ${days} days`;
      } else if (days === 1) {
        newScheduleBtnStyle.repotting.style = "schedule-yellow";
        newScheduleBtnStyle.repotting.msg = `Repot Me in: ${days} day`;
      } else if (days === 0) {
        newScheduleBtnStyle.repotting.style = "schedule-red";
        newScheduleBtnStyle.repotting.msg = `Repot Me Today!`;
      } else if (days === -1) {
        newScheduleBtnStyle.repotting.style = "schedule-red";
        newScheduleBtnStyle.repotting.msg = `Repot me! ${days * -1} day late!`;
      } else {
        newScheduleBtnStyle.repotting.style = "schedule-red";
        newScheduleBtnStyle.repotting.msg = `Repot me! ${days * -1} days late!`;
      }
    }
    setScheduleBtnStyle(newScheduleBtnStyle);
  }

  useEffect(() => {
    handleWateringAndRepottingStyle(thisPlantsNextWatering, "water-date")
    handleWateringAndRepottingStyle(thisPlantsNextRepotting, "repot-date")
  }, [])

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


  return (
    <div id="plant-component">
      <li key={key}>
        <img className="plant-img" src={ 
          image || defaultImg
          // defaultImg
          } alt={`${name}`} />
        { !editMode && (
          <div>
            <h2>{name}</h2>
            {/* TODO - uncomment Common Name once implemented */}
            <h3>Common Name: {commonName}</h3>
            {description && (
              <p>
                <b>Notes: </b>
                {description}
              </p>
            )}
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
            <div>
              <h3>
                Common Name:
                <input name="common-name"
                value={updatedPlantFormFields.commonName}
                placeholder="Snake Plant, Monstera Deliciosa..." 
                onChange={onPlantCommonNameChange}
                />
              </h3>
            </div>
            <div>
              <h3>
                Notes:
                <input name="description"
                value={updatedPlantFormFields.description}
                placeholder="The happy plant by the window..." 
                onChange={onPlantDescriptionChange}
                />
              </h3>
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
        { !editMode && (
          <div>
            <div className="water-repot-sec">
              <div className={scheduleBtnStyle.watering.style}>{scheduleBtnStyle.watering.msg}</div>
              <button className="water-repot-btn" onClick={() => handleWateringAndRepotting(id, name, "water-date")} >Water</button>
              <div className={scheduleBtnStyle.repotting.style}>{scheduleBtnStyle.repotting.msg}</div>
              <button className="water-repot-btn" onClick={() => handleWateringAndRepotting(id, name, "repot-date")}>Repot</button>
            </div>
            <button onClick={() => {toggleEditMode()}}>
              Edit Plant
            </button>
          </div>
        )}
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