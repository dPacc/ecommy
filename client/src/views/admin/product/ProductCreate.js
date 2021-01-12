import React, { useState, useEffect } from "react";
import { AdminNav, ProductCreateForm } from "../../../components";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getCategories } from "../../../api/category";
import { createProduct } from "../../../api/product";
import { getCategorySubs } from "../../../api/category";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subcategories: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "Blue", "White"],
  brands: ["Apple", "Lenovo", "Samsung", "Microsoft", "ASUS"],
  color: "",
  brand: "",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log({ ...values, [e.target.name]: e.target.value });
  };

  const handleCatChange = (e) => {
    e.preventDefault();
    setValues({ ...values, subcategories: [], category: e.target.value });
    setShowSub(true);
    getCategorySubs(e.target.value).then((res) => {
      setSubOptions(res.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(user.token, { ...values })
      .then((res) => {
        toast.success(`"${res.data.title}" is created`);
      })
      .catch((error) => {
        // if (error.response.status === 400) toast.error(error.response.data);
        toast.error(error.response.data.err);
        console.log(error);
      });
  };

  const loadCategories = () => {
    getCategories().then((res) => {
      setValues({ ...values, categories: res.data });
    });
  };

  const handleSetSubs = (value) => {
    // e.preventDefault();
    setValues({ ...values, subcategories: value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="colmd-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Create Product</h4>
          <hr />
          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleCatChange={handleCatChange}
            values={values}
            subOptions={subOptions}
            handleSetSubs={handleSetSubs}
            showSub={showSub}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
