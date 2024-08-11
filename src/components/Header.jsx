import React from "react";
import Dropdown from "./Dropdown";
import AIWitch from "./witch_components/AIWitch";
import './Header.css';

// Component includes a dropdown menu that allows the user to select a user from a list of demo users
const Header = (props) => {
	const demoUserData = props.demoUserData;
	const activeUser = props.activeUser;
	const aiResponse = props.aiResponse;

	// Callback functions
	const fetchAllPlantsByUserIdCallbackFunction = props.fetchAllPlantsByUserIdCallbackFunction;
	const fetchWateringAndRepottingScheduleByUserIdCallbackFunction = props.fetchWateringAndRepottingScheduleByUserIdCallbackFunction;
	const setActiveUserCallbackFunction = props.setActiveUserCallbackFunction;
	const setActiveUsersPlantsCallbackFunction = props.setActiveUsersPlantsCallbackFunction;
	const setPlantsWateringAndRepottingScheduleCallbackFunction = props.setPlantsWateringAndRepottingScheduleCallbackFunction;
	const setDisplayPlantsComponentsCallbackFunction = props.setDisplayPlantsComponentsCallbackFunction;
	const askWitchAI = props.askWitchAICallbackFunction;

	return (
		<div className="section-styling">
			<div id="logo">Plant Witch</div>
			{/* <div className="medium-heading">
				Welcome {activeUser.firstName}!
			</div> */}
				<Dropdown 
				demoUserData={demoUserData}
				activeUser={activeUser}
				setActiveUserCallbackFunction={setActiveUserCallbackFunction}
				fetchAllPlantsByUserIdCallbackFunction={fetchAllPlantsByUserIdCallbackFunction}
				setActiveUsersPlantsCallbackFunction={setActiveUsersPlantsCallbackFunction}
				setPlantsWateringAndRepottingScheduleCallbackFunction={setPlantsWateringAndRepottingScheduleCallbackFunction}
				setDisplayPlantsComponentsCallbackFunction={setDisplayPlantsComponentsCallbackFunction}
				/>
			{/* - AI Component */}
			{ activeUser.id && 
				<AIWitch askWitchAI={askWitchAI} aiResponse={aiResponse} />
			}
		</div>
	);
}

export default Header;