import React, { useState, useEffect } from "react";
import { AdminNav, FileUpload, ProductUpdateForm } from "../../../components";
import { useSelector } from "react-redux";
import { getProduct, updateProduct } from "../../../api/product";
import { getCategories, getCategorySubs } from "../../../api/category";
import { useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "Blue", "White"],
  brands: ["Apple", "Lenovo", "Samsung", "Microsoft", "ASUS"],
  color: "",
  brand: "",
};

const ProductUpdate = ({ history }) => {
  const { slug } = useParams();

  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [arrayOfSubIds, setArrayOfSubIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    values.subcategories = arrayOfSubIds;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(user.token, slug, values)
      .then((res) => {
        setLoading(false);
        toast.success(`${res.data.title} is updated`);
        history.push("/admin/products");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log({ ...values, [e.target.name]: e.target.value });
  };

  const handleCatChange = (e) => {
    e.preventDefault();
    setValues({ ...values, subcategories: [] });

    setSelectedCategory(e.target.value);
    getCategorySubs(e.target.value).then((res) => {
      setSubOptions(res.data);
    });

    if (values.category._id === e.target.value) {
      loadProduct();
    }

    setArrayOfSubIds([]);
  };

  const handleSetSubs = () => {
    //
  };

  const loadCategories = () => {
    getCategories().then((res) => {
      setCategories(res.data);
    });
  };

  const loadProduct = () => {
    setLoading(true);
    getProduct(slug)
      .then((res) => {
        setLoading(false);
        setValues({ ...values, ...res.data });
        getCategorySubs(res.data.category._id).then((r) => {
          setSubOptions(r.data);
        });
        let arr = [];
        res.data.subcategories.map((s) => {
          arr.push(s._id);
        });
        setArrayOfSubIds((prev) => arr);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
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
            <h4>Update Product</h4>
          )}

          <hr />
          {values && (
            <>
              <div className="p-3">
                <FileUpload
                  values={values}
                  setValues={setValues}
                  setLoading={setLoading}
                />
              </div>
              <ProductUpdateForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleCatChange={handleCatChange}
                values={values}
                subOptions={subOptions}
                handleSetSubs={handleSetSubs}
                categories={categories}
                arrayOfSubIds={arrayOfSubIds}
                setArrayOfSubIds={setArrayOfSubIds}
                selectedCategory={selectedCategory}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
