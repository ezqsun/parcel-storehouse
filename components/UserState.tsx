import React, { useEffect } from "react";
import { reducer, AuthReducer, initialState, AuthUser } from "../contexts/user-reducer";
import { UserDatabase } from "contexts/user-index";

export const UserContext = React.createContext<[AuthUser, React.Dispatch<AuthReducer>]>(null);

let db: UserDatabase;

if (process.browser) {

  db = new UserDatabase('userDb');

  db.open().catch(err => {
    console.error(`Open failed: ${err.stack}`);
  });
}

interface Props {
  children: React.ReactNode;
}


export const UserProvider = ({ children }: Props): JSX.Element => {

  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [init, setInit] = React.useState(false);

  useEffect(() => {
    db.user.toArray().then(user => {
      if (user.length > 0) {
        dispatch({
          type: 'SET_AUTH',
          authResult: user[0]
        });
      }
    });
  }, []);

  useEffect(() => {

    if (state && !init) {

      if (state.expires_on <= Math.floor(Date.now() / 1000) + 1800) {

        updateAuth();
      } else {
        setInit(true);
        setTimeout(() => updateAuth(), 1800000);
      }
    } else if (init) {
      console.log('auth already init');
    }

    async function updateAuth() {

      console.log('getting new token');

      if (!state) {
        return;
      }

      const resp = await fetch('/api/auth/refresh', {
        body: '{}',
        headers: {
          'refresh_token': state.refresh_token
        },
        method: 'POST'
      });

      const data = await resp.json();
      console.log({ resp, data });

      if (resp.status === 200) {
        dispatch({
          type: 'UPDATE_AUTH',
          authResult: data
        });
      }
    }

  }, [state]);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      { children}
    </UserContext.Provider>
  );
};