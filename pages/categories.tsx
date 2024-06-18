import React from "react";
import Layout from "../components/Layout";
import axios from "axios";

const Categories: React.FC = () => {
  const [editedCategory, setEditedCategory] = React.useState(null);
  const [name, setName] = React.useState("");
  const [parentCategory, setParentCategory] = React.useState("");
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  };

  const saveCategory = async (e) => {
    e.preventDefault();
    const data = {
      name,
      parent: parentCategory || null,
    };
    if (editedCategory) {
      await axios.put("/api/categories", { ...data, _id: editedCategory._id });
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }
    setName("");
    fetchCategories();
  };

  const editCategory = async (category) => {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
  };

  const deleteCategory = async (e) => {};

  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory
          ? `Edit Category ${editedCategory.name}`
          : "Create new catergory"}
      </label>
      <form onSubmit={saveCategory} className="flex gap-1">
        <input
          type="text"
          placeholder={"Category name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-0"
        ></input>
        <select
          className="mb-0"
          onChange={(e) => setParentCategory(e.target.value)}
          value={parentCategory}
        >
          <option value="">No parent category</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option value={category._id}>{category.name}</option>
            ))}
        </select>
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Category Name</td>
            <td>Parent Category</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              <tr>
                <td>{category.name}</td>
                <td>{category?.parent?.name}</td>
                <td>
                  <button
                    onClick={() => editCategory(category)}
                    className="btn-primary mr-1"
                  >
                    Edit
                  </button>
                  <button className="btn-primary">Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Categories;
