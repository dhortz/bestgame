import { Component, Input } from '@angular/core';
import { LoadingStatus } from './api/loading-status';

@Component({
    selector: 'loading',
    templateUrl: 'loading.component.html',
    styleUrls: ['./loading.component.scss']
})

export class LoadingComponent {
    
    @Input() status = LoadingStatus.LOADING;

    loadingStatus = LoadingStatus;    
}