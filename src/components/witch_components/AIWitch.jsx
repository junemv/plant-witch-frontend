import React, { useState } from 'react';
import './AIWitch.css';
import axios from "axios";

import plantWitchIcon from '../../plant_witch_icon.png';
import sendIcon from '../../send-mail-icon.png';
import Modal from '../Modal';
import PlantsListForAI from '../plant_components/PlantsListForAI';

const AIWitch = (props) => {
	const URL = process.env.REACT_APP_BACKEND_URL;
    const askWitchAI = props.askWitchAI;
    const aiResponse = props.aiResponse;
	const activeUserPlants = props.activeUsersPlants;
	const setAiResponse = props.setAiResponseCallbackFunction;
    const [prompt, setPrompt] = useState('');
	const [showModal, setShowModal] = useState(false);

	// Save AI Response to a specific plant
	const saveWitchResponseToPlant = async (plantId, witchId) => {
		try {
			const response = await axios.patch(`${URL}/api/v1/witch_ai/${witchId}`, { plant_id: plantId });
			setAiResponse(null);
			return response.data;
		} catch (error) {
			console.error("Error saving AI response to plant:", error);
			throw error;
		}	
	};

	const handleShowAllPlants = () => {
		setShowModal(true);
	};
	
	const handleCloseModal = () => {
		setShowModal(false);
		setPrompt('');
	};

    const handleFormInput = (event) => {
        const value = event.target.value;
        setPrompt(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        askWitchAI(prompt);
    };

	const onClose = () => {
		setAiResponse(null);
		setPrompt('');
	}


return (
	<div id="ai-witch">
		<div className="medium-heading">Have Any Plant Questions?</div>
			<img className="plant-witch-icon" src= {plantWitchIcon} alt="witch-with-plant-icon" />
			<form className="witch-input-container" onSubmit={handleSubmit}>
				<textarea className="witch-input-item"
						type="text"
						value={prompt}
						placeholder="Ask me anything about plants!"
						onChange={handleFormInput}
						
						/>
				<button className="send-btn" type="submit" ><img className="send-button-icon "src={sendIcon} alt="send-mail-icon"/></button>
			</form>

			{aiResponse && (
			<div className="witch-response-container">
				<h3>My witchy response:</h3>
				<p className="witch-response">{aiResponse.response}</p>
				<div>
					<button className="save-close-btns save-response-btn" onClick={handleShowAllPlants}>Save to Plant </button>
					<button className="save-close-btns close-response-btn" onClick={onClose}>Close</button>
				</div>
			</div>
			)}
			<Modal show={showModal} onClose={handleCloseModal}>
				<PlantsListForAI
				aiResponse={aiResponse}	
				activeUsersPlants={activeUserPlants}
				saveWitchResponseToPlantCallbackFunction={saveWitchResponseToPlant}
				handleCloseModalCallbackFunction={handleCloseModal}
				/>
			</Modal>
	</div>
);
}

export default AIWitch;