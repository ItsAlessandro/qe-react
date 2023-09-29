import { create } from 'zustand'
import  { db } from './firebase'
import { getDocs, query, where, collection } from 'firebase/firestore'


export type RoomCodeAlreadyUsedError = {
    type: 'RoomCodeAlreadyUsedError',
    message: string,
};

export type DatabaseConnectionError = {
    type: 'DatabaseConnectionError',
    message: string,
};

export type RoomNotFoundError = {
    type: 'RoomNotFoundError',
    message: string,
};

export type InvalidUsernameError = {
    type: 'InvalidUsernameError',
    message: string,
};

export type GameAlreadyStartedError = {
    type: 'GameAlreadyStartedError',
    message: string,
};

export type UsernameAlreadyTaken = {
    type: 'UsernameAlreadyTaken',
    message: string,
};

export type LobbyFullError = {
    type: 'LobbyFullError',
    message: string,
};


export type CreateErrors = RoomCodeAlreadyUsedError | DatabaseConnectionError;
export type JoinErrors = InvalidUsernameError | RoomNotFoundError | GameAlreadyStartedError | UsernameAlreadyTaken | LobbyFullError | DatabaseConnectionError;

// usage: code storage, utilized to access and create lobbys
export interface codeStore {
    code: string,
    
    updateCode: (newCode: string) => void,
    isCreationValid: () => Promise<CreateErrors | undefined>,
    isParticipationValid: (username : string) => Promise<JoinErrors | undefined>
}

// usage: the local username that represents the client
export interface nameStore {
    username: string;
    updateName: (newName: string) => void;
}

// usage: the actual URL utilized to navigate the web pages (handled in React Router)
export interface lobbyStore {
    currentLobby: string;
    updateLobby: (newLobby: string) => void;
}


export const useCode = create<codeStore> ( set => ({

    code: '' as string,
    
    // code setter function
    updateCode: (newCode: string) => set({ code: newCode }),

    // checks if an equal code has been already taken, if so, returns false
    async isCreationValid (): Promise<CreateErrors | undefined> {
        
        // Query the database to see if the room code is already used.
        const q = query(collection(db, 'sessions'), where('code', '==', this.code));
        try {
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                // The room code is already used, so return an error.
                return {
                    type: 'RoomCodeAlreadyUsedError',
                    message: 'The room code is already used',
                };
            }
        } catch (error) {
            // Return an error if there was a problem connecting to the database.
            return {
                type: 'DatabaseConnectionError',
                message: 'Could not connect to the database',
            };
        }
        
        return undefined; 
    },

    async isParticipationValid (username: string): Promise<JoinErrors | undefined> {
        // checks if the selected username has a correct length
        if (username.length < 3 || username.length > 12) {
            return {
                type: 'InvalidUsernameError',
                message: 'Username is either too long or too short',
            };
        }

        const q = query(collection(db, 'sessions'), where('code', '==', this.code)); 
        
        try {
            // Get the results of the query.
            const querySnapshot = await getDocs(q);

            // If the query returned no documents, then the room could not be found.
            if (querySnapshot.empty) {
                return {
                type: 'RoomNotFoundError',
                message: 'Could not find the room',
                };
            }

            // Get the first document in the query results. This is the lobby that the player is trying to join.
            const targetLobby = querySnapshot.docs[0];

            // If the game has already started, then the player cannot join the lobby.
            if (targetLobby.data().gameStarted) {
                return {
                type: 'GameAlreadyStartedError',
                message: 'The game has already started',
                };
            }

            // Get the list of pending players and the list of game players.
            const pendingPlayersQueue = [...targetLobby.data().pending];
            const gamePlayers = [...targetLobby.data().players];

            // If the username is already in the list of pending players or the list of game players,
            // then the player cannot join the lobby.
            if (pendingPlayersQueue.includes(username) || gamePlayers.includes(username)) {
                return {
                    type: 'UsernameAlreadyTaken',
                    message: 'The username has already been taken by another player',
                };
            }

            // If the lobby is full, then the player cannot join the lobby.
            if (gamePlayers.length === 5) {
                return {
                    type: 'LobbyFullError',
                    message: 'The lobby is full',
                };
            }
        } catch (error) {
            // If there was an error querying the database, then return a database connection error.
            return {
                type: 'DatabaseConnectionError',
                message: 'Could not connect to the database',
            };
        }
        
        // No errors
        return undefined;
    },
}));

export const useName = create<nameStore> ( set => ({
    username: '' as string,

    // username setter function
    updateName(newName: string) { set({ username: newName }); },
}));

export const useLobby = create<lobbyStore> ( set => ({
    currentLobby: '' as string,

    // current lobby URL setter function
    updateLobby(newLobby: string) { set({ currentLobby: newLobby }); },
}));