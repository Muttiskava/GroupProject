import React from 'react';
import './App.css';

class BookingSystem extends React.Component {
  constructor(props) {
    super(props);
    // State-variabler som används i komponenten
    this.state = {
      daysOfWeek: ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'], // Array med veckodagar
      timeslots: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'], // Array med tidsluckor
      bookings: {}, // Objekt som håller reda på bokningar
      currentDate: new Date(), // Aktuellt datum
    };
  }

  // Funktion som anropas när en bokning klickas på
  handleBookingClick = (day, time) => {
    const bookings = { ...this.state.bookings };
    if (!bookings[day]) {
      bookings[day] = {};
    }
    bookings[day][time] = true;
    this.setState({ bookings });
  };

  // Funktion för att gå till föregående vecka
  handlePrevWeek = () => {
    const { currentDate } = this.state;
    const prevWeekDate = new Date(currentDate);
    prevWeekDate.setDate(prevWeekDate.getDate() - 7);
    this.setState({ currentDate: prevWeekDate });
  };

  // Funktion för att gå till nästa vecka
  handleNextWeek = () => {
    const { currentDate } = this.state;
    const nextWeekDate = new Date(currentDate);
    nextWeekDate.setDate(nextWeekDate.getDate() + 7);
    this.setState({ currentDate: nextWeekDate });
  };

  render() {
    const { daysOfWeek, timeslots, bookings, currentDate } = this.state;

    const weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate() + 1 - currentDate.getDay()); // Sätter veckans startdag till måndag

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6); // Sätter veckans slutdag till söndag

    return (
      <div>
        <h1 className='header'>Booking System</h1>
        <div className="nextWeek">
          <button onClick={this.handlePrevWeek}>Previous Week</button>
          <button onClick={this.handleNextWeek}>Next Week</button>
        </div>
        <table>
          <thead>
            <tr>
              {daysOfWeek.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {daysOfWeek.map((day, index) => {
                const date = new Date(weekStart);
                date.setDate(date.getDate() + index);
                return (
                  <td key={index} className="date-cell">
                    {date.getDate()}
                  </td>
                );
              })}
            </tr>
            {timeslots.map((time, timeIndex) => (
              <tr key={time}>
                {daysOfWeek.map((day, dayIndex) => {
                  const date = new Date(weekStart);
                  date.setDate(date.getDate() + dayIndex);
                  return (
                    <td
                      key={dayIndex}
                      onClick={() => this.handleBookingClick(day, time)}
                      className={`timeslot-cell ${bookings[day] && bookings[day][time] ? 'booked' : ''}`}
                    >
                      {bookings[day] && bookings[day][time] ? 'Bokad' : time}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default BookingSystem;
