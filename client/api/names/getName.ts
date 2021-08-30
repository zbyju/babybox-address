import { getRequest } from "../fetch"

export const getFirstname = async (case1: string) => {
  const result = await getRequest<any>("firstname/" + case1)
  return result.name
}

export const getLastname = async (case1: string) => {
  const result = await getRequest<any>("lastname/" + case1)
  return result.name
}
