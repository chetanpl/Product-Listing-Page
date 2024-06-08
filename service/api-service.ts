// The Genric function returns product list and product details list
export async function getProductList<T>(API_URL: string): Promise<T> {
  const res = await fetch(`${API_URL}`);
  const response: T = await res.json();
  return response;
};
export default getProductList;