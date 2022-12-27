export enum UserRole {
  Client = 'Client',
  Picker = 'Picker',
  Regular = 'Regular',
  Admin = 'Admin',
  SuperAdmin = 'SuperAdmin',
}


export interface offersType {
  budget: string;
  budgetService: string;
  carBrand: string;
  carModel: string;
  city: string;
  currency: string;
  description: string;
  title: string;
  createdAt: string;
  id: number;
}

export interface offersProps {
  offers: offersType[];
}

export interface offerType {
  budget: string;
  budgetService: string;
  carBrand: string;
  carDrive: string;
  carForces: string;
  carGas: string;
  carLiters: string;
  carModel: string;
  carTransmission: string;
  carType: string;
  carYear: string;
  city: string;
  createdAt: string;
  currency: string;
  description: string;
  id: number;
  userId: number;
  phoneNumber: string;
  title: string;
  userName: string;
}

export interface offerProps {
  offer: offerType;
}

export interface userType {
  city: string;
  createdAt: string;
  phoneNumber: string;
  email: string;
  id: number;
  photo: string;
  role: string;
  updatedAt: string;
  userLastName: string;
  userName: string;
  experience: string;
  description: string;
}

export interface userProps {
  users: userType[];
}
export interface pickerProps {
  picker: userType;
}
