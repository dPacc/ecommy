import React, { useState } from "react";
import { AdminNav, ProductCreateForm } from "../../../components";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getCategories } from "../../../api/category";
import { createProduct } from "../../../api/product";
import { getSubcategories } from "../../../api/subcategory";

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
  const { user } = useSelector((state) => ({ ...state }));

  const {
    title,
    description,
    price,
    categories,
    category,
    subcategories,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  //   useEffect(() => {
  //     loadCategories();
  //   }, []);

  //   useEffect(() => {
  //     loadSubcategories();
  //   }, []);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(user.token, { ...values })
      .then((res) => {
        toast.success(`"${res.data.title}" is created`);
        console.log(res.data);
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

  const loadSubcategories = () => {
    getSubcategories().then((res) => {
      setValues({ ...values, subcategories: res.data });
    });
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
            values={values}
          />

          {/* <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                className="form-control"
                onChange={handleChange}
              >
                <option>Select Category</option>
                {categories.length &&
                  categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-group">
              <label>Sub Category</label>
              <select
                name="subcategory"
                className="form-control"
                onChange={handleChange}
              >
                <option>Select Sub Category</option>
                {subcategories.length &&
                  subcategories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
