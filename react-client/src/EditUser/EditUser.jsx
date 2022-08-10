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
    fetch(`http://localhost:4000/api/users/${params.id}`, {
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
    fetch(`http://localhost:4000/api/users/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name, email, profession, age, location }),
    }).then(() => navigate("/"));
  };

  return (
    <div className="add-user">
      <h2>
        <Link to="/">Edit user</Link>
      </h2>
      <form onSubmit={updateUser}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label>Profession:</label>
          <input
            type="text"
            name="profession"
            required
            value={profession}
            onChange={(event) => setProfession(event.target.value)}
          ></input>
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            required
            value={age}
            onChange={(event) => setAge(event.target.value)}
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            required
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditUser;
