import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import axios from "axios";

const DeleteProductPage = () => {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState(null);
  const { id } = router.query;

  React.useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);

  const goBack = () => {
    router.push("/products");
  };

  const deleteProduct = async () => {
    await axios.delete("/api/products?id=" + id);
    goBack();
  };

  return (
    <Layout>
      <h1 className="text-center">
        Do you really want to delete {productInfo?.title}?
      </h1>
      <div className="flex justify-center gap-2">
        <button onClick={deleteProduct} className="btn-red">
          Yes
        </button>
        <button className="btn-default" onClick={goBack}>
          No
        </button>
      </div>
    </Layout>
  );
};

export default DeleteProductPage;
