import React from "react";
import Layout from "../components/Layout";
import axios from "axios";

const Categories: React.FC = () => {
  const [name, setName] = React.useState("");
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);

  const saveCategory = async (e) => {
    e.preventDefault();
    await axios.post("/api/categories", { name });
    setName("");
  };

  return (
    <Layout>
      <h1>Categories</h1>
      <label>New category name</label>
      <form onSubmit={saveCategory} className="flex gap-1">
        <input
          type="text"
          placeholder={"Category name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-0"
        ></input>
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Category Name</td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              <tr>
                <td>{category.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Categories;
