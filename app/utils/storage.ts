export const STORAGE_PREFIX = 'SkyMavis-SDK'

export const getStorage = (name: string) =>
  localStorage.getItem(`${STORAGE_PREFIX}:${name}`)

export const setStorage = (name: string, value: string) =>
  localStorage.setItem(`${STORAGE_PREFIX}:${name}`, value)

export const removeStorage = (name: string) =>
  localStorage.removeItem(`${STORAGE_PREFIX}:${name}`)
