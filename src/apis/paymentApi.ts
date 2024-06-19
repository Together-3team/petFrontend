import { httpClient } from './httpClient';

interface CompletePaymentData {
  selectedProductIds: string;
  deliveryId: number;
  groupBuyingId?: number;
  amount: number;
  deliveryMessage: string;
  orderId: string;
  paymentKey: string;
}

export async function completePayment(data: CompletePaymentData): Promise<any> {
  const { groupBuyingId, ...rest } = data;
  const requestData = groupBuyingId !== undefined ? { ...rest, groupBuyingId } : rest;
  console.log('Sending data:', requestData);
  try {
    const response = await httpClient().post('/payments/confirm', requestData);
    return response;
  } catch (error) {
    console.error('Error completing payment:', error);
    throw new Error(`Error completing payment: ${error}`);
  }
}
