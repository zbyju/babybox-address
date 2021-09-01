import { getRequest } from '../fetch'

export const getAllAddresses = async (handle: string) => {
    try {
      const result = await getRequest<any>("address/babybox/handle/" + handle)
      return result.addresses
    } catch(err) {
      return []
    }
}

export const getDuplicateAddressesEmail = async (email: string) => {
  try {
    const result = await getRequest<any>("address/duplicate/email/" + email)
    return result
  } catch(err) {
    return []
  }
}

export const getDuplicateAddressesCompany = async (company: string) => {
  try {
    const result = await getRequest<any>("address/duplicate/company/" + company)
    return result
  } catch(err) {
    return []
  }
}

export const getAddressCount = async (handle: string) => {
  const result = await getRequest<any>("address/count/handle/" + handle)
  return result.count
}
