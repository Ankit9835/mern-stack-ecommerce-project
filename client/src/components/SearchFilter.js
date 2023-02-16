import React from 'react'

const SearchFilter = ({handleChange,keyword,setKeyword}) => {
  return (
    <div className='container p-4'>
       <input
        type="text"
        className="form-control"
        onChange={handleChange}
        value={keyword}
        placeholder='search category'
      />
    </div>
  )
}

export default SearchFilter
