import React, { useState, useEffect } from "react";
import { AdminNav, ProductCreateForm, FileUpload } from "../../../components";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getCategories } from "../../../api/category";
import { createProduct } from "../../../api/product";
import { getCategorySubs } from "../../../api/category";
import { LoadingOutlined } from "@ant-design/icons";

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
  brands: [
    "Apple",
    "Lenovo",
    "Samsung",
    "Microsoft",
    "ASUS",
    "MSI",
    "HP",
    "Acer",
  ],
  color: "",
  brand: "",
};

const ProductCreate = ({ history }) => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);
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
        history.push("/admin/products");
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
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Create Product</h4>
          )}
          <hr />
          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>
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
