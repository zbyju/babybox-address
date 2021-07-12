import {Address, FormAddressError} from "../types/address";

export const getDefaultAddress = (): Address => {
    return {
        titleBehind: "",
        titleInFront: "",
        firstname: "",
        lastname: "",
        sex: "male",
        firstname5: "",
        lastname5: "",
        email: "",
        company: "",
        street: "",
        city: "",
        postcode: "",
    }
}

export const getDefaultFormErrors = (): FormAddressError => {
    return {
        titleInFront: { isError: false },
        titleBehind: { isError: false },
        firstname: { isError: false },
        lastname: { isError: false },
        sex: { isError: false },
        firstname5: { isError: false },
        lastname5: { isError: false },
        email: { isError: false },
        company: { isError: false },
        street: { isError: false },
        city: { isError: false },
        postcode: { isError: false },
    }
}