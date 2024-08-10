import React, { useState } from 'react';
import './AIWitch.css';

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
			<form onSubmit={handleSubmit}>
				<input className="input-item"
						type="text"
						value={prompt}
						placeholder="Ask me anything about plants!"
						onChange={handleFormInput}
						/>
				<button type="submit">Ask me!</button>
			</form>

			{aiResponse && (
			<div>
				<h3>My witchy response:</h3>
				<p>{aiResponse.response}</p>
			</div>
			)}
	</div>
);
}

export default AIWitch;