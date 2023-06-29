import React, { useState } from 'react';

const DriverTable = ({ drivers }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredDrivers = drivers.filter(
    (driver) =>
      driver.forename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.vehicleRegistration.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getWeekTotalDuration = (traces) => {
    let totalDuration = 0;
    traces.forEach((trace) => {
      trace.activity.forEach((activity) => {
        totalDuration += activity.duration;
      });
    });
    return totalDuration;
  };

  const getDayActivity = (traces, day) => {
    const trace = traces.find((trace) => trace.date === day);
    if (trace) {
      const activities = trace.activity.map((activity) => activity.type);
      return activities.includes('drive') || activities.includes('rest') || activities.includes('work');
    }
    return false;
  };

  const getActivityTotalDuration = (traces, activityType) => {
    let totalDuration = 0;
    traces.forEach((trace) => {
      trace.activity.forEach((activity) => {
        if (activity.type === activityType) {
          totalDuration += activity.duration;
        }
      });
    });
    return totalDuration;
  };

  const getDayOfWeekAbbreviation = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="table">
      <div className="search-box">
        <input type="text" placeholder="Search drivers" value={searchQuery} onChange={handleSearch} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Driver Name</th>
            <th>Vehicle Registration</th>
            <th>Total Activity Duration (minutes)</th>
            <th>Week Activity</th>
          </tr>
        </thead>
        <tbody>
          {filteredDrivers.map((driver) => (
            <tr key={driver.driverID}>
              <td>{`${driver.forename} ${driver.surname}`}</td>
              <td>{driver.vehicleRegistration}</td>
              <td>
                <div>Drive: {getActivityTotalDuration(driver.traces, 'drive')} minutes</div>
                <div>Rest: {getActivityTotalDuration(driver.traces, 'rest')} minutes</div>
                <div>Work: {getActivityTotalDuration(driver.traces, 'work')} minutes</div>
                <div>Available: {getActivityTotalDuration(driver.traces, 'available')} minutes</div>
                <div>Total: {getWeekTotalDuration(driver.traces)} minutes</div>
              </td>
              <td>
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                  <div
                    key={day}
                    className={`day-box ${getDayActivity(driver.traces, `2021-02-0${day}`) ? 'filled' : ''}`}
                  >
                    <span className="day-label">{getDayOfWeekAbbreviation(`2021-02-0${day}`)}</span>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DriverTable;
