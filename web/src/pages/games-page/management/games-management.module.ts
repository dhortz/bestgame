import { NgModule } from '@angular/core';

import { GamesCreatePageModule } from './create-game/games-create.module';
import { CreateRoundPageModule } from './create-round/create-round.module';
import { CurrentGamePageModule } from './current/current-game-page.module';
import { GamesSearchPageModule } from './search/games-search.module';

@NgModule({
  imports: [],
  exports: [
    GamesSearchPageModule,
    GamesCreatePageModule,
    CurrentGamePageModule,
    CreateRoundPageModule
  ],
  declarations: [],
  providers: [],
})
export class GamesManagementModule { }
