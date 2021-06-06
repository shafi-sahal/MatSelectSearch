import { Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { Searcher } from './searcher.service';

@Component({
  selector: 'mat-select-search',
  templateUrl: './mat-select-search.component.html',
  styleUrls: [ './mat-select-search.scss' ]
})
export class MatSelectSearchComponent implements OnInit, OnDestroy {
  @Input() list: Record<string, string>[] = [];
  @Input() searchProperties: string[] = [];
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
      private searcher: Searcher
    ) { }

  ngOnInit(): void {
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

  ngOnDestroy(): void { this.subscriptions.unsubscribe(); }
}
