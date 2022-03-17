import React, { Fragment } from "react";
import "./App.css";
import User from "./components/User";
import Employee from "./components/Employee";
import GuestList from "./components/GuestList";
import Guest from "./components/Guest";

// this is the file that is called when you run the app
// to run the app use yarn start from inside the client folder
// remember that the server backend folder has to be running on your terminal at the same time

function App() {
  return (
    <Fragment>
      <GuestList />
      <Guest />
      <User />
      <Employee />
    </Fragment>
  );
}

export default App;
