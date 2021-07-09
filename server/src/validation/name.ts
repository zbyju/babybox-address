import {Response} from "../types/api.types";
import {Name} from "../types/names.types";

export const validateNameString = (name: any): Response => {
    if(typeof name === "string") return { success: true }
    else return { success: false, error: "Name data should be a string."}
}

export const isName = (name: Object): name is Name => {
    const n = name as Name
    return (
        n.case1 !== undefined &&
        n.case5 !== undefined &&
        n.sex !== undefined &&
        (n.sex === 'male' || n.sex === 'female')
    )
}

export const validateName = (name: Name): Response => {
    let result: Response = { success: false }
    if(!isName(name)) {
        result.error = "Data not type of Name."
        return result
    }
    return { success: true }
}