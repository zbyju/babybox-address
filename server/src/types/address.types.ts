import { Document, PopulatedDoc } from 'mongoose'
import { Babybox } from "./babybox.types";

export interface Address {
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
    babyboxId: PopulatedDoc<Babybox & Document>,
}
