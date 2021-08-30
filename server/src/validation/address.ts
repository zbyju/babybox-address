import mongoose from "mongoose";
import { Response } from "../types/api.types"
import { Address} from "../types/address.types";

export const isAddress = (address: Object): address is Address => {
    const addr = address as Address
    return (
        addr.firstname !== undefined &&
        addr.lastname !== undefined &&
        addr.firstname5 !== undefined &&
        addr.lastname5 !== undefined &&
        addr.sex !== undefined &&
        addr.email !== undefined &&
        addr.company !== undefined &&
        addr.street !== undefined &&
        addr.city !== undefined &&
        addr.postcode !== undefined &&
        (addr.sex === "male" || addr.sex === "female")
    )
}

export const validateAddress = (address: Address): Response => {
    let result: Response = { success: false }
    if(!isAddress(address)) {
        result.error = "Data not type of Address."
        return result
    }
    address = address as Address
    if(!mongoose.Types.ObjectId.isValid(address.babyboxId)) {
        result.error = "BabyboxID in data is not valid."
        return result
    }
    return { success: true }
}
