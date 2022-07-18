# MatSelectSearch

github: https://github.com/shafi-sahal/MatSelectSearch

## What is it?
Angular component providing a functionality to search/filter MatSelect options of the Angular Material library

![Screenshot from 2021-06-20 21-56-15](https://user-images.githubusercontent.com/60147182/123517782-89450980-d6c0-11eb-93ea-9f1a352a751e.png)

## Working Demo
See it in action here: https://stackblitz.com/github/shafi-sahal/MatSelectSearch

This project has been developed in response to the github issue: https://github.com/angular/material2/issues/5697

## Why MatSelectSearch?
To know the story behind MatSelectSearch and to have a detailed guide on it's usage, visit: https://medium.com/geekculture/implementing-a-search-bar-for-filtering-select-dropdowns-in-angular-63b1f2033737

## How to use it?
Install `mat-select-search` in your project:

`npm install mat-select-search`

Import the MatSelectSearchModule in your app.module.ts or in whichever module you need the library, in case you are using lazy loading:

```typescript
import { MatSelectSearchModule } from 'mat-select-search';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatCardModule,
    MatSelectSearchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

```
 
Use the ```lib-mat-select-search``` component inside a ```mat-select``` element by placing it inside a ```<mat-option>``` element:

```html
<mat-card>
  <mat-form-field>
    <mat-label>Select a country</mat-label>
    <mat-select #countrySelect>
      <mat-select-trigger>{{countrySelect.value}}</mat-select-trigger>

      <mat-option>
        <lib-mat-select-search
          [list]="countries"
          [searchProperties]="['dialCode', 'name']"
          (filtered)="filteredCountries = $event">
        </lib-mat-select-search>
      </mat-option>

      <mat-option *ngFor="let country of filteredCountries" [value]="country.name">
        <div class="country-container">
          <span>{{country.name}}</span><span>{{country.dialCode}}</span>
        </div>
      </mat-option>

    </mat-select>
  </mat-form-field>
</mat-card>

  
```

Pass the list to be filtered to the 'list' input.
Pass the keys of the object properties to be searched in the 'searchProperties' input.
Get the filtered list from output 'filtered'.
  
While passing searchProperties, pass it in the order you want the search to work:
  
``` [searchProperties] = "['dialCode', 'name']" ```
  
The above code will give 'India' on search 'India' or '+91' or '+91India' from the countries list. Case and space does not matter.
  
``` [searchProperties] = "['name', 'dialCode']" ```
  
The above code will give 'India' on search 'India' or '+91' or 'India+91' from the countries list. Case and space does not matter.

## How to use with 'Select All' option with mat-select multiple attribute

Make a new mat-option for your 'Select All' option 

```<mat-option>Select All</mat-option>```

Place it below the ```<lib-mat-select-search-component>``` and set ```[hasSelectAll]="true"``` on ```<lib-mat-select-search>```


```html
<mat-card>
  <mat-form-field>
    <mat-label>Select a country</mat-label>
    <mat-select #countrySelect multiple>
      <mat-select-trigger>{{countrySelect.value}}</mat-select-trigger>

      <mat-option>
        <lib-mat-select-search
          [list]="countries"
          [searchProperties]="['dialCode', 'name']"
          (filtered)="filteredCountries = $event"
          [hasSelectAll]="true">
        </lib-mat-select-search>
      </mat-option>

      <mat-option>Select All</mat-option>

      <mat-option *ngFor="let country of filteredCountries" [value]="country.name">
        <div class="country-container">
          <span>{{country.name}}</span><span>{{country.dialCode}}</span>
        </div>
      </mat-option>

    </mat-select>
  </mat-form-field>
</mat-card>

```

  
## Inputs 
  
```typescript
  // Send the array which is to be searched/filtered
  @Input() list: Record<string, string>[] = [];

  // Send the keys of the object properties that is to be searched/filtered
  @Input() searchProperties: string[] = [];

  // Make true if input should be cleared on opening
  @Input() clearSearchInput = false;
  
  // Make true if mat-select has multiple attribute with true value
  @Input() isMultiSelect = false;
  
  // Make true if there is a mat-option for selecting all values
  @Input() hasSelectAll = false;
  
  // Make true if it is needed to fix the search bar on top while scrolling.
  @Input() fixOnTop = false;
  
```

## Support Development
### Contributions
Contributions are welcome, just open an issue and file a pull request.

Feedback and suggestions are also welcome, just mail me at: shafisahal99@gmail.com

If you feel this project has helped you, saved some time or had an impact in your business or projects, kindly consider buying us a coffee to support the maintenance and further development of the project.

[<img width="200" alt="bmc-button" src="https://user-images.githubusercontent.com/60147182/178779062-59a55cad-945b-4769-bddd-34097e0673a5.png">](https://www.buymeacoffee.com/shafisahal)

## Development
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
