import React, { useState } from "react";
import { database } from "../firebase";
import { auth } from "../firebase";
import { push, ref } from "firebase/database";

const Vaccinations = () => {
  const [vaccination, setVaccination] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());

  const handleVaccinationChange = (e) => {
    setVaccination(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (user) {
      const userId = user.uid;
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const formattedDate = date.toLocaleDateString("en-US", options);

      const vaccinationsRef = push(
        ref(database, `users/${userId}/vaccinations`),
        {
          vaccination,
          description,
          date: formattedDate,
        }
      );
      alert("Vaccination Added!");
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-8">
  <h1 className="text-2xl font-bold mb-4">WTF</h1>
  <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label htmlFor="vaccination" className="block text-gray-700 font-bold mb-2">
        Vaccination
      </label>
      <input
        id="vaccination"
        type="text"
        value={vaccination}
        onChange={handleVaccinationChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
        Description
      </label>
      <input
        id="description"
        type="text"
        value={description}
        onChange={handleDescriptionChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
        Date
      </label>
      <input
        id="date"
        type="date"
        value={date}
        onChange={handleDateChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Submit
    </button>
  </form>
</div>

  );
};

export default Vaccinations;
