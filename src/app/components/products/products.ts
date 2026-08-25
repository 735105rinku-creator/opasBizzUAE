import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, NgZone, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Seo } from '../../services/seo';
import { BUSINESS_KEYWORDS } from '../../shared/business-info';
import { Router } from '@angular/router';
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

type FilterType =
  'All' | 'Grains' | 'Fresh Vegetables' | 'Fresh Fruits' | 'Spices' | 'Pulses' | 'Sugar';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, UiIcon],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class ProductsComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly seo = inject(Seo);
  private readonly lang = inject(Lang);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly zone = inject(NgZone);

  apiUrl = 'https://opasbizz.in/api/opas/getImage';
  inquiryUrl = 'https://opasbizz.in/api/userInquiry/inquirySave';
  imageBaseUrl = 'https://opasbizz.in/api/uploads/';

  loading = true;
  error = '';
  activeFilter: FilterType = 'All';

  filters: FilterType[] = [
    'All',
    'Grains',
    'Fresh Vegetables',
    'Fresh Fruits',
    'Spices',
    'Pulses',
    'Sugar',
  ];
  products: ApiProduct[] = [];
  enquiryProduct?: ApiProduct;
  name = '';
  email = '';
  countryCode = '+971';
  mobile = '';
  message = '';
  userId: string | null = null;
  inquirySubmitting = false;
  inquiryError = '';
  inquirySuccess = '';

  constructor() {
    this.seo.updateMeta({
      title: 'Products - Grains, Fresh Fruits, Vegetables, Spices Dubai',
      description:
        'Explore OPAS BIZZ GENERAL TRADING L.L.C-FZ products including grains, fresh fruits, fresh vegetables, spices, pulses, sugar and export-import goods in Dubai UAE.',
      keywords: `${BUSINESS_KEYWORDS}, products OPAS BIZZ, fresh fruits Dubai, fresh vegetables Dubai, spices supplier UAE, pulses supplier UAE, rice wheat maize Dubai, sugar trading company UAE`,
      canonicalPath: '/products',
      image: 'https://www.opasbizz.ae/assets/grains/grains_img1.jpg',
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userId = localStorage.getItem('userId');
      this.getProducts();
    } else {
      this.loading = false;
    }
  }

  t(key: string): string {
    const value = this.lang.translate(key);
    return value && value !== key ? value : '';
  }

  getProducts(): void {
    this.applyProductState({ loading: true, error: '' });

    this.http
      .get<any>(this.apiUrl)
      .pipe(timeout(20000))
      .subscribe({
        next: (res) => {
          const products = Array.isArray(res?.data) ? res.data : [];
          this.applyProductState({ products, loading: false, error: '' });
        },
        error: (err) => {
          console.error('API Error:', err);
          this.applyProductState({
            products: [],
            error: 'Unable to load products. Please try again later.',
            loading: false,
          });
        },
      });
  }

  private applyProductState(
    state: Partial<Pick<ProductsComponent, 'products' | 'loading' | 'error'>>,
  ): void {
    this.zone.run(() => {
      if (state.products !== undefined) this.products = state.products;
      if (state.loading !== undefined) this.loading = state.loading;
      if (state.error !== undefined) this.error = state.error;

      this.scheduleViewRefresh();
    });
  }

  get filteredProducts(): ApiProduct[] {
    if (this.activeFilter === 'All') {
      return this.products;
    }

    return this.products.filter((product) => {
      const category = this.normalizeCategory(product.category);
      const activeCategory = this.normalizeCategory(this.activeFilter);

      if (category) {
        return category === activeCategory;
      }

      const fallbackText = `${product.category || ''} ${product.productName || ''} ${
        product.subcategory || ''
      } ${product.feature || ''} ${product.businessType || ''}`.toLowerCase();

      if (this.activeFilter === 'Grains') {
        return this.matchesAny(fallbackText, [
          'maize',
          'rice',
          'wheat',
          'grain',
          'grains',
          'cereal',
          'barley',
          'corn',
        ]);
      }

      if (this.activeFilter === 'Fresh Vegetables') {
        return this.matchesAny(fallbackText, [
          'fresh vegetable',
          'fresh vegetables',
          'vegetable',
          'vegetables',
          'onion',
          'potato',
          'tomato',
          'carrot',
          'cucumber',
          'cabbage',
          'cauliflower',
          'drumstick',
          'ginger',
        ]);
      }

      if (this.activeFilter === 'Fresh Fruits') {
        return this.matchesAny(fallbackText, [
          'fresh fruit',
          'fresh fruits',
          'fruit',
          'fruits',
          'apple',
          'banana',
          'mango',
          'orange',
          'grape',
          'pomegranate',
          'lemon',
          'dates',
        ]);
      }

      if (this.activeFilter === 'Spices') {
        return this.matchesAny(fallbackText, [
          'spice',
          'spices',
          'cumin',
          'chilli powder',
          'chili powder',
          'pepper',
          'cardamom',
          'clove',
          'coriander',
          'masala',
        ]);
      }

      if (this.activeFilter === 'Pulses') {
        return this.matchesAny(fallbackText, [
          'dal',
          'pulse',
          'pulses',
          'lentil',
          'lentils',
          'toor',
          'chana',
          'chickpea',
          'moong',
          'urad',
          'beans',
        ]);
      }

      if (this.activeFilter === 'Sugar') {
        return this.matchesAny(fallbackText, ['sugar', 'jaggery']);
      }

      return false;
    });
  }

  setFilter(filter: FilterType): void {
    this.activeFilter = filter;
    this.scheduleViewRefresh();
  }

  private normalizeCategory(value?: string): string {
    const category = (value || '').trim().toLowerCase().replace(/&/g, 'and').replace(/\s+/g, ' ');

    if (['grain', 'grains', 'food grain', 'food grains', 'cereal', 'cereals'].includes(category)) {
      return 'grains';
    }
    if (['fresh vegetable', 'fresh vegetables', 'vegetable', 'vegetables'].includes(category)) {
      return 'fresh vegetables';
    }
    if (['fresh fruit', 'fresh fruits', 'fruit', 'fruits'].includes(category)) {
      return 'fresh fruits';
    }
    if (['spice', 'spices'].includes(category)) return 'spices';
    if (['pulse', 'pulses'].includes(category)) return 'pulses';
    if (['sugar', 'sugar and others', 'sugar others'].includes(category)) return 'sugar';

    return '';
  }

  private matchesAny(text: string, keywords: string[]): boolean {
    return keywords.some((item) => text.includes(item));
  }

  private scheduleViewRefresh(): void {
    this.cdr.markForCheck();

    if (isPlatformBrowser(this.platformId)) {
      requestAnimationFrame(() => this.cdr.detectChanges());
    }
  }

  formatUsdPrice(price?: string): string {
    const amount = this.getUsdAmount(price);
    if (amount === undefined) return '';

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(amount);
  }

  private getUsdAmount(price?: string): number | undefined {
    if (!this.hasDisplayValue(price)) return undefined;

    const firstNumber = price?.match(/\d[\d,]*(\.\d+)?/)?.[0];
    if (!firstNumber) return undefined;

    const amount = Number(firstNumber.replace(/,/g, ''));
    return Number.isFinite(amount) ? amount : undefined;
  }

  private hasDisplayValue(value?: string): boolean {
    const normalized = (value || '').trim().toLowerCase();
    return (
      !!normalized && !['na', 'n/a', 'none', 'null', 'undefined', '-', '--'].includes(normalized)
    );
  }
  getImageUrl(image?: string): string {
    if (!image) {
      return '/assets/images/products/placeholder.webp';
    }

    if (image.startsWith('http')) {
      return image;
    }

    return `${this.imageBaseUrl}${image}`;
  }

  getOriginFlag(location?: string): string {
    const value = (location || '').toLowerCase();

    if (value.includes('uae') || value.includes('dubai')) {
      return 'UAE';
    }

    return 'Global';
  }

  openProduct(product: ApiProduct): void {
    this.router.navigate(['/products', product._id]);
  }

  openEnquiry(event: Event, product: ApiProduct): void {
    event.stopPropagation();
    this.enquiryProduct = product;
    this.name = '';
    this.email = '';
    this.countryCode = '+971';
    this.mobile = '';
    this.message = `I am interested in ${product.productName}. Please share details.`;
    this.inquiryError = '';
    this.inquirySuccess = '';
    this.inquirySubmitting = false;
  }

  closeEnquiry(): void {
    if (this.inquirySubmitting) return;
    this.enquiryProduct = undefined;
    this.inquiryError = '';
    this.inquirySuccess = '';
  }

  submitInquiry(event: Event): void {
    event.preventDefault();

    if (!this.enquiryProduct || this.inquirySubmitting) return;

    this.inquiryError = '';
    this.inquirySuccess = '';

    if (!this.name.trim() || !this.email.trim() || !this.mobile.trim()) {
      this.inquiryError = 'Please fill name, email and mobile number.';
      return;
    }

    const inquiryPayload = {
      fullName: this.name.trim(),
      email: this.email.trim(),
      productName: this.enquiryProduct.productName,
      phoneCode: this.countryCode,
      phoneNumber: this.mobile.trim(),
      'Date & Time': new Date().toISOString(),
      location: 'Dubai',
      message: this.message.trim(),
      status: 'Pending',
      userId: this.userId || null,
    };

    this.inquirySubmitting = true;

    this.http
      .post(this.inquiryUrl, inquiryPayload)
      .pipe(timeout(20000))
      .subscribe({
        next: () => {
          this.inquirySubmitting = false;
          this.inquirySuccess = 'Inquiry submitted successfully.';
          this.scheduleViewRefresh();
        },
        error: (err) => {
          console.error('Inquiry API Error:', err);
          this.inquirySubmitting = false;
          this.inquiryError = 'Unable to submit inquiry. Please try again.';
          this.scheduleViewRefresh();
        },
      });
  }
}
