import { NgModule } from '@angular/core';

import { GamesSearchModule } from './search/games-search.module';
import { GamesCreateModule } from './create/games-create.module';

@NgModule({
    imports: [],
    exports: [
        GamesSearchModule,
        GamesCreateModule
    ],
    declarations: [],
    providers: [],
})
export class GamesManagementModule { }
