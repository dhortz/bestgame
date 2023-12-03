import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesPageComponent } from 'src/pages/games-page/games-page.component';
import { GamesCreatePageComponent } from 'src/pages/games-page/management/create-game/games-create.module';
import { CreateRoundPageComponent } from 'src/pages/games-page/management/create-round/create-round.component';
import { CurrentGamePageComponent } from 'src/pages/games-page/management/current/current-game-page.module';
import { GamesSearchPageComponent } from 'src/pages/games-page/management/search/games-search.module';
import { HomePageComponent } from 'src/pages/home-page/home-page.component';
import { WinnersPageComponent } from 'src/pages/winners-page/winners-page.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: "home",
        component: HomePageComponent
    },
    {
        path: "winners",
        component: WinnersPageComponent
    },
    {
        path: "games",
        component: GamesPageComponent,
        pathMatch: "prefix",
        children: [
            {
                path: "history",
                component: GamesSearchPageComponent
            },
            {
                path: "new",
                pathMatch: "prefix",
                children: [
                    {
                        path: "game",
                        component: GamesCreatePageComponent
                    },
                    {
                        path: "round",
                        component: CreateRoundPageComponent
                    }
                ]
            },
            {
                path: "current",
                component: CurrentGamePageComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
