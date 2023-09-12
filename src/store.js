 import { create } from 'zustand'

export const useDisplayName = create((set) => ({
    displayName: '',
    updateName: (newName) => set(() => ({
        displayName: newName.target.value
    }))
})) 