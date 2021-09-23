import {RiFolder5Line} from "react-icons/ri"
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointments";

import AppointmentInfo from "./components/Appointmentinfo";
import { useEffect, useState, useCallback } from "react";

function App() {

  let [appointmentList, setAppointmentList] =  useState ([]);
  let [query, setQuery] = useState("");
  let [sortBy, setSortBy] = useState("petName");
  let [orderBy, setOrderBy] = useState("asc");


  const filteredAppointments = appointmentList.filter(
    item => {
      return (
        item.petName.toLowerCase().includes(query.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase())
      )
    }
  ).sort((a,b) => {
    let order = (orderBy=== 'asc') ? 1 : -1;
    return (
      a[sortBy].toLowerCase() <
      b[sortBy].toLowerCase() ? -1 * order : 1 * order
    )
  })

  const fetchData = useCallback(() => {
    fetch('./data.json')
    .then(Response => Response.json())
    .then(data => {
      setAppointmentList(data)
    })
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl"><RiFolder5Line className="inline-block text-red-400 align-top mb-10"/>Your Appointment</h1>
      <AddAppointment />
      <Search query={query}
      onQueryChange={ myQuery => setQuery(myQuery)} />

      <ul className="divide-y divide-grey-400">
      {filteredAppointments
        
        .map(appointment => (
            <AppointmentInfo key={appointment.id} // Passed Via Component
            appointment={appointment}
            onDeleteAppointment={
              appointmentId => 
              setAppointmentList(appointmentList.filter(appointment => appointment.id !== appointmentId))
            }
            />
        ))}

      </ul>

    </div>
  );
}

export default App;
