import React, { useState, useEffect } from "react";
import { AdminNav } from "../../../components";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../api/category";

const CategoryCreate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    createCategory(user.token, name)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadCategories();
        // console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
        console.log(err);
      });
  };

  const handleDeleteCategory = async (slug) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeCategory(user.token, slug)
        .then((res) => {
          console.log(res);
          setLoading(false);
          toast.success(`${res.data.name} deleted`);
          loadCategories();
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

  const categoryForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Category name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            required={true}
          />
          <br />
          <button className="btn btn-outline-primary">Create</button>
        </div>
      </form>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="colmd-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? <h4>...Loading</h4> : <h4>Create Category</h4>}
          {categoryForm()}
          <hr />
          {categories.map((c) => (
            <div className="alert alert-secondary" key={c._id}>
              {c.name}
              <span
                onClick={() => handleDeleteCategory(c.slug)}
                className="btn btn-small float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/category/${c.slug}`}>
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

export default CategoryCreate;
