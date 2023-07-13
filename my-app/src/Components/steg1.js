import React from 'react';
import './App.css';

class BookingSystem extends React.Component {
  constructor(props) {
    super(props);
    // State-variabler som används i komponenten
    this.state = {
      daysOfWeek: ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'], // Array med veckodagar
      timeslots: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'], // Array med tidsluckor
      bookings: {}, // Objekt som håller reda på bokningar för varje vecka separat
      currentDate: new Date(), // Aktuellt datum
    };
  }

  // Funktion som anropas när en bokning klickas på
  handleBookingClick = (day, time) => {
    const { bookings, currentDate } = this.state;
    const currentWeek = new Date(currentDate);
    currentWeek.setDate(currentWeek.getDate() + 1 - currentWeek.getDay()); // Sätter veckans startdag till måndag
    const weekStart = new Date(currentWeek);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6); // Sätter veckans slutdag till söndag
    const weekKey = `${weekStart.toISOString()}-${weekEnd.toISOString()}`; // Skapar en nyckel för veckan

    const weekBookings = { ...bookings };
    if (!weekBookings[weekKey]) {
      weekBookings[weekKey] = {};
    }
    if (!weekBookings[weekKey][day]) {
      weekBookings[weekKey][day] = {};
    }
    weekBookings[weekKey][day][time] = true;
    this.setState({ bookings: weekBookings });
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

    const currentWeek = new Date(currentDate);
    currentWeek.setDate(currentWeek.getDate() + 1 - currentWeek.getDay()); // Sätter veckans startdag till måndag

    const weekStart = new Date(currentWeek);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6); // Sätter veckans slutdag till söndag
    const weekKey = `${weekStart.toISOString()}-${weekEnd.toISOString()}`; // Skapar en nyckel för veckan

    const weekBookings = bookings[weekKey] || {}; // Hämtar bokningar för aktuell vecka, om de finns

    return (
      <div className='container'>
        <h1 className='header'>Booking System</h1>
        <div className="nextWeek">
          <button className='btn btn-primary' onClick={this.handlePrevWeek}>Previous Week</button>
          <button className='btn btn-primary' onClick={this.handleNextWeek}>Next Week</button>
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
                        <button className='btn btn-success' onClick={() => this.handleBookingClick(day, time)}>
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
}

export default BookingSystem;
