import axios from "axios";
import HttpDataListener from "./HttpDataListener";
import AppStorage from "../../service/AppStorage";
// import { getUserToken } from "src/utils/currentUser";

export const BASE_URL = "https://fakestoreapi.com";

export const post = async (
  route: string,
  data: {},
  httpDataListener: HttpDataListener
) => {
  try {
    const response = await axios.post(BASE_URL + route, data, {
      headers: authHeader(),
    });
    httpDataListener.onSuccess(response.data);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      try {
        if (err!.response!.status === 401) {
          logout();
        } else {
          httpDataListener.onFailure(getError(err));
        }
      } catch {
        httpDataListener.onFailure("An error occurred, please try again");
      }
    } else {
      httpDataListener.onFailure("An error occurred, please try again");
    }
  }
};
export const put = async (
  route: string,
  data: {},
  httpDataListener: HttpDataListener
) => {
  try {
    const response = await axios.put(BASE_URL + route, data, {
      headers: authHeader(),
    });
    httpDataListener.onSuccess(response.data);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      try {
        if (err!.response!.status === 401) {
          logout();
        } else {
          httpDataListener.onFailure(getError(err));
        }
      } catch {
        httpDataListener.onFailure("An error occurred, please try again");
      }
    } else {
      httpDataListener.onFailure("An error occurred, please try again");
    }
  }
};

export const uploadFile = async (
  route: string,
  file: File,
  data: any,
  httpDataListener: HttpDataListener
) => {
  try {
    console.log(data);
    let formData = new FormData();
    let extraData = Object.entries(data);
    console.log(extraData);
    formData.append("file", file);
    extraData.map((dataKey) => {
      formData.append(dataKey[0], `${dataKey[1]}`);
    });
    const response = await axios.post(BASE_URL + route, formData, {
      headers: UploadauthHeader(),
    });
    httpDataListener.onSuccess(response.data);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      try {
        if (err!.response!.status === 401) {
          logout();
        } else {
          httpDataListener.onFailure(getError(err));
        }
      } catch {
        httpDataListener.onFailure("An error occurred, please try again");
      }
    } else {
      httpDataListener.onFailure("An error occurred, please try again");
    }
  }
};

export const get = async (
  route: string,
  httpDataListener: HttpDataListener
) => {
  try {
    const response = await axios.get(BASE_URL + route, {
      headers: authHeader(),
      //   headers: AppStorage.instance.getUserToken3(),
    });
    httpDataListener.onSuccess(response.data);
  } catch (err) {
    console.log(err);
    if (axios.isAxiosError(err)) {
      try {
        if (err!.response!.status === 401) {
          logout();
        } else {
          httpDataListener.onFailure(getError(err));
        }
      } catch {
        httpDataListener.onFailure("An error occurred, please try again");
      }
    } else {
      httpDataListener.onFailure("An error occurred, please try again");
    }
  }
};

const logout = () => {
  AppStorage.instance.logout();
};

const authHeader = () => {
  //   const curUser = getUserToken();
  const curUser: any = "";
  const header = {
    "Content-Type": "application/json",
    Authorization: `${curUser?.token_type} ${curUser?.access_token}`,
    API_SHARED_KEY: "x",
  };
  return header;
};
const UploadauthHeader = () => {
  //   const curUser = getUserToken();
  const curUser: any = AppStorage.instance.getUserToken3;
  const header = {
    "Content-Type": "multipart/form-data",
    Authorization: `${curUser?.token_type} ${curUser?.access_token}`,
    API_SHARED_KEY: "x",
  };
  return header;
};
const getError = (error: any) => {
  try {
    return error.response.data.Error;
  } catch {
    return "An error occurred, please try again";
  }
};
