import moment from "moment"
import { Address } from "../types/address"
import { getSalutation } from "./address"

export const getFilename = (name: string, handle: string, extension: string): string => {
  return `${name}-${handle}-${moment().format("DDMMYY-HHmmss")}.${extension}`
}

export const getHeaders = (formatting: "noChange" | "salutation") => {
  return formatting === "noChange" ? [
    { label: "Jméno", key: "firstname" },
    { label: "Příjmení", key: "lastname" },
    { label: "Jméno5", key: "firstname" },
    { label: "Příjmení5", key: "firstname" },
    { label: "Pohlaví", key: "sex" },
    { label: "Společnost", key: "firstname" },
    { label: "Email", key: "firstname" },
    { label: "Titul před", key: "titleInFront" },
    { label: "Titul za", key: "titleBehind" },
    { label: "Ulice", key: "street" },
    { label: "Město", key: "city" },
    { label: "PSČ", key: "postcode" },
    { label: "Vytvořeno", key: "createdAt" },
  ] : [
    { label: "Oslovení", key: "salutation" },
    { label: "Titul před", key: "titleInFront" },
    { label: "Jméno", key: "firstname" },
    { label: "Příjmení", key: "lastname" },
    { label: "Titul za", key: "titleBehind" },
    { label: "Společnost", key: "company" },
    { label: "Email", key: "email" },
    { label: "Ulice", key: "street" },
    { label: "Město", key: "city" },
    { label: "PSČ", key: "postcode" },
  ]
}

export const getSalutationAddresses = (addresses: Array<Address>) => {
  return addresses.map(a => {
    return {
      titleInFront: a.titleInFront || "",
      titleBehind: a.titleBehind || "",
      firstname: a.firstname,
      lastname: a.lastname,
      company: a.company,
      email: a.email || "",
      street: a.street,
      city: a.city,
      postcode: a.postcode,
      salutation: getSalutation(a) || ""
    }
  })
}
