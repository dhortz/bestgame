import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CurrentGameModule } from 'src/components/current-game/current-game.module';
import { WinnersModule } from 'src/components/winners/winners.module';
import { HomePageComponent } from './home-page.component';

export { HomePageComponent } from './home-page.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        WinnersModule,
        CurrentGameModule
    ],
    exports: [
        HomePageComponent
    ],
    declarations: [
        HomePageComponent
    ],
    providers: [],
})
export class HomePageModule { }
