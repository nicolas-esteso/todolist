import { NgModule } from '@angular/core';

import {
  MatCheckboxModule,
  MatCardModule,
  MatDividerModule,
  MatToolbarModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatIconModule,
} from '@angular/material';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [],
  exports: [
    MatListModule,
    MatCheckboxModule,
    MatCardModule,
    MatDividerModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ]
})
export class MaterialModule {}
