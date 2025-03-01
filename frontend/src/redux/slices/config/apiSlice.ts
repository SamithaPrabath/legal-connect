import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

type APISliceType <ResponseType> = {
    loading: boolean;
    error: string  | null;
    success: boolean;
    data: ResponseType | null;
}

const createApiSlice = <ResponseType> (name: string, initialResponseState?:ResponseType) => {
    const initialState: APISliceType<ResponseType> = {
        success: false,
        loading: false,
        error: null,
        data: initialResponseState || null
    }

    return createSlice({
        initialState,
        name,
        reducers: {
            request: (state) => {
                state.loading = true;
            },
            success: (state, action:PayloadAction<ResponseType>) => {
                state.loading = false;
                state.success = true;
                state.data = action.payload as Draft<ResponseType>
            },
            reject: (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            },
            reset: (state) => {
                state = initialState as Draft<APISliceType<ResponseType>>
            }
        }
    })
}

export default createApiSlice;