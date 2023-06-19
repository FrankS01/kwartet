import { Game } from "./models/Game";

export const GAMES: Game[] = [
  {
    id: 1,
    name: 'Animals',
    sets: [
      {
        id: 1,
        setName: 'Sea animals',
        card1Name: 'Whale',
        card2Name: 'Jellyfish',
        card3Name: 'Orca',
        card4Name: 'Shark'
      },
      {
        id: 2,
        setName: 'Land animals',
        card1Name: 'Kangaroo',
        card2Name: 'Monkey',
        card3Name: 'Elephant',
        card4Name: 'Wolf'
      }
    ]
  },
  {id: 2, name: 'IpsumGame'},
  {id: 3, name: 'DolorGame'},
  {id: 4, name: 'SitGame'},
  {id: 5, name: 'AmetGame'},
  {id: 6, name: 'AnotherGame'},
  {id: 7, name: 'GameWithLong'},
  {id: 8, name: 'Short'},
];
