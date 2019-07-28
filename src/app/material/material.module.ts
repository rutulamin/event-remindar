import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    Material.MatTableModule,
    Material.MatIconModule,
    Material.MatPaginatorModule,
    Material.MatTabsModule,
    Material.MatExpansionModule
  ],
  exports: [
    Material.MatTableModule,
    Material.MatIconModule,
    Material.MatPaginatorModule,
    Material.MatTabsModule,
    Material.MatExpansionModule
  ],
  declarations: []
})
export class MaterialModule { }
