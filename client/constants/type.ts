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
  sliceDesc: string;
  title: string;
  createdAt: string;
  id: number;
}

export interface offersProps {
  offers:offersType[];
  pageCount?: number;
  favorite?:number[];
  onAddFavorite?:(e: number) => void;
  onDeleteFavorite?:(e: number) => void;
}
export interface offersPropsResponse {
  offers: {count: number, rows: offersType[]}
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
  status: boolean;
  telegramActivate: boolean;
}

export interface photosType {
  id: number;
  secure_url: string;
  public_id: string;
  createdAt: string;
  updatedAt: string;
  userId: number;

}


export interface userProps {
  users: userType[];
}

export interface pickerProps {
  picker: userType;
  photo?: string;
  photos: photosType[];
}

export interface chatsType {
  id: number;
  secondId: number;
  lastId: number;
  createdAt: string;
  updatedAt: string;
}

export interface userChatType {
  id: number;
  userName: string;
  photo: string;
}

export interface chatType {
  chats: chatsType[],
  user: userChatType[];
}
