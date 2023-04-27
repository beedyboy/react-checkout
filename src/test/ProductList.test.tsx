import { screen, render } from "@testing-library/react"
import { Product } from "../interface/product.interface"
import ProductList from "../component/Product/ProductList"

describe("Render ProductList component", () => {
    test("show the product list", () => {
        const list:Product[] = [
            {
                id: 1,
                name: "Product 1",
                description: "This is the first product",
                price: 9.99,
                quantity: 10,
                currentQuantity:0
            },
            {
                id: 2,
                name: "Product 2",
                description: "This is the second product",
                price: 19.99,
                quantity: 20,
                currentQuantity:0
            },
        ]

        const {queryByText, queryByRole, getByText} = render(<ProductList products={list} addProductToCart={() => null} removeProductFromCart={() => null}/>)
        const firstItem = queryByText(list[0].description)
        const secondItem = getByText(list[1].description)
        
        //@ts-ignore
        expect(firstItem).toBeInTheDocument()
        //@ts-ignore
        expect(secondItem).toBeInTheDocument()
        
    })

    test("shows no product", () => {
        const list:Product[] = []
        const {queryByRole} = render(<ProductList products={list} addProductToCart={() => null} removeProductFromCart={() => null}/>)
        const card = queryByRole('list')
        //@ts-ignore
        expect(card).not.toBeInTheDocument()
        
    })
})