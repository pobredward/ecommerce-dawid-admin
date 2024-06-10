import React from "react";
import Layout from "../../components/Layout";
import ProductForm from "../../components/ProductForm";

const NewProduct: React.FC = () => {
  return (
    <Layout>
      <h1>New Product</h1>
      <ProductForm />
    </Layout>
  );
};

export default NewProduct;
