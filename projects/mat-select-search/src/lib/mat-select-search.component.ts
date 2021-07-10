import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Optional, Output, ViewChild } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { Searcher } from './searcher.service';

@Component({
  selector: 'lib-mat-select-search',
  templateUrl: './mat-select-search.component.html',
  styleUrls: [ './mat-select-search.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatSelectSearchComponent implements AfterViewInit, OnDestroy {

  // Send the array which is to be searched/filtered
  @Input() list: Record<string, string>[] = [];

  // Send the keys of the object properties that is to be searched/filtered
  @Input() searchProperties: string[] = [];

  // Make true if input should be cleared on opening
  @Input() clearSearchInput = false;

  @Output() filtered = new EventEmitter<Record<string, string>[]>();
  @ViewChild('input', { read: ElementRef, static: true }) element!: ElementRef;
  isLoading = false;
  private filteredList: Record<string, string>[] | undefined = [];
  private fullList: Record<string, string>[] = [];
  private hasFilteredBefore = false;
  private subscriptions = new Subscription();

  constructor(
    @Inject(MatSelect) private matSelect: MatSelect,
     @Inject(MatOption) private matOption: MatOption,
    private searcher: Searcher,
    ) { }

  ngAfterViewInit(): void {
    console.log(this.matOption)
    /*if (!this.matOption) {
      console.error('<lib-mat-select-search must be placed inside a <mat-option> element');
      return;
    }*/
    this.matOption.disabled = true;
    this.fullList = this.list;
    this.searcher.initSearch(this.list, this.searchProperties);
    this.subscriptions
      .add(this.matSelect.openedChange
      .subscribe(() => {
        const input = this.element.nativeElement;
        input.focus();
        if ((this.filteredList && this.filteredList.length === 0 && this.hasFilteredBefore) || this.clearSearchInput) {
          input.value = '';
          this.filtered.emit(this.fullList);
        }
      })
      .add(this.filtered.subscribe(() => this.isLoading = false))
    );
  }

  filterList(event: Event): void {
    const inputEvent = event as InputEvent;
    this.hasFilteredBefore = true;
    this.isLoading = true;
    this.filteredList = this.searcher.filterList(inputEvent);

    if (!this.filteredList) {
      this.isLoading = false;
      return;
    }

    const listWithoutConcatedValues = this.filteredList.map(item => {
      const itemCopy = {...item};
      delete itemCopy['concatedValues'];
      return itemCopy;
    });
    this.filtered.emit(listWithoutConcatedValues);
  }

  stopCharPropagation(event: KeyboardEvent): void {
    const key = event.key;
    const isTextControlKey = key === ' ' || key === 'Home' || key === 'End' || (key >= 'a' && key <= 'z');
    if (isTextControlKey) { event.stopPropagation(); }
  }

  ngOnDestroy(): void { this.subscriptions.unsubscribe(); }
}
