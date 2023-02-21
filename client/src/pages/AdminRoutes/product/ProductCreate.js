import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AdminNav from "../../../components/nav/AdminNav";
import { createProduct, getSubCategories } from "../../../utils/product";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductForm from "../../../components/ProductForm";
import { getAllCategory } from "../../../utils/category";
import FileUpload from "../../../components/FileUpload";


const ProductCreate = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  //console.log('redux',redux)
  const initialState = {
    title: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    subs: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
    color: "",
    brand: "",
  };

  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [subOptions, setSubOptions] = useState([]);
  const [isSub, setIsSub] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const categoryChange = async (e) => {
    // e.preventDefault()
    setValues({ ...values, subs:[], category: e.target.value });
    setIsSub(true)
    console.log("category id changed", e.target.value);
    const res = await getSubCategories(e.target.value);
    console.log("sub-category changed", res);
    setSubOptions(res.data.subcategory);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createProduct(values, user.token);
      console.log(res);
      if (res) {
        toast.success(`${res.data.product.title} is created`);
        setTimeout(() => {
          setValues(initialState);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadCategories = async () => {
    try {
      const categories = await getAllCategory();
      console.log("categories", categories);
      setValues({ ...values, categories: categories.data.categories });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4>Product create</h4>
          <hr />
          {/* {JSON.stringify(values.images,4,null)} */}
          <div className="p-3">
            <FileUpload values={values} setValues={setValues} loading={loading} setLoading={setLoading}/>
          </div>

          <ProductForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            categoryChange={categoryChange}
            subOptions={subOptions}
            setSubOptions={setSubOptions}
            isSub={isSub}
            setIsSub={setIsSub}
            setValues={setValues}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
