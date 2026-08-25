import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const EN_TRANSLATIONS: Record<string, string> = {
  'nav.home': 'Home',
  'nav.about': 'About Us',
  'nav.services': 'Services',
  'nav.grains': 'Grains',
  'nav.export': 'Export',
  'nav.import': 'Import',
  'nav.itSector': 'IT Sector',
  'nav.products': 'Products',
  'nav.contact': 'Contact Us',
  'nav.getQuote': 'Get Quote',

  'hero.eyebrow': "Dubai's Trusted Trade Partner",
  'hero.title1': 'Premium Export &',
  'hero.title2': 'Import Solutions',
  'hero.title3': 'from Dubai',
  'hero.desc': 'OPAS BIZZ GENERAL TRADING L.L.C-FZ connects global markets with high-quality grains, commodities, and IT solutions backed by UAE expertise and international standards.',
  'hero.cta1': 'Explore Products',
  'hero.cta2': 'Contact Us',
  'hero.stat1': 'Countries Served',
  'hero.stat2': 'Tons Exported',
  'hero.stat3': 'Years Experience',

  'about.eyebrow': 'Who We Are',
  'about.title': 'Trusted Trade Partner in the',
  'about.titleSpan': 'UAE & Beyond',
  'about.desc1': 'OPAS BIZZ GENERAL TRADING L.L.C-FZ is a Dubai-based trading company specializing in the export and import of premium grains, agricultural commodities, and IT solutions.',
  'about.desc2': 'With deep roots in UAE and international markets, we bridge the gap between producers and global buyers with transparency, quality, and reliability.',
  'about.cta': 'Learn More About Us',
  'about.feat1': 'Quality Certified',
  'about.feat1d': 'All products meet international quality and safety standards.',
  'about.feat2': 'Fast Logistics',
  'about.feat2d': 'End-to-end supply chain management for timely delivery.',
  'about.feat3': 'Competitive Pricing',
  'about.feat3d': 'Best market rates with flexible payment terms.',

  'services.eyebrow': 'What We Do',
  'services.title': 'Our Core',
  'services.titleSpan': 'Services',
  'services.desc': 'From premium grain trading to modern IT solutions, we offer comprehensive business services tailored for the UAE market.',
  'services.grains': 'Grains & Commodities',
  'services.grainsd': 'Premium quality wheat, rice, maize, sugar, and pulses for bulk buyers across the GCC and global markets.',
  'services.export': 'Export Services',
  'services.exportd': 'Seamless export solutions from UAE with full documentation, customs clearance, and logistics support.',
  'services.import': 'Import Services',
  'services.importd': 'Reliable import channels for commodities, technology, and consumer goods into the UAE market.',
  'services.it': 'IT Sector',
  'services.itd': 'Custom software, web development, and digital transformation solutions for businesses in the UAE.',
  'services.learnMore': 'Learn More',

  'products.eyebrow': 'Our Products',
  'products.title': 'Premium',
  'products.titleSpan': 'Product Range',
  'products.desc': 'High-quality commodities sourced and exported to global markets with strict quality control.',
  'products.enquire': 'Enquire Now',
  'products.viewAll': 'View All Products',
  'products.filter.all': 'All Products',
  'products.filter.grains': 'Grains',
  'products.filter.pulses': 'Pulses',
  'products.filter.sugar': 'Sugar',

  'contact.eyebrow': 'Get In Touch',
  'contact.title': "Let's Start a",
  'contact.titleSpan': 'Conversation',
  'contact.desc': 'Have a trade inquiry? Our team is ready to assist you with the best solutions.',
  'contact.name': 'Full Name',
  'contact.email': 'Email Address',
  'contact.phone': 'Phone Number',
  'contact.subject': 'Subject',
  'contact.message': 'Your Message',
  'contact.send': 'Send Message',
  'contact.sending': 'Sending...',
  'contact.success': "Message sent successfully! We'll get back to you soon.",
  'contact.error': 'Something went wrong. Please try again.',

  'footer.desc': 'Dubai-based trading company specializing in premium grains, export-import, and IT solutions across the GCC and global markets.',
  'footer.quickLinks': 'Quick Links',
  'footer.services': 'Services',
  'footer.legal': 'Legal',
  'footer.privacy': 'Privacy Policy',
  'footer.terms': 'Terms & Conditions',
  'footer.rights': 'All Rights Reserved.',
};

const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: EN_TRANSLATIONS,
  ar: EN_TRANSLATIONS,
};

@Injectable({ providedIn: 'root' })
export class Lang {
  private currentLang: 'en' | 'ar' = 'en';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.init();
    }
  }

  private init(): void {
    const saved = localStorage.getItem('opas_lang') as 'en' | 'ar' | null;
    this.applyLang(saved || 'en');
  }

  setLang(lang: 'en' | 'ar'): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('opas_lang', lang);
    }
    this.applyLang(lang);
  }

  private applyLang(lang: 'en' | 'ar'): void {
    this.currentLang = lang;
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.setAttribute('lang', lang);
      document.documentElement.setAttribute('dir', 'ltr');
      document.body.classList.toggle('lang-ar', false);
    }
  }

  getLang(): 'en' | 'ar' {
    return this.currentLang;
  }

  translate(key: string): string {
    return TRANSLATIONS[this.currentLang]?.[key] ?? TRANSLATIONS['en']?.[key] ?? key;
  }
}

