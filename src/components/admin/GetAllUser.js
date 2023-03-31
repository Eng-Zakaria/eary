import React from 'react'
import { Link } from 'react-router-dom'


const GetAllUser = () => {
const user = [
    {
      id: 1,
      name: "Leanne Graham",

      email: "ahmmd@gmail.com",
    },
    {
      id: 2,
      name: "Ervin Howell",
      email: "ahmm2d@gmail.com",
    }
  ];
  const deleteUser = (user) => {
  };
 
  return (
    <>
      <h1> AllsUser </h1>
      <Link to={"/user/add"} className="btn btn-success mt-3">
        AddUser
      </Link>
      <table className="table table-striped mt-5 productt">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">userName</th>
            <th scope="col">email</th>
            <th scope="col">col</th>
            <th scope="col">col</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user) => {
            return (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.email}..</td>
                <td>
                  {" "}
                  <Link className="btn btn-info" to={`/user/${user.id}`}>
                    Veiw
                  </Link>{" "}
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteUser(user)}
                  >
                    Delete
                  </button>
                  <button className="btn btn-primary">Edit</button>{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
  
}

export default GetAllUser
