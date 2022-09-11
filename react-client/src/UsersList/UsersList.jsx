import React, { useState, useEffect, useRef } from "react";
import "./UsersList.css";
import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { useStore } from "./../useStore";

function UsersList() {
  const { users, fetchUsers } = useStore();
  //const [users, setUsers] = useState([]);
  //ant table
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  let navigate = useNavigate();

  /*const fetchUsers = () => {
    fetch("http://localhost:4000/api/users")
      .then((response) => response.json())
      .then((response) => {
        setUsers(response);
      });
  };*/ //same as the useStore

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUserFromTable = (id) => {
    console.log(id); // fetch(`http://localhost:4000/api/users/${id}` for express server
    if (id) {
      fetch(`http://localhost:8000/api/users/${id}`, {
        method: "DELETE",
      }).then(fetchUsers);
    }
  };

  //ant table
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "10%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "E-mail",
      dataIndex: "email",
    },
    {
      title: "Profession",
      dataIndex: "profession",
    },
    {
      title: "Age",
      dataIndex: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Location",
      dataIndex: "location",
      filters: [
        {
          text: "France",
          value: "France",
        },
        ,
        {
          text: "Germany",
          value: "Germany",
        },
        {
          text: "USA",
          value: "USA",
        },
        {
          text: "UK",
          value: "UK",
        },
      ],
      onFilter: (value, record) => record.location.startsWith(value),
      filterSearch: true,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      width: "10%",
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => {
              navigate(`/edit-user/${record.id}`);
            }}
          >
            <i
              className="bi bi-pencil"
              style={{
                cursor: "pointer",
                textDecoration: "none",
                color: "orange",
                display: "flex",
                justifyContent: "center",
              }}
            ></i>
          </Button>
          <Button onClick={() => deleteUserFromTable(record.id)}>
            <i
              className="bi bi-x-lg"
              style={{
                cursor: "pointer",
                textDecoration: "none",
                color: "red",
                display: "flex",
                justifyContent: "center",
              }}
            ></i>
          </Button>
        </Space>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  /*  const data = users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      profession: user.profession,
      age: user.age,
      location: user.location,
    };
  });*/

  return (
    <>
      <div className="table-html">
        <h2 className="title">User Management</h2>
        <h3>Ant design version</h3>
        <Button className="button-ant" type="primary">
          <Link
            to={`/add-user`}
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: "black",
            }}
          >
            Add new User
          </Link>
        </Button>
        <Table columns={columns} dataSource={users} onChange={onChange} />
        <h3>HTML version</h3>
        <button className="add-user-button">
          <Link
            to={`/add-user`}
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: "black",
            }}
          >
            Add new User
          </Link>
        </button>
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Profession</th>
              <th>Age</th>
              <th>Location</th>
              <th colSpan={2}>Actions </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.profession}</td>
                  <td>{user.age}</td>
                  <td>{user.location}</td>
                  <td>
                    <Link
                      to={`/edit-user/${user.id}`}
                      style={{
                        cursor: "pointer",
                        textDecoration: "none",
                        color: "orange",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <i className="bi bi-pencil"></i>
                    </Link>
                  </td>
                  <td>
                    <a
                      className="remove-cursor"
                      onClick={() => deleteUserFromTable(user.id)}
                    >
                      <i className="bi bi-x-lg"></i>
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  ); //dataSource={data}
}
export default UsersList;
