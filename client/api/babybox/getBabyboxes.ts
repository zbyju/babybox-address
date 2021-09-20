import { getRequest } from '../fetch'

export const getAllBabyboxes = async () => {
    const result = await getRequest<any>("babybox")
    return result.babyboxes
}

export const getBabyboxByHandle = async (handle: string) => {
  const result = await getRequest<any>("babybox/handle/" + handle)
  return result.babybox
}
