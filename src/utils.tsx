export const getFromLocalStorage = (key: string) => {
  const item = localStorage.getItem(key)
  if (item !== null) {
    return JSON.parse(item)
  } else {
    localStorage.setItem('task', JSON.stringify([]))
  }
}

export const setFromLocalStorage = (key: string, value: object) => {
  localStorage.setItem(key, JSON.stringify(value))
}
