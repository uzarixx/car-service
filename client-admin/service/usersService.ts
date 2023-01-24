import $api from '@/http';

export default class usersService {
  static async getUsers() {
    return $api.get('/get-all-users');
  }
  static async getUserById(id: number) {
    return $api.get(`/get-user/${id}`)
  }
  static async updateUser(data: { [key: string]: string }) {
    return $api.post(`/update-user`, {data})
  }
  static async verifyUser(id: number) {
    return $api.post('/verify-user', {id})
  }
}