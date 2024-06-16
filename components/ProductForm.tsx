import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

interface ProductFormProps {
  _id?: string;
  title?: string;
  description?: string;
  price?: string;
  images?: [];
}

const ProductForm: React.FC<ProductFormProps> = ({
  _id,
  title: initialTitle = "",
  description: initialDescription = "",
  price: initialPrice = "",
  images: initialImage = [],
}) => {
  const [title, setTitle] = useState(initialTitle || "");
  const [description, setDescription] = useState(initialDescription || "");
  const [price, setPrice] = useState(initialPrice || "");
  const [images, setImages] = useState(initialImage || []);
  const [isUploading, setIsUploading] = useState(false);
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();

  const saveProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { title, description, price, images };
    if (_id) {
      // update
      await axios.put("/api/products", { ...data, _id });
    } else {
      // create
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  };

  if (goToProducts) {
    router.push("/products");
  }

  const uploadImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;

    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();

      for (let i = 0; i < files.length; i++) {
        data.append("file", files[i]); // Ensure the field name matches the backend
      }

      try {
        const res = await axios.post("/api/upload", data);
        setImages((oldImages) => {
          return [...oldImages, ...res.data.links];
        });
        e.target.value = "";
      } catch (error) {
        console.error("Upload Error:", error);
      }
      setIsUploading(false);
    }
  };

  const updateImagesOrder = (newOrder: string[]) => {
    console.log(newOrder);
    setImages(newOrder);
  };

  return (
    <form onSubmit={saveProduct}>
      <label>Product name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-2">
        <ReactSortable
          list={images}
          className="flex flex-wrap gap-1"
          setList={updateImagesOrder}
        >
          {!!images?.length &&
            images.map((link) => (
              <div key={link} className="h-32">
                <img src={link} alt="" className="rounded-lg"></img>
              </div>
            ))}
        </ReactSortable>
        {isUploading && (
          <div className="h-24 flex items-center">
            <Spinner />
          </div>
        )}
        <label className="w-32 h-32 cursor-pointer flex flex-col justify-center items-center gap-1 text-sm text-gray-500 rounded-lg bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Upload</div>
          <input
            type="file"
            onChange={uploadImages}
            className="hidden"
            multiple
          />
        </label>
      </div>
      <label>Description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>Price (in USD)</label>
      <input
        type="number"
        placeholder="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
};

export default ProductForm;
