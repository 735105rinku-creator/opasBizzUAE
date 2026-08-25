import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BUSINESS_INFO, absoluteUrl } from '../shared/business-info';

export interface SeoConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  canonicalPath?: string;
  type?: string;
}

@Injectable({
  providedIn: 'root',
})
export class Seo {
  private readonly titleSuffix = '| OPAS BIZZ GENERAL TRADING L.L.C-FZ';
  private readonly defaultImage = BUSINESS_INFO.defaultImage;
  private readonly jsonLdId = 'opas-json-ld';
  private readonly canonicalId = 'canonical-link';

  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) {}

  updateTitle(title: string): void {
    this.title.setTitle(`${title} ${this.titleSuffix}`);
  }

  updateMeta(config: SeoConfig): void {
    const fullTitle = `${config.title} ${this.titleSuffix}`;
    const image = config.image || this.defaultImage;
    const url =
      config.url || (config.canonicalPath ? absoluteUrl(config.canonicalPath) : this.getCurrentUrl());

    this.title.setTitle(fullTitle);

    this.meta.updateTag({ name: 'robots', content: 'index, follow, max-image-preview:large' });
    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({ name: 'author', content: BUSINESS_INFO.name });
    this.meta.updateTag({ name: 'theme-color', content: '#0a0f2c' });

    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }

    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: config.type || 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: BUSINESS_INFO.name });
    this.meta.updateTag({ property: 'og:locale', content: 'en_AE' });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.updateCanonical(url);
  }

  addJsonLd(schema: object): void {
    this.removeJsonLd();

    const script = this.document.createElement('script');
    script.id = this.jsonLdId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);

    this.document.head.appendChild(script);
  }

  removeJsonLd(): void {
    const oldScript = this.document.getElementById(this.jsonLdId);

    if (oldScript) {
      oldScript.remove();
    }
  }

  private updateCanonical(url: string): void {
    let link = this.document.getElementById(this.canonicalId) as HTMLLinkElement | null;

    if (!link) {
      link = this.document.createElement('link');
      link.id = this.canonicalId;
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }

    link.href = url;
  }

  private getCurrentUrl(): string {
    const path = this.document.location?.pathname || '/';
    return absoluteUrl(path === '/home' ? '/' : path);
  }
}
