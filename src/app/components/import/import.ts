import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Lang } from '../../services/lang';
import { Seo } from '../../services/seo';
import { BUSINESS_KEYWORDS, businessJsonLd } from '../../shared/business-info';

@Component({
  selector: 'app-import',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './import.html',
  styleUrl: './import.scss',
})
export class Import {
  private readonly lang = inject(Lang);
  private readonly seo = inject(Seo);

  importHeroBanner = 'assets/import/import_img1.jpg';
  importCardImage = 'assets/import/import_img2.jpg';

  importCategories = [
    'Grains & Food Commodities',
    'Fresh Vegetables & Fruits',
    'Rice, Wheat & Maize',
    'Pulses & Sugar',
    'Bulk Quantity Products',
    'Custom Import Requirements',
  ];

  processSteps = [
    { icon: '01', title: 'Requirement Review', text: 'We understand your product, quantity, origin, destination and packaging needs.' },
    { icon: '02', title: 'Sourcing Channel', text: 'We coordinate reliable international sourcing for UAE and GCC market requirements.' },
    { icon: '03', title: 'Import Documentation', text: 'We support invoice, packing details, shipment coordination and trade documentation.' },
    { icon: '04', title: 'Import & Delivery', text: 'We coordinate shipment movement and delivery support into the UAE market.' },
  ];

  advantages = [
    { icon: 'UAE', title: 'UAE Market Focus', text: 'Our website and service flow are designed for UAE-based trade and business requirements.' },
    { icon: 'Bulk', title: 'Bulk Import Support', text: 'We support bulk import requirements for grains, vegetables, fruits and commodities.' },
    { icon: 'Trade', title: 'International Trade Partner', text: 'OPAS BIZZ GENERAL TRADING L.L.C-FZ works internationally with reliable communication and sourcing support.' },
  ];

  constructor() {
    this.seo.updateMeta({
      title: 'Import Services Dubai for Bulk Commodities',
      description:
        'OPAS BIZZ GENERAL TRADING L.L.C-FZ offers import services in Dubai UAE for grains, vegetables, fruits, commodities and bulk international trading needs.',
      keywords: `${BUSINESS_KEYWORDS}, import services Dubai, grains import UAE, food commodities import Dubai, bulk commodity import UAE`,
      canonicalPath: '/services/import',
      image: 'https://www.opasbizz.ae/assets/import/import_img1.jpg',
    });

    this.seo.addJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Import Services Dubai',
      provider: businessJsonLd(),
      serviceType: 'International Import Services',
      areaServed: ['United Arab Emirates', 'GCC', 'International'],
      url: 'https://www.opasbizz.ae/services/import',
      description:
        'Import services for grains, vegetables, fruits, commodities and bulk quantity international trade requirements into the UAE market.',
    });
  }

  t(key: string, fallback: string): string {
    const value = this.lang.translate(key);
    return value && value !== key ? value : fallback;
  }

  getImportHeroBg(): string {
    return `url('${this.importHeroBanner}')`;
  }
}
