export interface DeliveryInfo {
  id: number;
  name: string;
  recipient: string;
  recipientPhoneNumber: string;
  zipCode: string;
  address: string;
  detailedAddress: string;
  isDefault: boolean;
}
