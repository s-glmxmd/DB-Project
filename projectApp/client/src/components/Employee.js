import React, { Fragment, useState, useEffect } from "react";

const Employee = () => {
  //user states
  const [firstName, setfirstName] = useState(null);
  const [lastName, setlastName] = useState(null);
  const [mid, setmid] = useState(null);
  const [country, setCountry] = useState(null);
  const [branchname, setBranchname] = useState(null);
  const [id, setId] = useState(null);

  const [user, setUser] = useState([]);

  //idk anymore
  const [firstnamefirst, setFirstnamefirst] = useState(null);
  const [price, setPrice] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [paymenttype, setPaymenttype] = useState(null);
  const [paymentstatus, setPaymentstatus] = useState(null);
  const [hometype, setHometype] = useState(null);
  const [guests, setGuests] = useState([]);

  //todo query1 + bh query methods

  //employee states
  const [managerid, setManagerId] = useState(null);
  const [position, setPosition] = useState(null);
  const [salary, setSalary] = useState(null);
  const [userId, setUserid] = useState(null); // setUserid not being used
  const [employees, setEmployees] = useState([]);

  //property states
  const [propertyid, setPropertyid] = useState(null);
  const [hostid, setHostid] = useState(null);
  const [branchid, setBranchid] = useState(null);
  const [streetnumber, setStreetnumber] = useState(null);
  const [streetname, setStreetname] = useState(null);
  const [city, setCity] = useState(null);
  const [proximitytoattractions, setProximitytoattractions] = useState(null);
  const [properties, setProperties] = useState([]);
  const [properties2, setProperties2] = useState([]);

  //review+rating
  const [rating, setRating] = useState(null);
  const [review, setReview] = useState([]);
  const [result, setResult] = useState([]);

  const onSubmitForm = async (event) => {
    event.preventDefault();
    try {
      const body = {
        managerid,
        position,
        salary,
        userId,
      };

      // the call to the backend function we wrote
      // remember post is for adding new data, get to pull existing data, put to update existing data
      const response = await fetch("http://localhost:5000/employee", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      // reloads the page once all the previous code has been executed
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const onSubmitForm2 = async (event) => {
    event.preventDefault();
    try {
      const body = {
        propertyid,
        rating,
        branchid,
      };

      // the call to the backend function we wrote
      // remember post is for adding new data, get to pull existing data, put to update existing data
      const response = await fetch("http://localhost:5000/query4", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      // reloads the page once all the previous code has been executed
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const onSubmitForm3 = async (event) => {
    event.preventDefault();
    try {
      const body = {
        hostid,
        branchid,
        streetnumber,
        streetname,
        city,
        proximitytoattractions,
      };

      // the call to the backend function we wrote
      // remember post is for adding new data, get to pull existing data, put to update existing data
      const response = await fetch("http://localhost:5000/query5", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      // reloads the page once all the previous code has been executed
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const onSubmitForm4 = async (event) => {
    event.preventDefault();
    try {
      const body = {
        hostid,
        branchid,
        streetnumber,
        streetname,
        city,
        proximitytoattractions,
      };

      // the call to the backend function we wrote
      // remember post is for adding new data, get to pull existing data, put to update existing data
      const response = await fetch("http://localhost:5000/query6", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      // reloads the page once all the previous code has been executed
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  // query7

  const onSubmitForm5 = async (event) => {
    event.preventDefault();
    try {
      const body = {
        firstName,
        lastName,
        mid,
        id,
        managerid,
        country,
        branchname,
      };

      // the call to the backend function we wrote
      // remember post is for adding new data, get to pull existing data, put to update existing data
      const response = await fetch("http://localhost:5000/query7", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      // reloads the page once all the previous code has been executed
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const getAllQ1 = async () => {
    console.log("Blah");
    try {
      const response = await fetch("http://localhost:5000/query1");
      const q1list = await response.json();

      setGuests(q1list);
      //window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const getAllQ4 = async () => {
    console.log("Blah");
    try {
      const response = await fetch("http://localhost:5000/query4");
      const q4list = await response.json();

      setResult(properties.concat(review));
      setResult(q4list);
      //window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const getAllQ5 = async () => {
    console.log("Blah");
    try {
      const response = await fetch("http://localhost:5000/query5");
      const q5list = await response.json();

      setProperties(q5list);
      //window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const getAllQ6 = async () => {
    console.log("Blah");
    try {
      const response = await fetch("http://localhost:5000/query6");
      const q6List = await response.json();

      setProperties2(q6List);
      //window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const getAllQ7 = async () => {
    console.log("Blah");
    try {
      const response = await fetch("http://localhost:5000/query7");
      const q7list = await response.json();

      setUser(q7list);
      //window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const getAllEmployees = async () => {
    console.log("Blah");
    try {
      const response = await fetch("http://localhost:5000/employee");
      const employeeList = await response.json();

      setEmployees(employeeList);
      //window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    // don't kill yourselves over styling the component elements.. she's not giving extra points for it
    // as long as it works it should be fine
    // we should be able to accomplish what we need with basic HTML tags
    <Fragment>
      <div>
        <h1>All employees</h1>
        <table>
          <thead>
            <tr>
              <th>managerid</th>
              <th>position</th>
              <th>salary</th>
              <th>userId</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.managerid}</td>
                <td>{employee.position}</td>
                <td>{employee.salary}</td>
                <td>{employee.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={getAllEmployees}>Get info</button>
      </div>

      <div>
        <h1>query1</h1>
        <table>
          <thead>
            <tr>
              <th>firstnamefirst</th>
              <th>propertyid</th>
              <th>price</th>
              <th>startDate</th>
              <th>paymenttype</th>
              <th>paymentstatus</th>
              <th>hometype</th>
            </tr>
          </thead>

          <tbody>
            {guests.map((guest) => (
              <tr key={result.id}>
                <td>{guest.firstnamefirst}</td>
                <td>{guest.propertyid}</td>
                <td>{guest.price}</td>
                <td>{guest.startDate}</td>
                <td>{guest.paymenttype}</td>
                <td>{guest.paymentstatus}</td>
                <td>{guest.hometype}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={getAllQ1}>Get info</button>
      </div>

      <div>
        <h1>query4</h1>
        <table>
          <thead>
            <tr>
              <th>propertyid</th>
              <th>rating</th>
              <th>branchid</th>
            </tr>
          </thead>

          <tbody>
            {result.map((result) => (
              <tr key={result.id}>
                <td>{result.propertyid}</td>
                <td>{result.rating}</td>
                <td>{result.branchid}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={getAllQ4}>Get info</button>
      </div>

      <div>
        <h1>query5</h1>
        <table>
          <thead>
            <tr>
              <th>hostid</th>
              <th>branchid</th>
              <th>streetnumber</th>
              <th>streetname</th>
              <th>city</th>
              <th>proximitytoattractions</th>
            </tr>
          </thead>

          <tbody>
            {properties.map((property) => (
              <tr key={property.id}>
                <td>{property.hostid}</td>
                <td>{property.branchid}</td>
                <td>{property.streetnumber}</td>
                <td>{property.streetname}</td>
                <td>{property.city}</td>
                <td>{property.proximitytoattractions}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={getAllQ5}>Get info</button>
      </div>

      <div>
        <h1>query6</h1>
        <table>
          <thead>
            <tr>
              <th>hostid</th>
              <th>branchid</th>
              <th>streetnumber</th>
              <th>streetname</th>
              <th>city</th>
              <th>proximitytoattractions</th>
            </tr>
          </thead>

          <tbody>
            {properties2.map((property2) => (
              <tr key={property2.id}>
                <td>{property2.hostid}</td>
                <td>{property2.branchid}</td>
                <td>{property2.streetnumber}</td>
                <td>{property2.streetname}</td>
                <td>{property2.city}</td>
                <td>{property2.proximitytoattractions}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={getAllQ6}>Get info</button>
      </div>

      <div>
        <h1>query7</h1>
        <table>
          <thead>
            <tr>
              <th>firstName</th>
              <th>lastName</th>
              <th>mid</th>
              <th>id</th>
              <th>managerid</th>
              <th>country</th>
              <th>branchname</th>
            </tr>
          </thead>

          <tbody>
            {user.map((u) => (
              <tr key={u.id}>
                <td>{u.fname}</td>
                <td>{u.lname}</td>
                <td>{u.mid}</td>
                <td>{u.id}</td>
                <td>{u.managerid}</td>
                <td>{u.country}</td>
                <td>{u.branchname}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={getAllQ7}>Get info</button>
      </div>
    </Fragment>
  );
};

export default Employee;
