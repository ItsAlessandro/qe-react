import { create } from 'zustand'

interface game {
    numberOfPlayers: number
    players: player[]
    auctioneer: number
    scoringTable: Map<number, Map<string, Map<number, number> | number>>

    updateNoP: (newNoP: number) => void
    updatePlayers: (newPlayers: player[]) => void
    updateAuctioneer: (newAuctioneer: number) => void
}

export interface player {
  username: string
  ID: number
  region: string
  colour: string
  moneySpent: number
  isAuctioneer: boolean
  points: number
  boughtAnimals: animal[]
  bids: number[]

  updateUsername: (newUsername: string) => void,
  updateID: (newID: number) => void,
  updateRegion: (newRegion: string) => void,
  updateColour: (newColour: string) => void,
  updateMoneySpent: (newMS: number) => void,
  updateIsAuctioneer: (newIA: boolean) => void,
  updatePoints: (newPoints: number) => void,
  updateBoughtAnimals: (newBA: animal[]) => void,
  updateBids: (newBids: number[]) => void,

  calculateScore: (player: player, numberOfPlayers: number, scoringTable: Map<number, Map<string, Map<number, number> | number>>) => Map<string, number>
}

export interface animal {
  name: string
  region: string
  biome: string
  value: number

  updateName: (newName: string) => void,
  updateRegion: (newRegion: string) => void,
  updateBiome: (newBiome: string) => void,
  updateValue: (newValue: number) => void
}

export function setNumberValueForKeyOfSubkey<T extends number, V>(
  scoringTable: Map<T, Map<string, Map<number, number> | number>>,
  key: T,
  subkey: string,
  value: number,
  subsubkey?: number
) {
  if (!scoringTable.has(key)) {
    scoringTable.set(key, new Map<string, Map<number, number>>());
  }

  if (!scoringTable.get(key)!.has(subkey)) {
    if (subsubkey === undefined) {
      scoringTable.get(key)!.set(subkey, value);
    } else {
      scoringTable.get(key)!.set(subkey, new Map<number, number>());
    }
  }

  if (subsubkey !== undefined) {
    const subMap = scoringTable.get(key)!.get(subkey) as Map<number, number>
    subMap.set(subsubkey, value)
  }

  return scoringTable;
}

export function createScoringMap (): Map<number, Map<string, Map<number, number> | number>> {
  const scoringTable = new Map<number, Map<string, Map<number, number> | number>>()
  
  setNumberValueForKeyOfSubkey(scoringTable, 3, "zeroBids", 2, undefined)

  setNumberValueForKeyOfSubkey(scoringTable, 3, "nationalization", 1, 1)
  setNumberValueForKeyOfSubkey(scoringTable, 3, "nationalization", 3, 2)
  setNumberValueForKeyOfSubkey(scoringTable, 3, "nationalization", 6, 3)
  setNumberValueForKeyOfSubkey(scoringTable, 3, "nationalization", 10, 4)

  setNumberValueForKeyOfSubkey(scoringTable, 3, "monopololization", 3, 2)
  setNumberValueForKeyOfSubkey(scoringTable, 3, "monopololization", 6, 3)
  setNumberValueForKeyOfSubkey(scoringTable, 3, "monopololization", 10, 4)

  setNumberValueForKeyOfSubkey(scoringTable, 3, "diversification", 4, 3)
  setNumberValueForKeyOfSubkey(scoringTable, 3, "diversification", 8, 4)


  scoringTable.set(4, scoringTable.get(3)!)


  setNumberValueForKeyOfSubkey(scoringTable, 5, "zeroBids", 2, undefined)

  setNumberValueForKeyOfSubkey(scoringTable, 5, "nationalization", 3, 1)
  setNumberValueForKeyOfSubkey(scoringTable, 5, "nationalization", 6, 2)
  setNumberValueForKeyOfSubkey(scoringTable, 5, "nationalization", 10, 3)

  setNumberValueForKeyOfSubkey(scoringTable, 5, "monopololization", 6, 2)
  setNumberValueForKeyOfSubkey(scoringTable, 5, "monopololization", 10, 3)
  setNumberValueForKeyOfSubkey(scoringTable, 5, "monopololization", 16, 4)

  setNumberValueForKeyOfSubkey(scoringTable, 5, "diversification", 8, 3)
  setNumberValueForKeyOfSubkey(scoringTable, 5, "diversification", 12, 4)
  setNumberValueForKeyOfSubkey(scoringTable, 5, "diversification", 17, 5)

  return scoringTable
}

export const useGame = create<game> ((set) => ({
  numberOfPlayers: 0,
  players: [],
  auctioneer: 0,
  scoringTable: createScoringMap(),

  updateNoP: (newNoP: number) => set({numberOfPlayers: newNoP}),
  updatePlayers: (newPlayers: player[]) => set({players: newPlayers}),
  updateAuctioneer: (newAuctioneer: number) => set({auctioneer: newAuctioneer})
}))

export const usePlayer = create <player> ((set) => ({
    username: '',
    ID: 0,
    region: '',
    colour: '',
    moneySpent: 0,
    isAuctioneer: false,
    points: 0,
    boughtAnimals: [],
    bids: [],

  updateUsername: (newUserName: string) => set({username: newUserName}),
  updateID: (newID: number) => set({ID: newID}),
  updateRegion: (newRegion: string) => set({region: newRegion}),
  updateColour: (newColour: string) => set({colour: newColour}),
  updateMoneySpent: (newMS: number) => set({moneySpent: newMS}),
  updateIsAuctioneer: (newIA: boolean) => set({isAuctioneer: newIA}),
  updatePoints: (newPoints: number) => set({points: newPoints}),
  updateBoughtAnimals: (newBA: animal[]) => set({boughtAnimals: newBA}),
  updateBids: (newBids: number[]) => set({bids: newBids}),

  calculateScore: (player: player, numberOfPlayers: number, scoringTable: Map<number, Map<string, Map<number, number> | number>>): Map<string, number> => {
    let pointsCategories = new Map<string, number>()
    
    let zeroBidScore = scoringTable.get(numberOfPlayers)!.get("zeroBids")! as number
    pointsCategories.set("zeroBids", 0)
    player.bids.forEach(bid => {
      if (bid === 0) {
        const value = pointsCategories.get("zeroBids")!
        pointsCategories.set("zeroBids", value + zeroBidScore)
      }
    })


    let biomeMap = new Map<string, number>()
    let regionMap = new Set<string>
    let sameRegion: number = 0
    player.boughtAnimals.forEach(animal => {
      if (!biomeMap.has(animal.biome))
        pointsCategories.set(animal.biome, 1)
      else {
        const value = biomeMap.get(animal.biome)!
        pointsCategories.set(animal.biome, value + 1)
      }

      regionMap.add(animal.region)

      if (animal.region === player.region)
        ++sameRegion
    })

    const nationalizationValue = scoringTable.get(numberOfPlayers)!.get("nationalization")! as Map<number, number>
    if (nationalizationValue.has(sameRegion))
      pointsCategories.set("nationalization", nationalizationValue.get(sameRegion)!)
    else
      pointsCategories.set("nationalization", 0)


    pointsCategories.set("monopolization", 0)
    biomeMap.forEach(biome => {
      const value = pointsCategories.get("monopolization")!
      let monopolizationValue = scoringTable.get(numberOfPlayers)!.get("monopolization")! as Map<number, number>
      if (monopolizationValue.has(biome))
        pointsCategories.set("monopolization", value + monopolizationValue.get(biome)!)
    })
    

    let diversificationValue = scoringTable.get(numberOfPlayers)!.get("diversification")! as Map<number, number>
    if (diversificationValue.has(regionMap.size))
      pointsCategories.set("diversification", diversificationValue.get(regionMap.size)!)
    else
      pointsCategories.set("diversification", 0)

    return pointsCategories
  }
}))

export const useAnimal = create <animal> ((set) => ({
  name: '',
  region: '',
  biome: '',
  value: 0,

  updateName: (newName: string) => set({name: newName}),
  updateRegion: (newRegion: string) => set({region: newRegion}),
  updateBiome: (newBiome: string) => set({biome: newBiome}),
  updateValue: (newValue: number) => set({value: newValue})
}))
