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

const UserModifier = () => {
  const contextValue = useContext(appContext);
  const onChange = e => {
    
  };
  return (
    <div>
      <input value={contextValue.appState.user.name} onChange={onChange} />
    </div>
  );
};
export default App;
