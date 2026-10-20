import { DOCUMENT } from '@angular/common';
import { Inject, Pipe, PipeTransform } from '@angular/core';
import { RumoursListIndexService } from './services/rumours-list-index.service';

@Pipe({
  name: 'listUrl',
  standalone: true
})
export class ListUrlPipe implements PipeTransform {
  constructor(
    private readonly rumoursListIndexService: RumoursListIndexService,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  transform(fragment: string, viewMode: 'active' | 'solved'): string {
    const slug = this.rumoursListIndexService.slugify(fragment);
    const basePath = this.document.location.hostname.endsWith('.github.io')
      ? '/rumours-tracker'
      : '';

    return viewMode === 'solved'
      ? `${basePath}/rumours-list?view=solved#${slug}`
      : `${basePath}/rumours-list#${slug}`;
  }
}
