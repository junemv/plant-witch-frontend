import React from "react";
import Dropdown from "./Dropdown";

// Component includes a dropdown menu that allows the user to select a user from a list of demo users
const Header = (props) => {
	const demoUserData = props.demoUserData;
	const setActiveUserCallbackFunction = props.setActiveUserCallbackFunction;
	const activeUser = props.activeUser;

  return (
    <div>
      <h1>Header</h1>
			<h3>Welcome {activeUser.firstName}!
			</h3>
			<Dropdown 
			demoUserData={demoUserData}
			setActiveUserCallbackFunction={setActiveUserCallbackFunction}
			/>
    </div>
  );
}

export default Header;