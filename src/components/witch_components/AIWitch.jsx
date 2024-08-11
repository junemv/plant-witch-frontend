import React, { useState } from 'react';
import './AIWitch.css';
import plantWitchIcon from '../../plant_witch_icon.png';
import sendIcon from '../../send-mail-icon.png';

const AIWitch = (props) => {
    const askWitchAI = props.askWitchAI;
    const aiResponse = props.aiResponse;

    const [prompt, setPrompt] = useState('');

    const handleFormInput = (event) => {
        const value = event.target.value;
        setPrompt(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        askWitchAI(prompt);
    };

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
				<button className="save-response-button" type="submit" >Save to Plant </button>
			</div>
			)}
	</div>
);
}

export default AIWitch;