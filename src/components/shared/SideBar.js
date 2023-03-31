import React from 'react'
import { Link } from 'react-router-dom'


const SideBar = () => {
  return (
    <>
    <ul className="list-unstyled">
        <li>
            <Link to="/user">Manage User</Link>

        </li>
        <li>
            <Link to="/manage-questions">Manage Questions</Link>
        </li>
        <li>
            <Link to="/history">History</Link>
        </li>
        <li>
            <Link to="/logout">Logout</Link>
        </li>
    </ul>

    </>
  )
}

export default SideBar
