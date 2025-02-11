// App.js
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const initialSeats = 20;
  const [seatsLeft, setSeatsLeft] = useState(initialSeats);
  const [reservations, setReservations] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [guestCount, setGuestCount] = useState(1);

  // Handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (guestCount > seatsLeft) {
      alert("Not enough seats available!");
      return;
    }

    if (reservations.some(reservation => reservation.name === customerName)) {
      alert("This customer already has a reservation.");
      return;
    }

    const checkInTime = new Date().toLocaleString();
    const newReservation = {
      name: customerName,
      phone: phoneNumber,
      guestCount: guestCount,
      checkInTime: checkInTime,
      checkedOut: false,
    };

    setReservations([...reservations, newReservation]);
    setSeatsLeft(seatsLeft - guestCount);
    resetForm();
  };

  // Handle checkout
  const handleCheckout = (index) => {
    const updatedReservations = [...reservations];
    updatedReservations[index].checkedOut = true;
    setReservations(updatedReservations);

    setSeatsLeft(seatsLeft + updatedReservations[index].guestCount);
  };

  // Handle reservation deletion
  const handleDelete = (index) => {
    const updatedReservations = [...reservations];
    if (!updatedReservations[index].checkedOut) {
      setSeatsLeft(seatsLeft + updatedReservations[index].guestCount);
    }

    updatedReservations.splice(index, 1);
    setReservations(updatedReservations);
  };

  // Reset form fields
  const resetForm = () => {
    setCustomerName('');
    setPhoneNumber('');
    setGuestCount(1);
  };

  return (
    <div className="App">
      <div className="reservation-form">
        <h2>Make a Reservation</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Guest Count"
            value={guestCount}
            onChange={(e) => setGuestCount(Number(e.target.value))}
            required
            min="1"
          />
          <button type="submit">Reserve</button>
        </form>
        <p>Seats Left: {seatsLeft}</p>
      </div>

      <div className="reservation-table">
        <h2>Active Reservations</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Check-in Time</th>
              <th>Checkout Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation, index) => (
              <tr key={index}>
                <td>{reservation.name}</td>
                <td>{reservation.phone}</td>
                <td>{reservation.checkInTime}</td>
                <td>
                  {reservation.checkedOut ? (
                    'Checked Out'
                  ) : (
                    <button onClick={() => handleCheckout(index)}>Click to Checkout</button>
                  )}
                </td>
                <td>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
