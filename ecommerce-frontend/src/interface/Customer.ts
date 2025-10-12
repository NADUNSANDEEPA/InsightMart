export interface Customer {
  _id?: string;
  fullName: string;
  address: string;
  email: string;
  phone: string;
  password: string;
  city: string;
  province: string;
  customerType: string;
  familySize: number;
  isThereAllergic: string;
  religion: string;
  active: boolean;
}