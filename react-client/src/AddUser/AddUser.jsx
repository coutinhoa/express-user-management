import React from "react";
import "./AddUser.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, InputNumber } from "antd";

function AddUser() {
  let navigate = useNavigate();

  const addUserToTable = (event) => {
    event.preventDefault();

    fetch(`http://localhost:8000/api/users/`, {
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

  //ant Form
  const onFinish = (values) => {
    console.log(values);
    fetch(`http://localhost:8000/api/users/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        profession: values.profession,
        age: values.age,
        location: values.location,
      }),
    }).then(() => navigate("/"));
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      text: "${label} is not a valid text!",
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  return (
    <div className="add-user">
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
        <div>Add a new user</div>
      </h2>
      <h3>Ant design version</h3>
      <Form
        {...layout}
        name="nest-messages"
        validateMessages={validateMessages}
        onFinish={onFinish}
      >
        <Form.Item
          name={["name"]}
          label="Name"
          rules={[{ type: "string", required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["email"]}
          label="Email"
          rules={[
            {
              type: "email",
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["profession"]}
          label="Profession"
          rules={[
            {
              type: "string",
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["age"]}
          label="Age"
          rules={[
            {
              type: "number",
              min: 0,
              max: 100,
              required: true,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name={["location"]}
          label="Location"
          rules={[
            {
              type: "string",
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <h3>HTML version</h3>
      <form onSubmit={addUserToTable} className="html-form">
        <div className="label-input-container">
          <label className="label-container">Name:</label>
          <input
            className="input-container"
            type="text"
            name="name"
            required
          ></input>
        </div>
        <div className="label-input-container">
          <label className="label-container">Email:</label>
          <input
            className="input-container"
            type="email"
            name="email"
            required
          ></input>
        </div>
        <div className="label-input-container">
          <label className="label-container">Profession:</label>
          <input
            className="input-container"
            type="text"
            name="profession"
            required
          ></input>
        </div>
        <div className="label-input-container">
          <label className="label-container">Age:</label>
          <input
            className="input-container"
            type="number"
            name="age"
            required
          ></input>
        </div>
        <div className="label-input-container">
          <label className="label-container">Location:</label>
          <input
            className="input-container"
            type="text"
            name="location"
            required
          ></input>
        </div>
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddUser;
