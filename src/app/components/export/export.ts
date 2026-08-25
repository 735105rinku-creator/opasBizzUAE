import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Lang } from '../../services/lang';
import { Seo } from '../../services/seo';
import { BUSINESS_KEYWORDS, businessJsonLd } from '../../shared/business-info';

@Component({
  selector: 'app-export',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './export.html',
  styleUrl: './export.scss',
})
export class Export {
  private readonly lang = inject(Lang);
  private readonly seo = inject(Seo);

  exportHeroBanner = 'assets/export/export_img1.jpg';
  exportCardImage = 'assets/export/export_img2.jpg';

  exportProducts = [
    'Grains & Commodities',
    'Vegetables & Fruits',
    'Rice, Wheat & Maize',
    'Pulses & Sugar',
    'Bulk Quantity Supply',
    'Custom Trade Requirements',
  ];

  processSteps = [
    { icon: '01', title: 'Inquiry & Requirement', text: 'We understand your product, quantity, destination, packaging and shipment requirements.' },
    { icon: '02', title: 'Sourcing & Quality Check', text: 'Our team coordinates reliable sourcing and product checks before export processing.' },
    { icon: '03', title: 'Export Documentation', text: 'We support export documentation, invoice, packing details and trade coordination.' },
    { icon: '04', title: 'Shipment & Delivery', text: 'We coordinate logistics and shipment movement for smooth international delivery.' },
  ];

  advantages = [
    { icon: 'Global', title: 'International Market Reach', text: 'OPAS BIZZ GENERAL TRADING L.L.C-FZ works across UAE, GCC and international markets.' },
    { icon: 'Bulk', title: 'Bulk Export Capability', text: 'We support bulk quantity export for grains, vegetables, fruits and commodities.' },
    { icon: 'Trust', title: 'Reliable Trade Support', text: 'We focus on transparent communication, quality supply and long-term partnerships.' },
  ];

  constructor() {
    this.seo.updateMeta({
      title: 'Export Services Dubai for Grains & Commodities',
      description:
        'OPAS BIZZ GENERAL TRADING L.L.C-FZ offers export services from Dubai for grains, vegetables, fruits, commodities and bulk international trade supply.',
      keywords: `${BUSINESS_KEYWORDS}, export services Dubai, grains export UAE, vegetable fruit export Dubai, commodity export company UAE`,
      canonicalPath: '/services/export',
      image: 'https://www.opasbizz.ae/assets/export/export_img1.jpg',
    });

    this.seo.addJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Export Services Dubai',
      provider: businessJsonLd(),
      serviceType: 'International Export Services',
      areaServed: ['United Arab Emirates', 'GCC', 'International'],
      url: 'https://www.opasbizz.ae/services/export',
      description:
        'Export services for grains, vegetables, fruits, commodities and bulk quantity international trade requirements.',
    });
  }

  t(key: string, fallback: string): string {
    const value = this.lang.translate(key);
    return value && value !== key ? value : fallback;
  }

  getExportHeroBg(): string {
    return `url('${this.exportHeroBanner}')`;
  }
}

