import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatChipsModule,
    MatCardModule,
    MatGridListModule,
  ],
  exports: [MatToolbarModule, MatChipsModule, MatCardModule, MatGridListModule],
})
export class MaterialModule {}
