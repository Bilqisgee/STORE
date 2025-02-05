import {create} from 'zustand';


export  const useProductStore = create((set) =>   ({

products: [],
setProducts: (products) => set({products}),
createProduct: async (newProduct) => {
if (!newProduct.name || !newProduct.price || !newProduct.image) {
    return { success: false, message: " Please fill in all Fields."}
}
const res = await fetch("http://localhost:5000/api/products", {
    method: "POST",
    headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify(newProduct) 
}) // config in vite.config too


const data = await res.json();
set((state) => ({products:[...state.products, data.data]}))
return {success: true, message: "Product created successfully"}
},
fetchProduct: async () => {
    try {
        const res = await fetch("http://localhost:5000/api/products");  // Ensure the full URL if backend runs on a different port

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        // Check if the response has content before parsing
        const text = await res.text(); 
        if (!text) {
            throw new Error("Empty response from server.");
        }

        const data = JSON.parse(text);  // Parse the text manually to catch errors
        set({ products: data.data });

    } catch (error) {
        console.error("Failed to update product:", error);
        console.error("Failed to fetch products:", error);
    }
},
deleteProduct: async (pid) => { // pid = product id
    const res = await fetch(`/api/products/${pid}`,{
        method: "DELETE",
    });
    const data = await res.json();
    if(!data.success) 
        return {success: false, message: data.message};
    //update ui immediately 
        set((state) => ({products: state.products.filter((product) => product._id !== pid)}))
        return {success: true, message:  data.message};
    
},
updateProduct: async (pid, updatedProduct) => {
    try {
        const res = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        });

        const data = await res.json();

        if (!data.success) {
            return {
                success: false,
                message: data.message,
            };
        }

        // Update the UI immediately without needing to refresh
        set((state) => ({
            products: state.products.map((product) =>
                product._id === pid ? data.data : product
            ),
        }));

        return {
            success: true,
            message: "Product updated successfully!",
        };
    } catch (error) {
        return {
            success: false,
            message: `Network error: Unable to update product. ${error.message}`,
        };
    }
},

}))










