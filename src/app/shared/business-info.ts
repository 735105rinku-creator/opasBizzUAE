export const BUSINESS_INFO = {
  name: 'OPAS BIZZ GENERAL TRADING L.L.C-FZ',
  siteUrl: 'https://www.opasbizz.ae',
  email: 'info@opasbizz.ae',
  phone1: '+971 45766042',
  phonePrimary: '+971 502343066',
  phoneSecondary: '+971 502342494',
  registeredOffice:
    'Meydan Grandstand, 6th Floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E.',
  corporateOffice:
    'Office No. 9, 9th Floor, Iris Bay Tower, Business Bay, Dubai, U.A.E. P.o.Box- 6098',
  latitude: 25.18613527378336,
  longitude: 55.2599602960313,
  logo: 'https://www.opasbizz.ae/assets/icon/opasbizz_logo007.png',
  defaultImage: 'https://www.opasbizz.ae/assets/banners/hero_img1.jpg',
};

export const BUSINESS_KEYWORDS = [
  'OPAS BIZZ GENERAL TRADING L.L.C-FZ',
  'Dubai trading company',
  'general trading company Dubai',
  'export import company Dubai',
  'bulk grains supplier UAE',
  'grains trading Dubai',
  'agricultural commodities UAE',
  'fruits vegetables trading Dubai',
  'Business Bay trading company',
  'Meydan Free Zone trading company',
].join(', ');

export function absoluteUrl(path = '/'): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BUSINESS_INFO.siteUrl}${cleanPath}`;
}

export function businessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': `${BUSINESS_INFO.siteUrl}/#organization`,
    name: BUSINESS_INFO.name,
    legalName: BUSINESS_INFO.name,
    url: BUSINESS_INFO.siteUrl,
    logo: BUSINESS_INFO.logo,
    image: BUSINESS_INFO.defaultImage,
    email: BUSINESS_INFO.email,
    telephone: [BUSINESS_INFO.phonePrimary, BUSINESS_INFO.phoneSecondary],
    address: [
      {
        '@type': 'PostalAddress',
        name: 'Registered Office',
        streetAddress:
          'Meydan Grandstand, 6th Floor, Meydan Road, Nad Al Sheba',
        addressLocality: 'Dubai',
        addressCountry: 'AE',
      },
      {
        '@type': 'PostalAddress',
        name: 'Corporate Office',
        streetAddress: 'Office No. 9, 9th Floor, Iris Bay Tower, Business Bay',
        addressLocality: 'Dubai',
        addressCountry: 'AE',
      },
    ],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS_INFO.latitude,
      longitude: BUSINESS_INFO.longitude,
    },
    areaServed: [
      'Dubai',
      'United Arab Emirates',
      'GCC',
      'International',
    ],
    sameAs: [BUSINESS_INFO.siteUrl],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: BUSINESS_INFO.phonePrimary,
      contactType: 'sales',
      email: BUSINESS_INFO.email,
      areaServed: ['AE', 'GCC', 'International'],
      availableLanguage: ['English', 'Arabic'],
    },
  };
}

