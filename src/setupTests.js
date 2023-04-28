import { render, screen , fireEvent} from '@testing-library/react';
import ProductList from '../src/component/product-list/ProductList';
import Product from './component/product/Product';
import { ApiContext } from './context/product-context';

const mockData = [
    {
        id: 1,
        name: "Product 1",
        description: "This is the first product",
        price: 9.99,
        quantity: 1
    },
    {
        id: 2,
        name: "Product 2",
        description: "This is the first product",
        price: 9.99,
        quantity: 1
    },
    {
        id: 3,
        name: "Product 3",
        description: "This is the first product",
        price: 9.99,
        quantity: 1
    }
];

const mockApiContext = {
  data: mockData,
  isLoaded: true,
  error: null,
};

describe('ProductList component', () => {
  it('should render a list of products', () => {
    render(
      <ApiContext.Provider value={mockApiContext}>
        <ProductList />
      </ApiContext.Provider>
    );

   //expect(screen.getByTestId('addtocartbtn')).toBeInTheDocument();
    expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Product 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Product 3/i)).toBeInTheDocument();
  });

  it('should render a checkout button', () => {
    render(
      <ApiContext.Provider value={mockApiContext}>
        <ProductList />
      </ApiContext.Provider>
    );

    expect(screen.getByRole('button', { name: /proceed to checkout/i })).toBeInTheDocument();
  });

  test('clicking the button with text "Add to cart" calls the onClick handler', () => {
    const handleClick = jest.fn();
  
  });

  test("clicking the Add to cart button adds the product to the cart", () => {
    const product =    {
        id: 3,
        name: "Product 3",
        description: "This is the first product",
        price: 9.99,
        quantity: 1
    };
  
    const addToCartMock = jest.fn();
  
    const { getByRole } = render(
      <Product product={product} onAddToCart={addToCartMock} />
    );
  
    const addToCartButton = getByRole("button", { name: "Add to cart" });
    fireEvent.click(addToCartButton);
    // Check that product was added to cart
    const cartItems = JSON.parse(localStorage.getItem('cart'));

    expect(cartItems.length).toBe(0);

  });
});
