import React, { createContext, useReducer, useContext } from "react";

const FormsStateContext = createContext();
const FormsDispatchContext = createContext();

function FormsStateProvider({ children }) {
  const [forms, formsDispatch] = useReducer(reducer, initialState);

  return (
    <FormsStateContext.Provider value={forms}>
      <FormsDispatchContext.Provider value={formsDispatch}>
        {children}
      </FormsDispatchContext.Provider>
    </FormsStateContext.Provider>
  );
}

function useFormsState() {
  const forms = useContext(FormsStateContext);
  if (forms === undefined) {
    throw new Error("useFormsState must be called within FormsStateProvider");
  }
  return forms;
}

function useFormsDispatch() {
  const formsDispatch = useContext(FormsDispatchContext);
  if (formsDispatch === undefined) {
    throw new Error(
      "useFormsDispatch must be called within FormsStateProvider"
    );
  }
  return formsDispatch;
}

const N = 100;
const initialState = Array.from({ length: N }).map((_, i) => ({
  id: i,
  firstName: "placeholder first name",
  lastName: "placeholder last name",
  email: "email@example.com",
}));

function reducer(state, action) {
  const handleUpdateState = updateState(state);
  switch (action.type) {
    case setFirstName().type:
      return handleUpdateState(action.id, "firstName", action.firstName);
    case setLastName().type:
      return handleUpdateState(action.id, "lastName", action.lastName);
    case setEmail().type:
      return handleUpdateState(action.id, "email", action.email);
    default:
      return state;
  }
}

const updateState =
  (items) =>
  (idToFind, attr = "", value = "") => {
    const itemIndex = items.findIndex(({ id }) => id === idToFind);
    // if item was not found, don't alter the state
    if (itemIndex === -1) return items;
    const itemsCopy = [...items];
    const newItem = { ...items[itemIndex], [attr]: value };
    itemsCopy.splice(itemIndex, 1, newItem);
    return itemsCopy;
  };

function setFirstName(id = null, firstName = "") {
  return {
    type: "SET_FIRST_NAME",
    id,
    firstName,
  };
}

function setLastName(id = null, lastName = "") {
  return {
    type: "SET_LAST_NAME",
    id,
    lastName,
  };
}

function setEmail(id = null, email = "") {
  return {
    type: "SET_EMAIL",
    id,
    email,
  };
}

export {
  FormsStateProvider,
  useFormsState,
  useFormsDispatch,
  setFirstName,
  setLastName,
  setEmail,
};
