import { makeAutoObservable } from 'mobx';
import {
  deleteNotification,
  receiveNotification,
  sendMessage,
} from '../api/green_api';
import AppStore from './AppStore';

type ChatHistoryType = {
  message: string;
  idMessage: string;
  typeMessage: MessageType;
};

export enum MessageType {
  ExtendedTextMessage = 'extendedTextMessage',
  TextMessage = 'textMessage',
}

class ChatStore {
  loading = false;
  chatHistory: ChatHistoryType[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getReceiveNotification = async () => {
    const { idInstance, apiTokenInstance } = AppStore;

    const notification = await receiveNotification(
      idInstance,
      apiTokenInstance,
    );

    if (notification) {
      await deleteNotification(
        idInstance,
        apiTokenInstance,
        notification.receiptId,
      );

      if (
        notification?.body?.messageData?.typeMessage === MessageType.TextMessage
      ) {
        const textMessage =
          notification.body.messageData.textMessageData.textMessage;
        const typeMessage = notification.body.messageData.typeMessage;
        const idMessage = notification.body.idMessage;

        const newMessage = {
          idMessage,
          message: textMessage,
          typeMessage,
        };

        this.chatHistory = [...this.chatHistory, newMessage];
      }
    }
  };

  setSendMessage = async (message: string) => {
    const { idInstance, apiTokenInstance, phoneNumber } = AppStore;

    const params = {
      idInstance,
      apiTokenInstance,
      chatId: `${phoneNumber}@c.us`,
      message,
    };

    this.loading = true;

    try {
      const res = await sendMessage(params);
      const newMessage = {
        idMessage: res,
        message,
        typeMessage: MessageType.ExtendedTextMessage,
      };

      this.chatHistory = [...this.chatHistory, newMessage];
    } catch (error) {
      console.log('Error sending message:', error);
    } finally {
      this.loading = false;
    }
  };
}

export default new ChatStore();
