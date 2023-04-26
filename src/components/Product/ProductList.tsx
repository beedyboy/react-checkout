import Product from "./ProductItem";


const ProductList = ({ products, addProductToCart, removeProductFromCart }: any) => {
    console.log(products)
    return (
      <div>
        <h1>Health Products</h1>
        <div className="card-container">
          {products?.map((product: any) => (
            <div key={product.id} className="card">
              <Product product={product} />
            </div>
          ))}
        </div>
      </div>
    );
  };

export default ProductList;