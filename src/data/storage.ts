import { create } from 'zustand'

interface nameStore {
    userName: string
    updateName: (newUserName: string) => void;
}

interface urlStore {
    roomUrl: string[]
    updateUrl: (newRoomUrl: string[]) => void;
}

interface lobbyFinder {
    currentLobby: string
    updateLobby: (newLobby: string) => void;
}


export const useName = create <nameStore> ((set) => ({
    userName: '',
    updateName: (newUserName: string) => set({userName: newUserName})
}))

export const useUrl = create <urlStore> ((set) => ({
    roomUrl: ['', '', '', '', '', ''],
    updateUrl: (newRoomUrl: string[]) => set({roomUrl: newRoomUrl})
}))

export const useLobbyFinder = create <lobbyFinder> ((set) => ({
    currentLobby: '',
    updateLobby: (newLobby: string) => set({currentLobby: newLobby})
}))