import React, { useState } from 'react'
import { Select } from "antd";
import { getAllCategory } from '../utils/category';


const { Option } = Select;


const ProductUpdateForm = ({
    handleSubmit,
    handleChange,
    setValues,
    values,
    categoryChange,
    subOptions,
    arrayOfSubs,
    setArrayofSubs,
    categories,
    setCategories,
    selectedCategory
}) => {

    const {
        title,
        description,
        price,
        category,
        subs,
        shipping,
        quantity,
        images,
        colors,
        brands,
        color,
        brand,
      } = values;

      const [allCat,setAllCat] = useState([])
      const getCategory = async () => {
        try {
            const categories = await getAllCategory();
            console.log("categoriess", categories);
            setAllCat(categories)
          } catch (error) {
            console.log(error);
          }
      }
      
    
  return (
    <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Title</label>
      <input
        type="text"
        name="title"
        className="form-control"
        value={title}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label>Description</label>
      <input
        type="text"
        name="description"
        className="form-control"
        value={description}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label>Price</label>
      <input
        type="number"
        name="price"
        className="form-control"
        value={price}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label>Shipping</label>
      <select
      value={shipping ? 'Yes' : 'No'}
        name="shipping"
        className="form-control"
        onChange={handleChange}
      >
       
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </select>
    </div>

    <div className="form-group">
      <label>Quantity</label>
      <input
        type="number"
        name="quantity"
        className="form-control"
        value={quantity}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label>Color</label>
      <select value={color} name="color" className="form-control" onChange={handleChange}>
        <option>Please select</option>
        {colors.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>

    <div className="form-group">
      <label>Brand</label>
      <select value={brand} name="brand" className="form-control" onChange={handleChange}>
        <option>Please select</option>
        {brands.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>
    </div>
   
    
    
    <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              className="form-control"
              onChange={categoryChange}
               value={selectedCategory ? selectedCategory : values.category._id}
            >
                
              {categories.map((c) => (
                <option key={c._id} value={c._id} >
                  {c.name}
                </option>
              ))}
            </select>
     </div>

     <div>
        <label>Sub Categories</label>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Please select"
          value={arrayOfSubs}
          onChange={(value) => setArrayofSubs(value)}
        >
          {subOptions.length &&
            subOptions.map((s) => (
              <Option key={s._id} value={s._id}>
                {s.name}
              </Option>
            ))}
        </Select>
      </div>

    <br />
    <button className="btn btn-outline-info">Save</button>
  </form>
  )
}

export default ProductUpdateForm
