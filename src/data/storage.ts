import { create } from 'zustand'

interface nameStore {
    userName: string
    updateName: (newUserName: string) => void
    getUserName: () => string
}

interface urlStore {
    roomUrl: string[]
    updateUrl: (newRoomUrl: string[]) => void;
}

interface lobbyFinder {
    currentLobby: string
    updateLobby: (newLobby: string) => void;
}

interface roleStore {
    isOwner: boolean
    updateRole: (newRole: boolean) => void;
}


export const useName = create <nameStore> ((set, get) => ({
    userName: '',
    updateName: (newUserName: string) => set({userName: newUserName}),
    getUserName: () => {return get().userName}
}))

export const useUrl = create <urlStore> ((set) => ({
    roomUrl: ['', '', '', '', '', ''],
    updateUrl: (newRoomUrl: string[]) => set({roomUrl: newRoomUrl})
}))

export const useLobbyFinder = create <lobbyFinder> ((set) => ({
    currentLobby: '',
    updateLobby: (newLobby: string) => set({currentLobby: newLobby})
}))

export const useRole = create <roleStore> ((set) => ({
    isOwner: false,
    updateRole: (newRole: boolean) => set({isOwner: newRole})
}))