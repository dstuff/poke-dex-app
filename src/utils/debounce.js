export const debounce = (callback = () => {}, delay = 500) => {
  let timeout = null
  return (...args) => {
    const next = () => callback(...args) // eslint-disable-line
    clearTimeout(timeout)
    timeout = setTimeout(next, delay)
  }
}
