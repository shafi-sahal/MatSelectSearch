import { AfterViewInit, ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Searcher } from './searcher.service';
import * as i0 from "@angular/core";
export declare class MatSelectSearchComponent implements AfterViewInit, OnDestroy {
    private matSelect;
    private searcher;
    list: Record<string, string>[];
    searchProperties: string[];
    clearSearchInput: boolean;
    filtered: EventEmitter<Record<string, string>[]>;
    element: ElementRef;
    isLoading: boolean;
    private filteredList;
    private fullList;
    private hasFilteredBefore;
    private subscriptions;
    constructor(matSelect: MatSelect, searcher: Searcher);
    ngAfterViewInit(): void;
    filterList(event: Event): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatSelectSearchComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatSelectSearchComponent, "lib-mat-select-search", never, { "list": "list"; "searchProperties": "searchProperties"; "clearSearchInput": "clearSearchInput"; }, { "filtered": "filtered"; }, never, never>;
}
