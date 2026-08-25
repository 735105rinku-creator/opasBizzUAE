import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BUSINESS_INFO, BUSINESS_KEYWORDS, businessJsonLd } from '../../shared/business-info';
import { Lang } from '../../services/lang';
import { Seo } from '../../services/seo';
import { UiIcon } from '../../shared/ui-icon/ui-icon';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UiIcon],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly lang = inject(Lang);
  private readonly seo = inject(Seo);

  contactHeroBanner = 'assets/contact/contact_img1.jpg';
  mapLink = `https://www.google.com/maps/search/?api=1&query=${BUSINESS_INFO.latitude},${BUSINESS_INFO.longitude}&query_place_id=OPAS%20BIZZ%20GENERAL%20TRADING%20L.L.C-FZ`;
  mapEmbedUrl = `https://www.google.com/maps?q=${BUSINESS_INFO.latitude},${BUSINESS_INFO.longitude}(${encodeURIComponent(BUSINESS_INFO.name)})&z=16&output=embed`;

  company = {
    name: BUSINESS_INFO.name,
    registeredOffice: BUSINESS_INFO.registeredOffice,
    corporateOffice: BUSINESS_INFO.corporateOffice,
    email: BUSINESS_INFO.email,
    phone1: BUSINESS_INFO.phone1,
    phone: BUSINESS_INFO.phonePrimary,
    phone_No: BUSINESS_INFO.phoneSecondary,
    trn: 'TRN: To be updated',
  };

  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  subjects = [
    'General',
    'Trade Inquiry',
    'Export Import',
    'Grains Bulk Supply',
    'Vegetables & Fruits Trade',
    'IT Services',
    'Partnership',
  ];

  contactForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(7)]],
    subject: ['Trade Inquiry', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor() {
    this.seo.updateMeta({
      title: 'Contact Dubai Export Import Trading Company',
      description:
        'Contact OPAS BIZZ GENERAL TRADING L.L.C-FZ in Dubai for grains, agricultural commodities, fruits, vegetables, import-export trading and IT service inquiries.',
      keywords: `${BUSINESS_KEYWORDS}, contact OPAS BIZZ, Iris Bay Tower Business Bay, Meydan Grandstand Dubai`,
      canonicalPath: '/contact',
      image: 'https://www.opasbizz.ae/assets/contact/contact_img1.jpg',
    });

    this.seo.addJsonLd({
      ...businessJsonLd(),
      '@id': `${BUSINESS_INFO.siteUrl}/contact#localbusiness`,
      hasMap: this.mapLink,
      description:
        'Contact OPAS BIZZ GENERAL TRADING L.L.C-FZ for export import, grains, vegetables, fruits, commodities and IT services in Dubai UAE.',
    });
  }

  t(key: string, fallback: string): string {
    const value = this.lang.translate(key);
    return value && value !== key ? value : fallback;
  }

  get f() {
    return this.contactForm.controls;
  }

  getContactHeroBg(): string {
    return `url('${this.contactHeroBanner}')`;
  }

  submitForm(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    this.http.post('/api/contact', this.contactForm.value).subscribe({
      next: () => {
        this.successMessage = 'Your message has been sent successfully. Our team will contact you soon.';
        this.contactForm.reset({ subject: 'Trade Inquiry' });
        this.isSubmitting = false;
      },
      error: () => {
        this.errorMessage =
          'Something went wrong. You can also contact us directly at info@opasbizz.ae.';
        this.isSubmitting = false;
      },
    });
  }
}







