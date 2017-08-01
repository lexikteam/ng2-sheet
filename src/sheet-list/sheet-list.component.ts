import {
  Component, EventEmitter, OnDestroy, OnInit, Output
} from '@angular/core';
import { SheetService } from '../sheet/sheet.service';
import { Config } from '../sheet/sheet.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sheet-list',
  template: `
      <div class="sheet-holder">
          <div widget-sheet *ngFor="let sheet of sheetList" class="sheet-container"
               [config]="sheet"
               (onComponentCreate)="componentCreated($event)"
               (onCloseModal)="closeSheet($event)">
          </div>

          <div class="sheet-container">
              <div class="sheet-overlay"></div>
              <div class="sheet"></div>
          </div>
      </div>
  `,
  providers: [SheetService],
})
export class SheetListComponent implements OnInit, OnDestroy {
  sheetList = [];

  closeSheetSource$: Subscription;
  @Output() onComponentCreated = new EventEmitter<any>();

  constructor(private sheetService: SheetService) {}

  ngOnInit() {}

  addSheet(componentType, name, params?) {
    const toInsert: Config = {
      type: componentType,
      componentName: name,
      inputParams: params || {}
    };

    this.sheetList.push(toInsert);
  }

  componentCreated(emitComponent) {
    this.onComponentCreated.emit(emitComponent);
    this.sheetService.display();
  }

  closeSheet() {
    this.closeSheetSource$ = this.sheetService.closeSubject
      .take(1)
      .subscribe(
        () => {
          this.sheetList.pop();
        }
      );

    this.sheetService.closeSheet();
  }

  ngOnDestroy() {
    this.closeSheetSource$ && this.closeSheetSource$.unsubscribe();
  }
}
