import { useEffect } from 'react';

interface propsUser {
  methods: any;
  user: {[key: string]: any };
}

interface propsOffer {
  methods: any;
  offer: {[key: string]: any };
}

export const useSetUserValue = ({ methods, user }: propsUser) => {
  useEffect(() => {
    methods.setValue('userName', user.userName);
    methods.setValue('userLastName', user.userLastName);
    methods.setValue('city', user.city);
    methods.setValue('experience', user.experience);
    methods.setValue('description', user.description);
    methods.setValue('phoneNumber', user.phoneNumber);
    methods.setValue('email', user.email);
  }, [user]);
};

export const useSetOfferValue = ({methods, offer}: propsOffer) => {
  useEffect(() => {
    methods.setValue('userName', offer.userName);
    methods.setValue('title', offer.title);
    methods.setValue('budget', `${offer.budget} ${offer.currency}`);
    methods.setValue('budgetService', `${offer.budgetService} грн.`);
    methods.setValue('carBrand', offer.carBrand);
    methods.setValue('carModel', offer.carModel);
    methods.setValue('carLiters', offer.carLiters);
    methods.setValue('carForces', offer.carForces);
    methods.setValue('carGas', offer.carGas);
    methods.setValue('carDrive', offer.carDrive);
    methods.setValue('carTransmission', offer.carTransmission);
    methods.setValue('carType', offer.carType);
    methods.setValue('carYear', offer.carYear);
    methods.setValue('city', offer.city);
    methods.setValue('phoneNumber', offer.phoneNumber);
    methods.setValue('description', offer.description);
  }, [offer])
}