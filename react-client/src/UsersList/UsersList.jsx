import React from "react";
import "./UsersList.css";
import { Link } from "react-router-dom";

function UsersList() {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    fetch("http://localhost:4000/api/users")
      .then((response) => response.json())
      .then((response) => {
        setUsers(response);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUserFromTable = (user) => {
    fetch(`http://localhost:4000/api/users/${user.id}`, {
      method: "DELETE",
    }).then(fetchUsers);
  };

  return (
    <div>
      <h2 className="title">User Management</h2>
      <div className="users-list">
        <table>
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
                    <Link to={`/edit-user/${user.id}`}>
                      Edit<i className="bi bi-x-lg"></i>
                    </Link>
                  </td>
                  <td>
                    <a onClick={() => deleteUserFromTable(user)}>
                      Remove <i className="bi bi-pencil"></i>
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <Link to={`/add-user`}>Add new User</Link>
      </div>
    </div>
  );
}
export default UsersList;
