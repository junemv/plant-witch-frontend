import React from "react";
import Dropdown from "./Dropdown";

const Header = (props) => {
	const demoUserData = props.demoUserData;
	const setActiveUserCallbackFunction = props.setActiveUserCallbackFunction;
	const activeUser = props.activeUser;
	// TODO - 
	// - Welcome message {first_name}
  // - Hamburger menu for swapping pages? Can be refactored for user info editing later

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