import React, { useEffect } from "react";
import { reducer, AuthReduer, initialState } from "../contexts/user-reducer";
import Dexie from 'dexie';
import { UserDatabase } from "contexts/user-index";

export const UserContext = React.createContext<[any, React.Dispatch<AuthReduer>]>(null);

if (process.browser) {

    var db = new UserDatabase('userDb');

    db.open().catch(err => {
        console.error(`Open failed: ${err.stack}`);
    });
}


export const UserProvider = ({ children }) => {

    const [state, dispatch] = React.useReducer(reducer, initialState)

    useEffect(() => {

        db.user.toArray().then(user => {
            if (user.length > 0) {

                dispatch({
                    type: 'SET_AUTH',
                    authResult: user[0]
                });
                console.log(user[0])
            }
        });
    }, []);

    return (
        <UserContext.Provider value={[state, dispatch]}>
            { children}
        </UserContext.Provider>
    )
}