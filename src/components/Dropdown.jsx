import React, { useState } from 'react';

// for demo puropses, this dropdown menu is used to set the active user
function Dropdown(props) {
	const demoUserData = props.demoUserData;
	const setActiveUser = props.setActiveUserCallbackFunction;
	const fetchAllPlantsByUserId = props.fetchAllPlantsByUserIdCallbackFunction;
  const fetchWateringAndRepottingScheduleByUserId = props.fetchWateringAndRepottingScheduleByUserIdCallbackFunction;

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
		setActiveUser(user);
		fetchAllPlantsByUserId(user.id);
    fetchWateringAndRepottingScheduleByUserId(user.id);
	}

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Select User</button>
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