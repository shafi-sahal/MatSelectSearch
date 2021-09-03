import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Inject, Input, OnDestroy,Optional, Output, Renderer2, ViewChild } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { Searcher } from './searcher.service';

@Component({
  selector: 'lib-mat-select-search',
  templateUrl: './mat-select-search.component.html',
  styleUrls: [ './mat-select-search.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Searcher]
})
export class MatSelectSearchComponent implements AfterViewInit, OnDestroy {

  // Send the array which is to be searched/filtered
  @Input() list: Record<string, string>[] = [];

  // Send the keys of the object properties that is to be searched/filtered
  @Input() searchProperties: string[] = [];

  // Make true if input should be cleared on opening
  @Input() clearSearchInput = false;

  // Make true if there is need to emit the filtered list on initial load
  @Input() initializeFilteredList = false;

  // Make true if there is a mat-option for selecting all values
  @Input() hasSelectAll = false;

  // Make true if it is needed to fix the search bar on top while scrolling.
  @Input() fixOnTop = false;

  @Output() filtered = new EventEmitter<Record<string, string>[]>();
  @ViewChild('input', { read: ElementRef, static: true }) element!: ElementRef;
  isLoading = false;
  private filteredList: Record<string, string>[] | undefined = [];
  private fullList: Record<string, string>[] = [];
  private hasFilteredBefore = false;
  private subscriptions = new Subscription();
  private clickListenerSelectAll = () => {};

  constructor(
    @Inject(MatSelect) private matSelect: MatSelect,
    @Optional() @Inject(MatOption) private matOption: MatOption,
    private renderer: Renderer2,
    private searcher: Searcher,
    ) { }

  ngAfterViewInit(): void {
    this.configMatOption();
    this.fullList = this.list;
    this.initializeFilteredListonLoad();
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

  private configMatOption(): void {
    if (!this.matOption) {
      console.error('<lib-mat-select-search> must be placed inside a <mat-option> element');
      return;
    }
    this.matOption.disabled = true;
    const nativeMatOption = this.matOption._getHostElement();
    const checkBox = nativeMatOption.childNodes[0];
    this.renderer.removeChild(nativeMatOption, checkBox);

    if (this.hasSelectAll) this.enableSelectAll();
    if (this.fixOnTop) this.fixSearchBarOnTopWhileScroll();
  }

  private initializeFilteredListonLoad(){console.log('init');
    if (this.initializeFilteredList) {
      //using timeout to avoid expression has changed error
      setTimeout(()=> this.filtered.emit(this.fullList));
    }
  }

  private enableSelectAll(): void {
    const selectAll = this.matSelect.options.toArray()[1];
    const nativeSelectAll = selectAll._getHostElement();

    this.clickListenerSelectAll = this.renderer.listen(nativeSelectAll, 'click', () => {
      if (selectAll.selected) this.selectAllOptions(); else this.deselectAllOptions();
    });
  }

  private selectAllOptions(): void {
    const matOptions = this.matSelect.options;
    for (let i = 2; i < matOptions.length; i++) matOptions.toArray()[i].select();
  }

  private deselectAllOptions(): void {
    const matOptions = this.matSelect.options;
    for (let i = 2; i < matOptions.length; i++) matOptions.toArray()[i].deselect();
  }

  private fixSearchBarOnTopWhileScroll(): void {
    const searchBar = this.matSelect.options.toArray()[0]._getHostElement();
    this.renderer.setStyle(searchBar, 'position', 'sticky');
    this.renderer.setStyle(searchBar, 'top', '0');
    this.renderer.setStyle(searchBar, 'z-index', '1');
    this.renderer.setStyle(searchBar, 'background-color', 'white');
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.clickListenerSelectAll();
  }
}
