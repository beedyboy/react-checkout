# Checkout Component Implementation

This project contains a React application that allows customers to order health products through a web portal. The main feature of the application is a checkout component that allows customers to view available health products, add them to a cart, and review their order summary before checking out.

## Requirements

To run this application, you will need:

- Node.js (version 14 or later)
- NPM (version 6 or later)

## Getting Started

To get started with this project, follow these steps:

1. Fork this GitHub [repository](https://github.com/beedyboy/react-checkout).
2. Clone the forked repository to your local machine.
3. Install the project dependencies by running `npm install`.
4. Start the development server by running `npm start`.
5. Open [http://localhost:3000](http://localhost:3000) in your web browser.
6. Implement the requirements stated above.
7. Commit your changes to the forked repository.
8. Push the changes to the forked repository.
9. Create a pull request to the original repository and make [@beedyboy](https://github.com/beedyboy) as a reviewer.


## Functionality

The `<Checkout />` component provides the following functionality:

- Loads products using the provided `getProducts()` function.
- Displays a loading icon until all the product data has been successfully loaded.
- Renders each product object as a `<Product/>` component, passing in the necessary props.
- Implements add to cart and remove from cart methods.
- The add and remove buttons adjust the ordered quantity of each product.
- The add and remove buttons are enabled/disabled to ensure that the ordered quantity can’t be negative and can’t exceed the available count for that product.
- The total shown for each product is calculated based on the ordered quantity and the price.
- Implements a cart functionality to adjust the cart items to display only products added to cart.
- The total in the order summary is calculated.
- For orders over $1000, applies a 10% discount to the order. Displays the discount text only if a discount has been applied.
- The total reflects any discount that has been applied.
- All dollar amounts are displayed to 2 decimal places.

## Evaluation Criteria

The candidate will be evaluated based on the following criteria:

- Correctness of implementation and adherence to the stated requirements.
- Code quality, including modularity and organization.
- Ability to write clear and concise code.
- Use of React best practices.
- Proper error handling and testing.

## Senior Role Requirements

If you are applying for a senior role, the following additional tasks are required:

- Write tests using the tool of your choice.
- Convert the app to TypeScript.

## Extra Tasks

Consider doing any of the senior role requirements, if you haven't already, or any of the following:

- Create a backend in express or Nest.js app to return products and the frontend should consume accordingly.
- Write your own Express server that serves the app.

## To start the server

- cd into server, and then cd into backend.
- Then run npm start to start the server.

## Conclusion

Thank you for your interest in this project! We look forward to seeing your implementation. If you have any questions, please don't hesitate to reach out.
