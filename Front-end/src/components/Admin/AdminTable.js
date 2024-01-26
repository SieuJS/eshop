import * as React from "react";

export default function DataTable(props) {
  const usersData = props.usersData;

  const handlePermission = async (userId, permission) => {
    if (permission === 1)
      permission = 0
    else
      permission = 1
    const result = await fetch('http://localhost:5000/api/account/ban', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        permission: permission
      }),
    })
    const data = await result.json();
    if (data.isSuccess) {
      props.banHandler(userId, permission)
    }
  }

  return (
    <div>
      <table className="table ">
        <thead>
          <tr className="text-center">
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Name</th>
            <th scope="col">Date Of Birth</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {usersData &&
            usersData.map((user, index) => {
              return (
                <tr key={index} className="text-center">
                  <td>{user.ID}</td>
                  <td>{user.Username}</td>
                  <td>{user.Name}</td>
                  <td>{user.Email}</td>
                  <td>{user.DOB}</td>
                  <td>{user.Role.trim().toLowerCase()}</td>
                  <td>
                    {user.Permission !== 1 ? (
                      <i class="fa-solid fa-lock icon-ban" onClick={() => handlePermission(user.ID, user.Permission)}></i>
                    ) : (
                      <i class="fa-solid fa-unlock icon-unban" onClick={() => handlePermission(user.ID, user.Permission)}></i>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      
    </div>
  );
}