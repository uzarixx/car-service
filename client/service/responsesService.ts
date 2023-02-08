import $api from '@/http';


export default class ResponsesService {
  static async getAllResponses() {
    return $api.get('get-all-responses');
  }
}