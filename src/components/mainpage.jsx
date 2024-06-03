import React, { useState, useEffect } from "react";
import { database, auth } from "../firebase"
import { ref, onValue } from "firebase/database";
import SideNav from "./sidenav";

const MainPage = ({ userId }) => {
    console.log(userId);

    const [appointments, setAppointments] = useState([]);
    const [medications, setMedications] = useState([]);

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
          const userId = user.uid;
          const appointmentsRef = ref(database, `users/${userId}/appointments/`);
    
          onValue(appointmentsRef, (snapshot) => {
            const appointmentsData = snapshot.val();
            if (appointmentsData) {
              const appointmentsList = Object.entries(appointmentsData).map(([key, value]) => ({
                id: key,
                ...value,
              }));
              setAppointments(appointmentsList);
            }
          });
        }
      }, []);

      useEffect(() => {
        const user = auth.currentUser;
        if (user) {
          const userId = user.uid;
          const medicationsRef = ref(database, `users/${userId}/medication/`);

          onValue(medicationsRef, (snapshot) => {
            const medicationsData = snapshot.val();
            if (medicationsData) {
              const medicationsList = Object.entries(medicationsData).map(([key, value]) => ({
                id: key,
               ...value,
              }));
              setMedications(medicationsList);
            }
          });
        }
    }, []);

  return (
    <div className="flex">

      <div className="w-40 h-screen bg-gray-200">
        <SideNav userId={userId} />
      </div>

    <div>
      <div className="flex">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="m-4 p-4 border rounded shadow h-64">
          <h2 className="text-lg font-bold">{appointment.date}</h2>
          <p className="text-xl">{appointment.description}</p>
        </div>
      ))}</div>
      

        <div className="flex">
      {medications.map((medication) => (
        <div key={medication.id} className="m-4 p-4 border rounded shadow h-64">
          <h2 className="text-lg font-bold">{medication.medication}</h2>
          <p className="text-xl">{medication.dosage}</p>
          <p className="text-xl">{medication.time}</p>
          <p className="text-xl">{medication.interval}</p>
        </div>
      ))}</div>
      </div>
      
      
    </div>
  );
};

export default MainPage;

