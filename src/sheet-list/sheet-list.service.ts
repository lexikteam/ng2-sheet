import {
  ComponentFactoryResolver, ViewContainerRef,
  OnDestroy, Injectable, ReflectiveInjector
} from '@angular/core';
import { SheetListComponent } from './sheet-list.component';

@Injectable()
export class SheetListService implements OnDestroy {

  private componentRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  init(vCref: ViewContainerRef) {
    vCref.clear();

    let factory = this.componentFactoryResolver.resolveComponentFactory(SheetListComponent);
    let injector = ReflectiveInjector.fromResolvedProviders([], vCref.parentInjector);
    let ref = factory.create(injector);

    vCref.insert(ref.hostView);

    this.componentRef = (<SheetListComponent>ref.instance);
  }

  getComponent() {
    return this.componentRef;
  }

  ngOnDestroy() {
    this.componentRef.destroy();
  }
}
