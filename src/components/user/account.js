import '../../assets/styles/App.css';
import '../../assets/styles/userForm.css';


import React, { useState } from 'react';
import axios from 'axios';

const CreateUserForm = () => {
  const [user, setUser] = useState({
    lastName: '',
    firstName: '',
    email: '',
    pwd: '',
    address: '',
    phone: ''
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Effectuer la requête POST pour créer l'utilisateur
    axios.post('http://localhost:3000/users/new_user', user)
      .then(response => {
        console.log(response.data);
        // Réinitialiser le formulaire après la création réussie
        setUser({
          lastName: '',
          firstName: '',
          email: '',
          pwd: '',
          address: '',
          phone: ''
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Password</label>
          <input
            type="password"
            id="pwd"
            name="pwd"
            value={user.pwd}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={user.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateUserForm;