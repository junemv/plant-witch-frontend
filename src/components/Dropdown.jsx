import React, { useState } from 'react';

function Dropdown(props) {
	const demoUserData = props.demoUserData;
	const setActiveUser = props.setActiveUserCallbackFunction;

  const [isOpen, setIsOpen] = useState(false);
  const options = [];

	if (demoUserData) {
		for (const [num, user] of demoUserData.entries()) {
			options.push([user.firstName, num]);
		}
	}

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Select an option</button>
      {isOpen && (
        <div>
          {options.map(option => (
            <button key={option[0]} onClick={() => setActiveUser(demoUserData[option[1]])}>
              {option[0]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


export default Dropdown;