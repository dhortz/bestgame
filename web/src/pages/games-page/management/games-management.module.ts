import { NgModule } from '@angular/core';

import { GamesSearchPageModule } from './search/games-search.module';
import { GamesCreatePageModule } from './create/games-create.module';
import { CurrentGamePageModule } from './current/current-game-page.module';

@NgModule({
  imports: [],
  exports: [
    GamesSearchPageModule,
    GamesCreatePageModule,
    CurrentGamePageModule
  ],
  declarations: [],
  providers: [],
})
export class GamesManagementModule { }
