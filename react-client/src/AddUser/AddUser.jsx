import React from "react";
import "./AddUser.css";
import { Link, useNavigate } from "react-router-dom";

function AddUser() {
  let navigate = useNavigate();

  const addUserToTable = (event) => {
    event.preventDefault();

    fetch(`http://localhost:4000/api/users/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: event.target.name.value,
        email: event.target.email.value,
        profession: event.target.profession.value,
        age: event.target.age.value,
        location: event.target.location.value,
      }),
    }).then(() => navigate("/"));
  };

  return (
    <div className="add-user">
      <h2>
        <Link to="/">Add a new user</Link>
      </h2>
      <form onSubmit={addUserToTable}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" required></input>
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" required></input>
        </div>
        <div>
          <label>Profession:</label>
          <input type="text" name="profession" required></input>
        </div>
        <div>
          <label>Age:</label>
          <input type="number" name="age" required></input>
        </div>
        <div>
          <label>Location:</label>
          <input type="text" name="location" required></input>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddUser;
