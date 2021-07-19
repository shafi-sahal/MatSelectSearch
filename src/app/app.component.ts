import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { countries } from '../assets/dataset';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit(): void {
  //  console.log(this.all.select());
  }
  countries: Record<string, string>[] = countries;
  filteredCountries: Record<string, string>[] = this.countries;
  @ViewChild('all') all!: MatOption;
  g() {

  }
}
