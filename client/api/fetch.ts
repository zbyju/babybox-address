import { config } from "../config"

export async function getRequest<T>(url: string): Promise<T> {
  return fetch(config.api.baseUrl + url, {
    method: "GET",
    headers : {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }})
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json() as Promise<T>
    })
    .then(data => {
      return data
    })
}

export async function apiRequest<T>(url: string, method: "POST"|"PUT"|"DELETE", data: any = {}): Promise<T> {
  return new Promise(async (resolve, reject) => {
    await fetch(config.api.baseUrl + url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json() as Promise<T>
      })
      .then(data => {
        resolve(data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
