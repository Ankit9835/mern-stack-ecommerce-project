import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchQuery } from "../redux/searchSlice";
import AllProducts from '../components/AllProducts'
import { getProductCounts,fetchProductByFilter } from '../utils/product'
import { Menu, Slider, Checkbox } from "antd";
import { DollarOutlined, DownSquareOutlined } from "@ant-design/icons";
import { getAllCategory } from '../utils/category';
const { SubMenu, ItemGroup } = Menu;
 
const Shop = () => {
const [count,setCount] = useState('')
 const [products, setProducts] = useState([])
 const [price,setPrice] = useState([0, 0])
 const [ok, setOk] = useState(false)
 const [loading,setLoading] = useState(false)
 const {search} = useSelector((state) => ({...state}))
 const [categories,setCategories] = useState([])
 const [categoryIds,setCategoryIds] = useState([])
 const {text} = search
 const dispatch = useDispatch()

 

  const loadAllProducts = () => {
    setLoading(true)
    getProductCounts(12).then((p) => {
        console.log('p',p.data)
      setCount(p.data.total);
      setProducts(p.data.products)
      setLoading(false)
     // console.log('products',products)
    });
  };

//   useEffect(() => {
//     filterProduct({ price });
// }, [price]);

  useEffect(() => {
    loadAllProducts();
    getAllCategory().then((res) => setCategories(res.data.categories));
    console.log('products',products)
  }, []);

  // useEffect(() => {
  //   console.log('new text',text)
  //   filterProduct(text)
  // },[text])

const filterProduct = async (args) => {
  const response = await axios.post(`${process.env.REACT_APP_URL}/search/filter`, args)
  console.log('response next',response)
  setProducts(response.data)
}

  // useEffect(() => {
  //   const delayed = setTimeout(() => {
  //       filterProduct({ query: text });
  //     }, 300);
  //     return () => clearTimeout(delayed);
  // }, [text]);


  const handleSlider = (value) => {
    dispatch(searchQuery({
      text: ""
   }));
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  const handleCheck = (e) => {
    dispatch(searchQuery({
        text: ""
    }));
    setPrice([0, 0]);
    // console.log(e.target.value);
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // index or -1

    // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    // console.log(inTheState);
    filterProduct({ category: inTheState });
  }

  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4"
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  
    

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2">
          <h4>Search/Filter</h4>
          <hr />

          <Menu defaultOpenKeys={["1", "2"]} mode="inline">
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined /> Price
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max="200000"
                />
              </div>
            </SubMenu>

            <SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Categories
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }}>{showCategories()}</div>
            </SubMenu>
          </Menu>
        </div>

        <div className="col-md-9 pt-2">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-danger">Products</h4>
          )}

          {products.length < 1 && <p>No products found</p>}

          <div className="row pb-5">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mt-3">
                <AllProducts key={p._id} {...p} product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


export default Shop
