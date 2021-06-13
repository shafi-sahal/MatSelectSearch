(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/material/select'), require('rxjs'), require('@angular/material/progress-spinner'), require('@angular/material/divider'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('mat-select-search', ['exports', '@angular/core', '@angular/material/select', 'rxjs', '@angular/material/progress-spinner', '@angular/material/divider', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['mat-select-search'] = {}, global.ng.core, global.ng.material.select, global.rxjs, global.ng.material.progressSpinner, global.ng.material.divider, global.ng.common));
}(this, (function (exports, i0, i5, rxjs, i2, i3, i4) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i5__namespace = /*#__PURE__*/_interopNamespace(i5);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);

    var Searcher = /** @class */ (function () {
        function Searcher() {
            this.list = [];
            this.searchProperty = '';
            this.searchText = '';
            this.previousSearchText = '';
            this.previousInputtype = '';
            this.filteredList = [];
            this.previousFilteredList = [];
            this.canReturnPreviousFilteredList = true;
        }
        Searcher.prototype.initSearch = function (list, searchProperties) {
            var _this = this;
            if (searchProperties.length > 1) {
                this.list = list.map(function (item) { return (Object.assign(Object.assign({}, item), { concatedValues: _this.concateValues(item, searchProperties) })); });
                this.searchProperty = 'concatedValues';
            }
            else {
                this.list = list;
                this.searchProperty = searchProperties[0];
            }
        };
        Searcher.prototype.filterList = function (inputEvent) {
            var _this = this;
            if (inputEvent.data === ' ') {
                return;
            }
            var searchText = inputEvent.target.value;
            var removeWhitespaces = function (text) { return text.split(' ').join(''); };
            var searchTextInLowerCase = removeWhitespaces(searchText).toLocaleLowerCase();
            this.searchText = searchTextInLowerCase;
            var list = this.getList();
            this.previousSearchText = searchTextInLowerCase;
            this.previousInputtype = inputEvent.inputType;
            if (!list) {
                return this.previousFilteredList;
            }
            this.filteredList = list.filter(function (item) { return removeWhitespaces(item[_this.searchProperty]).toLowerCase().includes(_this.searchText); });
            return this.filteredList;
        };
        Searcher.prototype.concateValues = function (item, searchProperties) {
            var concatedValues = '';
            searchProperties.forEach(function (property) { return concatedValues += item[property]; });
            return concatedValues;
        };
        Searcher.prototype.getList = function () {
            if (this.previousSearchText && this.searchText.includes(this.previousSearchText)) {
                if (this.canReturnPreviousFilteredList) {
                    this.previousFilteredList = this.filteredList;
                }
                this.canReturnPreviousFilteredList = true;
                return this.filteredList;
            }
            var isLastTextFromPaste = this.previousInputtype === 'insertFromPaste';
            var canReturnPreviousFilteredList = this.isBackSpacedLastChar() &&
                !isLastTextFromPaste && this.canReturnPreviousFilteredList;
            if (canReturnPreviousFilteredList) {
                this.canReturnPreviousFilteredList = false;
                return;
            }
            return this.list;
        };
        Searcher.prototype.isBackSpacedLastChar = function () {
            var isTextDecrementedBy1 = this.previousSearchText.length - this.searchText.length === 1;
            var lastChar = this.previousSearchText.charAt(this.previousSearchText.length - 1);
            var concatedText = this.searchText + lastChar;
            return isTextDecrementedBy1 && concatedText === this.previousSearchText;
        };
        return Searcher;
    }());
    Searcher.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.2", ngImport: i0__namespace, type: Searcher, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    Searcher.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.2", ngImport: i0__namespace, type: Searcher, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.2", ngImport: i0__namespace, type: Searcher, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }] });

    var MatSelectSearchComponent = /** @class */ (function () {
        function MatSelectSearchComponent(matSelect, searcher) {
            this.matSelect = matSelect;
            this.searcher = searcher;
            this.list = [];
            this.searchProperties = [];
            this.clearSearchInput = false;
            this.filtered = new i0.EventEmitter();
            this.isLoading = false;
            this.filteredList = [];
            this.fullList = [];
            this.hasFilteredBefore = false;
            this.subscriptions = new rxjs.Subscription();
        }
        MatSelectSearchComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            this.fullList = this.list;
            this.searcher.initSearch(this.list, this.searchProperties);
            this.subscriptions
                .add(this.matSelect.openedChange
                .subscribe(function () {
                var input = _this.element.nativeElement;
                input.focus();
                if ((_this.filteredList && _this.filteredList.length === 0 && _this.hasFilteredBefore) || _this.clearSearchInput) {
                    input.value = '';
                    _this.filtered.emit(_this.fullList);
                }
            })
                .add(this.filtered.subscribe(function () { return _this.isLoading = false; })));
        };
        MatSelectSearchComponent.prototype.filterList = function (event) {
            var inputEvent = event;
            this.hasFilteredBefore = true;
            this.isLoading = true;
            this.filteredList = this.searcher.filterList(inputEvent);
            if (!this.filteredList) {
                this.isLoading = false;
                return;
            }
            var listWithoutConcatedValues = this.filteredList.map(function (item) {
                var itemCopy = Object.assign({}, item);
                delete itemCopy['concatedValues'];
                return itemCopy;
            });
            this.filtered.emit(listWithoutConcatedValues);
        };
        MatSelectSearchComponent.prototype.ngOnDestroy = function () { this.subscriptions.unsubscribe(); };
        return MatSelectSearchComponent;
    }());
    MatSelectSearchComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.2", ngImport: i0__namespace, type: MatSelectSearchComponent, deps: [{ token: i5.MatSelect }, { token: Searcher }], target: i0__namespace.ɵɵFactoryTarget.Component });
    MatSelectSearchComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.2", type: MatSelectSearchComponent, selector: "lib-mat-select-search", inputs: { list: "list", searchProperties: "searchProperties", clearSearchInput: "clearSearchInput" }, outputs: { filtered: "filtered" }, viewQueries: [{ propertyName: "element", first: true, predicate: ["input"], descendants: true, read: i0.ElementRef, static: true }], ngImport: i0__namespace, template: "<div class=\"flex-container\">\n  <input\n    #input\n    id=\"input\"\n    placeholder=\"Search\"\n    (input)=\"filterList($event)\"\n    (keydown)=\"$event.stopPropagation()\">\n    <div class=\"spinner\">\n      <mat-spinner *ngIf=\"isLoading\" [diameter]=\"25\"></mat-spinner>\n    </div>\n</div>\n<mat-divider></mat-divider>\n", styles: [".flex-container{display:flex;align-items:center}input{border:none;width:calc(100% - (25px));outline:none;margin-top:2%;margin-bottom:2%;margin-left:14px}.spinner{margin-right:10px}"], components: [{ type: i2__namespace.MatSpinner, selector: "mat-spinner", inputs: ["color"] }, { type: i3__namespace.MatDivider, selector: "mat-divider", inputs: ["vertical", "inset"] }], directives: [{ type: i4__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.2", ngImport: i0__namespace, type: MatSelectSearchComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'lib-mat-select-search',
                        templateUrl: './mat-select-search.component.html',
                        styleUrls: ['./mat-select-search.scss']
                    }]
            }], ctorParameters: function () {
            return [{ type: i5__namespace.MatSelect, decorators: [{
                            type: i0.Inject,
                            args: [i5.MatSelect]
                        }] }, { type: Searcher }];
        }, propDecorators: { list: [{
                    type: i0.Input
                }], searchProperties: [{
                    type: i0.Input
                }], clearSearchInput: [{
                    type: i0.Input
                }], filtered: [{
                    type: i0.Output
                }], element: [{
                    type: i0.ViewChild,
                    args: ['input', { read: i0.ElementRef, static: true }]
                }] } });

    var MatSelectSearchModule = /** @class */ (function () {
        function MatSelectSearchModule() {
        }
        return MatSelectSearchModule;
    }());
    MatSelectSearchModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.2", ngImport: i0__namespace, type: MatSelectSearchModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    MatSelectSearchModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.2", ngImport: i0__namespace, type: MatSelectSearchModule, declarations: [MatSelectSearchComponent], imports: [i2.MatProgressSpinnerModule,
            i3.MatDividerModule,
            i4.CommonModule], exports: [MatSelectSearchComponent] });
    MatSelectSearchModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.2", ngImport: i0__namespace, type: MatSelectSearchModule, imports: [[
                i2.MatProgressSpinnerModule,
                i3.MatDividerModule,
                i4.CommonModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.2", ngImport: i0__namespace, type: MatSelectSearchModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            MatSelectSearchComponent
                        ],
                        imports: [
                            i2.MatProgressSpinnerModule,
                            i3.MatDividerModule,
                            i4.CommonModule
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

    exports.MatSelectSearchComponent = MatSelectSearchComponent;
    exports.MatSelectSearchModule = MatSelectSearchModule;
    exports.Searcher = Searcher;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mat-select-search.umd.js.map
