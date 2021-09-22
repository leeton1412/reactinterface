import {RiFolder5Line} from "react-icons/ri"
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointments";

import AppointmentInfo from "./components/Appointmentinfo";
import { useEffect, useState, useCallback } from "react";

function App() {

  let [appointmentList, setAppointmentList] =  useState ([]);

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
      <Search />

      <ul className="divide-y divide-grey-400">
      {appointmentList
        
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
