import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { GamesCreateComponent } from './games-create.component';

export { GamesCreateComponent } from './games-create.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
    ],
    exports: [GamesCreateComponent],
    declarations: [GamesCreateComponent],
    providers: [],
})
export class GamesCreateModule { }
