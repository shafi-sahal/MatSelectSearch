import { Component, ElementRef, EventEmitter, Inject, Input, Output, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "./searcher.service";
import * as i2 from "@angular/material/progress-spinner";
import * as i3 from "@angular/material/divider";
import * as i4 from "@angular/common";
import * as i5 from "@angular/material/select";
export class MatSelectSearchComponent {
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
MatSelectSearchComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.2", ngImport: i0, type: MatSelectSearchComponent, deps: [{ token: MatSelect }, { token: i1.Searcher }], target: i0.ɵɵFactoryTarget.Component });
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
                }] }, { type: i1.Searcher }]; }, propDecorators: { list: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXNlbGVjdC1zZWFyY2guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0LXNlbGVjdC1zZWFyY2gvc3JjL2xpYi9tYXQtc2VsZWN0LXNlYXJjaC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXQtc2VsZWN0LXNlYXJjaC9zcmMvbGliL21hdC1zZWxlY3Qtc2VhcmNoLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pILE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7Ozs7O0FBUXBDLE1BQU0sT0FBTyx3QkFBd0I7SUFZbkMsWUFDNkIsU0FBb0IsRUFDckMsUUFBa0I7UUFERCxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3JDLGFBQVEsR0FBUixRQUFRLENBQVU7UUFickIsU0FBSSxHQUE2QixFQUFFLENBQUM7UUFDcEMscUJBQWdCLEdBQWEsRUFBRSxDQUFDO1FBQ2hDLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUN4QixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQTRCLENBQUM7UUFFbEUsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNWLGlCQUFZLEdBQXlDLEVBQUUsQ0FBQztRQUN4RCxhQUFRLEdBQTZCLEVBQUUsQ0FBQztRQUN4QyxzQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDMUIsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBS3JDLENBQUM7SUFFUCxRQUFRO1FBQ04sSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLGFBQWE7YUFDZixHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZO2FBQy9CLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDZCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztZQUN6QyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO2dCQUM1RyxLQUFLLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ25DO1FBQ0gsQ0FBQyxDQUFDO2FBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FDNUQsQ0FBQztJQUNKLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBWTtRQUNyQixNQUFNLFVBQVUsR0FBRyxLQUFtQixDQUFDO1FBQ3ZDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUV6RCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixPQUFPO1NBQ1I7UUFFRCxNQUFNLHlCQUF5QixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzdELE1BQU0sUUFBUSxxQkFBTyxJQUFJLENBQUMsQ0FBQztZQUMzQixPQUFPLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ2xDLE9BQU8sUUFBUSxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsV0FBVyxLQUFXLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDOztxSEFyRDlDLHdCQUF3QixrQkFhekIsU0FBUzt5R0FiUix3QkFBd0IsbVJBS1AsVUFBVSwyQ0NmeEMsNFRBV0E7MkZERGEsd0JBQXdCO2tCQUxwQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLFdBQVcsRUFBRSxvQ0FBb0M7b0JBQ2pELFNBQVMsRUFBRSxDQUFFLDBCQUEwQixDQUFFO2lCQUMxQzs7MEJBY0ksTUFBTTsyQkFBQyxTQUFTO21FQVpWLElBQUk7c0JBQVosS0FBSztnQkFDRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBQ0csZ0JBQWdCO3NCQUF4QixLQUFLO2dCQUNJLFFBQVE7c0JBQWpCLE1BQU07Z0JBQ2lELE9BQU87c0JBQTlELFNBQVM7dUJBQUMsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0U2VsZWN0IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0JztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU2VhcmNoZXIgfSBmcm9tICcuL3NlYXJjaGVyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItbWF0LXNlbGVjdC1zZWFyY2gnLFxuICB0ZW1wbGF0ZVVybDogJy4vbWF0LXNlbGVjdC1zZWFyY2guY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsgJy4vbWF0LXNlbGVjdC1zZWFyY2guc2NzcycgXVxufSlcbmV4cG9ydCBjbGFzcyBNYXRTZWxlY3RTZWFyY2hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIGxpc3Q6IFJlY29yZDxzdHJpbmcsIHN0cmluZz5bXSA9IFtdO1xuICBASW5wdXQoKSBzZWFyY2hQcm9wZXJ0aWVzOiBzdHJpbmdbXSA9IFtdO1xuICBASW5wdXQoKSBjbGVhclNlYXJjaElucHV0ID0gZmFsc2U7XG4gIEBPdXRwdXQoKSBmaWx0ZXJlZCA9IG5ldyBFdmVudEVtaXR0ZXI8UmVjb3JkPHN0cmluZywgc3RyaW5nPltdPigpO1xuICBAVmlld0NoaWxkKCdpbnB1dCcsIHsgcmVhZDogRWxlbWVudFJlZiwgc3RhdGljOiB0cnVlIH0pIGVsZW1lbnQhOiBFbGVtZW50UmVmO1xuICBpc0xvYWRpbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSBmaWx0ZXJlZExpc3Q6IFJlY29yZDxzdHJpbmcsIHN0cmluZz5bXSB8IHVuZGVmaW5lZCA9IFtdO1xuICBwcml2YXRlIGZ1bGxMaXN0OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+W10gPSBbXTtcbiAgcHJpdmF0ZSBoYXNGaWx0ZXJlZEJlZm9yZSA9IGZhbHNlO1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChNYXRTZWxlY3QpIHByaXZhdGUgbWF0U2VsZWN0OiBNYXRTZWxlY3QsXG4gICAgICBwcml2YXRlIHNlYXJjaGVyOiBTZWFyY2hlclxuICAgICkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5mdWxsTGlzdCA9IHRoaXMubGlzdDtcbiAgICB0aGlzLnNlYXJjaGVyLmluaXRTZWFyY2godGhpcy5saXN0LCB0aGlzLnNlYXJjaFByb3BlcnRpZXMpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uc1xuICAgICAgLmFkZCh0aGlzLm1hdFNlbGVjdC5vcGVuZWRDaGFuZ2VcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBjb25zdCBpbnB1dCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBpbnB1dC5mb2N1cygpO1xuICAgICAgICBpZiAoKHRoaXMuZmlsdGVyZWRMaXN0ICYmIHRoaXMuZmlsdGVyZWRMaXN0Lmxlbmd0aCA9PT0gMCAmJiB0aGlzLmhhc0ZpbHRlcmVkQmVmb3JlKSB8fCB0aGlzLmNsZWFyU2VhcmNoSW5wdXQpIHtcbiAgICAgICAgICBpbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgICAgIHRoaXMuZmlsdGVyZWQuZW1pdCh0aGlzLmZ1bGxMaXN0KTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5hZGQodGhpcy5maWx0ZXJlZC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5pc0xvYWRpbmcgPSBmYWxzZSkpXG4gICAgKTtcbiAgfVxuXG4gIGZpbHRlckxpc3QoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgaW5wdXRFdmVudCA9IGV2ZW50IGFzIElucHV0RXZlbnQ7XG4gICAgdGhpcy5oYXNGaWx0ZXJlZEJlZm9yZSA9IHRydWU7XG4gICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMuZmlsdGVyZWRMaXN0ID0gdGhpcy5zZWFyY2hlci5maWx0ZXJMaXN0KGlucHV0RXZlbnQpO1xuXG4gICAgaWYgKCF0aGlzLmZpbHRlcmVkTGlzdCkge1xuICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBsaXN0V2l0aG91dENvbmNhdGVkVmFsdWVzID0gdGhpcy5maWx0ZXJlZExpc3QubWFwKGl0ZW0gPT4ge1xuICAgICAgY29uc3QgaXRlbUNvcHkgPSB7Li4uaXRlbX07XG4gICAgICBkZWxldGUgaXRlbUNvcHlbJ2NvbmNhdGVkVmFsdWVzJ107XG4gICAgICByZXR1cm4gaXRlbUNvcHk7XG4gICAgfSk7XG4gICAgdGhpcy5maWx0ZXJlZC5lbWl0KGxpc3RXaXRob3V0Q29uY2F0ZWRWYWx1ZXMpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7IHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpOyB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiZmxleC1jb250YWluZXJcIj5cbiAgPGlucHV0XG4gICAgI2lucHV0XG4gICAgcGxhY2Vob2xkZXI9XCJTZWFyY2hcIlxuICAgIChpbnB1dCk9XCJmaWx0ZXJMaXN0KCRldmVudClcIlxuICAgIChrZXlkb3duKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiPlxuICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyXCI+XG4gICAgICA8bWF0LXNwaW5uZXIgKm5nSWY9XCJpc0xvYWRpbmdcIiBbZGlhbWV0ZXJdPVwiMjVcIj48L21hdC1zcGlubmVyPlxuICAgIDwvZGl2PlxuPC9kaXY+XG48bWF0LWRpdmlkZXI+PC9tYXQtZGl2aWRlcj5cbiJdfQ==