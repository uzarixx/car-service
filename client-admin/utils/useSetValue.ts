import { useEffect } from 'react';

interface props {
  methods: any;
  user: {[key: string]: any };
}

export const useSetValue = ({ methods, user }: props) => {
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