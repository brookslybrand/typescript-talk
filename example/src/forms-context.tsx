import React, { createContext, useReducer, useContext } from "react";

const FormsStateContext = createContext<undefined | FormObject[]>(undefined);
const FormsDispatchContext = createContext<
  undefined | React.Dispatch<ActionType>
>(undefined);

interface FormsStateProviderProps {
  children: React.ReactNode;
}
function FormsStateProvider({ children }: FormsStateProviderProps) {
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

export interface FormObject {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const N = 100;
const initialState = Array.from({ length: N }).map((_, i) => ({
  id: i,
  firstName: "placeholder first name",
  lastName: "placeholder last name",
  email: "email@example.com",
}));

type ActionType =
  | { type: "SET_FIRST_NAME"; id: number; firstName: string }
  | { type: "SET_LAST_NAME"; id: number; lastName: string }
  | { type: "SET_EMAIL"; id: number; email: string };

function reducer(state: FormObject[], action: ActionType) {
  const handleUpdateState = updateState(state);
  switch (action.type) {
    case "SET_FIRST_NAME":
      return handleUpdateState(action.id, "firstName", action.firstName);
    case "SET_LAST_NAME":
      return handleUpdateState(action.id, "lastName", action.lastName);
    case "SET_EMAIL":
      return handleUpdateState(action.id, "email", action.email);
    default:
      return state;
  }
}

const updateState =
  (items: FormObject[]) =>
  (idToFind: number, attr = "", value = "") => {
    const itemIndex = items.findIndex(({ id }) => id === idToFind);
    // if item was not found, don't alter the state
    if (itemIndex === -1) return items;
    const itemsCopy = [...items];
    const newItem = { ...items[itemIndex], [attr]: value };
    itemsCopy.splice(itemIndex, 1, newItem);
    return itemsCopy;
  };

export { FormsStateProvider, useFormsState, useFormsDispatch };
