# MatSelectSearch

github: https://github.com/shafi-sahal/LibMatSelectSearch

## What is it?
Angular component providing a functionality to search/filter MatSelect options of the Angular Material library

![Screenshot from 2021-06-20 21-56-15](https://user-images.githubusercontent.com/60147182/123517782-89450980-d6c0-11eb-93ea-9f1a352a751e.png)

## Working Demo
See it in action here: https://stackblitz.com/github/shafi-sahal/MatSelectSearch

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

 
Use the lib-mat-select-search component inside a mat-select element by placing it inside a <mat-option> element:
`<mat-card>
  <mat-form-field>
    <mat-label>Select a country</mat-label>
    <mat-select #countrySelect>
      <mat-option>
        <lib-mat-select-search
        [list]="countries"
        [searchProperties]="['dialCode', 'name']"
        (filtered)="filteredCountries = $event">
      </lib-mat-select-search>
      </mat-option>
      <mat-select-trigger>{{countrySelect.value}}</mat-select-trigger>
      <mat-option *ngFor="let country of filteredCountries" [value]="country.name">
        <div class="country-container">
          <p>{{country.name}}</p><p>{{country.dialCode}}</p>
        </div>
      </mat-option>
    </mat-select>
  </mat-form-field>
</mat-card>`

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
