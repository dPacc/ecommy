import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AdminNav, CategoryForm } from "../../../components";
import { updateSubcategory, getSubcategory } from "../../../api/subcategory";
import { getCategories } from "../../../api/category";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const SubcategoryUpdate = ({ history }) => {
  const { slug } = useParams();
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
    loadSubcategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const loadSubcategory = () => {
    getSubcategory(slug).then((res) => {
      setName(res.data.name);
      setCategory(res.data.parent);
      //   console.log(res);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    updateSubcategory(user.token, slug, name, category)
      .then((res) => {
        setLoading(false);
        toast.success(`"${res.data.name}" is updated`);
        history.push("/admin/subcategory");
        // console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
        console.log(err);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="colmd-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? <h4>...Loading</h4> : <h4>Update Sub Category</h4>}
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
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
        </div>
      </div>
    </div>
  );
};

export default SubcategoryUpdate;
