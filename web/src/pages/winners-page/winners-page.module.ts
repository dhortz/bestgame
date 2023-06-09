import { NgModule } from '@angular/core';

import { WinnersPageComponent } from './winners-page.component';
import { WinnersModule } from "../../components/winners/winners.module";

@NgModule({
    imports: [
       WinnersModule
    ],
    exports: [],
    declarations: [
        WinnersPageComponent
    ],
    providers: [],
})
export class WinnersPageModule { }
