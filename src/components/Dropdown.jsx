import React, { useState } from 'react';

// for demo puropses, this dropdown menu is used to set the active user
function Dropdown(props) {
	const demoUserData = props.demoUserData;
  const activeUser = props.activeUser;

  // callback functions
	const setActiveUser = props.setActiveUserCallbackFunction;
	const fetchAllPlantsByUserId = props.fetchAllPlantsByUserIdCallbackFunction;
  const setActiveUsersPlants = props.setActiveUsersPlantsCallbackFunction;
	const setPlantsWateringAndRepottingSchedule = props.setPlantsWateringAndRepottingScheduleCallbackFunction;
  const setDisplayPlantsComponents = props.setDisplayPlantsComponentsCallbackFunction;

  const [isOpen, setIsOpen] = useState(false);
  const options = [];

	// storing index in num and user data in user
	if (demoUserData) {
		for (const [num, user] of demoUserData.entries()) {
			options.push([user.firstName, num]);
		}
	}

	// set active user and fetch all plants by user ID
	const handleUserSelect = (user) => {
    setIsOpen(!isOpen)
		setActiveUser(user);
		fetchAllPlantsByUserId(user.id);
    setTimeout(() => {
      setDisplayPlantsComponents(true);
    }, 500)
	}

  const handleLogOut = () => {
    if (window.confirm("Are you sure you want to log out?") === true) {
      setActiveUser({firstName: "Guest"})
      setActiveUsersPlants([]);
      setPlantsWateringAndRepottingSchedule({});
      setDisplayPlantsComponents(false);
      // alert("You have been logged out.")
      console.log(activeUser)
    }
  }

  return (
    <div>
      {!activeUser.id && (
        <button onClick={() => setIsOpen(!isOpen)}>Select User</button>
      )}
      {activeUser.id && (<button onClick={handleLogOut}>Log Out</button>)}
      {isOpen && (
        <div>
          {options.map(option => (
            <button key={option[0]} onClick={() => handleUserSelect(demoUserData[option[1]])}>
              {option[0]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


export default Dropdown;