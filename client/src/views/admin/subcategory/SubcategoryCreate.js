import React, { useState, useEffect } from "react";
import { AdminNav, CategoryForm, LocalSearch } from "../../../components";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getCategories } from "../../../api/category";
import {
  createSubcategory,
  getSubcategories,
  removeSubcategory,
} from "../../../api/subcategory";

const SubcategoryCreate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [subcategories, setSubcategories] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
    loadSubcategories();
  }, []);

  const loadCategories = () => {
    getCategories()
      .then((res) => {
        setCategories(res.data);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadSubcategories = () => {
    getSubcategories()
      .then((res) => {
        setSubcategories(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    createSubcategory(user.token, name, category)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadSubcategories();
        // console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
        console.log(err);
      });
  };

  const handleDeleteSubcategory = async (slug) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeSubcategory(user.token, slug)
        .then((res) => {
          setLoading(false);
          toast.success(`${res.data.name} deleted`);
          loadSubcategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
            console.log(err);
          }
        });
    }
  };

  const filteredItems = subcategories.filter((item) =>
    item.name.toLocaleLowerCase().includes(keyword)
  );

  const subcategoriesToDisplay = keyword ? filteredItems : subcategories;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="colmd-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? <h4>...Loading</h4> : <h4>Create Sub Category</h4>}
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
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
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          {subcategoriesToDisplay.map((c) => (
            <div className="alert alert-secondary" key={c._id}>
              {c.name}
              <span
                onClick={() => handleDeleteSubcategory(c.slug)}
                className="btn btn-small float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/subcategory/${c.slug}`}>
                <span className="btn btn-small float-right">
                  <EditOutlined className="text-warning" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubcategoryCreate;
