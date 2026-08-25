import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../../services/seo';
import { BUSINESS_INFO, businessJsonLd } from '../../shared/business-info';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './privacy.html',
  styleUrl: './legal.scss',
})
export class PrivacyPolicyComponent {
  private readonly seo = inject(Seo);
  company = BUSINESS_INFO;

  constructor() {
    this.seo.updateMeta({
      title: 'Privacy Policy',
      description:
        'Privacy Policy for OPAS BIZZ GENERAL TRADING L.L.C-FZ website, trade inquiries and business contact information.',
      canonicalPath: '/privacy',
    });

    this.seo.addJsonLd({
      ...businessJsonLd(),
      '@id': 'https://www.opasbizz.ae/privacy#organization',
    });
  }
}

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './terms.html',
  styleUrl: './legal.scss',
})
export class TermsComponent {
  private readonly seo = inject(Seo);
  company = BUSINESS_INFO;

  constructor() {
    this.seo.updateMeta({
      title: 'Terms & Conditions',
      description:
        'Terms and conditions for using OPAS BIZZ GENERAL TRADING L.L.C-FZ website and sending trading, export-import or IT service inquiries.',
      canonicalPath: '/terms',
    });

    this.seo.addJsonLd({
      ...businessJsonLd(),
      '@id': 'https://www.opasbizz.ae/terms#organization',
    });
  }
}
