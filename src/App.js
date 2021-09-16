import {RiFolder5Line} from "react-icons/ri"
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointments";

function App() {
  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl"><RiFolder5Line className="inline-block text-red-400 align-top mb-10"/>Your Appointment</h1>
      <AddAppointment />
      <Search />
    </div>
  );
}

export default App;
