import { Product } from '../types/product-type';

// Manage to return all products records
const getProducts = async (API_URL:string): Promise<Product[]> => {
  const res = await fetch(`${API_URL}`);
  const response: Product[] = await res.json();
 return response;
};
// API return each product records
const getProduct = async (API_URL:string): Promise<Product> => {
  const res = await fetch(`${API_URL}`);
  const response: Product = await res.json();
  return response;
};
export {getProducts, getProduct}