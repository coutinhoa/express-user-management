import React, { useState, useEffect } from "react";
import "./EditUser.css";
import { Link, useParams, useNavigate } from "react-router-dom";

function EditUser({}) {
  const params = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profession, setProfession] = useState("");
  const [age, setAge] = useState(0);
  const [location, setLocation] = useState("");
  let navigate = useNavigate();

  const fetchUser = () => {
    fetch(`http://localhost:8000/api/users/${params.id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        setName(response.name);
        setEmail(response.email);
        setProfession(response.profession);
        setAge(response.age);
        setLocation(response.location);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const updateUser = (event) => {
    event.preventDefault();
    console.log(name);
    fetch(`http://localhost:8000/api/users/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name, email, profession, age, location }),
    }).then(() => navigate("/"));
  };

  return (
    <div className="edit-user">
      <h2 className="header">
        <div>
          <i className="bi bi-arrow-left"></i>
          <Link
            to="/"
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: "black",
            }}
          >
            Back to the homepage
          </Link>
        </div>
        <div>Edit a user</div>
      </h2>
      <form onSubmit={updateUser} className="html-form">
        <div className="label-input-container">
          <label className="label-container">Name:</label>
          <input
            className="input-container"
            type="text"
            name="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="label-input-container">
          <label className="label-container">Email:</label>
          <input
            className="input-container"
            type="email"
            name="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="label-input-container">
          <label className="label-container">Profession:</label>
          <input
            className="input-container"
            type="text"
            name="profession"
            required
            value={profession}
            onChange={(event) => setProfession(event.target.value)}
          ></input>
        </div>
        <div className="label-input-container">
          <label className="label-container">Age:</label>
          <input
            className="input-container"
            type="number"
            name="age"
            required
            value={age}
            onChange={(event) => setAge(event.target.value)}
          />
        </div>
        <div className="label-input-container">
          <label className="label-container">Location:</label>
          <input
            className="input-container"
            type="text"
            name="location"
            required
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
        </div>
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditUser;
