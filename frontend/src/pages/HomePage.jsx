import { useEffect } from "react"
import { useProductStore } from "../store/product"
import ProductCard from "../components/ProductCard";



function HomePage() {

  const { fetchProduct, products } = useProductStore();

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);
  console.log("products", products);

  return (
    <>
      <div className="container-xl py-12">
        <div className="p-8">
          <h1 className="text-3x1 cursor-pointer font-bold bg-gradient-to-r from-cyan-400 to blue-500 bg-clip-text text-transparent text-center ">Current Products</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 w-full">
          {
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          }

        </div>







        {products.length === 0 && (
          <div>
          <p className="text-xl text-center font-stretch-extra-expanded font-bold color-gray-500 ">No product found <span className="underline italic"><a href="/CreatePage">Create a Product</a></span></p>
        </div>
        )}
      </div>
    </>
  )
}

export default HomePage
