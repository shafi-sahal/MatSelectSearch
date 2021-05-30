import { Component } from '@angular/core';
import { countries } from '../assets/dataset';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  countries: Record<string, string>[] = countries;
  filteredCountries: Record<string, string>[] = this.countries;
}
