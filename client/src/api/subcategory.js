import axios from "axios";

export const getSubcategories = async () => {
  return await axios.get(`${process.env.REACT_APP_BACKEND_API}/subcategories`);
};

export const getSubcategory = async (slug) => {
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_API}/subcategory/${slug}`
  );
};

export const createSubcategory = async (authtoken, name, parent) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_API}/subcategory`,
    { name, parent },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const updateSubcategory = async (authtoken, slug, name, parent) => {
  return await axios.put(
    `${process.env.REACT_APP_BACKEND_API}/subcategory/${slug}`,
    { name, parent },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const removeSubcategory = async (authtoken, slug) => {
  return await axios.delete(
    `${process.env.REACT_APP_BACKEND_API}/subcategory/${slug}`,
    {
      headers: {
        authtoken,
      },
    }
  );
};
