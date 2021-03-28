import React from "react"
import { reducer, initialState, AuthReduer } from "../contexts/user-reducer"

export const UserContext = React.createContext<[any, React.Dispatch<AuthReduer>]>(null)

export const UserProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return (
    <UserContext.Provider value={[ state, dispatch ]}>
    	{ children }
    </UserContext.Provider>
  )
}