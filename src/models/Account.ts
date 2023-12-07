import Address from "./Address";

export default interface Account {
  _id?: string;
  uid: string;
  name?: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  toAddress: Address;
  fromAddress: Address;
  tasks: Task[];
  orders: Order[];
  expenses: Expense[];
}

interface Task {
  name: string;
  content: string;
  deadline: string;
}

interface Order {
  trackingID: string;
  name: string;
  deliveryDate: string;
}

interface Expense {
  name: string;
  price: number;
}
