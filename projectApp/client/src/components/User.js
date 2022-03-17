import React, { Fragment, useState, useEffect } from "react";
// File to add new guests.. they should look like this
const User = () => {
  // every attribute in the table should have its own state associated to it and they should all be initially null
  //NOTE: if your attribute is called "attribute" then the corresponding set state method is called "setAttribute"
  //      you have to keep the sames the name with the same camel casing or it won't know what you're calling
  //        if you encounter issues try googling react functional components with hooks
  //         otherwise HIT ME UP :))

  // Adding new user in public.user states:
  const [firstname, setFirstname] = useState(null);
  const [middlename, setMiddlename] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [emailaddress, setEmailaddress] = useState(null);
  const [phonenumber, setPhonenumber] = useState(null);
  const [guestaddress, setguestaddress] = useState(null);
  const [streetname, setStreetname] = useState(null);
  const [city, setCity] = useState(null);
  const [province, setProvince] = useState(null);
  const [users, setUsers] = useState([]);

  // getting guest from guestlistview state
  const [guests, setGuests] = useState([]);

  // adding new property states:
  const [hostid, setHostid] = useState();
  const [branchid, setBranchid] = useState();
  const [streetnumber, setStreetnumber] = useState();
  const [proximitytoattractions, setProximitytoattractions] = useState();

  // on submit method called when submit button on form is clicked
  const onSubmitForm = async (event) => {
    // stop the page from reloading before the task has been finished
    event.preventDefault();
    try {
      const body = {
        firstname,
        middlename,
        lastname,
        emailaddress,
        phonenumber,
        guestaddress,
        streetname,
        city,
        province,
      };
      // the call to the backend function we wrote
      // remember post is for adding new data, get to pull existing data, put to update existing data
      const response = await fetch("http://localhost:5000/guest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      // reloads the page once all the previous code has been executed
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const onAddProperty = async (event) => {
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
      const response = await fetch("http://localhost:5000/property", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(body);

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const getAllUsers = async () => {
    console.log("Blah");
    try {
      const response = await fetch("http://localhost:5000/user");
      const userList = await response.json();

      setUsers(userList);
      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const getAllGuests = async () => {
    try {
      const response = await fetch("http://localhost:5000/guest/view");
      const guestList = await response.json();

      setGuests(guestList);
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
        <h1>All guests</h1>
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
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstname}</td>
                <td>{user.middlename}</td>
                <td>{user.lastname}</td>
                <td>{user.emailaddress}</td>
                <td>{user.phonenumber}</td>
                <td>{user.guest_address}</td>
                <td>{user.streetname}</td>
                <td>{user.city}</td>
                <td>{user.province}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={getAllUsers}>Get users from user table</button>
      </div>
      {/* <div>
        <h1>Add new user</h1> */}
      {/* <form id={1} onSubmit={onSubmitForm}>
          <input
            type="text"
            placeholder="firstname"
            value={firstname}
            onChange={(event) => setFirstname(event.target.value)}
          />
          <input
            type="text"
            placeholder="middlename"
            value={middlename}
            onChange={(event) => setMiddlename(event.target.value)}
          />
          <input
            type="text"
            placeholder="lastname"
            value={lastname}
            onChange={(event) => setLastname(event.target.value)}
          />
          <input
            type="text"
            placeholder="emailaddress"
            value={emailaddress}
            onChange={(event) => setEmailaddress(event.target.value)}
          />
          <input
            type="text"
            pattern="\d*"
            maxLength={10}
            minLength={10}
            placeholder="phonenumber"
            value={phonenumber}
            onChange={(event) => setPhonenumber(event.target.value)}
          />
          <input
            type="text"
            pattern="\d*"
            maxLength={4}
            placeholder="guestaddress"
            value={guestaddress}
            onChange={(event) => setguestaddress(event.target.value)}
          />
          <input
            type="text"
            placeholder="streetname"
            value={streetname}
            onChange={(event) => setStreetname(event.target.value)}
          />
          <input
            type="text"
            placeholder="city"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
          <input
            type="text"
            placeholder="province"
            value={province}
            onChange={(event) => setProvince(event.target.value)}
          />
          <button>Add guest</button>
        </form> */}
      {/* </div> */}
      {/* <div>
        <h1>Add property</h1>
        <form onSubmit={onAddProperty}>
          <input
            type="number"
            placeholder="hostid"
            value={hostid}
            onChange={(event) => setHostid(event.target.value)}
          />
          <input
            type="number"
            placeholder="branchid"
            value={branchid}
            onChange={(event) => setBranchid(event.target.value)}
          />
          <input
            type="number"
            placeholder="streetnumber"
            value={streetnumber}
            onChange={(event) => setStreetnumber(event.target.value)}
          />
          <input
            type="text"
            placeholder="city"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
          <input
            type="text"
            placeholder="streetname"
            value={streetname}
            onChange={(event) => setStreetname(event.target.value)}
          />
          <input
            type="text"
            pattern="[0-9]([.][0-9])?"
            step="0.01"
            placeholder="proximity to attractions"
            value={proximitytoattractions}
            onChange={(event) => setProximitytoattractions(event.target.value)}
          />
          <button>Add property</button>
        </form>
      </div> */}
    </Fragment>
  );
};

export default User;
