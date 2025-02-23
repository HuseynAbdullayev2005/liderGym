import React, { useState, useEffect } from "react";
import "./AdminUsers.css";


function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/api/users/admin/users", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  const handleEditClick = (user) => {
    setEditingUserId(user._id);
    setEditedUser(user);
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditedUser({});
  };

  const handleInputChange = (e) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editedUser),
      });
      if (res.ok) {
        const updatedUser = await res.json();
        setUsers(users.map((u) => (u._id === id ? updatedUser : u)));
        setEditingUserId(null);
        setEditedUser({});
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
  <div className="admin_users">
        <h1>Manage Users</h1>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th className="actions_button">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  {editingUserId === user._id ? (
                    <input
                      name="username"
                      value={editedUser.username}
                      onChange={handleInputChange} />
                  ) : (
                    user.username
                  )}
                </td>
                <td>
                  {editingUserId === user._id ? (
                    <input
                      name="email"
                      value={editedUser.email}
                      onChange={handleInputChange} />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editingUserId === user._id ? (
                    <select
                      name="role"
                      value={editedUser.role}
                      onChange={handleInputChange}
                    >
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td style={{ textAlign: "center" }}>
                  {editingUserId === user._id ? (
                    <div className="button_group">
                      <button className="save_btn" onClick={() => handleSave(user._id)}>
                        Save
                      </button>
                      <button className="cancel_btn" onClick={handleCancelEdit}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button className="edit_btn" onClick={() => handleEditClick(user)}>
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
}

export default AdminUsers;
