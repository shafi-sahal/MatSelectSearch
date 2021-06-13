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
    ngAfterViewInit() {
        this.fullList = this.list;
        this.searcher.initSearch(this.list, this.searchProperties);
        this.subscriptions
            .add(this.matSelect.openedChange
            .subscribe(() => {
            const input = document.getElementById('input');
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
MatSelectSearchComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.2", type: MatSelectSearchComponent, selector: "lib-mat-select-search", inputs: { list: "list", searchProperties: "searchProperties", clearSearchInput: "clearSearchInput" }, outputs: { filtered: "filtered" }, viewQueries: [{ propertyName: "element", first: true, predicate: ["input"], descendants: true, read: ElementRef, static: true }], ngImport: i0, template: "<div class=\"flex-container\">\n  <input\n    #input\n    id=\"input\"\n    placeholder=\"Search\"\n    (input)=\"filterList($event)\"\n    (keydown)=\"$event.stopPropagation()\">\n    <div class=\"spinner\">\n      <mat-spinner *ngIf=\"isLoading\" [diameter]=\"25\"></mat-spinner>\n    </div>\n</div>\n<mat-divider></mat-divider>\n", styles: [".flex-container{display:flex;align-items:center}input{border:none;width:calc(100% - (25px));outline:none;margin-top:2%;margin-bottom:2%;margin-left:14px}.spinner{margin-right:10px}"], components: [{ type: i2.MatSpinner, selector: "mat-spinner", inputs: ["color"] }, { type: i3.MatDivider, selector: "mat-divider", inputs: ["vertical", "inset"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXNlbGVjdC1zZWFyY2guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0LXNlbGVjdC1zZWFyY2gvc3JjL2xpYi9tYXQtc2VsZWN0LXNlYXJjaC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXQtc2VsZWN0LXNlYXJjaC9zcmMvbGliL21hdC1zZWxlY3Qtc2VhcmNoLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4SSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7OztBQVFwQyxNQUFNLE9BQU8sd0JBQXdCO0lBWW5DLFlBQzZCLFNBQW9CLEVBQ3JDLFFBQWtCO1FBREQsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNyQyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBYnJCLFNBQUksR0FBNkIsRUFBRSxDQUFDO1FBQ3BDLHFCQUFnQixHQUFhLEVBQUUsQ0FBQztRQUNoQyxxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDeEIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUE0QixDQUFDO1FBRWxFLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDVixpQkFBWSxHQUF5QyxFQUFFLENBQUM7UUFDeEQsYUFBUSxHQUE2QixFQUFFLENBQUM7UUFDeEMsc0JBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQzFCLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUtyQyxDQUFDO0lBRVAsZUFBZTtRQUNiLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxhQUFhO2FBQ2YsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWTthQUMvQixTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2QsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQXFCLENBQUM7WUFDbkUsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDNUcsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNuQztRQUNILENBQUMsQ0FBQzthQUNELEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQzVELENBQUM7SUFDSixDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQVk7UUFDckIsTUFBTSxVQUFVLEdBQUcsS0FBbUIsQ0FBQztRQUN2QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFekQsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdkIsT0FBTztTQUNSO1FBRUQsTUFBTSx5QkFBeUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM3RCxNQUFNLFFBQVEscUJBQU8sSUFBSSxDQUFDLENBQUM7WUFDM0IsT0FBTyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNsQyxPQUFPLFFBQVEsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELFdBQVcsS0FBVyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQzs7cUhBckQ5Qyx3QkFBd0Isa0JBYXpCLFNBQVM7eUdBYlIsd0JBQXdCLG1SQUtQLFVBQVUsMkNDZnhDLDhVQVlBOzJGREZhLHdCQUF3QjtrQkFMcEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsdUJBQXVCO29CQUNqQyxXQUFXLEVBQUUsb0NBQW9DO29CQUNqRCxTQUFTLEVBQUUsQ0FBRSwwQkFBMEIsQ0FBRTtpQkFDMUM7OzBCQWNJLE1BQU07MkJBQUMsU0FBUzttRUFaVixJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csZ0JBQWdCO3NCQUF4QixLQUFLO2dCQUNHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFDSSxRQUFRO3NCQUFqQixNQUFNO2dCQUNpRCxPQUFPO3NCQUE5RCxTQUFTO3VCQUFDLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdFNlbGVjdCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NlbGVjdCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFNlYXJjaGVyIH0gZnJvbSAnLi9zZWFyY2hlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLW1hdC1zZWxlY3Qtc2VhcmNoJyxcbiAgdGVtcGxhdGVVcmw6ICcuL21hdC1zZWxlY3Qtc2VhcmNoLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbICcuL21hdC1zZWxlY3Qtc2VhcmNoLnNjc3MnIF1cbn0pXG5leHBvcnQgY2xhc3MgTWF0U2VsZWN0U2VhcmNoQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgbGlzdDogUmVjb3JkPHN0cmluZywgc3RyaW5nPltdID0gW107XG4gIEBJbnB1dCgpIHNlYXJjaFByb3BlcnRpZXM6IHN0cmluZ1tdID0gW107XG4gIEBJbnB1dCgpIGNsZWFyU2VhcmNoSW5wdXQgPSBmYWxzZTtcbiAgQE91dHB1dCgpIGZpbHRlcmVkID0gbmV3IEV2ZW50RW1pdHRlcjxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+W10+KCk7XG4gIEBWaWV3Q2hpbGQoJ2lucHV0JywgeyByZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IHRydWUgfSkgZWxlbWVudCE6IEVsZW1lbnRSZWY7XG4gIGlzTG9hZGluZyA9IGZhbHNlO1xuICBwcml2YXRlIGZpbHRlcmVkTGlzdDogUmVjb3JkPHN0cmluZywgc3RyaW5nPltdIHwgdW5kZWZpbmVkID0gW107XG4gIHByaXZhdGUgZnVsbExpc3Q6IFJlY29yZDxzdHJpbmcsIHN0cmluZz5bXSA9IFtdO1xuICBwcml2YXRlIGhhc0ZpbHRlcmVkQmVmb3JlID0gZmFsc2U7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KE1hdFNlbGVjdCkgcHJpdmF0ZSBtYXRTZWxlY3Q6IE1hdFNlbGVjdCxcbiAgICAgIHByaXZhdGUgc2VhcmNoZXI6IFNlYXJjaGVyXG4gICAgKSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5mdWxsTGlzdCA9IHRoaXMubGlzdDtcbiAgICB0aGlzLnNlYXJjaGVyLmluaXRTZWFyY2godGhpcy5saXN0LCB0aGlzLnNlYXJjaFByb3BlcnRpZXMpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uc1xuICAgICAgLmFkZCh0aGlzLm1hdFNlbGVjdC5vcGVuZWRDaGFuZ2VcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnB1dCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgICAgIGlucHV0LmZvY3VzKCk7XG4gICAgICAgIGlmICgodGhpcy5maWx0ZXJlZExpc3QgJiYgdGhpcy5maWx0ZXJlZExpc3QubGVuZ3RoID09PSAwICYmIHRoaXMuaGFzRmlsdGVyZWRCZWZvcmUpIHx8IHRoaXMuY2xlYXJTZWFyY2hJbnB1dCkge1xuICAgICAgICAgIGlucHV0LnZhbHVlID0gJyc7XG4gICAgICAgICAgdGhpcy5maWx0ZXJlZC5lbWl0KHRoaXMuZnVsbExpc3QpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmFkZCh0aGlzLmZpbHRlcmVkLnN1YnNjcmliZSgoKSA9PiB0aGlzLmlzTG9hZGluZyA9IGZhbHNlKSlcbiAgICApO1xuICB9XG5cbiAgZmlsdGVyTGlzdChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBpbnB1dEV2ZW50ID0gZXZlbnQgYXMgSW5wdXRFdmVudDtcbiAgICB0aGlzLmhhc0ZpbHRlcmVkQmVmb3JlID0gdHJ1ZTtcbiAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XG4gICAgdGhpcy5maWx0ZXJlZExpc3QgPSB0aGlzLnNlYXJjaGVyLmZpbHRlckxpc3QoaW5wdXRFdmVudCk7XG5cbiAgICBpZiAoIXRoaXMuZmlsdGVyZWRMaXN0KSB7XG4gICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGxpc3RXaXRob3V0Q29uY2F0ZWRWYWx1ZXMgPSB0aGlzLmZpbHRlcmVkTGlzdC5tYXAoaXRlbSA9PiB7XG4gICAgICBjb25zdCBpdGVtQ29weSA9IHsuLi5pdGVtfTtcbiAgICAgIGRlbGV0ZSBpdGVtQ29weVsnY29uY2F0ZWRWYWx1ZXMnXTtcbiAgICAgIHJldHVybiBpdGVtQ29weTtcbiAgICB9KTtcbiAgICB0aGlzLmZpbHRlcmVkLmVtaXQobGlzdFdpdGhvdXRDb25jYXRlZFZhbHVlcyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHsgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7IH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJmbGV4LWNvbnRhaW5lclwiPlxuICA8aW5wdXRcbiAgICAjaW5wdXRcbiAgICBpZD1cImlucHV0XCJcbiAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiXG4gICAgKGlucHV0KT1cImZpbHRlckxpc3QoJGV2ZW50KVwiXG4gICAgKGtleWRvd24pPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCI+XG4gICAgPGRpdiBjbGFzcz1cInNwaW5uZXJcIj5cbiAgICAgIDxtYXQtc3Bpbm5lciAqbmdJZj1cImlzTG9hZGluZ1wiIFtkaWFtZXRlcl09XCIyNVwiPjwvbWF0LXNwaW5uZXI+XG4gICAgPC9kaXY+XG48L2Rpdj5cbjxtYXQtZGl2aWRlcj48L21hdC1kaXZpZGVyPlxuIl19