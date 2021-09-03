import { Injectable } from '@angular/core';

@Injectable()
export class Searcher {
  private list: Record<string, string>[] = [];
  private searchProperty = '';
  private searchText = '';
  private previousSearchText = '';
  private previousInputtype = '';
  private filteredList: Record<string, string>[] = [];
  private previousFilteredList: Record<string, string>[] = [];
  private shouldReturnPreviousFilteredList = true;

  initSearch(list: Record<string, string>[], searchProperties: string[]): void {
    if (searchProperties.length > 1) {
      this.list = list.map(item => (
        {...item, concatedValues: this.concateValues(item, searchProperties)}
      ));
      this.searchProperty = 'concatedValues';
    } else {
      this.list = list;
      this.searchProperty = searchProperties[0];
    }
    this.previousFilteredList = this.list;
  }

  filterList(inputEvent: InputEvent): Record<string, string>[] | undefined {
    if (inputEvent.data === ' ') { return; }
    const searchText = (inputEvent.target as HTMLInputElement).value;
    const removeWhitespaces = (text: string) => text.split(' ').join('');
    const searchTextInLowerCase = removeWhitespaces(searchText).toLocaleLowerCase();
    this.searchText = searchTextInLowerCase;

    const list = this.getList();
    this.previousSearchText = searchTextInLowerCase;
    this.previousInputtype = inputEvent.inputType;
    if (!list) {
      this.filteredList = this.previousFilteredList;
      return this.previousFilteredList;
    }
    this.filteredList = list.filter(item =>
      removeWhitespaces(item[this.searchProperty]).toLowerCase().includes(this.searchText));
    return this.filteredList;
  }

  private concateValues(item: Record<string, string>, searchProperties: string[]): string {
    let concatedValues = '';
    searchProperties.forEach(property => concatedValues += item[property]);
    return concatedValues;
  }

  private getList(): Record<string, string>[] | undefined {
    if (this.previousSearchText && this.searchText.includes(this.previousSearchText)) {
      this.previousFilteredList = this.filteredList;
      this.shouldReturnPreviousFilteredList = true;
      return this.filteredList;
    }

    const isLastTextFromPaste = this.previousInputtype === 'insertFromPaste';
    const canReturnPreviousFilteredList = this.isBackSpacedLastChar() &&
     !isLastTextFromPaste && this.shouldReturnPreviousFilteredList;

    if (canReturnPreviousFilteredList) {
      this.shouldReturnPreviousFilteredList = false;
      return;
    }
    return this.list;
  }

  private isBackSpacedLastChar(): boolean {
    const isTextDecrementedBy1 = this.previousSearchText.length - this.searchText.length === 1;
    const lastChar = this.previousSearchText.charAt(this.previousSearchText.length - 1);
    const concatedText = this.searchText + lastChar;
    return isTextDecrementedBy1 && concatedText === this.previousSearchText;
  }
}
