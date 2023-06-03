import { makeAutoObservable } from 'mobx';
import { fetchData } from '../api/green_api';

export enum STATUS {
  Idle = 'idle',
  Error = 'error',
  Success = 'success',
}

export type SetSettingsParams = {
  idInstance: string;
  apiTokenInstance: string;
  phoneNumber: string;
};

class AppStore {
  idInstance = '';
  apiTokenInstance = '';
  phoneNumber = '';
  loading = false;
  status = STATUS.Idle;
  textErrors = '';

  constructor() {
    makeAutoObservable(this);
  }

  checkData = async (data: SetSettingsParams) => {
    this.status = STATUS.Idle;
    this.loading = true;

    const { idInstance, apiTokenInstance, phoneNumber } = data;

    try {
      const existsWhatsapp = await fetchData(data);

      if (existsWhatsapp) {
        this.idInstance = idInstance;
        this.apiTokenInstance = apiTokenInstance;
        this.phoneNumber = phoneNumber;

        this.status = STATUS.Success;
      } else {
        this.textErrors = 'что то пошло не так';
        this.status = STATUS.Error;
      }
    } catch (error) {
      this.status = STATUS.Error;
      this.textErrors = 'что то пошло не так';
    } finally {
      this.loading = false;
    }
  };
}

export default new AppStore();
