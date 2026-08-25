import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Lang } from '../../services/lang';
import { Seo } from '../../services/seo';
import { BUSINESS_KEYWORDS, businessJsonLd } from '../../shared/business-info';

@Component({
  selector: 'app-it-sector',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './it-sector.html',
  styleUrl: './it-sector.scss',
})
export class ItSector {
  private readonly lang = inject(Lang);
  private readonly seo = inject(Seo);

  itHeroBanner = 'assets/it-sector/it-sector_img1.jpg';
  itCardImage = 'assets/it-sector/it-sector_img2.jpg';

  services = [
    'Website Development',
    'Custom ERP Software',
    'CRM & HRMS Solutions',
    'E-Commerce Development',
    'Business Automation',
    'Digital Branding Support',
  ];

  processSteps = [
    { icon: '01', title: 'Requirement Analysis', text: 'We understand your business flow, users, features, reporting needs and digital goals.' },
    { icon: '02', title: 'UI/UX & Planning', text: 'We design a professional user experience with clear structure, responsive layout and modern branding.' },
    { icon: '03', title: 'Development', text: 'Our team builds websites, ERP, CRM, HRMS and custom software according to your business process.' },
    { icon: '04', title: 'Launch & Support', text: 'We help with deployment, testing, improvements, training and long-term technical support.' },
  ];

  advantages = [
    { icon: 'Custom', title: 'Custom Business Solutions', text: 'We build software according to your company workflow, not just ready-made templates.' },
    { icon: 'Mobile', title: 'Responsive Digital Products', text: 'Websites and systems are designed for desktop, tablet and mobile users.' },
    { icon: 'Secure', title: 'Reliable & Scalable Code', text: 'We focus on clean architecture, secure workflows and future-ready business systems.' },
  ];

  constructor() {
    this.seo.updateMeta({
      title: 'IT Services Dubai, Website Development & ERP Solutions',
      description:
        'OPAS BIZZ GENERAL TRADING L.L.C-FZ provides IT services in Dubai including website development, custom ERP, CRM, HRMS, e-commerce and business automation.',
      keywords: `${BUSINESS_KEYWORDS}, IT services Dubai, web development UAE, ERP Dubai, CRM software UAE, HRMS development Dubai`,
      canonicalPath: '/services/it-sector',
      image: 'https://www.opasbizz.ae/assets/it-sector/it-sector_img1.jpg',
    });

    this.seo.addJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'IT Services Dubai',
      provider: businessJsonLd(),
      serviceType: 'Website Development, ERP, CRM, HRMS and Business Automation',
      areaServed: ['United Arab Emirates', 'Dubai', 'GCC', 'International'],
      url: 'https://www.opasbizz.ae/services/it-sector',
      description:
        'IT services including website development, custom ERP software, CRM, HRMS, e-commerce and business automation for UAE and international clients.',
    });
  }

  t(key: string, fallback: string): string {
    const value = this.lang.translate(key);
    return value && value !== key ? value : fallback;
  }

  getItHeroBg(): string {
    return `url('${this.itHeroBanner}')`;
  }
}
