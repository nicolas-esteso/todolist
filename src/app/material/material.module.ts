import { NgModule } from '@angular/core';

import {
  MatCheckboxModule,
  MatCardModule,
  MatDividerModule,
  MatToolbarModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
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
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class MaterialModule {}
