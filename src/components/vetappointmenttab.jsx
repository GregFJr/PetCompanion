import React, {useState} from 'react';
import Calendar from 'react-calendar';
import { database } from '../firebase';
import { push, ref } from 'firebase/database';
import { auth } from '../firebase';

const VetAppointment = () => {
    const [date, setDate] = useState(new Date());
    const [appointment, setAppointment] = useState('');
    const [description, setDescription] = useState('');

    const handleDateChange = (date) => {
        setDate(date);
    }

    const handleAppointmentChange = (e) => {
        setAppointment(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleDateClick = (value) => {
        setDate(value);

        const formattedDate = value.toISOString().split('T')[0];
        setAppointment(formattedDate);
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = auth.currentUser;

        if(user){
            const userId = user.uid;
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = date.toLocaleDateString('en-US', options);

            const appointmentsRef = push(ref(database, `users/${userId}/appointments`),{
                description,
                date: formattedDate,
            });
            alert('Appointment Added!');

        }
    }

    return (
        <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Appointment Tab</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Date:
          </label>
          <Calendar
            onChange={handleDateChange}
            value={date}
            onClickDay={handleDateClick}
            className="border border-gray-300 rounded p-2"
          />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
            Description:
          </label>
          <input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Appointment:
          </label>
          <input
            type="text"
            value={appointment}
            onChange={handleAppointmentChange}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save Appointment
        </button>
      </form>
    </div>
      );
}

export default VetAppointment;