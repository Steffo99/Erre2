import { createContext, useContext, useReducer } from "react";


/**
 * Function which handles the possible changes in the global state of the application.
 */
function stateReducer(previousState, action) {
    // action is an object containing various data, but always a "type" property, describing how to alter the state
    switch(action.type) {
        case "instanceChange":
            // Force a logout after changing instance
            return {
                instance: action.url,
                token: null,
            }
        case "login": {
            // Set the token after logging in
            return {
                ...previousState,
                token: action.token,
            }
        }
        case "logout": {
            // Reset the token after logging out
            return {
                ...previousState,
                token: null,
            }
        }
    }
}


/**
 * State hook holding the global state of the application. 
 */
export function useAppState() {
    return useReducer(stateReducer, {
        instance: process.env.REACT_APP_INSTANCE_DEFAULT,
        token: null,
    })
}


/**
 * Context used to access the global application state more easily.
 */
export const AppContext = createContext(
    [
        // state
        undefined, 
        // dispatch
        () => console.error("Tried to alter an AppContext outside of any AppContext.")
    ]
)


/**
 * Shortcut hook to access the global application state.
 */
export function useAppContext() {
    return useContext(AppContext)
}