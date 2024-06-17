import { httpClient } from './httpClient';

interface CompletePaymentData {
  deliveryMessage: string;
  orderId: string;
  paymentKey: string;
}

export async function completePayment(data: CompletePaymentData): Promise<any> {
  try {
    const response = await httpClient().post('/payments/comfirm', data);
    return response;
  } catch (error) {
    throw new Error(`Error completing payment: ${error}`);
  }
}
