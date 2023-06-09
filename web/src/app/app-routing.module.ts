import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesPageComponent } from 'src/pages/games-page/games-page.component';
import { GamesCreateComponent } from 'src/pages/games-page/management/create/games-create.module';
import { GamesSearchComponent } from 'src/pages/games-page/management/search/games-search.module';
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
                path: "",
                component: GamesSearchComponent
            },
            {
                path: "new",
                component: GamesCreateComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
