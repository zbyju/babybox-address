export interface Address {
    _id?: string,
    titleInFront?: string,
    titleBehind?: string,
    firstname: string,
    lastname: string,
    sex: "male" | "female",
    firstname5: string,
    lastname5: string,
    email: string,
    company: string,
    street: string,
    city: string,
    postcode: string,
    createdAt?: Date,
    updatedAt?: Date,
    flags?: AddressFlags,
    donated?: number
}

export interface AddressFlags {
    isEmailSent?: boolean
    isDonor?: boolean
}

export interface FormAddressItemError {
    isError: boolean,
    message?: string
}

export interface FormAddressError {
    titleInFront: FormAddressItemError
    titleBehind: FormAddressItemError,
    firstname: FormAddressItemError,
    lastname: FormAddressItemError,
    sex: FormAddressItemError,
    firstname5: FormAddressItemError,
    lastname5: FormAddressItemError,
    email: FormAddressItemError,
    company: FormAddressItemError,
    street: FormAddressItemError,
    city: FormAddressItemError,
    postcode: FormAddressItemError,
}
