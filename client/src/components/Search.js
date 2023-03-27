import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SearchOutlined } from "@ant-design/icons";
import { searchQuery } from "../redux/searchSlice";



const Search = () => {
    const dispatch = useDispatch()
    //const response = useSelector((state) => state.search)
    const { search } = useSelector((state) => ({ ...state }));
    const { text } = search;

    console.log('newtext',text)
    const navigate = useNavigate()

    const handleChange = (e) => {
        dispatch(searchQuery({
             text: e.target.value,
          }));
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`/shop?${text.text}`)
    }

  return (
    <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        type="search"
        // value={text}
        className="form-control mr-sm-2"
        placeholder="Search"
      />
      <SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" }} />
    </form>
  )
}

export default Search
