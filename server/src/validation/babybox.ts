import { Response } from "../types/api.types"
import { Babybox } from "../types/babybox.types";

export const isBabybox = (babybox: Object): babybox is Babybox => {
    const bb = babybox as Babybox
    return (
        bb.name !== undefined
    )
}

export const validateBabybox = (babybox: Babybox): Response => {
    let result: Response = { success: false }
    if(!isBabybox(babybox)) {
        result.error = "Data not type of Babybox."
        return result
    }
    return { success: true }
}

export const validateFavorite = (favorite: any): Response => {
    if(typeof favorite === "boolean") return { success: true }
    else return { success: false, error: "Favorite data should be a boolean."}
}

export const validateNote = (note: any): Response => {
    if(typeof note === "string") return { success: true }
    else return { success: false, error: "Note data should be a string."}
}