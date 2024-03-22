import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { KwartetSet } from "../../../data/models/kwartetset-model";
import { KwartetGameService } from "../../../services/kwartet-game.service";
import { KwartetSetService } from "../../../services/kwartet-set.service";
import { KwartetCardService } from "../../../services/kwartet-card.service";
import { KwartetCard } from "../../../data/models/kwartetcard-model";

@Component({
  selector: 'app-print-layout',
  templateUrl: './print-layout.component.html',
  styleUrl: './print-layout.component.scss'
})
export class PrintLayoutComponent implements OnInit {

  kwartetCards = new Map<KwartetSet, KwartetCard[]>();

  constructor(private location: Location,
              private route: ActivatedRoute,
              private kwartetGameService: KwartetGameService,
              private kwartetSetService: KwartetSetService,
              private kwartetCardService: KwartetCardService) {
  }

  async ngOnInit() {
    const gameId: number = Number(this.route.snapshot.paramMap.get('game-id'));

    await this.fillKwartetCardsMap(gameId).then(() => {
      if (this.kwartetCards.size == 0) return;

      // Print the page after a delay so that the print dialog is shown correctly
      setTimeout(() => {
        window.print();
      }, 100)

      // Navigate back to the edit game page after printing
      setTimeout(() => {
        this.location.back();
      }, 300)
    });


  }

  async fillKwartetCardsMap(gameId: number) {
    // Retrieve all sets belonging to this game id
    let sets: KwartetSet[] = await this.kwartetSetService.getKwartetSetsByGameId(gameId);

    // For every set, find the cards belonging to it and add them to the map
    for (const set of sets) {
      let cardsInSet = await this.kwartetCardService.getKwartetCardsBySetId(set.id!);
      this.kwartetCards.set(set, cardsInSet);
    }
  }

}
