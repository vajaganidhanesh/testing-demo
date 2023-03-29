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
    setSignupInput({
      ...signupInput,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (!validator.isEmail(signupInput.email)) {
      return setError("the email you input is invalid");
    } else if (signupInput.password.length < 5) {
      return setError(
        "The password you entered should contain 5 or more characters"
      );
    } else if (password !== confirmPassword) {
      return setError("password should match with previous password");
    } else {
      return setError("");
    }
  };

  const reset = (e) => {
    e.preventDefault();
    setSignupInput({ email: "", password: "", confirmPassword: "" });
  };

  return (
    <div className='container my-5 '>
      <form className='col-3'>
        <div className='mb-3'>
          <label htmlFor='email'>Email address</label>
          <input
            type='email'
            placeholder='Enter email'
            className='form-control'
            id='email'
            name='email'
            value={email}
            onChange={onChange}
            // autoComplete='off'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='password'>Enter Password</label>
          <input
            type='password'
            placeholder='Enter password'
            className='form-control'
            id='password'
            name='password'
            value={password}
            onChange={onChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type='password'
            placeholder='Enter confirmpassword'
            className='form-control'
            id='confirmPassword'
            name='confirmPassword'
            value={confirmPassword}
            onChange={onChange}
          />
        </div>
        {/* {error !== true ? (
          <p className={error ? "text-success" : "text-danger"}>{error}</p>
        ) : null} */}

        {error && <p className='text-danger'>{error}</p>}
        <button
          className='btn btn-primary'
          style={{ backgroundColor: "blue" }}
          type='submit'
          onClick={submitForm}
        >
          Submit
        </button>
        <button
          className='btn btn-secondary ms-2'
          type='submit'
          id='reset'
          onClick={reset}
        >
          reset
        </button>
      </form>
    </div>
  );
}

export default App;
