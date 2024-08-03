import React from "react";
import Dropdown from "./Dropdown";

// Component includes a dropdown menu that allows the user to select a user from a list of demo users
const Header = (props) => {
	const demoUserData = props.demoUserData;
	const setActiveUserCallbackFunction = props.setActiveUserCallbackFunction;
	const activeUser = props.activeUser;
	const fetchAllPlantsByUserIdCallbackFunction = props.fetchAllPlantsByUserIdCallbackFunction;
	const fetchWateringAndRepottingScheduleByUserIdCallbackFunction = props.fetchWateringAndRepottingScheduleByUserIdCallbackFunction;

  return (
    <div>
      <h1>Header</h1>
			<h3>Welcome {activeUser.firstName}!
			</h3>
			<Dropdown 
			demoUserData={demoUserData}
			setActiveUserCallbackFunction={setActiveUserCallbackFunction}
			fetchAllPlantsByUserIdCallbackFunction={fetchAllPlantsByUserIdCallbackFunction}
			fetchWateringAndRepottingScheduleByUserIdCallbackFunction={fetchWateringAndRepottingScheduleByUserIdCallbackFunction}
			/>
    </div>
  );
}

export default Header;