interface Item {
  key: string
  [key: string]: any
}
export const pickKeys = (items: Item[], keys: string[]) => {
  const keySet = new Set(keys)
  return items.filter((item) => keySet.has(item.key))
}
