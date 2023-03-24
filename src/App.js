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
        <div>
          <label htmlFor='password'></label>
        </div>
      </form>
    </div>
  );
}

export default App;
