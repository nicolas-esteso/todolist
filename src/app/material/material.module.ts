import { NgModule } from '@angular/core';

import {
  MatCheckboxModule,
  MatCardModule,
  MatDividerModule,
  MatToolbarModule,
  MatButtonModule,
  MatProgressSpinnerModule,
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
  ]
})
export class MaterialModule {}
