import React, { useState, useContext, useEffect } from "react";

const store = {
  state: undefined,
  reducer: undefined,
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
let reducer = undefined;

export const createStore = (reducer, initState) => {
  store.state = initState;
  store.reducer = reducer;

  return store;
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

export const connect = (selector, dispatchSelector) => Component => {
  return props => {
    const { state, setState } = useContext(appContext);
    const dispatch = action => {
      setState(store.reducer(state, action));
    };
    const [, update] = useState({});
    const data = selector ? selector(state) : { state: state };
    const dispatcher = dispatchSelector ? dispatchSelector(dispatch) : dispatch;
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

    return <Component {...props} {...data} {...dispatcher} />;
  };
};

export const appContext = React.createContext(null);

export const Provider = ({ store, children }) => {
  return <appContext.Provider value={store}>{children}</appContext.Provider>;
};
