import React, { useState, useEffect } from "react";
import { database } from "../firebase"
import { auth } from "../firebase";
import { push, ref } from "firebase/database";

const MedicationTab = () => {

    const [medication, setMedication]= useState('');
    const [dosage, setDosage] = useState('');
    const [time , setTime] = useState('');
    const [interval, setInterval] = useState('');

    const handleMedicationChange = (e) => {
        setMedication(e.target.value);
    }
    const handleDosageChange = (e) => {
        setDosage(e.target.value);
    }
    const handleTimeChange = (e) => {
        setTime(e.target.value);
    }
    const handleIntervalChange = (e) => {
        setInterval(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = auth.currentUser;

        if(user){
            const userId = user.uid;
            const appointmentsRef = push(ref(database, `users/${userId}/medication`),{
                medication,
                dosage,
                time,
                interval,
            });
            alert('Medication Added!');

        }
    }


    return (
        <div className="flex flex-col items-center">
            <h1 className="font-bold text-xl">
                Medications
            </h1>
            
            <form onSubmit={handleSubmit} className="w-full max-w-lg">
                <div>
                <label htmlFor="medication" className="block text-gray-700 text-sm font-bold mb-2">Medication:</label>
                <input type="text" value={medication} onChange={handleMedicationChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                <label htmlFor="dosage" className="block text-gray-700 text-sm font-bold mb-2">Dosage:</label>
                <input type="text" value={dosage} onChange={handleDosageChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div>
                <label htmlFor="time" className="block text-gray-700 text-sm font-bold mb-2">Time:</label>
                <input type="time" value={time} onChange={handleTimeChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div>
                <label htmlFor="interval" className="block text-gray-700 text-sm font-bold mb-2">Interval:</label>
                <input type="text" value={interval} onChange={handleIntervalChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <button type="submit"></button>
            </form>
            
        </div>
    );
    };

    export default MedicationTab;