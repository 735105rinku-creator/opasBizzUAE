import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Seo } from '../../services/seo';
import { BUSINESS_KEYWORDS, businessJsonLd } from '../../shared/business-info';
import { timeout } from 'rxjs';
import { Lang } from '../../services/lang';
import { UiIcon } from '../../shared/ui-icon/ui-icon';

interface ApiProduct {
  _id: string;
  color?: string;
  image: string;
  productName: string;
  price?: string;
  businessType?: string;
  shelfLife?: string;
  certification?: string;
  cultivationType?: string;
  feature?: string;
  location?: string;
  moisture?: string;
  packSize?: string;
  packagingType?: string;
  size?: string;
  broken?: string;
  category?: string;
  subcategory?: string;
}

@Component({
  selector: 'app-grains-service',
  standalone: true,
  imports: [CommonModule, RouterLink, UiIcon],
  templateUrl: './grains-service.html',
  styleUrl: './grains-service.scss',
})
export class GrainsService implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly seo = inject(Seo);
  private readonly lang = inject(Lang);
  private readonly platformId = inject(PLATFORM_ID);

  grainsHeroBanner = 'assets/grains/grains_img2.jpg';

  apiUrl = 'https://opasbizz.in/api/opas/getImage';
  imageBaseUrl = 'https://opasbizz.in/api/uploads/';

  loading = true;
  error = '';
  products: ApiProduct[] = [];

  company = {
    name: 'OPAS BIZZ GENERAL TRADING L.L.C-FZ',
    email: 'info@opasbizz.ae',
    telephone: '+971 502343066',
    phone: '+971 502342494',
    address: 'Dubai, UAE',
  };

  steps = [
    {
      icon: 'mail',
      title: 'Inquiry & Requirement',
      text: 'Share your grain product, quantity, packaging, destination and delivery requirement.',
    },
    {
      icon: 'search',
      title: 'Quality Check',
      text: 'We coordinate quality checks for grains, bulk commodities and packaging standards.',
    },
    {
      icon: 'file',
      title: 'Documentation',
      text: 'Our team supports export-import documentation, invoice and packing details.',
    },
    {
      icon: 'truck',
      title: 'Delivery Support',
      text: 'We coordinate logistics support for UAE, GCC and international trade requirements.',
    },
  ];

  standards = [
    'Bulk grains trading support',
    'Export-import documentation',
    'Quality-focused sourcing',
    'Packaging coordination',
    'UAE & international trade support',
  ];

  constructor() {
    this.seo.updateMeta({
      title: 'Grains & Commodity Trading Dubai UAE',
      description:
        'OPAS BIZZ GENERAL TRADING L.L.C-FZ provides grains and commodity trading in Dubai UAE including maize, wheat, rice, pulses, sugar and bulk export import supply.',
      keywords: `${BUSINESS_KEYWORDS}, grains trading Dubai, maize supplier UAE, wheat rice pulses trading Dubai, sugar supplier UAE`,
      canonicalPath: '/services/grains',
      image: 'https://www.opasbizz.ae/assets/grains/grains_img2.jpg',
    });

    this.seo.addJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Grains & Commodity Trading Dubai',
      provider: businessJsonLd(),
      serviceType: 'Bulk Grains and Commodity Trading',
      areaServed: ['United Arab Emirates', 'GCC', 'International'],
      url: 'https://www.opasbizz.ae/services/grains',
      description:
        'Bulk grains, maize, rice, wheat, pulses, sugar and commodity trading for UAE and international markets.',
    });

  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getProducts();
      return;
    }

    this.loading = false;
  }
  t(key: string, fallback: string): string {
    const value = this.lang.translate(key);
    return value && value !== key ? value : fallback;
  }

  getGrainsHeroBg(): string {
    return `url('${this.grainsHeroBanner}')`;
  }

  getProducts(): void {
    this.loading = true;
    this.error = '';

    this.http
      .get<any>(this.apiUrl)
      .pipe(timeout(20000))
      .subscribe({
        next: (res) => {
          const allProducts: ApiProduct[] = Array.isArray(res?.data) ? res.data : [];

          this.products = allProducts.filter((product) => {
            const text = `${product.category || ''} ${product.subcategory || ''} ${product.productName || ''
              }`.toLowerCase();

            return [
              'maize',
              'wheat',
              'rice',
              'grain',
              'grains',
              'sugar',
              'dal',
              'pulse',
              'pulses',
              'toor',
              'chana',
            ].some((item) => text.includes(item));
          });

          this.loading = false;
          this.error = '';
        },
        error: (err) => {
          console.error('Grains API Error:', err);
          this.products = [];
          this.error = 'Unable to load grain products. Please try again later.';
          this.loading = false;
        },
      });
  }

  getImageUrl(image?: string): string {
    if (!image) return '/assets/images/products/placeholder.webp';
    if (image.startsWith('http')) return image;
    return `${this.imageBaseUrl}${image}`;
  }

  getOriginFlag(location?: string): string {
    const value = (location || '').toLowerCase();
    if (value.includes('uae') || value.includes('dubai')) return 'UAE';
    return 'Global';
  }

  openProduct(product: ApiProduct): void {
    this.router.navigate(['/products', product._id]);
  }

}




