import { NgModule } from '@angular/core';
import { MatSelectSearchComponent } from './mat-select-search.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  declarations: [
    MatSelectSearchComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    MatDividerModule
  ],
  exports: [
    MatSelectSearchComponent
  ]
})
export class MatSelectSearchModule { }
