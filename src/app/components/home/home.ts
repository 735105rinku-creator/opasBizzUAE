import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hero } from '../hero/hero';
import { ServicesSection } from '../services-section/services-section';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, Hero, ServicesSection],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  companyStats = [
    { value: 'UAE', label: 'Dubai Trade Base', note: 'Business Bay and Meydan connected presence' },
    { value: 'GCC', label: 'Regional Focus', note: 'Trade support across Gulf markets' },
    { value: 'Bulk', label: 'Commodity Handling', note: 'Grains, produce and food supply coordination' },
    { value: 'Digital', label: 'IT Capability', note: 'Web, ERP, CRM and automation services' },
  ];

  networkLanes = [
    'Rice, wheat, maize, pulses and sugar sourcing',
    'Fresh fruits and vegetables trade coordination',
    'Import documentation and UAE supply planning',
    'Export shipment support for international buyers',
    'Digital systems for business operations and enquiries',
  ];

  workSteps = [
    { number: '01', title: 'Requirement Mapping', text: 'We capture product, quantity, packing, destination, timeline and communication needs.' },
    { number: '02', title: 'Sourcing & Validation', text: 'Our team coordinates product availability, supplier communication and quality expectations.' },
    { number: '03', title: 'Trade Coordination', text: 'We support import-export documentation, shipment planning and transparent updates.' },
    { number: '04', title: 'Delivery & Follow-Up', text: 'We keep the business flow organized from first inquiry to delivery coordination.' },
  ];

  qualityPoints = [
    'Product and category clarity before quote sharing',
    'Packaging, quantity and destination details recorded early',
    'Professional documentation communication for import-export flow',
    'Clear follow-up process for long-term buyer relationships',
  ];

  digitalCapabilities = [
    'Business websites',
    'ERP workflows',
    'CRM pipelines',
    'HRMS systems',
    'E-commerce tools',
    'Automation dashboards',
  ];
}