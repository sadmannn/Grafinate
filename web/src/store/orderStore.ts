import { create } from 'zustand'

type Addon = { id: string; name: string; price: number }
type Item = { id: string; name: string; basePrice: number; addons: Addon[] }

type OrderState = {
  items: Item[]
  addItem: (item: Item) => void
  clear: () => void
  total: () => number
}

export const useOrderStore = create<OrderState>((set, get) => ({
  items: [],
  addItem: (item) => set((s) => ({ items: [...s.items, item] })),
  clear: () => set({ items: [] }),
  total: () =>
    get().items.reduce((sum, item) => {
      const addonsTotal = item.addons.reduce((a, b) => a + b.price, 0)
      return sum + item.basePrice + addonsTotal
    }, 0),
}))


