export interface GroupUser {
  nickname: string;
}

export interface GroupBuyingData {
  id: number;
  status: number;
  groupUsers: GroupUser[];
}
