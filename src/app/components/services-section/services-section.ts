import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Lang } from '../../services/lang';

@Component({
  selector: 'app-services-section',
  imports: [RouterLink],
  templateUrl: './services-section.html',
  styleUrl: './services-section.scss',
  standalone: true,
})
export class ServicesSection {
  private readonly lang = inject(Lang);

  t(key: string): string {
    return this.lang.translate(key);
  }

  services = [
    {
      label: 'Grains',
      title: 'Grains & Commodities',
      description: 'Rice, wheat, maize, pulses and sugar supply for UAE, GCC and international buyers.',
      metric: 'Bulk',
      link: '/services/grains',
      size: 'large',
      imageClass: 'service-grains',
    },
    {
      label: 'Fresh Fruits',
      title: 'Fresh Fruits',
      description: 'Quality-focused sourcing and supply coordination for fresh fruit requirements.',
      metric: 'Fresh',
      link: '/products',
      size: 'small',
      imageClass: 'service-fruits',
    },
    {
      label: 'Fresh Vegetables',
      title: 'Fresh Vegetables',
      description: 'Vegetable trading support with reliable documentation and logistics coordination.',
      metric: 'Daily',
      link: '/products',
      size: 'small',
      imageClass: 'service-vegetables',
    },
    {
      label: 'Import Services',
      title: 'Import Services',
      description: 'Structured import coordination for UAE market supply and business needs.',
      metric: 'UAE',
      link: '/services/import',
      size: 'medium',
      imageClass: 'service-import',
    },
    {
      label: 'Export Services',
      title: 'Export Services',
      description: 'Export documentation, shipment planning and transparent trade communication.',
      metric: 'Global',
      link: '/services/export',
      size: 'medium',
      imageClass: 'service-export',
    },
    {
      label: 'IT Services',
      title: 'IT Services',
      description: 'Websites, ERP, CRM, HRMS, e-commerce and automation for modern businesses.',
      metric: 'Digital',
      link: '/services/it-sector',
      size: 'wide',
      imageClass: 'service-it',
    },
  ];
}
