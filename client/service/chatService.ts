import $api from '../http';

export default class chatService {
  static async createMessage(chatId: number, message: string) {
    return $api.post(`/new-message`, { chatId, message });
  }

  static async getMessages(id: string) {
    return $api.get(`/get-messages/${id}`)
  }

  static async getChats() {
    return $api.get('/get-chats')
  }

  static async getChatData(id: string) {
    return $api.get(`/get-chat/${id}`)
  }
}