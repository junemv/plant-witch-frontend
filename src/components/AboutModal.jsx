import React from "react";
import './AboutModal.css';

const AboutModal = (props) => {

	return (
		<div id="about-modal">
			<h2 className="large-heading-2">The Plant Witch Team</h2>
			<ul className="medium-paragraph" id="about-list">
				<li className="about-list-items">
					Diana
				</li>
				<li className="about-list-items">
					June Valentino
				</li>
				<li className="about-list-items">
					Natasha Zakharova
				</li>
			</ul>
			<h2 className="large-heading-2">Original Concept</h2>
			<ul className="medium-paragraph" id="about-list">
				<li className="about-list-items">
					Natasha Zakharova
				</li>
			</ul>
			<h2 className="large-heading-2">Art and Assets</h2>
			<ul className="medium-paragraph" id="about-list">
				<li className="about-list-items">
					June Valentino
				</li>
			</ul>
		</div>
	);
}

export default AboutModal;