import React, { useState } from 'react';
import './PlantModal.css';
import defaultImg from '../../assets/default-image.png';

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
	const aiPlantHistory = props.aiPlantHistory;


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
				<div id="info-box">
					<img className="plant-modal-img" src={ 
						image || defaultImg
						} alt={`${name}`} 
					/>
					<div className="header-contents" id="header">
						<h1 id="heading-1">
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
				</div>
				
				<div id="notes-body">
					<h2 className="medium-heading">
							Notes: 
					</h2>
					{ !editMode && (
						<p className="notes-scrollbox">
							{description}
						</p>
					)}
					{ editMode && (
						<form id="notes-form" onSubmit={onSubmit}>
							<p>
								<textarea name="notes" className="notes-scrollbox-edit"
								value={updatedPlantFormFields.description}
								placeholder="The happy plant by the window..." 
								onChange={onPlantDescriptionChange}
								/>
							</p>
							<input className="confirm-button" type="submit" value="Save Changes" />
							<button className="cancel-button" onClick={toggleEditMode}>Cancel</button>
						</form>
					)}
					{ !editMode && (
						<button className="confirm-button" onClick={toggleEditMode}>Add Notes</button>
					)}
				</div>
				<div className="saved-ai-box">
					<h2 className="medium-heading" id="heading-1">Saved Witch Responses:</h2>
					<div className="ai-response-container">
					{aiPlantHistory.map((ai) => (
						<div className="ai-response-item">
							{ai.response}
						</div>
						))}
				</div>
			</div>
	
			
			</div>
	)
}

export default PlantModal;