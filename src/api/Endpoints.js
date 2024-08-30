import Constants from "./Constants";

const Endpoints = {
  PRODUCT_URL: `${Constants.BASE_URL}products`, // URL for all products
  IMAGE_URL: `${Constants.BASE_URL}images`, // Assuming images are hosted here (replace with actual path if different)
  PRODUCT_BY_ID: `${Constants.BASE_URL}products/`, // URL for getting a product by ID (you'll append the ID when making the request)
  REGISTER_URL: `${Constants.BASE_URL}users`, // URL for registering a new user
  LOGIN_URL: `${Constants.BASE_URL}auth/login`, // URL for registering a new user
};

export default Endpoints;

// SUB_CATEGORY_URL: `${Constants.BASE_URL}subcategory`
// PRODUCT_BY_ID_URL: `${Constants.BASE_URL}/products/id`
