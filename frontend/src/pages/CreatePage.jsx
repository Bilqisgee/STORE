import { useState, useEffect } from "react"; // Importing useState hook to manage local state in the component
import { useProductStore } from "../store/product"; // Importing the custom store for handling product actions

function CreatePage() {
  // useState hook to manage the form data (new product) in the component's state
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  // State for the current year in the footer
  const [year, setYear] = useState("");

  // State for managing toast notifications
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setYear(currentYear);
  }, []);

  // Destructuring to get createProduct from the product store
  const { createProduct } = useProductStore();

  // handleSubmit function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from reloading on form submit

    // Call the `createProduct` function and check the response
    const { success, message } = await createProduct(newProduct);

    // Display a toast notification based on the success status
    if (success) {
      setToast({
        type: "success",
        message: "Product created successfully!",
      });
    } else {
      setToast({
        type: "error",
        message: message || "Failed to create product.",
      });
    }

    // Automatically dismiss the toast after 3 seconds
    setTimeout(() => setToast(null), 3000);
  };

  // Function to manually dismiss the toast
  const dismissToast = () => setToast(null);

  return (
    <>
      <div className="container mx-auto mt-20">
        {/* Toast Notification */}
        {toast && (
          <div
            className={`fixed top-5 right-5 p-4 rounded-md shadow-md text-white ${
              toast.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            <div className="flex items-center justify-between">
              <p>{toast.message}</p>
              <button
                onClick={dismissToast}
                className="ml-4 bg-transparent text-white text-lg font-bold"
              >
                &times;
              </button>
            </div>
          </div>
        )}

        {/* Page Title */}
        <h1 className="text-4xl text-center mb-6 font-extrabold font-serif">
          Create a Product
        </h1>

        {/* Form Container */}
        <div className="p-8 rounded-lg mt-20 bg-gray-400 dark:bg-gray-700 shadow-md">
          <form action="" className="mb-4">
            {/* Input field for product name */}
            <input
              type="text"
              className="w-full text-black bg-slate-200 px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              name="name"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              required
            />

            {/* Input field for product price */}
            <input
              type="number"
              className="w-full text-black bg-slate-200 px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              name="price"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              required
            />

            {/* Input field for image URL */}
            <input
              type="text"
              className="w-full px-4 text-black bg-slate-200 mb-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              name="image"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              required
            />

            {/* Submit button to trigger form submission */}
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-300 focus:outline-none focus:ring-blue-300"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Footer */}
        <footer className="mt-10 text-1 text-white text-center py-4">
          <p>&copy; {year} EHSAN.NG All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

export default CreatePage;
