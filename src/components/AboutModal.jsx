import React from "react";
import './AboutModal.css';

const AboutModal = (props) => {

	return (
		<div id="about-modal">
			<div id="spacing">
				<h2 className="large-heading-2">The Plant Witch Team</h2>
				<ul className="medium-paragraph" id="about-list">
					<li className="about-list-items">
						Diana Martinez
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
						Art by June Valentino
					</li>
					<li className="about-list-items">
						Icons by Freepik - Flaticon
					</li>
					<li className="about-list-items">
						Icons by Freepik - Flaticon
					</li>
					<li className="about-list-items">
						Photo by Scott Webb <br /> @scottwebb - Unsplash
					</li>
				</ul>
				<h2 className="large-heading-2">Special Thanks</h2>
				<ul className="medium-paragraph" id="about-list">
					<li className="about-list-items">
						Adrian Prado
					</li>
					<li className="about-list-items">
						The Games Afoot Team
					</li>
					<li className="about-list-items">
						Our Fellow Adies
					</li>
				</ul>
			</div>
		</div>
	);
}

export default AboutModal;