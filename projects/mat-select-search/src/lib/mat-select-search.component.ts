import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Inject, Input, OnDestroy,Optional, Output, Renderer2, ViewChild } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { Searcher } from './searcher.service';
import { filter } from 'rxjs/operators';

const NON_ITEM_OPTIONS_COUNT = 2;
const INDEX_SELECT_ALL = 1;

@Component({
  selector: 'lib-mat-select-search',
  templateUrl: './mat-select-search.component.html',
  styleUrls: [ './mat-select-search.scss' ],
  //changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Searcher]
})
export class MatSelectSearchComponent implements AfterViewInit, OnDestroy {

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

  @Output() filtered = new EventEmitter<Record<string, string>[]>();
  @ViewChild('input', { read: ElementRef, static: true }) element!: ElementRef;
  isLoading = false;
  private filteredList: Record<string, string>[] | undefined = [];
  private fullList: Record<string, string>[] = [];
  private hasFilteredBefore = false;
  private subscriptions = new Subscription();
  private selectedOptions: any[] = [];
  private nativeSelectAllCheckbox!: HTMLElement;
  private clickListenerSelectAll = () => {};

  constructor(
    @Inject(MatSelect) private matSelect: MatSelect,
    @Optional() @Inject(MatOption) private matOption: MatOption,
    private renderer: Renderer2,
    private searcher: Searcher,
    ) { }

  ngAfterViewInit(): void {
    // If there is option to select all options then it should support multi select
    if (this.hasSelectAll) this.isMultiSelect = true;
    this.configMatOption();
    this.fullList = this.list;
    this.searcher.initSearch(this.list, this.searchProperties);
      this.subscriptions.add(this.matSelect.openedChange.subscribe(() => {
          const input = this.element.nativeElement;
          input.focus();
          if ((this.filteredList && this.filteredList.length === 0 && this.hasFilteredBefore) || this.clearSearchInput) {
              input.value = '';
              this.filtered.emit(this.fullList);
          }
      }));
      this.subscriptions
          .add(this.filtered.subscribe(() => (this.isLoading = false)));
      this.subscriptions.add(
        this.matSelect.stateChanges
          .pipe(filter(() => this.hasSelectAll))
          .subscribe(() => {
            const matOptions = this.matSelect.options.toArray();
            const selectAll = matOptions[INDEX_SELECT_ALL]._getHostElement();
            if (matOptions.length > NON_ITEM_OPTIONS_COUNT) {
              this.renderer.setStyle(selectAll, 'display', 'flex');
            } else {
              this.renderer.setStyle(selectAll, 'display', 'none');
            }

            const items = matOptions.slice(NON_ITEM_OPTIONS_COUNT);
            const isAllItemsSelected = items.every(item => item.selected);
            if (isAllItemsSelected && items.length > NON_ITEM_OPTIONS_COUNT) {
              this.selectNativeSelectAllCheckbox();
            } else {
              this.deselectNativeSelectAllCheckbox();
            }
          })
      );

    setTimeout(() => this.filtered.emit(this.fullList));
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

    if (this.isMultiSelect) this.configMultiSelect();
    if (this.hasSelectAll) this.enableSelectAll();
    if (this.fixOnTop) this.fixSearchBarOnTopWhileScroll();
  }

  /*
    This method is used to retain the old selected options after selecting an option from the new filtered list.
    The old selected options are stored in selectedOptions and the new matSelect value is appended with selected options.
  */
  private configMultiSelect(): void {
    this.subscriptions.add(this.matSelect.optionSelectionChanges.subscribe(change => {
      const isSelectAllOption = this.hasSelectAll && change.source.id === 'mat-option-1';
      if (!change.isUserInput || isSelectAllOption) return;
      const itemIndex = this.selectedOptions.indexOf(change.source.value);
      if (itemIndex > -1) {
        this.selectedOptions.splice(itemIndex, 1);
      } else {
        this.selectedOptions.push(change.source.value);
      }
      this.matSelect.value = [...this.selectedOptions];

      if (!this.hasSelectAll) return;
      const selectedOptionsCount = this.matSelect.options.filter(option => option.selected).length;
      const isAllOptionsSelected =
        selectedOptionsCount === this.matSelect.options.length - NON_ITEM_OPTIONS_COUNT;
      if (isAllOptionsSelected) {
        this.selectNativeSelectAllCheckbox();
        return;
      }

      if (this.nativeSelectAllCheckbox.getAttribute('checked')) {
        this.deselectNativeSelectAllCheckbox();
      }
    }));
  }

  /*
    This method helps the user to select all the options in a list. It must also be able to retain the old selected options
    after clicking Select All in new filtered list. But this has a problem.
    The checkbox before every mat-option is the default checkbox given by angular on a mat-option.
    This checkbox can only be checked manually by a method option.select().
    But this method not only checks the chekbox but also updates the value of the matSelect and hence after clicking on it,
    the matSelect value loses the old selected options and will only have all the options in the new filtered list.

    To overcome this we remove the default checkbox and create a new checkbox of our own. The newly created checkbox has also
    a slightly different appearance and hence contrasts with the rest of the checkboxes in the options so which is good as the
    user will get a feel that this particular option(Select All) is different from the rest of the options
  */
  private enableSelectAll(): void {
    const selectAll = this.matSelect.options.toArray()[INDEX_SELECT_ALL];
    const nativeSelectAll = selectAll._getHostElement();
    const matPseudoCheckbox = nativeSelectAll.childNodes[0];
    this.renderer.removeChild(nativeSelectAll, matPseudoCheckbox);

    this.nativeSelectAllCheckbox = this.renderer.createElement('input');
    this.renderer.setAttribute(this.nativeSelectAllCheckbox, 'type', 'checkbox');
    this.renderer.addClass(this.nativeSelectAllCheckbox, 'native-checkbox');
    this.renderer.insertBefore(nativeSelectAll, this.nativeSelectAllCheckbox, nativeSelectAll.childNodes[0]);

    this.clickListenerSelectAll = this.renderer.listen(nativeSelectAll, 'click', () => {
      if (this.nativeSelectAllCheckbox.getAttribute('checked')) {
        this.deselectNativeSelectAllCheckbox();
        this.deselectAlloptions();
      } else {
        this.selectNativeSelectAllCheckbox();
        this.selectAllOptions();
      }
    });
  }

  private selectAllOptions(): void {
    const matOptions = this.matSelect.options;
    const items = matOptions.toArray().slice(NON_ITEM_OPTIONS_COUNT);

    let nonSelectedItems: Record<string, string>[] = [];
    items.forEach(item => {
      if (!item.selected) nonSelectedItems.push(item.value);
    });

    this.selectedOptions = [...this.selectedOptions, ...nonSelectedItems];
    this.matSelect.value = [...this.selectedOptions];
  }

  private deselectAlloptions(): void {
    const matOptions = this.matSelect.options;
    const items = matOptions.toArray().slice(NON_ITEM_OPTIONS_COUNT);
    const itemValues = items.map(item => item.value)
    this.matSelect.value = this.selectedOptions = this.selectedOptions.filter(
      option => !itemValues.includes(option)
    );
  }

  private fixSearchBarOnTopWhileScroll(): void {
    const searchBar = this.matSelect.options.toArray()[0]._getHostElement();
    this.renderer.setStyle(searchBar, 'position', 'sticky');
    this.renderer.setStyle(searchBar, 'top', '0');
    this.renderer.setStyle(searchBar, 'z-index', '1');
    this.renderer.setStyle(searchBar, 'background-color', 'white');
  }

  private selectNativeSelectAllCheckbox(): void {
    this.renderer.setAttribute(this.nativeSelectAllCheckbox, 'checked', 'true');
  }

  private deselectNativeSelectAllCheckbox(): void {
    this.renderer.removeAttribute(this.nativeSelectAllCheckbox, 'checked');
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.clickListenerSelectAll();
  }
}
