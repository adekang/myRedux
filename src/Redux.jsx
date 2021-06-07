import React, { useState, useContext, useEffect } from "react";

export const store = {
  state: {
    user: { name: "ade", age: 18 },
    group: { name: "前端組" },
  },
  setState(newState) {
    store.state = newState;
    store.listeners.map(fn => fn(store.state));
  },
  listeners: [],
  subscribe(fn) {
    store.listeners.push(fn);
    return () => {
      const index = store.listeners.indexOf(fn);
      store.listeners.splice(index, 1);
    };
  },
};

const changed = (oldState, newState) => {
  let changed = false;
  for (let key in oldState) {
    if (oldState[key] !== newState[key]) {
      changed = true;
    }
  }
  return changed;
};

export const connect = selector => Component => {
  return props => {
    const { state, setState } = useContext(appContext);
    const [, update] = useState({});
    const data = selector ? selector(state) : { state: state };
    useEffect(
      () =>
        store.subscribe(() => {
          const newData = selector ? selector(store.state) : { state: store.state };
          if (changed(data, newData)) {
            console.log("update");
            update({});
          }
        }),
      [selector]
    );
    const dispatch = action => {
      setState(reducer(state, action));
    };
    return <Component {...props} {...data} dispatch={dispatch} />;
  };
};

const reducer = (state, { type, payload }) => {
  if (type === "updateUser") {
    return {
      ...state,
      user: {
        ...state.user,
        ...payload,
      },
    };
  } else {
    return state;
  }
};

export const appContext = React.createContext(null);
