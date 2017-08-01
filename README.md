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
    this.sheetList = this.sheetListService.initOrGetSheetList(this.sheetListContainer);

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