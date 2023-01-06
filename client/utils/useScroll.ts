export const scrollToBottom = (messagesEndRef: any) => {
  if (messagesEndRef.current) {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }
};













