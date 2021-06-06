import * as i0 from "@angular/core";
export declare class Searcher {
    private list;
    private searchProperty;
    private searchText;
    private previousSearchText;
    private previousInputtype;
    private filteredList;
    private previousFilteredList;
    private canReturnPreviousFilteredList;
    initSearch(list: Record<string, string>[], searchProperties: string[]): void;
    filterList(inputEvent: InputEvent): Record<string, string>[] | undefined;
    private concateValues;
    private getList;
    private isBackSpacedLastChar;
    static ɵfac: i0.ɵɵFactoryDeclaration<Searcher, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<Searcher>;
}
