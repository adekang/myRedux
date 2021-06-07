import React, { useState, useContext } from "react";

const appContext = React.createContext(null);

const App = () => {
  const [appState, setAppState] = useState({
    user: { name: "ade", age: 18 },
  });
  const contextValue = { appState, setAppState };

  return (
    <appContext.Provider value={contextValue}>
      <大儿子 />
      <二儿子 />
      <三儿子 />
    </appContext.Provider>
  );
};
const 大儿子 = () => {
  return (
    <section>
      大儿子
      <User />
    </section>
  );
};
const 二儿子 = () => {
  return (
    <section>
      二儿子
      <UserModifier />
    </section>
  );
};
const 三儿子 = () => {
  return <section>三儿子</section>;
};
const User = () => {
  const contextValue = useContext(appContext);
  return <div>User:{contextValue.appState.user.name}</div>;
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

const UserModifier = () => {
  const { appState, setAppState } = useContext(appContext);
  const onChange = e => {
    const newState = reducer(appState, { type: "updateUser", payload: { name: e.target.value } });
    setAppState(newState);
  };

  return (
    <div>
      <input value={appState.user.name} onChange={onChange} />
    </div>
  );
};
export default App;
