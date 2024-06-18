import { httpClient } from './httpClient';
import { Product } from '@/pages/cart';

interface ProductResponse {
  id: number;
  optionCombination: {
    product: {
      originalPrice: number;
      price: number;
      title: string;
      thumbNailImage: string;
    };
    optionCombination: string;
    combinationName: string;
    combinationPrice: number;
    stock: number;
  };
  quantity: number;
}

// 상품목록 GET
export async function fetchCartProducts(): Promise<Product[]> {
  try {
    const response = await httpClient().get<ProductResponse[]>('/selected-products/carts');
    console.log(response);
    return response.map(item => ({
      id: item.id,
      productTitle: item.optionCombination.product.title,
      option: item.optionCombination.combinationName,
      productCost: item.optionCombination.product.price,
      originalCost: item.optionCombination.product.originalPrice,
      combinationPrice: item.optionCombination.combinationPrice,
      productNumber: item.quantity,
      imageUrl: item.optionCombination.product.thumbNailImage,
      isChecked: true,
    }));
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
}

// 상품 전체 DELETE
export async function deleteAllProducts() {
  try {
    await httpClient().delete(`/selected-products/orders`);
    console.log(`Products all deleted successfully`);
  } catch (error) {
    console.error(`Failed to delete: `, error);
  }
}

// 상품 선택 DELETE
export async function deleteProductById(id: number) {
  try {
    await httpClient().delete(`/selected-products/${id}`);
    console.log(`Product with ID ${id} deleted successfully`);
  } catch (error) {
    console.error(`Failed to delete product with ID ${id}: `, error);
  }
}

// 상품 수량 PUT
export async function updateProductQuantity(id: number, newQuantity: number) {
  try {
    await httpClient().put(`/selected-products/${id}`, { quantity: newQuantity });
  } catch (error) {
    console.error('Failed to update product quantity:', error);
    throw error;
  }
}
