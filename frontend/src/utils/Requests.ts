import axios from "axios";
import { enqueueSnackbar} from "notistack"

export const getAxiosErrorMessage = (error: any) => {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    enqueueSnackbar(message, { variant: "error" })
    return message;
}

class Requests<ParamType, RequestBodyType> {
    token: string | null;
    url: string;
    params: ParamType | null;
    requestBody: RequestBodyType | null;
    
    constructor(url: string, requestBody?: RequestBodyType, params?: ParamType) {
        this.token = localStorage.getItem("token");
        this.url = url;
        this.params = params || null;
        this.requestBody = requestBody || null;
    }

    async get<ResponseType>(successCallBack?: (data: ResponseType) => void, errorCallBack?: (message: string) => void) {
        await axios.get(this.url, {params: this.params, headers: {"Authorization": `Bearer ${this.token}`}})
        .then(res => {
            if (successCallBack) successCallBack(res.data?.data);
        })
        .catch(err => {
            const errorMessage = getAxiosErrorMessage(err) as string;
            if (errorCallBack) errorCallBack(errorMessage);
        })
    }

    async post<ResponseType>(successCallBack?: (data: ResponseType) => void, errorCallBack?: (message: string) => void, headers?: any) {
        await axios.post(this.url, this.requestBody, {params: this.params, headers: {"Authorization": `Bearer ${this.token}`,  ...headers}})
        .then(res => {
           if (successCallBack) successCallBack(res.data?.data);
        })
        .catch(err => {
            const errorMessage = getAxiosErrorMessage(err) as string;
            if (errorCallBack) errorCallBack(errorMessage);
        })
    }

    async put<ResponseType>(successCallBack?: (data: ResponseType) => void, errorCallBack?: (message: string) => void) {
        await axios.put(this.url, this.requestBody, {params: this.params, headers: {"Authorization": `Bearer ${this.token}`}})
        .then(res => {
            if (successCallBack) successCallBack(res.data?.data);
        })
        .catch(err => {
            const errorMessage = getAxiosErrorMessage(err) as string;
            if (errorCallBack) errorCallBack(errorMessage);
        })
    }

    async delete<ResponseType>(successCallBack?: (data: ResponseType) => void, errorCallBack?: (message: string) => void) {
        await axios.delete(this.url, {params: this.params, headers: {"Authorization": `Bearer ${this.token}`}})
        .then(res => {
            if (successCallBack) successCallBack(res.data?.data);
        })
        .catch(err => {
            const errorMessage = getAxiosErrorMessage(err) as string;
            if (errorCallBack) errorCallBack(errorMessage);
        })
    }
}

export default Requests;