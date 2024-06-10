import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import axios from "axios";

const Products: React.FC = () => {
  const [products, setProducts] = React.useState([]);
  React.useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  });

  return (
    <Layout>
      <Link
        href={"/products/new"}
        className="bg-blue-900 text-white rounded-md py-1 px-2"
      >
        Add new products
      </Link>
      <table className="basic mt-2">
        <thead>
          <tr>
            <td>Product Name</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr>
              <td>{product.title}</td>
              <td>buttons</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Products;
