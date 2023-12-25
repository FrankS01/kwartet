import { KwartetGame } from "./models/KwartetGame";

export const GAMES: KwartetGame[] = [
  {
    id: 1,
    name: 'Animals',
    sets: [
      {
        setName: 'Sea animals',
        card1Name: 'Whale',
        card2Name: 'Jellyfish',
        card3Name: 'Orca',
        card4Name: 'Shark'
      },
      {
        setName: 'Land animals',
        card1Name: 'Kangaroo',
        card2Name: 'Monkey',
        card3Name: 'Elephant',
        card4Name: 'Wolf'
      }
    ]
  },
  {id: 2, name: 'IpsumGame', sets: []},
  {id: 3, name: 'DolorGame', sets: []},
  {id: 4, name: 'SitGame', sets: []},
  {id: 5, name: 'AmetGame', sets: []},
  {id: 6, name: 'AnotherGame', sets: []},
  {id: 7, name: 'GameWithLong', sets: []},
  {id: 8, name: 'Short', sets: []},
];
