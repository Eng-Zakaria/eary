import React from 'react'

const AddUser = () => {
  return (
    <div>
      <h1>AddUser</h1>
       <form >
            <div className="form-group">
                <label htmlFor="title">UserName</label>
                <input type="text" className="form-control" id="title" placeholder="Enter username"
                 />
            </div>
            <div className="form-group">
                <label htmlFor="description">Email</label>
                <input type="email" className="form-control" id="description" placeholder="Enter email" 
                
                />
            </div>
           
            <button type="submit" className="btn btn-primary">AddUser</button>
       </form>
    </div>
  )
}

export default AddUser
