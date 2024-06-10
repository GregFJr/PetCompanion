import React from "react";
import { useState, useEffect } from "react";
import { getDatabase, ref, get, } from "firebase/database";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const SideNav = ({ userId }) => {
    const [imageUrl, setImageUrl] = useState("");
    const [petName, setPetName] = useState("");
    const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase();
      const userPetsRef = ref(db, `users/${userId}/pets`);
      const userPetsSnapshot = await get(userPetsRef);

      if (userPetsSnapshot.exists()) {
        const userPetsData = userPetsSnapshot.val();
        // Assuming the user has only one pet for simplicity
        const petId = Object.keys(userPetsData)[0];
        const petData = userPetsData[petId];
        setPetName(petData.name);
        setImageUrl(petData.image);
      } else {
        console.log("No data available.");
      }
    };
    fetchData();
  }, [userId]);

   
  const handleAppointmentClick = () => {
    const user = auth.currentUser;

    if (user) {
    navigate("/vetappointmenttab");
    } else {
      console.log("No user signed in.");
    }}

    const handleAllergiesClick = () => {
        const user = auth.currentUser;

        if(user) {
            navigate("/allergiestab");
        } else {
            console.log("No user signed in.");
        }
    }

    const handleMedicationClick = () => {
        const user = auth.currentUser;

        if (user) {
        navigate("/medicationtab");
        } else {
          console.log("No user signed in.");
        }}

    const handleVaccinationClick = () => {
        const user = auth.currentUser;

        if (user) {
        navigate("/vaccinationstab");
        } else {
          console.log("No user signed in.");
        }}
  
  
    return (
      <div className="flex flex-col items-center">
        <img src={imageUrl} alt="Pet" className="w-32 h-32 rounded-full my-4" />
        <h2 className="text-3xl font-bold">{petName}</h2>

        <ul className="mt-10 font-medium text-lg">
            <li>
                <button onClick={handleAppointmentClick}>Appointments</button>
            </li>
            <li>
                <button onClick={handleAllergiesClick}>Allergies</button>
            </li>
            <li>
                <button onClick={handleMedicationClick}>Medication</button>
            </li>
            <li>
                <button onClick={handleVaccinationClick}>Vaccinations</button>
            </li>
            <li>
                <button>Tips</button>
            </li>
        </ul>
      </div>
    );
  };
  
  export default SideNav;
  
