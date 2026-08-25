import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, NgZone, PLATFORM_ID, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timeout } from 'rxjs';
import { Seo } from '../../services/seo';
import { Lang } from '../../services/lang';

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

interface CurrencyOption {
  country: string;
  currency: string;
  code: string;
  locale: string;
}

interface SpecItem {
  label: string;
  value: string;
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetailComponent {
  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly seo = inject(Seo);
  private readonly lang = inject(Lang);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly zone = inject(NgZone);

  apiUrl = 'https://opasbizz.in/api/opas/getImage';
  ratesUrl = 'https://open.er-api.com/v6/latest/USD';
  imageBaseUrl = 'https://opasbizz.in/api/uploads/';

  loading = true;
  error = '';
  product?: ApiProduct;
  otherProducts: ApiProduct[] = [];
  selectedCurrencyCode = 'USD';
  ratesLoading = false;
  ratesUpdatedAt = '';

  currencyOptions: CurrencyOption[] = [
    { country: 'United States', currency: 'US Dollar', code: 'USD', locale: 'en-US' },
    { country: 'United Arab Emirates', currency: 'UAE Dirham', code: 'AED', locale: 'en-AE' },
    { country: 'India', currency: 'Indian Rupee', code: 'INR', locale: 'en-IN' },
    { country: 'Saudi Arabia', currency: 'Saudi Riyal', code: 'SAR', locale: 'en-SA' },
    { country: 'United Kingdom', currency: 'Pound Sterling', code: 'GBP', locale: 'en-GB' },
    { country: 'Euro Area', currency: 'Euro', code: 'EUR', locale: 'de-DE' },
    { country: 'China', currency: 'Chinese Yuan', code: 'CNY', locale: 'zh-CN' },
    { country: 'Canada', currency: 'Canadian Dollar', code: 'CAD', locale: 'en-CA' },
    { country: 'Australia', currency: 'Australian Dollar', code: 'AUD', locale: 'en-AU' },
    { country: 'Japan', currency: 'Japanese Yen', code: 'JPY', locale: 'ja-JP' },
  ];

  exchangeRates: Record<string, number> = {
    USD: 1,
    AED: 3.6725,
    INR: 83.5,
    SAR: 3.75,
    GBP: 0.79,
    EUR: 0.92,
    CNY: 7.2,
    CAD: 1.36,
    AUD: 1.52,
    JPY: 151,
  };

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (!isPlatformBrowser(this.platformId)) {
        this.loading = false;
        return;
      }

      this.loadCurrencyRates();

      if (id) {
        this.getProduct(id);
      } else {
        this.applyProductState({
          product: undefined,
          otherProducts: [],
          error: 'Product not found.',
          loading: false,
        });
      }
    });
  }

  t(key: string): string {
    return this.lang.translate(key);
  }

  getProduct(id: string): void {
    this.applyProductState({
      product: undefined,
      otherProducts: [],
      loading: true,
      error: '',
    });

    this.http
      .get<any>(this.apiUrl)
      .pipe(timeout(20000))
      .subscribe({
        next: (res) => {
          const products: ApiProduct[] = Array.isArray(res?.data) ? res.data : [];
          const product = products.find((item) => item._id === id);
          const otherProducts = products.filter((item) => item._id !== id);

          if (!product) {
            this.applyProductState({
              product: undefined,
              otherProducts,
              error: 'Product not found.',
              loading: false,
            });
            return;
          }

          const productImage = this.getImageUrl(product.image);

          this.seo.updateMeta({
            title: `${product.productName} Supplier Dubai UAE`,
            description: `${product.productName} by OPAS BIZZ GENERAL TRADING L.L.C-FZ. Category: ${
              product.category || 'Product'
            }, origin: ${product.location || 'Global'}, available for Dubai UAE and international trade inquiries.`,
            keywords: `${product.productName}, ${product.category || 'commodity'} supplier Dubai, OPAS BIZZ products, bulk trading UAE`,
            canonicalPath: `/products/${product._id}`,
            image: productImage.startsWith('http')
              ? productImage
              : `https://www.opasbizz.ae${productImage}`,
            type: 'product',
          });

          this.seo.addJsonLd({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.productName,
            image: productImage,
            category: product.category || 'Trading product',
            description: `${product.productName} supplied by OPAS BIZZ GENERAL TRADING L.L.C-FZ for UAE and international trade requirements.`,
            brand: {
              '@type': 'Brand',
              name: 'OPAS BIZZ GENERAL TRADING L.L.C-FZ',
            },
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              priceCurrency: 'USD',
              url: `https://www.opasbizz.ae/products/${product._id}`,
            },
          });

          this.applyProductState({
            product,
            otherProducts,
            error: '',
            loading: false,
          });
        },
        error: (err) => {
          console.error('Product Detail API Error:', err);
          this.applyProductState({
            product: undefined,
            otherProducts: [],
            error: 'Unable to load product.',
            loading: false,
          });
        },
      });
  }

  private loadCurrencyRates(): void {
    if (this.ratesLoading) return;

    this.ratesLoading = true;

    this.http
      .get<any>(this.ratesUrl)
      .pipe(timeout(10000))
      .subscribe({
        next: (res) => {
          const rates = res?.rates && typeof res.rates === 'object' ? res.rates : undefined;

          if (rates) {
            this.exchangeRates = { ...this.exchangeRates, ...rates, USD: 1 };
            this.ratesUpdatedAt = res?.time_last_update_utc || 'Live rates loaded';
          }

          this.ratesLoading = false;
          this.scheduleViewRefresh();
        },
        error: () => {
          this.ratesLoading = false;
          this.ratesUpdatedAt = 'Using fallback rates';
          this.scheduleViewRefresh();
        },
      });
  }

  get carouselDuration(): string {
    const count = Math.max(this.otherProducts.length, 1);
    return `${Math.min(Math.max(count * 3.5, 34), 90)}s`;
  }
  get carouselProducts(): ApiProduct[] {
    if (this.otherProducts.length <= 1) return this.otherProducts;
    return [...this.otherProducts, ...this.otherProducts];
  }
  get selectedCurrency(): CurrencyOption {
    return (
      this.currencyOptions.find((option) => option.code === this.selectedCurrencyCode) ||
      this.currencyOptions[0]
    );
  }

  get productSpecs(): SpecItem[] {
    if (!this.product) return [];

    const specs: SpecItem[] = [
      { label: 'Price', value: this.convertPrice(this.product.price) },
      { label: 'Business Type', value: this.product.businessType || '' },
      { label: 'Shelf Life', value: this.product.shelfLife || '' },
      { label: 'Certification', value: this.product.certification || '' },
      { label: 'Cultivation Type', value: this.product.cultivationType || '' },
      { label: 'Feature', value: this.product.feature || '' },
      { label: 'Moisture', value: this.product.moisture || '' },
      { label: 'Pack Size', value: this.product.packSize || '' },
      { label: 'Packaging Type', value: this.product.packagingType || '' },
      { label: 'Color', value: this.product.color || '' },
      { label: 'Size', value: this.product.size || '' },
      { label: 'Broken', value: this.product.broken || '' },
    ];

    return specs.filter((spec) => this.hasDisplayValue(spec.value));
  }

  onCurrencyChange(): void {
    this.scheduleViewRefresh();
  }

  convertPrice(price?: string): string {
    const amount = this.getUsdAmount(price);
    if (amount === undefined) return '';

    const rate = this.exchangeRates[this.selectedCurrency.code] || 1;
    return this.formatCurrency(
      amount * rate,
      this.selectedCurrency.code,
      this.selectedCurrency.locale,
    );
  }

  formatUsdPrice(price?: string): string {
    const amount = this.getUsdAmount(price);
    if (amount === undefined) return '';

    return this.formatCurrency(amount, 'USD', 'en-US');
  }

  hasDisplayValue(value?: string): boolean {
    const normalized = (value || '').trim().toLowerCase();
    return (
      !!normalized && !['na', 'n/a', 'none', 'null', 'undefined', '-', '--'].includes(normalized)
    );
  }

  private getUsdAmount(price?: string): number | undefined {
    if (!this.hasDisplayValue(price)) return undefined;

    const firstNumber = price?.match(/\d[\d,]*(\.\d+)?/)?.[0];
    if (!firstNumber) return undefined;

    const amount = Number(firstNumber.replace(/,/g, ''));
    return Number.isFinite(amount) ? amount : undefined;
  }

  private formatCurrency(amount: number, currency: string, locale: string): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: currency === 'JPY' ? 0 : 2,
    }).format(amount);
  }

  private applyProductState(
    state: Partial<Pick<ProductDetailComponent, 'product' | 'otherProducts' | 'loading' | 'error'>>,
  ): void {
    this.zone.run(() => {
      if (Object.prototype.hasOwnProperty.call(state, 'product')) {
        this.product = state.product;
      }
      if (state.otherProducts !== undefined) this.otherProducts = state.otherProducts;
      if (state.loading !== undefined) this.loading = state.loading;
      if (state.error !== undefined) this.error = state.error;

      this.scheduleViewRefresh();
    });
  }

  private scheduleViewRefresh(): void {
    this.cdr.markForCheck();

    if (isPlatformBrowser(this.platformId)) {
      requestAnimationFrame(() => this.cdr.detectChanges());
    }
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

  enquireNow(): void {
    if (!this.product) return;

    this.router.navigate(['/contact'], {
      queryParams: { product: this.product.productName },
    });
  }

  openOtherProduct(id: string): void {
    this.router.navigate(['/products', id]);
  }
}
