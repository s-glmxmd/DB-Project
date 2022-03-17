import React, { Fragment, useState, useEffect } from "react";

const GuestList = () => {
  const [guests, setGuests] = useState([]);

  // method called when button is pressed
  async function getGuests() {
    const res = await fetch("http://localhost:5000/guest/view");

    const guestArray = await res.json();

    setGuests(guestArray);
  }

  // to have data load as soon as page is loaded
  //   useEffect(() => {
  //     getGuests();
  //   }, []);

  return (
    <Fragment>
      <h1>All guests from view</h1>
      <table>
        <thead>
          <tr>
            <th>firstname</th>
            <th>middlename</th>
            <th>lastname</th>
            <th>emailaddress</th>
            <th>phonenumber</th>
            <th>guestaddress</th>
            <th>streetname</th>
            <th>city</th>
            <th>province</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest.id}>
              <td>{guest.firstname}</td>
              <td>{guest.middlename}</td>
              <td>{guest.lastname}</td>
              <td>{guest.emailaddress}</td>
              <td>{guest.phonenumber}</td>
              <td>{guest.address}</td>
              <td>{guest.streetname}</td>
              <td>{guest.city}</td>
              <td>{guest.province}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={getGuests}>Get guests from view</button>
    </Fragment>
  );
};

export default GuestList;
