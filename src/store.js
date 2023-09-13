import { create } from 'zustand'

export const useDisplayName = create((set) => ({
    displayName: '',
    updateName: (newName) => set(() => ({
        displayName: newName.target.value
    }))
})) 

export const useSessionUrl = create((set) => ({
    sessionUrl: ['', '', '', '', '', ''],
    updateUrl: (newUrl) => set(() => ({
        sessionUrl: newUrl
    }))
}))