import { TestBed } from '@angular/core/testing';

import { Searcher } from './searcher.service';

describe('Searcher', () => {
  let service: Searcher;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Searcher);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
