import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import SignIn from "./components/signin.jsx";
import SignUp from "./components/signup.jsx";
import PetInfoForm from "./components/petinfoform.jsx";
import MainPage from "./components/mainpage.jsx";
import SignOutUser from "./components/signoutnav.jsx";
import VetAppointment from "./components/vetappointmenttab.jsx";
import MedicationTab from "./components/medicationtab.jsx";
import VaccinationsTab from "./components/vaccinationstab.jsx";

function App() {

  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <Router>
      < SignOutUser userId={userId} />
      <Routes>

      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/petinfoform" element={<PetInfoForm />} />
      <Route path="/mainpage" element={userId && <MainPage userId={userId} />} />
      <Route path="/vetappointmenttab" element={userId && <VetAppointment userId={userId} />} />
      <Route path="/medicationtab" element={userId && <MedicationTab userId={userId} />} />
      <Route path="/vaccinationstab" element={userId && <VaccinationsTab userId={userId} />} />


     </Routes>
    </Router>
  );
}

export default App;
