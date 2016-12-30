// ------------------------------------
// Actions
// ------------------------------------
export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_EMAIL = 'SET_EMAIL';
export const SET_PASSWORD = 'SET_PASSWORD';
export const TRY_SIGNUP = 'TRY_LOGIN';
export const ON_SIGNUP_RESPONSE = 'ON_SIGNUP_RESPONSE';

// ------------------------------------
// Actions
// ------------------------------------
export const setUserName = (value = '') => ({
  type: SET_USER_NAME,
  payload: value,
});

export const setEmail = (value = '') => ({
  type: SET_EMAIL,
  payload: value,
});

export const setPassword = (value = '') => ({
  type: SET_PASSWORD,
  payload: value,
});

export const trySignUp = () => (dispatch, getState) => new Promise((resolve) => {
  dispatch({
    type: TRY_SIGNUP,
  });

  console.log(getState());
  const {
    email,
    userName,
    password,
  } = getState().signUp;

  const poolData = {
    UserPoolId: __AWS_COGNITO_USER_POOL_ID__,
    ClientId: __AWS_COGNITO_APP_ID__,
  };
  const userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

  const attributeList = [];

  const dataEmail = {
    Name : 'email',
    Value : email,
  };

  const attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);

  attributeList.push(attributeEmail);

  userPool.signUp(userName, password, attributeList, null, (err, result) => {
    if (err) {
      dispatch({
        type: ON_SIGNUP_RESPONSE,
        isSuccess: false,
        payload: err,
      });
    } else {
      const cognitoUser = result.user;
      dispatch({
        type: ON_SIGNUP_RESPONSE,
        isSuccess: true,
        payload: result,
      });
      console.log(`user name is ${cognitoUser.getUsername()}`);
    }
    resolve();
  });
});

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [SET_USER_NAME]: (state, action) => ({ ...state, userName: action.payload }),
  [SET_EMAIL]: (state, action) => ({ ...state, email: action.payload }),
  [SET_PASSWORD]: (state, action) => ({ ...state, password: action.payload }),
  [TRY_SIGNUP]: (state, action) => ({
    ...state,
    isWaitingResponse: true,
    isSuccess: false,
    responseData: null,
  }),
  [ON_SIGNUP_RESPONSE]: (state, action) => ({
    ...state,
    isWaitingResponse: false,
    isSuccess: action.isSuccess,
    responseData: action.payload,
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  userName: '',
  password: '',
  email: '',
  isWaitingResponse: false,
  isSuccess: false,
  responseData: null,
};
export default function signUpReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
