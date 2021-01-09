import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AdminNav, CategoryForm } from "../../../components";
import { updateCategory, getCategory } from "../../../api/category";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CategoryUpdate = ({ history }) => {
  const { slug } = useParams();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadCategory = () => {
    getCategory(slug).then((res) => {
      setName(res.data.name);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    updateCategory(user.token, slug, { name })
      .then((res) => {
        setLoading(false);
        toast.success(`"${res.data.name}" is updated`);
        history.push("/admin/category");
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
          {loading ? <h4>...Loading</h4> : <h4>Update Category</h4>}
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

export default CategoryUpdate;
