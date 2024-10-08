import React from "react";
import Dropdown from "./Dropdown";
import AIWitch from "./witch_components/AIWitch";
import './Header.css';

// Component includes a dropdown menu that allows the user to select a user from a list of demo users
const Header = (props) => {
	const demoUserData = props.demoUserData;
	const activeUser = props.activeUser;
	const aiResponse = props.aiResponse;
	const activeUsersPlants = props.activeUsersPlants

	// Callback functions
	const fetchAllPlantsByUserIdCallbackFunction = props.fetchAllPlantsByUserIdCallbackFunction;
	const setActiveUserCallbackFunction = props.setActiveUserCallbackFunction;
	const setActiveUsersPlantsCallbackFunction = props.setActiveUsersPlantsCallbackFunction;
	const setPlantsWateringAndRepottingScheduleCallbackFunction = props.setPlantsWateringAndRepottingScheduleCallbackFunction;
	const setDisplayPlantsComponentsCallbackFunction = props.setDisplayPlantsComponentsCallbackFunction;
	const setAiResponseCallbackFunction = props.setAiResponseCallbackFunction;
	const setChatHistoryCallbackFunction = props.setChatHistoryCallbackFunction;
	const askWitchAI = props.askWitchAICallbackFunction;

	return (
		<div className="section-styling">
			<Dropdown 
				demoUserData={demoUserData}
				activeUser={activeUser}
				setActiveUserCallbackFunction={setActiveUserCallbackFunction}
				fetchAllPlantsByUserIdCallbackFunction={fetchAllPlantsByUserIdCallbackFunction}
				setActiveUsersPlantsCallbackFunction={setActiveUsersPlantsCallbackFunction}
				setPlantsWateringAndRepottingScheduleCallbackFunction={setPlantsWateringAndRepottingScheduleCallbackFunction}
				setDisplayPlantsComponentsCallbackFunction={setDisplayPlantsComponentsCallbackFunction}
				setAiResponseCallbackFunction={setAiResponseCallbackFunction}
				setChatHistoryCallbackFunction={setChatHistoryCallbackFunction}
				/>
			<h1 id="logo">Plant Witch</h1>
			<h3 id="logo-2">Your Plant Assistant</h3>
			{/* - AI Component */}
			{ activeUser.id && 
				<AIWitch 
					askWitchAI={askWitchAI} 
					aiResponse={aiResponse}		
					activeUsersPlants={activeUsersPlants}
					setAiResponseCallbackFunction={setAiResponseCallbackFunction}
				>
				</AIWitch> 
			}
		</div>
	);
}

export default Header;