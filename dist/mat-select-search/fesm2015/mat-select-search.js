import * as i0 from '@angular/core';
import { Injectable, EventEmitter, ElementRef, Component, Inject, Input, Output, ViewChild, NgModule } from '@angular/core';
import * as i5 from '@angular/material/select';
import { MatSelect } from '@angular/material/select';
import { Subscription } from 'rxjs';
import * as i2 from '@angular/material/progress-spinner';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import * as i3 from '@angular/material/divider';
import { MatDividerModule } from '@angular/material/divider';
import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';

class Searcher {
    constructor() {
        this.list = [];
        this.searchProperty = '';
        this.searchText = '';
        this.previousSearchText = '';
        this.previousInputtype = '';
        this.filteredList = [];
        this.previousFilteredList = [];
        this.canReturnPreviousFilteredList = true;
    }
    initSearch(list, searchProperties) {
        if (searchProperties.length > 1) {
            this.list = list.map(item => (Object.assign(Object.assign({}, item), { concatedValues: this.concateValues(item, searchProperties) })));
            this.searchProperty = 'concatedValues';
        }
        else {
            this.list = list;
            this.searchProperty = searchProperties[0];
        }
    }
    filterList(inputEvent) {
        if (inputEvent.data === ' ') {
            return;
        }
        const searchText = inputEvent.target.value;
        const removeWhitespaces = (text) => text.split(' ').join('');
        const searchTextInLowerCase = removeWhitespaces(searchText).toLocaleLowerCase();
        this.searchText = searchTextInLowerCase;
        const list = this.getList();
        this.previousSearchText = searchTextInLowerCase;
        this.previousInputtype = inputEvent.inputType;
        if (!list) {
            return this.previousFilteredList;
        }
        this.filteredList = list.filter(item => removeWhitespaces(item[this.searchProperty]).toLowerCase().includes(this.searchText));
        return this.filteredList;
    }
    concateValues(item, searchProperties) {
        let concatedValues = '';
        searchProperties.forEach(property => concatedValues += item[property]);
        return concatedValues;
    }
    getList() {
        if (this.previousSearchText && this.searchText.includes(this.previousSearchText)) {
            if (this.canReturnPreviousFilteredList) {
                this.previousFilteredList = this.filteredList;
            }
            this.canReturnPreviousFilteredList = true;
            return this.filteredList;
        }
        const isLastTextFromPaste = this.previousInputtype === 'insertFromPaste';
        const canReturnPreviousFilteredList = this.isBackSpacedLastChar() &&
            !isLastTextFromPaste && this.canReturnPreviousFilteredList;
        if (canReturnPreviousFilteredList) {
            this.canReturnPreviousFilteredList = false;
            return;
        }
        return this.list;
    }
    isBackSpacedLastChar() {
        const isTextDecrementedBy1 = this.previousSearchText.length - this.searchText.length === 1;
        const lastChar = this.previousSearchText.charAt(this.previousSearchText.length - 1);
        const concatedText = this.searchText + lastChar;
        return isTextDecrementedBy1 && concatedText === this.previousSearchText;
    }
}
Searcher.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.2", ngImport: i0, type: Searcher, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
Searcher.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.2", ngImport: i0, type: Searcher, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.2", ngImport: i0, type: Searcher, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class MatSelectSearchComponent {
    constructor(matSelect, searcher) {
        this.matSelect = matSelect;
        this.searcher = searcher;
        this.list = [];
        this.searchProperties = [];
        this.clearSearchInput = false;
        this.filtered = new EventEmitter();
        this.isLoading = false;
        this.filteredList = [];
        this.fullList = [];
        this.hasFilteredBefore = false;
        this.subscriptions = new Subscription();
    }
    ngOnInit() {
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
            .add(this.filtered.subscribe(() => this.isLoading = false)));
    }
    filterList(event) {
        const inputEvent = event;
        this.hasFilteredBefore = true;
        this.isLoading = true;
        this.filteredList = this.searcher.filterList(inputEvent);
        if (!this.filteredList) {
            this.isLoading = false;
            return;
        }
        const listWithoutConcatedValues = this.filteredList.map(item => {
            const itemCopy = Object.assign({}, item);
            delete itemCopy['concatedValues'];
            return itemCopy;
        });
        this.filtered.emit(listWithoutConcatedValues);
    }
    ngOnDestroy() { this.subscriptions.unsubscribe(); }
}
MatSelectSearchComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.2", ngImport: i0, type: MatSelectSearchComponent, deps: [{ token: MatSelect }, { token: Searcher }], target: i0.ɵɵFactoryTarget.Component });
MatSelectSearchComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.2", type: MatSelectSearchComponent, selector: "lib-mat-select-search", inputs: { list: "list", searchProperties: "searchProperties", clearSearchInput: "clearSearchInput" }, outputs: { filtered: "filtered" }, viewQueries: [{ propertyName: "element", first: true, predicate: ["input"], descendants: true, read: ElementRef, static: true }], ngImport: i0, template: "<div class=\"flex-container\">\n  <input\n    #input\n    placeholder=\"Search\"\n    (input)=\"filterList($event)\"\n    (keydown)=\"$event.stopPropagation()\">\n    <div class=\"spinner\">\n      <mat-spinner *ngIf=\"isLoading\" [diameter]=\"25\"></mat-spinner>\n    </div>\n</div>\n<mat-divider></mat-divider>\n", styles: [".flex-container{display:flex;align-items:center}input{border:none;width:calc(100% - (25px));outline:none;margin-top:2%;margin-bottom:2%;margin-left:14px}.spinner{margin-right:10px}"], components: [{ type: i2.MatSpinner, selector: "mat-spinner", inputs: ["color"] }, { type: i3.MatDivider, selector: "mat-divider", inputs: ["vertical", "inset"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.2", ngImport: i0, type: MatSelectSearchComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'lib-mat-select-search',
                    templateUrl: './mat-select-search.component.html',
                    styleUrls: ['./mat-select-search.scss']
                }]
        }], ctorParameters: function () { return [{ type: i5.MatSelect, decorators: [{
                    type: Inject,
                    args: [MatSelect]
                }] }, { type: Searcher }]; }, propDecorators: { list: [{
                type: Input
            }], searchProperties: [{
                type: Input
            }], clearSearchInput: [{
                type: Input
            }], filtered: [{
                type: Output
            }], element: [{
                type: ViewChild,
                args: ['input', { read: ElementRef, static: true }]
            }] } });

class MatSelectSearchModule {
}
MatSelectSearchModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.2", ngImport: i0, type: MatSelectSearchModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatSelectSearchModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.2", ngImport: i0, type: MatSelectSearchModule, declarations: [MatSelectSearchComponent], imports: [MatProgressSpinnerModule,
        MatDividerModule,
        CommonModule], exports: [MatSelectSearchComponent] });
MatSelectSearchModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.2", ngImport: i0, type: MatSelectSearchModule, imports: [[
            MatProgressSpinnerModule,
            MatDividerModule,
            CommonModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.2", ngImport: i0, type: MatSelectSearchModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        MatSelectSearchComponent
                    ],
                    imports: [
                        MatProgressSpinnerModule,
                        MatDividerModule,
                        CommonModule
                    ],
                    exports: [
                        MatSelectSearchComponent
                    ]
                }]
        }] });

/*
 * Public API Surface of mat-select-search
 */

/**
 * Generated bundle index. Do not edit.
 */

export { MatSelectSearchComponent, MatSelectSearchModule, Searcher };
//# sourceMappingURL=mat-select-search.js.map
