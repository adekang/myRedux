import React from "react";
import { Provider, createStore, connect } from "./Redux.jsx";
import { connectToUser } from "./connecters/connectToUser.jsx";

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
const initState = {
  user: { name: "ade", age: 18 },
  group: { name: "前端组" },
};
const store = createStore(reducer, initState);
const App = () => {
  return (
    <Provider store={store}>
      <大儿子 />
      <二儿子 />
      <三儿子 />
    </Provider>
  );
};
const 大儿子 = () => {
  console.log("大儿子执行了" + Math.random());

  return (
    <section>
      大儿子
      <User />
    </section>
  );
};
const 二儿子 = () => {
  console.log("二儿子执行了" + Math.random());

  return (
    <section>
      二儿子
      <UserModifier>kang</UserModifier>
    </section>
  );
};
const 三儿子 = connect(state => {
  return { group: state.group };
})(({ group }) => {
  console.log("三儿子执行了" + Math.random());

  return (
    <section>
      三儿子<div>Group:{group.name}</div>
    </section>
  );
});

const User = connectToUser(({ user }) => {
  console.log("User执行了" + Math.random());

  return <div>User:{user.name}</div>;
});

const UserModifier = connectToUser(({ updateUser, user, children }) => {
  console.log("UserModifier执行了" + Math.random());

  const onChange = e => {
    updateUser({ name: e.target.value });
  };

  return (
    <div>
      {children}
      <input value={user.name} onChange={onChange} />
    </div>
  );
});

export default App;
