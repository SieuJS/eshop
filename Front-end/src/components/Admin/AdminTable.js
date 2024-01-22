import * as React from "react";

export default function DataTable(props) {
  const usersData = props.usersData;
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
                  <td>{user.Role}</td>
                  <td>
                    {user.Role !== "Locked" ? (
                      <i class="fa-solid fa-lock"></i>
                    ) : (
                      <i class="fa-solid fa-unlock"></i>
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
