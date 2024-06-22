import { NgModule } from '@angular/core';
import { LoadingComponent } from './loading.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


export { LoadingStatus } from './api/loading-status';

@NgModule({
    imports: [
        CommonModule,
        MatProgressSpinnerModule
    ],
    exports: [
        LoadingComponent
    ],
    declarations: [
        LoadingComponent
    ]
})
export class LoadingModule { }
