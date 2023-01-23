import $api from '@/http';

export default class usersService {
  static async getUsers() {
    return $api.get('/get-all-users');
  }
  static async getUserById(id: number) {
    return $api.get(`/get-user/${id}`)
  }
}