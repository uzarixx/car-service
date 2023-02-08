import { createStore, createEvent } from 'effector';
import ResponsesService from '@/service/responsesService';

export const responsesData = createEvent('responses data');
export const $data = createStore([]).on(responsesData, (_, newData: any) => newData);


export const getResponses = async () => {
  const { data } = await ResponsesService.getAllResponses();
  responsesData(data);
};