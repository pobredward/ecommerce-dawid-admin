import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";

const Products: React.FC = () => {
  return (
    <Layout>
      <Link
        href={"/products/new"}
        className="bg-blue-900 text-white rounded-md py-1 px-2"
      >
        Add new products
      </Link>
    </Layout>
  );
};

export default Products;
