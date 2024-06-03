import React, { useState } from "react";
import { database } from "../firebase";
import { push, ref } from "firebase/database";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
// import {
//   getStorage,
//   ref as storageRef,
//   uploadString,
//   getDownloadURL,
// } from "firebase/storage";

const PetInfoForm = () => {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
//   const storage = getStorage();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSpeciesChange = (e) => {
    setSpecies(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleBreedChange = (e) => {
    setBreed(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
    //   const file = image;
    //   const reader = new FileReader();
  
    //   reader.onload = (event) => {
    //     // Convert the image to a Base64 string
    //     const base64Image = event.target.result;
  
    //     const storageRefVar = storageRef(storage, `users/${userId}/pets/${file.name}`);
  
        // Upload the Base64 string to Firebase Storage
        // uploadString(storageRefVar, base64Image, 'data_url')
        //   .then(() => {
        //     // Get the download URL of the uploaded image
        //     getDownloadURL(storageRefVar)
        //       .then((imageUrl) => {
                // Store the image download URL in the database
                const newPetRef = push(ref(database, `users/${userId}/pets`), {
                  name,
                  species,
                  age,
                  breed,
                //   imageUrl,
                });
  
    //             console.log(newPetRef);
  
    //             // Redirect the user to the main page
                navigate('/mainpage');
    //           })
    //           .catch((error) => {
    //             console.error('Error getting download URL:', error);
    //             // Handle the error, e.g., show an error message to the user
    //           });
    //       })
    //       .catch((error) => {
    //         console.error('Error uploading image:', error);
    //         // Handle the error, e.g., show an error message to the user
    //       });
    //   };
  
    //   // Read the file as a data URL (Base64 string)
    //   reader.readAsDataURL(file);
    // } else {
    //   console.log("No user or image selected.");
    //   // Handle the case where no user is signed in or no image is selected, e.g., show a message to the user
    // } 
            }
  };
  
  

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="w-full max-w-xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="age"
            >
              Age:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="age"
              type="text"
              value={age}
              onChange={handleAgeChange}
              placeholder="Age"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="species"
            >
              Species:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="species"
              type="text"
              value={species}
              onChange={handleSpeciesChange}
              placeholder="Species"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="breed"
            >
              Breed:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="breed"
              value={breed}
              onChange={handleBreedChange}
              placeholder="Breed"
            />
          </div>
          <div className="mt-4 mb-4">
            <label className="block w-full px-4 py-6 bg-white rounded-lg shadow-lg text-center border border-blue cursor-pointer hover:bg-blue hover:text-blue-500">
              <span className="block text-xl text-blue">Upload Image</span>
              <input
                type="file"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PetInfoForm;
