import React, { Fragment, useState, useEffect } from "react";

const Guest = () => {
  const [rentals, setRentals] = useState([]);
  const [bills, setBills] = useState([]);

  const onGetRentals = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/guest/rentals");
      const allRentals = await response.json();

      setRentals(allRentals);
    } catch (err) {
      console.error(err.message);
    }
  };

  const onGetBill = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/guest/bill");
      const allBills = await response.json();

      setBills(allBills);
    } catch (err) {
      console.error(err.message);
    }
  };
  var i = 0;

  return (
    <Fragment>
      <div>
        <h1>Cheapest Rentals</h1>
        <table>
          <thead>
            <tr>
              <th>price</th>
              <th>streetNumber</th>
              <th>streetName</th>
              <th>city</th>
              <th>proximityToAttractions</th>
            </tr>
          </thead>
          <tbody>
            {rentals.map((rental) => (
              <tr key={rental.id}>
                <td>{rental.min}</td>
                <td>{rental.streetnumber}</td>
                <td>{rental.streetname}</td>
                <td>{rental.city}</td>
                <td>{rental.proximitytoattractions}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={onGetRentals}>Get listing</button>
      </div>
      <div>
        <h1>Bill</h1>
        <table>
          <thead>
            <th>hometype</th>
            <th>hostname</th>
            <th>streetName</th>
            <th>streetNumber</th>
            <th>price</th>
            <th>payment amount</th>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={i++}>
                <td>{bill.hometype}</td>
                <td>{bill.hostname}</td>
                <td>{bill.streetname}</td>
                <td>{bill.streetnumber}</td>
                <td>{bill.price}</td>
                <td>{bill.paymentamount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={onGetBill}>Get Bills</button>
      </div>
    </Fragment>
  );
};
export default Guest;
