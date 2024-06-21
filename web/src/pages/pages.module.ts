import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomePageModule } from './home-page/home-page.module';
import { WinnersPageModule } from './winners-page/winners-page.module';
import { GamesPageModule } from './games-page/games-page.module';
import { PokemonPageModule } from './pokemon-page/pokemon-page.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomePageModule,
    WinnersPageModule,
    GamesPageModule,
    PokemonPageModule
  ]
})
export class PagesModule { }
