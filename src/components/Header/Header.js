import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
  getSearchBarFlag
} from "../../features/movies/movieSlice";

import  user from '../../images/user.png';
import "./Header.css";

const Header = () => {

  const [term, setTerm] = useState("");
  const dispatch = useDispatch();
  const showSearchBar = useSelector(getSearchBarFlag);

  const submitHandler = (e) => {
    e.preventDefault();
    if (term === "") return alert("Please enter search term!");
    dispatch(fetchAsyncMovies(term));
    dispatch(fetchAsyncShows(term));
    setTerm("");
  };
  return (
    <div className="header">
      <div className="logo">
        <Link to="/">Movie App</Link>
      </div>
      { showSearchBar && <div className="search-bar">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={term}
            placeholder="Search Movies or Shows"
            onChange={(e) => setTerm(e.target.value)}
          />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>}
      <div className="user-image">
        <img src={user} alt="user" />
      </div>
    </div>
  )
}

export default Header