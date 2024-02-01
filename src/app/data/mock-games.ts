import { KwartetGame } from "./models/kwartetgame-model";

export const GAMES: KwartetGame[] = [
  {
    title: 'Animals',
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
  {title: 'IpsumGame', sets: []},
  {title: 'DolorGame', sets: []},
  {title: 'SitGame', sets: []},
  {title: 'AmetGame', sets: []},
  {title: 'AnotherGame', sets: []},
  {title: 'GameWithLong', sets: []},
  {title: 'Short', sets: []},
];
