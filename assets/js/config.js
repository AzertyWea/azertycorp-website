/* =============================================
   AZERTYCORP — public configuration
   Loaded before api.js and site.js on every page.

   The Supabase publishable key is public by design.
   Never add a service-role key or other secret here.
   ============================================= */
window.AZERTY_CONFIG = {
  SITE_NAME: 'AZERTYCORP',
  SUPPORT_EMAIL: 'hello@azertycorp.com',

  SUPABASE_URL: 'https://bjczjzddhoyadhbwhhgo.supabase.co',
  SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_E0k1n8CmBOl6XjA3k1TRVQ_xJswRyHw',
  SUPABASE_CLIENT_SRC: '/assets/vendor/supabase-js-2.119.1.js',

  /* Tracking stays disabled until verified IDs and consent are configured. */
  GA4_MEASUREMENT_ID: '',
  GOOGLE_ADS_ID: '',
  META_PIXEL_ID: '',

  STORAGE_KEY: 'azertycorp:cookie-consent'
};
