/* =============================================
   AZERTYCORP API LAYER (Supabase backend)
   Handles: lead capture, content data, engine sync
   ============================================= */
(function () {
  'use strict';

  var SUPABASE_URL = 'https://bjczjzddhoyadhbwhhgo.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_E0k1n8CmBOl6XjA3k1TRVQ_xJswRyHw';

  var clientPromise = null;
  var scriptLoading = false;

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.onload = resolve;
      s.onerror = function () { reject(new Error('Failed to load ' + src)); };
      document.head.appendChild(s);
    });
  }

  function ensureSupabase() {
    if (window.supabase && window.supabase.createClient) return Promise.resolve();
    if (scriptLoading) return clientPromise;
    scriptLoading = true;
    clientPromise = loadScript('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2')
      .then(function () {
        if (!window.supabase) throw new Error('supabase-js not available');
      })
      .finally(function () { scriptLoading = false; });
    return clientPromise;
  }

  function getClient() {
    return ensureSupabase().then(function () {
      if (window.__azClient) return window.__azClient;
      window.__azClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
      return window.__azClient;
    });
  }

  function val(formData, name) {
    var v = formData.get(name);
    return v ? String(v).trim() : '';
  }

  /* ---------------- LEAD CAPTURE ---------------- */
  function submitLead(formData, source) {
    var payload = {
      name: val(formData, 'name') || val(formData, 'fullName'),
      email: val(formData, 'email'),
      phone: val(formData, 'phone') || val(formData, 'whatsapp') || null,
      service: val(formData, 'service') || null,
      message: val(formData, 'message') || val(formData, 'details') || val(formData, 'description') || null,
      source: source || 'website'
    };
    if (!payload.email) return Promise.reject(new Error('Missing email'));
    return getClient().then(function (client) {
      return client.from('contacts').insert([payload]);
    });
  }

  /* ---------------- PUBLIC CONTENT ---------------- */
  function getProjects() {
    return getClient().then(function (client) {
      return client.from('projects').select('*').eq('published', true).order('sort_order');
    });
  }

  function getTestimonials() {
    return getClient().then(function (client) {
      return client.from('testimonials').select('*').eq('published', true).order('sort_order');
    });
  }

  function getPosts() {
    return getClient().then(function (client) {
      return client.from('blog_posts').select('*').eq('published', true).order('created_at', { ascending: false });
    });
  }

  /* ---------------- AUTH (Content Engine) ---------------- */
  function getSession() {
    return getClient().then(function (client) {
      return client.auth.getSession();
    });
  }

  function signIn(email, password) {
    return clientAuth(function (c) { return c.auth.signInWithPassword({ email: email, password: password }); });
  }

  function signUp(email, password) {
    return clientAuth(function (c) { return c.auth.signUp({ email: email, password: password }); });
  }

  function signOut() {
    return clientAuth(function (c) { return c.auth.signOut(); });
  }

  function clientAuth(fn) {
    return getClient().then(fn);
  }

  /* ---------------- ENGINE SYNC ---------------- */
  function engineGetItems() {
    return getSession().then(function (s) {
      if (!s.data.user) return null;
      return getClient().then(function (client) {
        return client.from('engine_items').select('*');
      });
    });
  }

  function engineSaveItem(item) {
    return getSession().then(function (s) {
      if (!s.data.user) return null;
      return getClient().then(function (client) {
        return client.from('engine_items').upsert({
          id: item.id,
          topic: item.topic,
          pillar: item.pillar || 'Technology',
          status: item.status || 'IDEA',
          current_step: item.currentStep || 1,
          data: item
        }, { onConflict: 'id' });
      });
    });
  }

  function engineDeleteItem(id) {
    return getSession().then(function (s) {
      if (!s.data.user) return null;
      return getClient().then(function (client) {
        return client.from('engine_items').delete().eq('id', id);
      });
    });
  }

  window.AZAPI = {
    submitLead: submitLead,
    getProjects: getProjects,
    getTestimonials: getTestimonials,
    getPosts: getPosts,
    getSession: getSession,
    signIn: signIn,
    signUp: signUp,
    signOut: signOut,
    engineGetItems: engineGetItems,
    engineSaveItem: engineSaveItem,
    engineDeleteItem: engineDeleteItem
  };
})();