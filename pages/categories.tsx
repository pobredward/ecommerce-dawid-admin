import React from "react";
import Layout from "../components/Layout";
import axios from "axios";
import Swal from "sweetalert2";

interface Category {
  _id: string;
  name: string;
  parent?: Category;
  properties?: Property[];
}

interface Property {
  name: string;
  values: string;
}

const Categories: React.FC = () => {
  const [editedCategory, setEditedCategory] = React.useState<Category | null>(
    null,
  );
  const [name, setName] = React.useState<string>("");
  const [parentCategory, setParentCategory] = React.useState("");
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [properties, setProperties] = React.useState<Property[]>([]);

  React.useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    axios.get<Category[]>("/api/categories").then((result) => {
      setCategories(result.data);
    });
  };

  const saveCategory = async (e: React.FormEvent) => {
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
    setParentCategory("");
    setProperties([]);
    fetchCategories();
  };

  const editCategory = (category: Category) => {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id || "");
    setProperties(category.properties || []);
  };

  const deleteCategory = (category: Category) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete ${category.name}?`,
      showCancelButton: true,
      confirmButtonColor: "#d55",
      confirmButtonText: "Yes, Delete!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { _id } = category;
        await axios.delete("/api/categories?_id=" + _id);
        fetchCategories();
      }
    });
  };

  const addProperty = () => {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
    console.log(properties);
  };

  const handlePropertyNameChange = (index: number, newName: string) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index] = { ...properties[index], name: newName };
      return properties;
    });
  };

  const handlePropertyValuesChange = (index: number, newValues: string) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index] = { ...properties[index], values: newValues };
      return properties;
    });
  };

  const removeProperty = (indexToRemove: number) => {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  };

  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory
          ? `Edit Category ${editedCategory.name}`
          : "Create new catergory"}
      </label>
      <form onSubmit={saveCategory}>
        <div className="flex gap-1">
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
        </div>
        <div className="mb-2">
          <label className="block">Properties</label>
          <button
            onClick={addProperty}
            type="button"
            className="btn-default text-sm mb-2"
          >
            Add new property
          </button>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div key={index} className="flex gap-1 mb-2">
                <input
                  className="mb-0"
                  type="text"
                  value={property.name}
                  onChange={(e) =>
                    handlePropertyNameChange(index, e.target.value)
                  }
                  placeholder="property name ex) color"
                ></input>
                <input
                  className="mb-0"
                  type="text"
                  value={property.values}
                  onChange={(e) =>
                    handlePropertyValuesChange(index, e.target.value)
                  }
                  placeholder="values, comma separated"
                ></input>
                <button
                  onClick={() => removeProperty(index)}
                  className="btn-default"
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
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
                  <button
                    onClick={() => deleteCategory(category)}
                    className="btn-primary"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Categories;
