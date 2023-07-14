import React from 'react';
import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './MainLayout.css';

import { getDates } from './Components/DateUtils';


function App() {
  const [weekIndex, setWeekIndex] = useState(0);
  const [weeks, setWeeks] = useState(() => getDates(0));
  const [timeslotState, setTimeslotState] = useState(getInitialTimeslotState());


  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const adjustWeek = (offset) => {
    const newWeekIndex = weekIndex + offset;
    setWeekIndex(newWeekIndex);
    setWeeks(getDates(newWeekIndex));
  
    console.log(newWeekIndex);
  };

  const handleTimeslot = (dayIndex, timeslotIndex) => {
    setWeeks(prevWeeks => {
      const updatedWeeks = [...prevWeeks];
      const targetWeek = updatedWeeks[weekIndex];

      if (targetWeek) {
        const targetDay = targetWeek.find(day => day.id === dayIndex);

        if (targetDay) {
          const currentDate = new Date();
          const targetDate = new Date(currentDate);
          targetDate.setDate(targetDate.getDate() + (weekIndex * 7) + dayIndex);
          console.log(targetDate, currentDate)

          if (targetDate >= currentDate) {
            const targetTimeslot = targetDay.timeslots[timeslotIndex];

            if (targetTimeslot && !targetTimeslot.booked) {
              targetTimeslot.booked = true;

              setTimeslotState(prevState => ({
                ...prevState,
                [`${dayIndex}-${timeslotIndex}`]: true
              }));
            }
          }
        }
      }

      return updatedWeeks;
    });
  };


  function getInitialTimeslotState() {
    const initialTimeslotState = {};
    const currentWeek = weeks[weekIndex] || []; /* needed to avoid breaking when going past week0-3*/
    currentWeek.forEach((day) => {
      day.timeslots.forEach((timeslot, index) => {
        const key = `${day.id}-${index}`;
        initialTimeslotState[key] = timeslot ? timeslot.booked : false; //yoink form overflow  -- 
      });
    });
    return initialTimeslotState;
  }

  const currentWeek = weeks[weekIndex];

  return (
    <div className="container position relative">
      <h2 className="row justify-content-center"> Available Times </h2>

      <div className="row justify-content-center align-items-center mb-2">
        <div className="col-md-5 text-start">
          <button className="btn btn-outline-secondary weekBtn"
            onClick={() => adjustWeek(-1)}
            disabled={weekIndex === 0} >
            Previous Week
          </button>
        </div>
        <div className="col-1 text-center weekFont">
          {currentWeek && `Week ${currentWeek[0].weekNumber}`}
        </div>
        <div className="col-md-5 text-end">
          <button className="btn btn-outline-secondary weekBtn"
            onClick={() => adjustWeek(1)}
            disabled={weekIndex === 3}>
            Next Week
          </button>
        </div>
      </div>

      {currentWeek && (
        <div className="row justify-content-center">
          {currentWeek.map((day) => (
            <div key={day.id} className="col-2">
              <div className="square dateFont">
                <span>{day.name}</span>
                <span>{day.date}</span>
              </div>
              <div className="tall-column">
                {day.timeslots.map((timeslot, dayIndex) => {
                  const key = `${day.id}-${dayIndex}`;
                  const isBooked = timeslotState[key];
                  return (
                    <button
                      key={dayIndex} //0-6 depending on what weekday.
                      className={`btn btn-primary mt-1 mb-1 bookingBtn${isBooked ? ' booked' : ''}`}
                      onClick={() => handleTimeslot(day.id, dayIndex)}
                      disabled={isBooked || day.date < today.getDate() && weekIndex === 0}
                    >
                      {isBooked ? 'Booked' : timeslot.time} {/*prints the booked*/}
                    </button> 
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
