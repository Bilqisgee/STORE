/* eslint-disable react/prop-types */
import { useState } from "react"; 
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const { deleteProduct, updateProduct } = useProductStore();
  const [toast, setToast] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);

    if (success) {
      setToast({
        type: "success",
        message: "Product deleted successfully!",
      });
    } else {
      setToast({
        type: "error",
        message: message || "Failed to delete product.",
      });
    }

    setTimeout(() => setToast(null), 3000);
  };

  const dismissToast = () => setToast(null);
  const closeModal = () => setIsModalOpen(false);

  const handleUpdatedProduct = async (pid, updatedProductData) => {
    const { success, message } = await updateProduct(pid, updatedProductData);

    if (success) {
      setToast({
        type: "success",
        message: "Product updated successfully!",
      });
      closeModal();
    } else {
      setToast({
        type: "error",
        message: message || "Failed to update product.",
      });
    }

    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="container shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-[5px] hover:shadow-xl">
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">{product.name}</h3>
        <p className="font-bold text-xl text-red-500 mb-4">${product.price}</p>
        <div className="flex space-x-2">
          <button
            className="p-2 bg-blue-500 text-white rounded"
            onClick={() => setIsModalOpen(true)}
          >
            <FaEdit />
          </button>
          <button
            className="p-2 bg-red-500 text-white rounded"
            onClick={() => handleDeleteProduct(product._id)}
          >
            <MdDelete />
          </button>
        </div>

        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            onClick={closeModal}
          >
            <div
              className="bg-gray-200 dark:bg-gray-600 p-6 rounded-lg shadow-lg w-min relative"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4 text-center">
                Edit product
              </h2>

              <form
                className="p-8 rounded-lg bg-gray-400 dark:bg-gray-700 shadow-md"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdatedProduct(product._id, updatedProduct);
                }}
              >
                <input
                  type="text"
                  className="w-full text-black bg-slate-200 px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  name="name"
                  value={updatedProduct.name}
                  placeholder="Product Name"
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      name: e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="number"
                  className="w-full text-black bg-slate-200 px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  name="price"
                  value={updatedProduct.price}
                  placeholder="Price"
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      price: e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="text"
                  className="w-full text-black bg-slate-200 px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  name="image"
                  value={updatedProduct.image}
                  placeholder="Image URL"
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      image: e.target.value,
                    })
                  }
                  required
                />

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {toast && (
          <div
            className={`mt-4 p-3 rounded ${
              toast.type === "success" ? "bg-green-500" : "bg-red-500"
            } text-white`}
          >
            {toast.message}
            <button onClick={dismissToast} className="ml-4 text-sm underline">
              Dismiss
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
