import React, { FC } from 'react';
import Layout from '../../components/ui/layout/Layout';
const MessagesDetail: FC = () => {
  // const router = useRouter();
  // const chatId: any = router.query.id;
  // const chats = useStore($data);
  // const [isLoading, setIsLoading] = useState(false);
  // const [chatMessages, setChatMessages] = useState([]);
  // const getChatById = async () => {
  //   setIsLoading(true);
  //   const { data } = await chatService.getChatData(chatId);
  //   setChatMessages(data);
  //   await setIsLoading(false);
  // // };
  // useEffect(() => {
  //   // chats.length >= 0 && getChats()
  // }, []);
  // useEffect(() => {
  //   chatId && getChatById();
  // }, [chatId]);
  return (
    <Layout title={``} description={''}>
      <h2>404</h2>
      {/*<MessagesComponentDetail chats={chats} chatData={chatMessages} isLoading={isLoading} />*/}
    </Layout>
  );
};

export default MessagesDetail;