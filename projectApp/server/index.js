const express = require("express"); // Connection between backend and frontend
const app = express();
const cors = require("cors"); //Don't know wtf this is
const port = 5000;
const pool = require("./db"); // Connection to database from app

// middleware setup
app.use(cors());
app.use(express.json());

//Routes// How the website components comunicate with our backend
// The basics:
//              app.post: to add new data to your database
//              app.get: to get data from your database
//              app.put: to update already existing data in your database

// Instructions for use and testing:
//          download postman app
//          open new tab
//          change to POST in the dropdown
//          type in: http://localhost5000/user
//          in the box type in your desired new data in the following format
//          {
//              "firstname": "value",
//              "middlename": "value",
//              "lastname":"value"
//              ... (do for the rest of the values in parenthesis in try)
//          }
//          Hit send ONCE

//      Testing if your query worked in adding the data to the db:
//          change drop down to GET (this runs app.get("/user",...) declared below)
//          keep the link the same
//          hit send
//          the new entry should appear in the table

// add new user
app.post("/user", async (request, response) => {
  try {
    const {
      firstname,
      middlename,
      lastname,
      emailaddress,
      phonenumber,
      user_address,
      streetname,
      city,
      province,
    } = request.body;
    const newUser = await pool.query(
      "INSERT INTO public.user (firstname, middlename, lastname, emailaddress, phonenumber, user_address, streetname, city, province) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        firstname,
        middlename,
        lastname,
        emailaddress,
        phonenumber,
        user_address,
        streetname,
        city,
        province,
      ]
    );
    response.json(newUser.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// add new host
app.post("/host", async (request, response) => {
  try {
    const { userfk } = request.body;
    const newHost = await pool.query(
      "INSERT INTO public.host(userfk) VALUES ($1) RETURNING *",
      [userfk]
    );
    response.json(newHost.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// add new guest
app.post("/guest", async (request, response) => {
  try {
    const { userfk } = request.body;
    const newGuest = await pool.query(
      "INSERT INTO public.guest (userfk) VALUES ($1) RETURNING *",
      [userfk]
    );
    response.json(newGuest.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// add new employee
app.post("/employee", async (request, response) => {
  try {
    const { userfk, managerid, position, salary } = request.body;
    const newEmployee = await pool.query(
      "INSERT INTO public.employee (userfk, managerid, position, salary) VALUES ($1, $2, $3, $4) RETURNING *",
      [userfk, managerid, position, salary]
    );
    response.json(newEmployee.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// add new branch
app.post("/branch", async (request, response) => {
  try {
    const { managerid, country, branchname } = request.body;
    const newBranch = await pool.query(
      "INSERT INTO public.branch (managerid, country, branchname) VALUES ($1, $2, $3) RETURNING *",
      [managerid, country, branchname]
    );
    response.json(newBranch.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// add new property
app.post("/property", async (request, response) => {
  try {
    const {
      hostid,
      branchid,
      streetnumber,
      streetname,
      city,
      proximitytoattractions,
    } = request.body;
    const newProperty = await pool.query(
      "INSERT INTO public.property (hostid, branchid, streetnumber, streetname, city, proximitytoattractions) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [hostid, branchid, streetnumber, streetname, city, proximitytoattractions]
    );
    response.json(newProperty.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//get all users
app.get("/user", async (request, response) => {
  try {
    const allUsers = await pool.query("SELECT * from public.user");
    response.json(allUsers.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// use of user defined function QUERY EXERCISE 10
app.get("/user/fnf:first&:last", async (request, response) => {
  try {
    const firstname = request.params.first;
    const lastname = request.params.last;
    const fullName = await pool.query(
      "SELECT FirstNameFirst($1, $2) as FullName",
      [firstname, lastname]
    );

    response.json(fullName.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// USING QUERY 2.. View definition in database.sql file
// must insert values in Property, pricing, rentalagreement, payment tables
app.get("/guest/view", async (request, response) => {
  try {
    const allGuests = await pool.query("SELECT * FROM GuestListView");
    response.json(allGuests.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/guest/rentals", async (request, response) => {
  try {
    const cheapRentals = await pool.query(
      "select p.id, min(pr.price), p.streetNumber, p.streetName, p.city, p.proximityToAttractions from Pricing pr, Property p where pr.hostID = p.hostID and pr.propretyid = p.id group by p.streetNumber, p.streetName, p.city, p.proximityToAttractions, p.id order by 1"
    );

    response.json(cheapRentals.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/guest/bill", async (request, response) => {
  try {
    const bill = await pool.query("Select * from Bill");
    response.json(bill.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// queries for employees

// get all employees
app.get("/employee", async (request, response) => {
  try {
    const allEmployees = await pool.query("SELECT * from employee");
    response.json(allEmployees.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//query 1
app.get("/query1", async (request, response) => {
  try {
    const q1 = await pool.query(
      ' SELECT (select firstnamefirst(u.firstname, u.lastname)), s.propertyid, s.price, s.startdate, s.paymenttype, s.paymentstatus, s.hometype FROM "user" u JOIN ( SELECT g."userId", r.propertyid, pr.price, r.startdate, p.paymenttype, p.paymentstatus, pr.hometype FROM rentalagreement r, payment p, property w, guest g, pricing pr WHERE (r.guestid = p.guestid AND r.propertyid = w.id AND g.id = r.guestid and pr.propretyid = w.id) ORDER BY w.branchid, p.guestid) s ON u.id = s."userId" order by paymenttype, startdate'
    );
    response.json(q1.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//query 4
app.get("/query4", async (request, response) => {
  try {
    const q4 = await pool.query(
      "select RentalAgreement.propertyID, rating , branchID from RentalAgreement , Review , Property where RentalAgreement.propertyID = Review.propretyID and RentalAgreement.propertyID = Property.ID order by branchID, rating"
    );
    response.json(q4.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/query5", async (request, response) => {
  try {
    const q4 = await pool.query(
      "Select * from property p where p.id not in (select r.propertyid from rentalagreement r)"
    );
    response.json(q4.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//q6 doesn't work yet
app.get("/query6", async (request, response) => {
  try {
    //ISSUE: @TIMES gives syntax error
    const q6 = await pool.query(
      "SELECT * FROM Property, RentalAgreement WHERE Property.ID = RentalAgreement.propertyID AND ( select count(*)  from  (select extract (day from  generate_series(   (select to_timeStamp(RentalAgreement.startDate,'YYYY-MM-DD')),  (select to_timeStamp(RentalAgreement.endDate , 'YYYY-MM-DD')), '1 day'::interval) ) as aDay)as dates  where 10 = aDay order by 1) > 0"
    );
    response.json(q6.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//query 7
app.get("/query7", async (request, response) => {
  try {
    //ISSUE: SYNTAX ERROR AFTER DOUBLE QUOTE
    const q7 = await pool.query(
      'SELECT  s1.fname, s1.lname, b.id, b.branchname, b.country FROM branch b JOIN (SELECT public.user.firstname as fname, public.user.lastname as lname, employee.managerid as mID FROM Employee, public.user WHERE public.user.id = employee."userId" and employee.salary >= 15000.00) S1 ON S1.mID = b.managerid'
    );
    response.json(q7.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// the backend address appears on console
app.listen(port, () => {
  console.log("Server magic happens on port " + port);
});
