export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

class FakeStoreAPI {
  private static baseURL = 'https://fakestoreapi.com';

  /**
   * Fetches all products from the FakeStore API
   * @returns Promise<Product[]> - A promise that resolves to an array of products
   */
  static async getAllProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${this.baseURL}/products`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
      }
      
      const data: Product[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  /**
   * Fetches a single product by ID
   * @param id - The ID of the product to fetch
   * @returns Promise<Product> - A promise that resolves to a product
   */
  static async getProduct(id: number): Promise<Product> {
    try {
      const response = await fetch(`${this.baseURL}/products/${id}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch product ${id}: ${response.status} ${response.statusText}`);
      }
      
      const data: Product = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  }

  /**
   * Fetches all product categories
   * @returns Promise<string[]> - A promise that resolves to an array of category names
   */
  static async getCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${this.baseURL}/products/categories`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.status} ${response.statusText}`);
      }
      
      const data: string[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  /**
   * Fetches products in a specific category
   * @param category - The category to fetch products for
   * @returns Promise<Product[]> - A promise that resolves to an array of products
   */
  static async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const response = await fetch(`${this.baseURL}/products/category/${category}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch products in category ${category}: ${response.status} ${response.statusText}`);
      }
      
      const data: Product[] = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching products in category ${category}:`, error);
      throw error;
    }
  }
}

export default FakeStoreAPI;
