import axios from 'axios';
import { SetSettingsParams } from '../stor/AppStore';

export const instance = axios.create({
  baseURL: 'https://api.green-api.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const checkAccountAuthorization = async (
  idInstance: string,
  apiTokenInstance: string,
) => {
  try {
    const stateUrl = `waInstance${idInstance}/getStateInstance/${apiTokenInstance}`;

    const stateResponse = await instance.get(stateUrl);
    const stateInstance = stateResponse.data.stateInstance;

    return stateInstance === 'authorized';
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const checkPhoneNumberExists = async (
  idInstance: string,
  apiTokenInstance: string,
  phoneNumber: number,
) => {
  try {
    const checkUrl = `waInstance${idInstance}/checkWhatsapp/${apiTokenInstance}`;

    const checkResponse = await instance.post(checkUrl, { phoneNumber });
    return checkResponse.data.existsWhatsapp;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const sendMessage = async (params: SendMessageProps) => {
  const { idInstance, apiTokenInstance, ...props } = params;

  try {
    const sendMessageUrl = `waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

    const requestBody = {
      ...props,
    };

    const response = await instance.post(sendMessageUrl, requestBody);

    return response.data.idMessage;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchData = async (params: SetSettingsParams) => {
  const { idInstance, apiTokenInstance, phoneNumber } = params;

  try {
    const parsedPhone = Number(phoneNumber);

    const isAuthorized = await checkAccountAuthorization(
      idInstance,
      apiTokenInstance,
    );

    if (isAuthorized) {
      return await checkPhoneNumberExists(
        idInstance,
        apiTokenInstance,
        parsedPhone,
      );
    }
  } catch (error) {
    console.error(error);
  }
};

export const receiveNotification = async (
  idInstance: string,
  apiTokenInstance: string,
) => {
  try {
    const receiveUrl = `waInstance${idInstance}/receiveNotification/${apiTokenInstance}`;

    const response = await instance.get(receiveUrl);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteNotification = async (
  idInstance: string,
  apiTokenInstance: string,
  receiptId: number,
) => {
  try {
    const deleteUrl = `waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`;

    const response = await instance.delete(deleteUrl);
    return response.data.result;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export type SendMessageProps = {
  idInstance: string;
  apiTokenInstance: string;
  chatId: string;
  message: string;
};
