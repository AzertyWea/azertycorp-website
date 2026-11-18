/* =============================================
   AZERTYCORP API LAYER (Supabase backend)
   Handles verified lead capture and public content reads.
   No admin/auth surface is exposed to public pages.
   ============================================= */
(function () {
  'use strict';

  var clientPromise = null;
  var scriptLoading = false;

  function getConfig() {
    var config = window.AZERTY_CONFIG;
    if (!config || !config.SUPABASE_URL || !config.SUPABASE_PUBLISHABLE_KEY || !config.SUPABASE_CLIENT_SRC) {
      throw new Error('AZERTYCORP public configuration is unavailable');
    }
    return config;
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = function () { resolve(); };
      script.onerror = function () { reject(new Error('Failed to load ' + src)); };
      document.head.appendChild(script);
    });
  }

  function ensureSupabase() {
    if (window.supabase && window.supabase.createClient) return Promise.resolve();
    if (scriptLoading && clientPromise) return clientPromise;

    var config;
    try { config = getConfig(); } catch (error) { return Promise.reject(error); }

    scriptLoading = true;
    clientPromise = loadScript(config.SUPABASE_CLIENT_SRC)
      .then(function () {
        if (!window.supabase || !window.supabase.createClient) {
          throw new Error('Supabase client did not initialise');
        }
      })
      .then(function () { scriptLoading = false; }, function (error) {
        scriptLoading = false;
        clientPromise = null;
        throw error;
      });
    return clientPromise;
  }

  function getClient() {
    var config;
    try { config = getConfig(); } catch (error) { return Promise.reject(error); }
    return ensureSupabase().then(function () {
      if (!window.__azClient) {
        window.__azClient = window.supabase.createClient(
          config.SUPABASE_URL,
          config.SUPABASE_PUBLISHABLE_KEY,
          { auth: { persistSession: false, autoRefreshToken: false } }
        );
      }
      return window.__azClient;
    });
  }

  function val(formData, name) {
    var value = formData.get(name);
    return value ? String(value).trim() : '';
  }

  function safeSource(source) {
    var value = source ? String(source).trim() : 'website';
    return /^[a-z0-9-]{1,50}$/.test(value) ? value : 'website';
  }

  function checkResult(result) {
    if (result && result.error) throw result.error;
    return result && result.data ? result.data : [];
  }

  /* ---------------- LEAD CAPTURE ---------------- */
  function submitLead(formData, source) {
    // Honeypot: silently accept and discard bot submissions.
    if (val(formData, 'website')) return Promise.resolve({ ok: true, ignored: true });

    var payload = {
      name: val(formData, 'name') || val(formData, 'fullName'),
      email: val(formData, 'email'),
      phone: val(formData, 'phone') || val(formData, 'whatsapp') || null,
      service: val(formData, 'subject') || val(formData, 'service') || null,
      message: val(formData, 'message') || val(formData, 'details') || val(formData, 'description') || '',
      source: safeSource(source)
    };

    if (!payload.name || payload.name.length > 120) {
      return Promise.reject(new Error('Invalid name'));
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) || payload.email.length > 254) {
      return Promise.reject(new Error('Invalid email'));
    }
    if (!payload.message || payload.message.length > 5000) {
      return Promise.reject(new Error('Invalid message'));
    }
    if (payload.phone && payload.phone.length > 50) {
      return Promise.reject(new Error('Invalid phone'));
    }
    if (payload.service && payload.service.length > 120) {
      return Promise.reject(new Error('Invalid subject'));
    }

    return getClient()
      .then(function (client) {
        return client.from('contacts').insert(payload);
      })
      .then(function (result) {
        if (result && result.error) throw result.error;
        return { ok: true };
      });
  }

  /* ---------------- PUBLIC CONTENT ---------------- */
  function getProjects() {
    return getClient()
      .then(function (client) {
        return client.from('projects').select('*').eq('published', true).order('sort_order');
      })
      .then(checkResult);
  }

  function getTestimonials() {
    return getClient()
      .then(function (client) {
        return client.from('testimonials').select('*').eq('published', true).order('sort_order');
      })
      .then(checkResult);
  }

  function getPosts() {
    return getClient()
      .then(function (client) {
        return client.from('blog_posts').select('*').eq('published', true).order('created_at', { ascending: false });
      })
      .then(checkResult);
  }

  window.AZAPI = {
    submitLead: submitLead,
    getProjects: getProjects,
    getTestimonials: getTestimonials,
    getPosts: getPosts
  };
})();
