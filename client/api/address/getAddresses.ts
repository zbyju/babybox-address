import { getRequest } from '../fetch'

export const getAllAddresses = async (handle: string) => {
    try {
      const result = await getRequest<any>("address/babybox/handle/" + handle)
      return result.addresses
    } catch(err) {
      return []
    }
}
