import React, { useState } from 'react';
import './App.css';

function BookingSystem() {
  // State-variabler som används i komponenten
  const [daysOfWeek] = useState(['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön']); // Array med veckodagar
  const [timeslots] = useState(['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']); // Array med tidsluckor
  const [bookings, setBookings] = useState({}); // Objekt som håller reda på bokningar för varje vecka separat
  const [currentDate, setCurrentDate] = useState(new Date()); // Aktuellt datum

  // Funktion som anropas när en bokning klickas på
  const handleBookingClick = (day, time) => {
    // Skapa kopior av state-variablerna
    const currentWeek = new Date(currentDate);
    currentWeek.setDate(currentWeek.getDate() + 1 - currentWeek.getDay()); // Sätter veckans startdag till måndag
    const weekStart = new Date(currentWeek);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6); // Sätter veckans slutdag till söndag
    const weekKey = `${weekStart.toISOString()}-${weekEnd.toISOString()}`; // Skapar en nyckel för veckan

    // Uppdatera bokningar
    const updatedBookings = { ...bookings };
    if (!updatedBookings[weekKey]) {
      updatedBookings[weekKey] = {};
    }
    if (!updatedBookings[weekKey][day]) {
      updatedBookings[weekKey][day] = {};
    }
    updatedBookings[weekKey][day][time] = true;
    setBookings(updatedBookings);

    alert('Tack för din bokning!');
  };

  // Funktion för att gå till föregående vecka
  const handlePrevWeek = () => {
    const prevWeekDate = new Date(currentDate);
    prevWeekDate.setDate(prevWeekDate.getDate() - 7);
    setCurrentDate(prevWeekDate);
  };

  // Funktion för att gå till nästa vecka
  const handleNextWeek = () => {
    const nextWeekDate = new Date(currentDate);
    nextWeekDate.setDate(nextWeekDate.getDate() + 7);
    setCurrentDate(nextWeekDate);
  };

  // Skapa veckans start- och slutdatum baserat på aktuellt datum
  const currentWeek = new Date(currentDate);
  currentWeek.setDate(currentWeek.getDate() + 1 - currentWeek.getDay()); // Sätter veckans startdag till måndag
  const weekStart = new Date(currentWeek);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6); // Sätter veckans slutdag till söndag
  const weekKey = `${weekStart.toISOString()}-${weekEnd.toISOString()}`; // Skapar en nyckel för veckan

  // Hämta bokningar för aktuell vecka, om de finns
  const weekBookings = bookings[weekKey] || {};

  return (
    <div className='container'>
      <h1 className='header'>Booking System</h1>
      <div className="nextWeek">
        <button className='btn btn-primary' onClick={handlePrevWeek}>Previous Week</button>
        <button className='btn btn-primary' onClick={handleNextWeek}>Next Week</button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {daysOfWeek.map((day, index) => {
                const date = new Date(weekStart);
                date.setDate(date.getDate() + index);
                return (
                  <th key={index} className="weekday-date-cell">
                    <div className="day">{day}</div>
                    <div className="date">{date.getDate()}</div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className='body-of-table'>
            {timeslots.map((time, timeIndex) => (
              <tr key={time}>
                {daysOfWeek.map((day, dayIndex) => {
                  const date = new Date(weekStart);
                  date.setDate(date.getDate() + dayIndex);
                  return (
                    <td
                      key={dayIndex}
                      className={`timeslot-cell ${weekBookings[day] && weekBookings[day][time] ? 'booked' : ''}`}
                    >
                      <button className='btn btn-success' onClick={() => handleBookingClick(day, time)}>
                        {weekBookings[day] && weekBookings[day][time] ? 'Bokad' : time}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookingSystem;
