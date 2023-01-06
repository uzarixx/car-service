import $api from '../http';

export default class chatService {

  static async createChat (lastId: number, message: number) {
    return $api.post('/new-chat-create', {lastId, message})
  }

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