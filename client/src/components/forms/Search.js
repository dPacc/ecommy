import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  const history = useHistory();

  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };

  return (
    <div>
      <form className="form-inline  my-2 my-lg-2" onSubmit={handleSubmit}>
        <input
          type="search"
          onChange={handleChange}
          value={text}
          className="form-control mr-sm-2"
          placeholder="Search"
        />
        <SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" }} />
      </form>
    </div>
  );
};

export default Search;
