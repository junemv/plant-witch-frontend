import "./App.css";
import Header from "./components/Header";
import PlantBoard from "./components/plant_components/PlantBoard";
import AIWitch from "./components/witch_components/AIWitch";

function App() {
  // TODO -
  // - Build AI Functionality
  // - Build Logic for switching between users by ID
  // - Build Logic for
  //    - grabbing plant records by User ID
  //    - storing plant data in Plant components
  //    - storing Plant components as list in PlantBoard
  // - Build form for posting new plant record
  // - Build function for deleting plant record
  // - Build function for editing plant record
  selectedUser = 1;
  const [plantsData, setPlants] = useState([]);

  const createNewPlantForSelectedUsert = (data) => {
    axios
      .post(`https://localhost//plants/users/${selectedUser}`, data)
      .then((response) => {
        getPlantsForUser(selectedUser);
      })
      .catch((error) => {
        console.log(error, "create plant failed.");
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* What lives here? */}
        {/* - Header Component */}
        <Header />
      </header>
      <body>
        {/* What lives here? */}
        {/* - AI Component */}
        <AIWitch />
        {/* - PlantBoard component */}
        <PlantBoard />
        <NewPlantForm handleFormSubmission={createNewPlantForSelectedUsert} />
      </body>
    </div>
  );
}

export default App;
