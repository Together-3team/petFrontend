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
