import axios from 'axios';
import { Product } from '../types/product-type';

export const getProducts = async (API_URL:string): Promise<Product[]> => {
  const response = await axios.get<Product[]>(`${API_URL}`);
 return response.data;
};