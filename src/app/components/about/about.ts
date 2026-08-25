import { Component, inject } from '@angular/core';
import { Lang } from '../../services/lang';
import { Seo } from '../../services/seo';
import { BUSINESS_KEYWORDS, businessJsonLd } from '../../shared/business-info';
import { UiIcon } from '../../shared/ui-icon/ui-icon';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [UiIcon],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class AboutComponent {
  private readonly lang = inject(Lang);
  private readonly seo = inject(Seo);

  aboutHeroBanner = 'assets/about/about_img1.jpg';
  aboutCardImage = 'assets/about/about_img.jpg';

  stats = [
    { value: '50+', label: 'Countries Served' },
    { value: '10,000+', label: 'Tons Traded' },
    { value: '100+', label: 'Bulk Trade Deals' },
    { value: '3+', label: 'Years Experience' },
  ];

  features = [
    {
      icon: 'Global',
      title: 'International Trade Network',
      text: 'We work across UAE, GCC and international markets for export, import and bulk commodity supply.',
    },
    {
      icon: 'Bulk',
      title: 'Bulk Quantity Supply',
      text: 'We deal in grains, vegetables, fruits and other trading products with reliable sourcing and logistics.',
    },
    {
      icon: 'Trust',
      title: 'Trusted Business Partner',
      text: 'We focus on transparent communication, quality products, documentation support and long-term relationships.',
    },
  ];

  constructor() {
    this.seo.updateMeta({
      title: 'About Dubai General Trading Company',
      description:
        'Learn about OPAS BIZZ GENERAL TRADING L.L.C-FZ, a Dubai UAE general trading company for export import, grains, fruits, vegetables, commodities and IT solutions.',
      keywords: `${BUSINESS_KEYWORDS}, about OPAS BIZZ, international trading company Dubai`,
      canonicalPath: '/about',
      image: 'https://www.opasbizz.ae/assets/about/about_img1.jpg',
    });

    this.seo.addJsonLd({
      ...businessJsonLd(),
      '@id': 'https://www.opasbizz.ae/about#organization',
      description:
        'OPAS BIZZ GENERAL TRADING L.L.C-FZ is an international export import and trading company dealing in grains, vegetables, fruits, agricultural commodities and IT solutions.',
    });
  }

  t(key: string, fallback: string): string {
    const value = this.lang.translate(key);
    return value && value !== key ? value : fallback;
  }

  getAboutHeroBg(): string {
    return `url('${this.aboutHeroBanner}')`;
  }
}
