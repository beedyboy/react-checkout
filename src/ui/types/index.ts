export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}
export interface IOrder extends IProduct {}
