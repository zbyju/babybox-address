import { Document, PopulatedDoc } from 'mongoose'
import { Babybox } from "./babybox.types";

export interface Address {
    titleInFront?: string,
    titleBehind?: string,
    firstname: string,
    lastname: string,
    sex: string,
    firstname5: string,
    lastname5: string,
    email: string,
    company: string,
    street: string,
    houseNumber: string,
    city: string,
    postcode: string,
    babyboxId: PopulatedDoc<Babybox & Document>,
}