import { trigger, cache } from "swr"

export const triggerBabyboxHandle = (handle: string) => {
  const urls = [
    "/babybox/handle/" + handle,
    "/babybox"
  ]
  triggerAllIncluding(urls)
}

export const triggerBabyboxes = () => {
  const urls = [
    "/babybox"
  ]
  triggerAllIncluding(urls)
}

export const triggerAddress = (id: string) => {
  const urls = [
    "/address/" + id,
    "/address"
  ]
  triggerAllIncluding(urls)
}

export const triggerAddressesOfHandle = (handle: string) => {
  const urls = [
    "/address/babybox/handle/" + handle,
    "/address/count/handle/" + handle,
  ]
  triggerAllIncluding(urls)
}

export const triggerDuplicates = (handle: string, company: string, email: string) => {
  const urls = [
    "/address/babybox/handle/" + handle,
    "/address/count/handle/" + handle,
    `/address/duplicate/${handle}//`,
    `/address/duplicate/${handle}/${company}/`,
    `/address/duplicate/${handle}//${email}`,
    `/address/duplicate/${handle}/${company}/${email}`,
  ]
  triggerAll(urls)
}

export const getKeysIncluding = (s: string) => {
  return cache.keys().filter(k => k.includes(s))
}

export const triggerAllIncluding = (urls: Array<string>) => {
  urls.forEach(x => {
    getKeysIncluding(x).forEach(k => {
      trigger(k)
    })
  })
}

export const triggerAll = (urls: Array<string>) => {
  urls.forEach(x => {
    trigger(x)
  })
}
