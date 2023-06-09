import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { WinnersComponent } from './winners.component';

export { WinnersComponent } from './winners.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule
    ],
    exports: [
        WinnersComponent
    ],
    declarations: [
        WinnersComponent
    ],
    providers: [],
})
export class WinnersModule { }
