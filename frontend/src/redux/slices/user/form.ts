import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AboutInfo, BasicInfo, ContactInfo, UserInfoRequest } from "@type/User";

const initialState: UserInfoRequest = {
    type: null,
    password: "",
    basicInfo: {
        image: null,
        firstName: "",
        lastName: "",
        city: "",
        language: "",
        location: "",
        occupation: "",
    },
    contactInfo: {
        email: "",
        address: "",
        phone: ""
    },
    aboutInfo: null
}

const userFormSlice = createSlice({
    initialState,
    name: "userForm",
    reducers: {
        updateUserType: (state, action) => {
            state.type = action.payload;
        },
        updateUserPassword: (state, action) => {
            state.password = action.payload;
        },
        updateUserBasicInfo: (state, action: PayloadAction<BasicInfo>) => {
            state.basicInfo = action.payload
        },
        updateUserContactInfo: (state, action: PayloadAction<ContactInfo>) => {
            state.contactInfo = action.payload;
        },
        updateUserAbout: (state, action: PayloadAction<AboutInfo>) => {
            state.aboutInfo = action.payload;
        }
    }
})

export const { updateUserType, updateUserBasicInfo, updateUserContactInfo, updateUserAbout, updateUserPassword } = userFormSlice.actions;
export default userFormSlice.reducer;