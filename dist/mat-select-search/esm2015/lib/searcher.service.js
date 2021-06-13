import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class Searcher {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdC1zZWxlY3Qtc2VhcmNoL3NyYy9saWIvc2VhcmNoZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUszQyxNQUFNLE9BQU8sUUFBUTtJQUhyQjtRQUlVLFNBQUksR0FBNkIsRUFBRSxDQUFDO1FBQ3BDLG1CQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsdUJBQWtCLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLHNCQUFpQixHQUFHLEVBQUUsQ0FBQztRQUN2QixpQkFBWSxHQUE2QixFQUFFLENBQUM7UUFDNUMseUJBQW9CLEdBQTZCLEVBQUUsQ0FBQztRQUNwRCxrQ0FBNkIsR0FBRyxJQUFJLENBQUM7S0E0RDlDO0lBMURDLFVBQVUsQ0FBQyxJQUE4QixFQUFFLGdCQUEwQjtRQUNuRSxJQUFJLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDL0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsaUNBQ3ZCLElBQUksS0FBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsSUFDckUsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQztTQUN4QzthQUFNO1lBQ0wsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBSSxDQUFDLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMzQztJQUNILENBQUM7SUFFRCxVQUFVLENBQUMsVUFBc0I7UUFDL0IsSUFBSSxVQUFVLENBQUMsSUFBSSxLQUFLLEdBQUcsRUFBRTtZ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QUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaGVyIHtcbiAgcHJpdmF0ZSBsaXN0OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+W10gPSBbXTtcbiAgcHJpdmF0ZSBzZWFyY2hQcm9wZXJ0eSA9ICcnO1xuICBwcml2YXRlIHNlYXJjaFRleHQgPSAnJztcbiAgcHJpdmF0ZSBwcmV2aW91c1NlYXJjaFRleHQgPSAnJztcbiAgcHJpdmF0ZSBwcmV2aW91c0lucHV0dHlwZSA9ICcnO1xuICBwcml2YXRlIGZpbHRlcmVkTGlzdDogUmVjb3JkPHN0cmluZywgc3RyaW5nPltdID0gW107XG4gIHByaXZhdGUgcHJldmlvdXNGaWx0ZXJlZExpc3Q6IFJlY29yZDxzdHJpbmcsIHN0cmluZz5bXSA9IFtdO1xuICBwcml2YXRlIGNhblJldHVyblByZXZpb3VzRmlsdGVyZWRMaXN0ID0gdHJ1ZTtcblxuICBpbml0U2VhcmNoKGxpc3Q6IFJlY29yZDxzdHJpbmcsIHN0cmluZz5bXSwgc2VhcmNoUHJvcGVydGllczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBpZiAoc2VhcmNoUHJvcGVydGllcy5sZW5ndGggPiAxKSB7XG4gICAgICB0aGlzLmxpc3QgPSBsaXN0Lm1hcChpdGVtID0+IChcbiAgICAgICAgey4uLml0ZW0sIGNvbmNhdGVkVmFsdWVzOiB0aGlzLmNvbmNhdGVWYWx1ZXMoaXRlbSwgc2VhcmNoUHJvcGVydGllcyl9XG4gICAgICApKTtcbiAgICAgIHRoaXMuc2VhcmNoUHJvcGVydHkgPSAnY29uY2F0ZWRWYWx1ZXMnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxpc3QgPSBsaXN0O1xuICAgICAgdGhpcy5zZWFyY2hQcm9wZXJ0eSA9IHNlYXJjaFByb3BlcnRpZXNbMF07XG4gICAgfVxuICB9XG5cbiAgZmlsdGVyTGlzdChpbnB1dEV2ZW50OiBJbnB1dEV2ZW50KTogUmVjb3JkPHN0cmluZywgc3RyaW5nPltdIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoaW5wdXRFdmVudC5kYXRhID09PSAnICcpIHsgcmV0dXJuOyB9XG4gICAgY29uc3Qgc2VhcmNoVGV4dCA9IChpbnB1dEV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICBjb25zdCByZW1vdmVXaGl0ZXNwYWNlcyA9ICh0ZXh0OiBzdHJpbmcpID0+IHRleHQuc3BsaXQoJyAnKS5qb2luKCcnKTtcbiAgICBjb25zdCBzZWFyY2hUZXh0SW5Mb3dlckNhc2UgPSByZW1vdmVXaGl0ZXNwYWNlcyhzZWFyY2hUZXh0KS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgIHRoaXMuc2VhcmNoVGV4dCA9IHNlYXJjaFRleHRJbkxvd2VyQ2FzZTtcblxuICAgIGNvbnN0IGxpc3QgPSB0aGlzLmdldExpc3QoKTtcbiAgICB0aGlzLnByZXZpb3VzU2VhcmNoVGV4dCA9IHNlYXJjaFRleHRJbkxvd2VyQ2FzZTtcbiAgICB0aGlzLnByZXZpb3VzSW5wdXR0eXBlID0gaW5wdXRFdmVudC5pbnB1dFR5cGU7XG4gICAgaWYgKCFsaXN0KSB7IHJldHVybiB0aGlzLnByZXZpb3VzRmlsdGVyZWRMaXN0OyB9XG4gICAgdGhpcy5maWx0ZXJlZExpc3QgPSBsaXN0LmZpbHRlcihpdGVtID0+XG4gICAgICByZW1vdmVXaGl0ZXNwYWNlcyhpdGVtW3RoaXMuc2VhcmNoUHJvcGVydHldKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHRoaXMuc2VhcmNoVGV4dCkpO1xuICAgIHJldHVybiB0aGlzLmZpbHRlcmVkTGlzdDtcbiAgfVxuXG4gIHByaXZhdGUgY29uY2F0ZVZhbHVlcyhpdGVtOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+LCBzZWFyY2hQcm9wZXJ0aWVzOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gICAgbGV0IGNvbmNhdGVkVmFsdWVzID0gJyc7XG4gICAgc2VhcmNoUHJvcGVydGllcy5mb3JFYWNoKHByb3BlcnR5ID0+IGNvbmNhdGVkVmFsdWVzICs9IGl0ZW1bcHJvcGVydHldKTtcbiAgICByZXR1cm4gY29uY2F0ZWRWYWx1ZXM7XG4gIH1cblxuICBwcml2YXRlIGdldExpc3QoKTogUmVjb3JkPHN0cmluZywgc3RyaW5nPltdIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAodGhpcy5wcmV2aW91c1NlYXJjaFRleHQgJiYgdGhpcy5zZWFyY2hUZXh0LmluY2x1ZGVzKHRoaXMucHJldmlvdXNTZWFyY2hUZXh0KSkge1xuICAgICAgaWYgKHRoaXMuY2FuUmV0dXJuUHJldmlvdXNGaWx0ZXJlZExpc3QpIHsgdGhpcy5wcmV2aW91c0ZpbHRlcmVkTGlzdCA9IHRoaXMuZmlsdGVyZWRMaXN0OyB9XG4gICAgICB0aGlzLmNhblJldHVyblByZXZpb3VzRmlsdGVyZWRMaXN0ID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0aGlzLmZpbHRlcmVkTGlzdDtcbiAgICB9XG5cbiAgICBjb25zdCBpc0xhc3RUZXh0RnJvbVBhc3RlID0gdGhpcy5wcmV2aW91c0lucHV0dHlwZSA9PT0gJ2luc2VydEZyb21QYXN0ZSc7XG4gICAgY29uc3QgY2FuUmV0dXJuUHJldmlvdXNGaWx0ZXJlZExpc3QgPSB0aGlzLmlzQmFja1NwYWNlZExhc3RDaGFyKCkgJiZcbiAgICAgIWlzTGFzdFRleHRGcm9tUGFzdGUgJiYgdGhpcy5jYW5SZXR1cm5QcmV2aW91c0ZpbHRlcmVkTGlzdDtcblxuICAgIGlmIChjYW5SZXR1cm5QcmV2aW91c0ZpbHRlcmVkTGlzdCkge1xuICAgICAgdGhpcy5jYW5SZXR1cm5QcmV2aW91c0ZpbHRlcmVkTGlzdCA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5saXN0O1xuICB9XG5cbiAgcHJpdmF0ZSBpc0JhY2tTcGFjZWRMYXN0Q2hhcigpOiBib29sZWFuIHtcbiAgICBjb25zdCBpc1RleHREZWNyZW1lbnRlZEJ5MSA9IHRoaXMucHJldmlvdXNTZWFyY2hUZXh0Lmxlbmd0aCAtIHRoaXMuc2VhcmNoVGV4dC5sZW5ndGggPT09IDE7XG4gICAgY29uc3QgbGFzdENoYXIgPSB0aGlzLnByZXZpb3VzU2VhcmNoVGV4dC5jaGFyQXQodGhpcy5wcmV2aW91c1NlYXJjaFRleHQubGVuZ3RoIC0gMSk7XG4gICAgY29uc3QgY29uY2F0ZWRUZXh0ID0gdGhpcy5zZWFyY2hUZXh0ICsgbGFzdENoYXI7XG4gICAgcmV0dXJuIGlzVGV4dERlY3JlbWVudGVkQnkxICYmIGNvbmNhdGVkVGV4dCA9PT0gdGhpcy5wcmV2aW91c1NlYXJjaFRleHQ7XG4gIH1cbn1cbiJdfQ==