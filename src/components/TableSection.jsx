import React, { useContext } from "react";
import EditIcon from "@material-ui/icons/Edit";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { myContext } from "../App";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

export default function TableSection() {
  const context = useContext(myContext);
  return (
    <>
      <div className="col-md-12 my-4">
        <table className="table table-bordered">
          <thead className="table-secondary">
            <tr>
              <th>#</th>
              <th>First name</th>
              <th>Last name</th>
              <th>User name</th>
              <th>Count</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {context.users
              .filter((item) => item.active === context.filterCheck)
              .filter((item) => {
                return (
                  item.firstName
                    .toLowerCase()
                    .includes(context.search.toLowerCase()) ||
                  item.lastName
                    .toLowerCase()
                    .includes(context.search.toLowerCase()) ||
                  item.userName
                    .toLowerCase()
                    .includes(context.search.toLowerCase())
                );
              })
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.userName}</td>
                  <td className="btn-count">
                    <button
                      onClick={() => context.increment(item.id)}
                      className="btn btn-outline-success btn-sm mx-2"
                    >
                      <AddIcon />
                    </button>{" "}
                    {item.count}{" "}
                    <button
                      onClick={() => context.decrement(item.id)}
                      className="btn btn-outline-warning btn-sm mx-2"
                    >
                      <RemoveIcon />
                    </button>
                  </td>
                  <td>
                    <input
                      style={{ transform: "scale(1.8)", margin: "10px" }}
                      type="checkbox"
                      defaultChecked={item.active}
                      onChange={() => context.handleCheck(item.id)}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => context.editUser(item)}
                      className="btn btn-sm btn-outline-info"
                    >
                      <EditIcon />
                    </button>{" "}
                    <button
                      onClick={() => context.deletUser(item.id)}
                      className="btn btn-sm btn-outline-danger"
                    >
                      <HighlightOffIcon />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="btn-footer">
          <button className="btn btn-outline-primary ">Previus</button>{" "}
          <button className="btn btn-outline-primary">Next</button>
        </div>
      </div>
    </>
  );
}
