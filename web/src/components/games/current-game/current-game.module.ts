import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CurrentGameComponent } from './current-game.component';

export { CurrentGameComponent } from './current-game.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        CurrentGameComponent
    ],
    declarations: [
        CurrentGameComponent
    ],
    providers: [],
})
export class CurrentGameModule { }
