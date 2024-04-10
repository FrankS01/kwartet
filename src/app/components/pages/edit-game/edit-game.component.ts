import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { KwartetGame } from "../../../data/models/kwartetgame-model";
import { KwartetGameService } from "../../../services/kwartet-game.service";
import { KwartetSet } from "../../../data/models/kwartetset-model";
import { FormControl, Validators } from "@angular/forms";
import { SET_TITLE_CHARACTER_LIMIT } from "../../../config/global-settings";
import { MessageService } from "primeng/api";
import { KwartetSetService } from "../../../services/kwartet-set.service";
import { liveQuery } from "dexie";
import { from, Observable } from "rxjs";
import { Page } from "../../../data/models/page-enum";
import { KwartetCard } from "../../../data/models/kwartetcard-model";
import { KwartetCardService } from "../../../services/kwartet-card.service";

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrl: './edit-game.component.scss'
})
export class EditGameComponent {

  // Used by the .html markup
  protected readonly Page = Page;
  protected readonly SET_TITLE_CHARACTER_LIMIT = SET_TITLE_CHARACTER_LIMIT;

  /** The game that is being edited */
  public kwartetGame$: Observable<KwartetGame | undefined>

  public kwartetSets$: Observable<KwartetSet[] | undefined>

  currentPage: Page = Page.GameOverview;
  currentSetId?: number = 0;

  // Whether the "create set" dialog is visible or not
  createSetDialogIsVisible: boolean = false;

  // Whether the sidebar is visible or not
  sideBarIsVisible: boolean = false;

  // Form value, used in "create set" dialog
  nameFormControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required,
      Validators.maxLength(SET_TITLE_CHARACTER_LIMIT)]
  });

  constructor(private route: ActivatedRoute,
              private kwartetGameService: KwartetGameService,
              private kwartetSetService: KwartetSetService,
              private kwartetCardService: KwartetCardService,
              private messageService: MessageService) {
    const gameId: number = Number(this.route.snapshot.paramMap.get('game-id'));

    this.kwartetGame$ = from(liveQuery(() => this.kwartetGameService.getKwartetGameById(gameId)));
    this.kwartetSets$ = from(liveQuery(() => this.kwartetSetService.getKwartetSetsByGameId(gameId)))
  }

  async createNewSet() {
    let subscription = this.kwartetGame$.subscribe(
      async (kwartetGame) => {

        // Create new kwartet set object
        let newSet: KwartetSet = {
          kwartetGameId: kwartetGame?.id!,
          setName: this.nameFormControl.value,
          setColor: '#60a5fa'
        }

        // Store kwartet set
        let kwartetSetId = await this.kwartetSetService.createKwartetSet(newSet);

        // Create 4 new card objects and store them
        for (let i = 0; i < 4; i++) {
          let newCard: KwartetCard = {
            kwartetSetId: kwartetSetId
          }
          await this.kwartetCardService.createKwartetCard(newCard);
        }

        // Show confirmation toast to user
        this.messageService.add({
          severity: 'success',
          summary: 'Set created',
          detail: `Set "${this.nameFormControl.value}" was successfully created`
        });

        // Reset form value
        this.nameFormControl.reset();

        // Navigate to newly created set
        this.currentSetId = newSet.id;
        this.currentPage = Page.EditSet;

        // Unsubscribe
        subscription.unsubscribe();
      }
    );
  }

  showCreateSetDialog() {
    this.createSetDialogIsVisible = true;
  }

  async onClickCreateSetButton() {
    this.createSetDialogIsVisible = false;
    await this.createNewSet();
  }

  showSideBar(visible: boolean) {
    this.sideBarIsVisible = visible;
  }
}
