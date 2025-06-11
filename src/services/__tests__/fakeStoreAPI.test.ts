import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import FakeStoreAPI, { Product } from '../fakeStoreAPI';

// Mock data
const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Test Product 1',
    price: 99.99,
    description: 'This is a test product',
    category: 'test',
    image: 'https://test.com/image1.jpg',
    rating: { rate: 4.5, count: 100 }
  },
  {
    id: 2,
    title: 'Test Product 2',
    price: 49.99,
    description: 'Another test product',
    category: 'test',
    image: 'https://test.com/image2.jpg',
    rating: { rate: 3.8, count: 50 }
  }
];

const mockCategories = ['electronics', 'jewelery', 'men\'s clothing', 'women\'s clothing'];

describe('FakeStoreAPI', () => {
  beforeEach(() => {
    // Setup global fetch mock
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getAllProducts', () => {
    it('should fetch all products successfully', async () => {
      // Mock the fetch implementation for successful response
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts
      });

      const products = await FakeStoreAPI.getAllProducts();
      
      expect(global.fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products');
      expect(products).toEqual(mockProducts);
      expect(products.length).toBe(2);
    });

    it('should handle fetch error', async () => {
      // Mock the fetch implementation for error response
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      });

      await expect(FakeStoreAPI.getAllProducts()).rejects.toThrow('Failed to fetch products: 500 Internal Server Error');
    });
  });

  describe('getProduct', () => {
    it('should fetch a single product successfully', async () => {
      const mockProduct = mockProducts[0];
      
      // Mock the fetch implementation
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProduct
      });

      const product = await FakeStoreAPI.getProduct(1);
      
      expect(global.fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products/1');
      expect(product).toEqual(mockProduct);
      expect(product.id).toBe(1);
    });

    it('should handle fetch error for single product', async () => {
      // Mock the fetch implementation for error response
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      });

      await expect(FakeStoreAPI.getProduct(999)).rejects.toThrow('Failed to fetch product 999: 404 Not Found');
    });
  });

  describe('getCategories', () => {
    it('should fetch categories successfully', async () => {
      // Mock the fetch implementation
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategories
      });

      const categories = await FakeStoreAPI.getCategories();
      
      expect(global.fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products/categories');
      expect(categories).toEqual(mockCategories);
      expect(categories.length).toBe(4);
    });

    it('should handle fetch error for categories', async () => {
      // Mock the fetch implementation for error response
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      });

      await expect(FakeStoreAPI.getCategories()).rejects.toThrow('Failed to fetch categories: 500 Internal Server Error');
    });
  });
});
