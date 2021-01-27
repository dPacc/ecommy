import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSubcategories } from "../../api/subcategory";

const SubcategoryList = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubcategories().then((res) => {
      setSubcategories(res.data);
      setLoading(false);
    });
  }, []);

  const showSubcategories = () =>
    subcategories.map((subcat) => (
      <div
        key={subcat._id}
        className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
      >
        <Link to={`/subcategory/${subcat.slug}`}>{subcat.name}</Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <h4 className="text-center">Loading...</h4>
        ) : (
          showSubcategories()
        )}
      </div>
    </div>
  );
};

export default SubcategoryList;
