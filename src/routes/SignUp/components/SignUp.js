import React from 'react';

const SignUp = props => (
  <div style={{ margin: '0 auto' }} >
    <h2>User Name:</h2>
    <input type='text' value={props.userName} onChange={event => props.setUserName(event.target.value)} />

    <h2>Email:</h2>
    <input type='text' value={props.email} onChange={event => props.setEmail(event.target.value)} />

    <h2>Password:</h2>
    <input type='password' value={props.password} onChange={event => props.setPassword(event.target.value)} />
    <button className='btn btn-default' onClick={props.trySignUp}>
      Sign Up
    </button>

    <h2>{JSON.stringify(props.isWaitingResponse)}</h2>
    <h2>{JSON.stringify(props.isSuccess)}</h2>
    <h2>{JSON.stringify(props.responseData)}</h2>
  </div>
);

SignUp.propTypes = {
  setUserName: React.PropTypes.func.isRequired,
  setEmail: React.PropTypes.func.isRequired,
  setPassword: React.PropTypes.func.isRequired,
  trySignUp: React.PropTypes.func.isRequired,
  userName: React.PropTypes.string.isRequired,
  password: React.PropTypes.string.isRequired,
  email: React.PropTypes.string.isRequired,
  isWaitingResponse: React.PropTypes.bool.isRequired,
  isSuccess: React.PropTypes.bool.isRequired,
  responseData: React.PropTypes.any,
};

export default SignUp;
