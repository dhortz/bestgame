import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { MenuComponent } from './menu.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        BrowserModule 
    ],
    exports: [
        MenuComponent
    ],
    declarations: [
        MenuComponent
    ],
    providers: [],
})
export class MenuModule { }
