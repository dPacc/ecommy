import React from "react";
import { Select } from "antd";

const { Option } = Select;

const ProductUpdateForm = ({
  handleSubmit,
  handleChange,
  handleCatChange,
  values,
  subOptions,
  handleSetSubs,
  categories,
  arrayOfSubIds,
  setArrayOfSubIds,
  selectedCategory,
}) => {
  const {
    title,
    description,
    price,
    category,
    shipping,
    quantity,
    colors,
    brands,
    color,
    brand,
  } = values;
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={title}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={price}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Shipping</label>
        <select
          value={shipping === "Yes" ? "Yes" : "No"}
          name="shipping"
          className="form-control"
          onChange={handleChange}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          className="form-control"
          value={quantity}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Color</label>
        <select
          name="color"
          value={color}
          className="form-control"
          onChange={handleChange}
        >
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Brand</label>
        <select
          name="brand"
          value={brand}
          className="form-control"
          onChange={handleChange}
        >
          <option>Please Select</option>

          {brands.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Category</label>
        <select
          name="category"
          className="form-control"
          onChange={handleCatChange}
          select={false}
          value={selectedCategory ? selectedCategory : category._id}
        >
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
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Please Select"
          name="subcategories"
          value={arrayOfSubIds}
          onChange={(value) => setArrayOfSubIds(value)}
        >
          {subOptions.length &&
            subOptions.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
        </Select>
      </div>

      <br />

      <button className="btn btn-outline-info">Save</button>
    </form>
  );
};

export default ProductUpdateForm;
