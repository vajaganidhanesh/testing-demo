import React from "react";

function App() {
  return (
    <div className='container my-5'>
      <form>
        <div className='mb-3'>
          <label htmlFor='email'>Email address</label>
          <input
            type='email'
            placeholder='enter email'
            className='form-control'
            id='email'
            name='email'
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
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='confirm-password'>Confirm Password</label>
          <input
            type='password'
            placeholder='enter confirm password'
            className='form-control'
            id='confirm-password'
            name='password'
          />
        </div>
      </form>
    </div>
  );
}

export default App;
