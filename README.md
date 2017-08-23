# ng2-sheet

[![NPM Version](https://img.shields.io/npm/v/ng2-sheet.svg)](https://www.npmjs.com/package/ng2-sheet)
[![NPM Downloads](https://img.shields.io/npm/dt/ng2-sheet.svg)](https://www.npmjs.com/package/ng2-sheet)

## Features

- Open a nice sheet from the right
- Choose and add a component to insert inside the sheet
- You can choose and add an other component to insert on a new sheet over the opened sheet
- You can do this indefinitely

This component works perfectly with Redux implementation like ngrx-store.

## Example

Old demo https://embed.plnkr.co/w0IzEGmMDmyN5TbuRXer/

## Installation

###### NPM 5
`npm install ng2-sheet`

###### yarn
`yarn add ng2-sheet`

Finally import the `SheetModule`.

How use sheet list
==================

Add this code on the page where you will need a sheet list 
```
<ng-template #sheetListContainer></ng-template>
```

On your component, init variables
```
sheetList: SheetListComponent; // will be the component created
@ViewChild('sheetListContainer', {read: ViewContainerRef}) sheetListContainer; // will be the container where insert the component
```

Then init the sheet list and save the reference
You can also subscribe on ouput to be notified when a component is created on a sheet
```
private sheetListInit() {
    this.sheetListService.init(this.sheetListContainer);
    this.sheetList = this.sheetListService.getComponent();

    this.sheetList.onComponentCreated.subscribe(
      (params) => {
        this.componentCreated(params);
      }
    )
  }
```

Example for create a TestComponent inside a sheet

```
createTest() {
    const inputParams = {
      model: this.model,
    };

    this.sheetList.addSheet(TestComponent, 'TestComponent', inputParams);
  }
```
Don't forget to add your component into the entryComponents entry of your module:

```
@NgModule({
 ...,
 entryComponents: [TestComponent]
})
```

Now you can subscribe to the output

```
componentCreated(params) {
    const component = params.cmp;
    const name = params.name;

    if (name === 'TestComponent') {
      (<TestComponent>component.instance).someValues$
        .subscribe(
          (value) => {
            this.testValues.push(value);
          }
        )
    }
  }
```

Advanced use case
=================

In your TestComponent, you want to have a reference to the sheetList. You can inject the SheetListService 
and call getComponent()

```
  sheetList: SheetListComponent;

  constructor(
    private sheetListService: SheetListService
  ) {
    this.sheetList = this.sheetListService.getComponent();
  }
```

If you want to open a new sheet with OtherTestComponent from the TestComponent, you have just to do that

```
showOther() {
    this.sheetList.addSheet(OtherTestComponent, 'OtherTestComponent');
  }
```


###### @TODO

- Replace jQuery with Angular animations
