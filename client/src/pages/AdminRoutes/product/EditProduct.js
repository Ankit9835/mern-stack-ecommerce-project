import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AdminNav from "../../../components/nav/AdminNav";
import { createProduct, getSingleProduct, getSubCategories, updateProduct } from "../../../utils/product";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../../../components/ProductForm";
import { getAllCategory } from "../../../utils/category";
import FileUpload from "../../../components/FileUpload";
import { async } from "@firebase/util";
import ProductUpdateForm from "../../../components/ProductUpdateForm";



const EditProduct = () => {
    const Routeparams = useParams()
    const routeValue = Routeparams.slug
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
  const [subClass, setSubClass] = useState('');
  const [loading, setLoading] = useState(false);
  const [subOptions, setSubOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [arrayOfSubs, setArrayofSubs] = useState([]);
  const [isSub, setIsSub] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const categoryChange = async (e) => {
     e.preventDefault()
    setValues({ ...values, subs:[] });
    //setIsSub(true)
    setSelectedCategory(e.target.value)
    console.log("category id changed", e.target.value);
    const res = await getSubCategories(e.target.value);
    console.log("sub-category changed", res);
    setSubOptions(res.data.subcategory);
    // if user clicks back to the original category
    // show its sub categories in default
    console.log('values',values.category._id)
    console.log('current',e.target.value)
    console.log("EXISTING CATEGORY values.category", values.category);
    if (values.category._id === e.target.value) {
      singleCategory(routeValue);
    }
    // clear old sub category ids
    setArrayofSubs([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      values.subs = arrayOfSubs
      values.category = selectedCategory ? selectedCategory : values.category
      const res = await updateProduct(routeValue,values,user.token)
      console.log('update prodduct',res);
      if (res) {
        toast.success(`${res.data.title} is created`);
       navigate('/admin/product')
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  };

  

  const loadCategories = async () => {
    try {
      const categories = await getAllCategory();
      console.log("categoriess", categories);
      setCategories(categories.data.categories)
    } catch (error) {
      console.log(error);
    }
  };

  const singleCategory = async (slug) => {
    try {
        const category = await getSingleProduct(slug)
        console.log('get single category', category)
        setValues({...values, ...category.data.data})
        const getAllSubCategories = await getSubCategories(category.data.data.category._id)
        setSubOptions(getAllSubCategories.data.subcategory)
        console.log('get all sub',getAllSubCategories)
        let arr1 = []
        category.data.data.subs.map((s) => {
         return arr1.push(s._id)
        })
        console.log('array',arr1)
        setArrayofSubs((prev) => arr1)
    } catch (error) {
        console.log(error.message)
    }
  }

  useEffect(() => {
    loadCategories();
    singleCategory(routeValue)
    console.log('routeparams',Routeparams)
    console.log('user token',user)
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4>Product update</h4>
          <hr />
           {/* {JSON.stringify(values.category._id,4,null)}  */}
           <div className="p-3">
            <FileUpload values={values} setValues={setValues} loading={loading} setLoading={setLoading}/>
          </div>
          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            categoryChange={categoryChange}
            subOptions={subOptions}
            arrayOfSubs={arrayOfSubs}
            setArrayofSubs={setArrayofSubs}
            loadCategories={loadCategories}
            categories={categories}
            setCategories={setCategories}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
