import { render, screen } from "@testing-library/react";
//import userEvent from "@testing-library/user-event";

import Product from "../component/Product/Product";
import { Product as PInterface } from "../interface/product.interface";

// rendering the component
describe("Renders a Product Component", () => {
    test("renders the product", () => {
        const product:PInterface ={
            id: 15,
            name: "Product 15",
            description: "This is the seventh product",
            price: 69.99,
            quantity: 70,
            currentQuantity:0
        };

        render(<Product product={product} addProductToCart={() => null} removeFromCart={() => null} />)
        const element = screen.getByText(product.name)
        //@ts-ignore
        expect(element).toBeInTheDocument()
    })

    test("does not render the product",  () => {
        const product:PInterface = {
            id: 15,
            name: "",
            description: "This is the seventh product",
            price: 69.99,
            quantity: 70,
            currentQuantity:0

        }  // empty object
        render(<Product product={product} addProductToCart={() => null} removeFromCart={() => null} />)
        const element = screen.findByText(product.name)
        //@ts-ignore
        expect(element).not.toEqual("Product 15")
    })
})
