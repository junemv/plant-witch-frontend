import React from "react";
import Dropdown from "./Dropdown";

// Component includes a dropdown menu that allows the user to select a user from a list of demo users
const Header = (props) => {
	const demoUserData = props.demoUserData;
	const activeUser = props.activeUser;

	// Callback functions
	const fetchAllPlantsByUserIdCallbackFunction = props.fetchAllPlantsByUserIdCallbackFunction;
	const fetchWateringAndRepottingScheduleByUserIdCallbackFunction = props.fetchWateringAndRepottingScheduleByUserIdCallbackFunction;
	const setActiveUserCallbackFunction = props.setActiveUserCallbackFunction;
	const setActiveUsersPlantsCallbackFunction = props.setActiveUsersPlantsCallbackFunction;
	const setPlantsWateringAndRepottingScheduleCallbackFunction = props.setPlantsWateringAndRepottingScheduleCallbackFunction;
	const setDisplayPlantsComponentsCallbackFunction = props.setDisplayPlantsComponentsCallbackFunction;

	return (
		<div>
			<h1>Plant Witch</h1>
			<h3>
				Welcome {activeUser.firstName}!
			</h3>
				<Dropdown 
				demoUserData={demoUserData}
				activeUser={activeUser}
				setActiveUserCallbackFunction={setActiveUserCallbackFunction}
				fetchAllPlantsByUserIdCallbackFunction={fetchAllPlantsByUserIdCallbackFunction}
				fetchWateringAndRepottingScheduleByUserIdCallbackFunction={fetchWateringAndRepottingScheduleByUserIdCallbackFunction}
				setActiveUsersPlantsCallbackFunction={setActiveUsersPlantsCallbackFunction}
				setPlantsWateringAndRepottingScheduleCallbackFunction={setPlantsWateringAndRepottingScheduleCallbackFunction}
				setDisplayPlantsComponentsCallbackFunction={setDisplayPlantsComponentsCallbackFunction}
				/>
		</div>
	);
}

export default Header;