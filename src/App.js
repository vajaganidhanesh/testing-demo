import React, { useState } from "react";
import validator from "validator";

function App() {
  const [signupInput, setSignupInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const { email, password, confirmPassword } = signupInput;
  const onChange = (e) => {
    setSignupInput((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (validator.isEmail(email)) {
      return setError("the email you put is invalid");
    }
  };
  return (
    <div className='container my-5'>
      <form onSubmit={submitForm}>
        <div className='mb-3'>
          <label htmlFor='email'>Email address</label>
          <input
            type='email'
            placeholder='enter email'
            className='form-control'
            id='email'
            name='email'
            value={email}
            onChange={onChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='password'>Enter Password</label>
          <input
            type='password'
            placeholder='enter password'
            className='form-control'
            id='password'
            name='password'
            value={password}
            onChange={onChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='confirm-password'>Confirm Password</label>
          <input
            type='password'
            placeholder='enter confirm password'
            className='form-control'
            id='confirm-password'
            name='confirm-password'
            value={confirmPassword}
            onChange={onChange}
          />
        </div>
        {error && <p className='text-danger'>{error}</p>}
        <button className='btn btn-primary' type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
