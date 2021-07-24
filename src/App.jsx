import { useState, useReducer, createContext } from "react";
import SeachSection from "./components/SeachSection";
import TableSection from "./components/TableSection";
import AddModal from "./components/AddModal";

export const myContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "ADD_USER":
      state.users.push(action.payload);
      return { ...state };
    case "EDIT_USER":
      state.users.splice(
        state.users.findIndex((i) => i.id === action.payload.id),
        1,
        action.payload
      );
      return { ...state };
    case "DELETE_USER":
      state.users.splice(
        state.users.findIndex((i) => i.id === action.payload),
        1
      );
      return { ...state };
    case "INC":
      state.users.map((item) => {
        if (item.id === action.payload) {
          item.count++;
        }
        return item;
      });
      return { ...state };
    case "DEC":
      state.users.map((item) => {
        if (item.id === action.payload && item.count > 0) {
          item.count--;
        } else {
          item.count = 0;
        }
        return item;
      });
      return { ...state };
    case "CHECK":
      state.users.forEach((item) => {
        if (item.id === action.payload) {
          item.active = !item.active;
        }
        return item;
      });
      return { ...state };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, {
    users: [
      {
        id: 1,
        firstName: "Bakhtiyor",
        lastName: "Khasanov",
        userName: "@bahti",
        count: 0,
        active: true,
      },
      {
        id: 2,
        firstName: "Stive",
        lastName: "Jobs",
        userName: "@sJobs",
        count: 0,
        active: false,
      },
      {
        id: 3,
        firstName: "Jeff",
        lastName: "Bezos",
        userName: "@jeff",
        count: 0,
        active: false,
      },
      {
        id: 4,
        firstName: "Jack",
        lastName: "Ma",
        userName: "@ma",
        count: 0,
        active: true,
      },
    ],
  });

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [currentUser, setCurrentUser] = useState("");
  const [filterCheck, setFilterCheck] = useState(false);
  const [search, setSearch] = useState("");

  function hendleSubmit(e) {
    e.preventDefault();
    const firstName = e.target[0].value;
    const lastName = e.target[1].value;
    const userName = e.target[2].value;
    if ((firstName, lastName, userName)) {
      if (currentUser) {
        dispatch({
          type: "EDIT_USER",
          payload: {
            id: currentUser.id,
            firstName,
            lastName,
            userName,
            count: currentUser.count,
            active: currentUser.active,
          },
        });
      } else {
        dispatch({
          type: "ADD_USER",
          payload: {
            id: state.users.length + 1,
            firstName,
            lastName,
            userName,
            count: 0,
            active: false,
          },
        });
      }
    } else {
      alert("Fill in all the rows !!!");
    }
  }

  function addUser() {
    setCurrentUser("");
    toggle();
  }

  function editUser(item) {
    toggle();
    setCurrentUser(item);
  }

  function deletUser(id) {
    dispatch({
      type: "DELETE_USER",
      payload: id,
    });
  }

  function increment(id) {
    dispatch({
      type: "INC",
      payload: id,
    });
  }
  function decrement(id) {
    dispatch({
      type: "DEC",
      payload: id,
    });
  }

  function handleCheck(id) {
    dispatch({
      type: "CHECK",
      payload: id,
    });
  }

  return (
    <myContext.Provider
      value={{
        toggle,
        modal,
        hendleSubmit,
        users: state.users,
        editUser,
        currentUser,
        addUser,
        deletUser,
        increment,
        decrement,
        handleCheck,
        filterCheck,
        setFilterCheck,
        search,
        setSearch,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center m-3">
            <h2>Users list</h2>
            <hr />
          </div>
          <SeachSection />
          <TableSection />
          <AddModal />
        </div>
      </div>
    </myContext.Provider>
  );
}

export default App;
