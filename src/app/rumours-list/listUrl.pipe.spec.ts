import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { ListUrlPipe } from './listUrl.pipe';
import { RumoursListIndexService } from './services/rumours-list-index.service';

describe('ListUrlPipe', () => {
  function createPipe(hostname: string): ListUrlPipe {
    TestBed.configureTestingModule({
      providers: [
        ListUrlPipe,
        RumoursListIndexService,
        { provide: DOCUMENT, useValue: { location: { hostname } } }
      ]
    });

    return TestBed.inject(ListUrlPipe);
  }

  afterEach(() => TestBed.resetTestingModule());

  it('adds the GitHub Pages project path', () => {
    const pipe = createPipe('jesus-loranca.github.io');

    expect(pipe.transform('Beasts of Chaos', 'active'))
      .toBe('/rumours-tracker/rumours-list#beasts-of-chaos');
    expect(pipe.transform('Beasts of Chaos', 'solved'))
      .toBe('/rumours-tracker/rumours-list?view=solved#beasts-of-chaos');
  });

  it('keeps root-relative URLs on other hosts', () => {
    const pipe = createPipe('rumours-tracker.netlify.app');

    expect(pipe.transform('Beasts of Chaos', 'active'))
      .toBe('/rumours-list#beasts-of-chaos');
    expect(pipe.transform('Beasts of Chaos', 'solved'))
      .toBe('/rumours-list?view=solved#beasts-of-chaos');
  });
});
