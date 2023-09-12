 import { create } from 'zustand'

export const useDisplayName = create((set) => ({
    displayName: 'INIZIALE',
    updateName: (newName) => set(() => ({
        displayName: newName
    }))
})) 