import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    Material.MatTableModule,
    Material.MatIconModule,
    Material.MatPaginatorModule,
  ],
  exports: [
    Material.MatTableModule,
    Material.MatIconModule,
    Material.MatPaginatorModule,
  ],
  declarations: []
})
export class MaterialModule { }
