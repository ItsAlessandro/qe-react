import { db } from './firebase'
import { doc, addDoc, collection, query, where, getDocs, updateDoc, getDoc } from 'firebase/firestore'
import { codeStore, CreateErrors, JoinErrors, useLobby } from './genericData';


export async function createLobby(codeStore: codeStore, ownerUsername: string): Promise<CreateErrors | undefined> {

    return codeStore.isCreationValid().then(async (createError) => {

        // Check if the code is valid.
        if (createError !== undefined) {
            return createError;
        }
    
        // Create the shuffled array
        const shuffledArray: number[] = Array.from(Array(5).keys());
        shuffledArray.sort(() => Math.random() - 0.5);
        
        let coloursArray: string[] = [];
        try {
          const response = await getDoc(doc(db, 'data', 'colours'));
          coloursArray = response.data()!.colours;
        } catch (error) {
          return {
            type: 'DatabaseConnectionError',
            message: 'Could not connect to the database',
          };
        }
        
        // Create a new lobby.
        try {
            await addDoc(collection(db, 'sessions'), {
                gameStarted: false,
                ['Lobby']: {
                    shuffledArray: shuffledArray,
                    code: codeStore.code,
                    owner: ownerUsername,
                    pending: [],
                    players: [ownerUsername],
                    colours: coloursArray
                }
            });
        } catch (error) {
            return {
                type: 'DatabaseConnectionError',
                message: 'Could not connect to the database',
            };
        }
    
        // If the function reaches this point, then the player successfully created the lobby.
        return undefined;
    })
}

export async function joinLobby(codeStore: codeStore, username: string): Promise<JoinErrors | undefined> {

    const lobbyHandler = useLobby()

  return codeStore.isParticipationValid(username).then(async (joinError) => {
    // Check if the room code is valid.
    if (joinError !== undefined) {
        return joinError;
    }
  
    // Create a query to find the lobby with the given room code.
    const q = query(collection(db, 'sessions'), where('code', '==', codeStore.code));
  
    try {
        // Get the results of the query.
        const querySnapshot = await getDocs(q);
    
        // Get the first document in the query results. This is the lobby that the player is trying to join.
        const targetLobby = querySnapshot.docs[0];

        // Saves the URL of the session (created in firestore)
        lobbyHandler.updateLobby(targetLobby.id)

        // Get the list of pending players and the list of game players.
        const pendingPlayersQueue = [...targetLobby.data().pending];

        // Add the player to the list of pending players.
        pendingPlayersQueue.push(username);
        await updateDoc(doc(db, 'sessions', targetLobby.id), {
            pending: pendingPlayersQueue,
        });
    } catch (error) {
      // If there was an error updating the database, then return a database connection error.
        return {
            type: 'DatabaseConnectionError',
            message: 'Could not connect to the database',
        };
    }
  
    // If the function reaches this point, then the player was successfully to the requests queue.
        return undefined;
    })
}

