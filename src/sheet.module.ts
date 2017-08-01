import { NgModule } from '@angular/core';
import { SheetListComponent } from './sheet-list/sheet-list.component';
import { SheetComponent } from './sheet/sheet.component';
import { SheetListService } from './sheet-list/sheet-list.service';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SheetListComponent, SheetComponent
  ],
  exports: [
    SheetListComponent, SheetComponent
  ],
  providers: [
    SheetListService
  ],
  entryComponents: [SheetListComponent]
})
export class SheetModule { }
