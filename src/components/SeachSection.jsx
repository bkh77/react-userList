import React, { useContext } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { myContext } from "../App";

export default function SeachSection() {
  const context = useContext(myContext);
  return (
    <>
      <div className="col-md-10 search-section">
        <input
          value={context.search}
          onChange={(e) => context.setSearch(e.target.value)}
          className="search"
          type="text"
          placeholder="Search..."
        />
        <label htmlFor="active">
          <input
            type="checkbox"
            checked={context.filterCheck}
            onChange={() => context.setFilterCheck((p) => !p)}
          />
          Active
        </label>
        <SearchIcon className="searchIcon" />
      </div>
      <div className="col-md-2">
        <button
          onClick={context.addUser}
          className="btn btn-outline-secondary w-100"
        >
          Add
        </button>
      </div>
    </>
  );
}
