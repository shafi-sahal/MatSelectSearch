import { ChangeDetectionStrategy, Component } from '@angular/core';
import { countries } from '../assets/dataset';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  countries: Record<string, string>[] = countries;
  filteredCountries: Record<string, string>[] = [];

  randomizeOrder() {
    this.filteredCountries.forEach((_, i) => {
      const rand = Math.round(Math.random() * this.filteredCountries.length);
      moveItemInArray(this.filteredCountries, i, rand);
    });
  }
}
