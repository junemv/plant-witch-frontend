import React, { useState } from 'react';
import './PlantModal.css';
import defaultImg from '../../assets/potted-plant-doodle.jpg';

const PlantModal = (props) => {
	const id = props.id;
	const name = props.name;
	const commonName = props.commonName;
	const image = props.image;
	const description = props.description;
	const waterDate = props.waterDate;
	const repotDate = props.repotDate;
	const waterInterval = props.waterInterval;
	const repotInterval = props.repotInterval;

	// callback functions
	const updatePlant = props.updatePlantCallbackFunction;

	// state variables
	const [editMode, setEditMode] = useState(false);
	const [updatedPlantFormFields, setUpdatedPlantFormFields] = useState({
		name: name,
		commonName: commonName,
    description: description
  });

	const toggleEditMode = () => {
		setEditMode(!editMode);
	}

	// edit mode event handlers
	const onPlantDescriptionChange = (e) => {
    setUpdatedPlantFormFields({
      ...updatedPlantFormFields,
      description: e.target.value
    })
  }

	const onSubmit = (e) => {
    e.preventDefault();
    updatePlant(id, updatedPlantFormFields);
    toggleEditMode(!editMode);
  }

	return (
		<div id="plant-modal">
			<div>
			<img className="plant-modal-img" src={ 
				image || defaultImg
				} alt={`${name}`} 
			/>
			</div>
			<div id="header">
				<h1 className="heading-1">
					{name}
				</h1>
				<ul className="header-list">
					<li>
						<b>Common Name: </b>{commonName}
					</li>
					<li>
						<b>Last Watered: </b>{waterDate}
					</li>
					<li>
						<b>Watering Interval: </b>Every {waterInterval} Days
					</li>
					<li>
						<b>Last Repotted: </b>{repotDate}
					</li>
					<li>
						<b>Repotting Interval: </b>Every {repotInterval} Days
					</li>
				</ul>
			</div>
			<h2 className="heading-2">
					Notes: 
			</h2>
			<div id="body">
				{ !editMode && (
					<p className="notes-scrollbox">
						{description}
					</p>
				)}
				{ editMode && (
					<form onSubmit={onSubmit}>
						<div>
							<p>
								<textarea name="notes" className="notes-scrollbox-edit"
								value={updatedPlantFormFields.description}
								placeholder="The happy plant by the window..." 
								onChange={onPlantDescriptionChange}
								/>
							</p>
						</div>
						<input type="submit" value="Save Changes" />
						<button onClick={toggleEditMode}>Cancel</button>
					</form>
				)}
				{ !editMode && (
					<button onClick={toggleEditMode}>Add Notes</button>
				)}
			</div>
		</div>
	)
}

export default PlantModal;