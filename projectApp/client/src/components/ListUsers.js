import React, { Fragment, useState, useEffect } from "react";

const ListUsers = () => {
  const [users, setUsers] = useState([]);

  async function getUsers() {
    const res = await fetch("http://localhost:5000/user");

    const userArray = await res.json();

    setUsers(userArray);
  }

  useEffect(() => {
    getUsers();
  }, []);

  console.log(users);

  return (
    <Fragment>
      {" "}
      <table class="table mt-5">
        <thead>
          <tr>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.todo_id}>
              <td>{user.firstname}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListUsers;
