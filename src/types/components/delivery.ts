export interface DeliveryInfo {
  id: number;
  name: string;
  recipient: string;
  recipientPhoneNumber: string;
  zipCode: number;
  address: string;
  detailedAddress: string;
  isDefault: boolean;
}
