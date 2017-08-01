import {
  AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef,
  EventEmitter, Input, OnChanges, OnDestroy,
  OnInit, Output, Type,
  ViewChild, ViewContainerRef,
} from '@angular/core';
import { SheetService } from './sheet.service';

export interface Config {
  type: Type<Component>,
  componentName: string,
  inputParams: any
}

@Component({
  selector: '[widget-sheet]',
  template: `
      <div class="sheet-overlay" (click)="closeSheet()"></div>
      <div class="sheet">
          <ng-template #sheet></ng-template>
      </div>
  `,
  providers: [SheetService]
})
export class SheetComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @ViewChild("sheet", {read: ViewContainerRef}) sheet;

  @Output() onComponentCreate = new EventEmitter<any>();
  @Output() onCloseModal = new EventEmitter<any>();

  @Input() config: Config;

  cmpRef: ComponentRef<Component>;

  private isViewInitialized: boolean = false;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private _changeDetectionRef: ChangeDetectorRef,
    private sheetService: SheetService,
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.sheetService.updateSheetWidth();
    this.isViewInitialized = true;

    this.updateComponent();
    this._changeDetectionRef.detectChanges();
  }

  updateComponent() {
    if(!this.isViewInitialized) {
      return;
    }

    this.sheet.clear();
    let factory = this.componentFactoryResolver.resolveComponentFactory(this.config.type);
    this.cmpRef = this.sheet.createComponent(factory);
    const emitComponent = {cmp: this.cmpRef, name: this.config.componentName, params: this.config.inputParams};

    const component = emitComponent.cmp;
    const paramsOptional = emitComponent.params;

    if (Object.keys(paramsOptional).length !== 0) {
      const keysParams = Object.keys(paramsOptional);

      for (let key of keysParams) {
        (component.instance)[key] = paramsOptional[key];
      }
    }

    this.onComponentCreate.emit(emitComponent);
  }

  closeSheet() {
    this.onCloseModal.emit(true);
  }

  ngOnChanges() {
    this.updateComponent();
  }

  ngOnDestroy() {
    this.cmpRef.destroy();
  }
}
