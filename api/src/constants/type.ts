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
}

export interface offerDataType {
  data: offerType;
}
