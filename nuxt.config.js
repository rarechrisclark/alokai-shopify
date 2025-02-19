require("isomorphic-fetch");
import webpack from "webpack";

const platformENV = process.env.NODE_ENV !== "production" ? "http" : "https";

const config = {
  server: {
    port: process.env.APP_PORT || 3001,
    host: "0.0.0.0",
  },
  publicRuntimeConfig: {
    // TODO: Change this to your own key
    appKey: "vsf2spcon",
    appVersion: Date.now(),
    middlewareUrl: `${platformENV}://${process.env.BASE_URL}/api/`,
  },
  privateRuntimeConfig: {
    storeURL: process.env.SHOPIFY_DOMAIN,
    storeToken: process.env.SHOPIFY_STOREFRONT_TOKEN,
  },
  serverMiddleware: [
    { path: "/custom", handler: "~/server-middleware/custom-features.js" },
  ],
  head: {
    title: process.env.NUXT_CONFIG_HEAD_TITLE,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: process.env.NUXT_HEAD_THEME_COLOR },
      {
        hid: "description",
        name: "description",
        content: process.env.NUXT_HEAD_DESCRIPTION,
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: "crossorigin",
      },
      {
        rel: "preload",
        href: "https://fonts.googleapis.com/css?family=Raleway:300,400,400i,500,600,700|Roboto:300,300i,400,400i,500,700&display=swap",
        as: "style",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Raleway:300,400,400i,500,600,700|Roboto:300,300i,400,400i,500,700&display=swap",
        media: "print",
        onload: "this.media='all'",
      },
    ],
  },
  loading: { color: "#fff" },
  plugins: ["~/plugins/scrollToTop.client.js"],
  buildModules: [
    // to core
    "./modules/cms/build",
    "@nuxtjs/composition-api/module",
    "@nuxtjs/pwa",
    "@nuxtjs/device",
    "@nuxt/typescript-build",
    "@nuxtjs/style-resources",
    [
      "@vue-storefront/nuxt",
      {
        useRawSource: {
          dev: ["@vue-storefront/shopify", "@vue-storefront/core"],
          prod: ["@vue-storefront/shopify", "@vue-storefront/core"],
        },
      },
    ],
    ["@vue-storefront/nuxt-theme"],
    [
      "@vue-storefront/shopify/nuxt",
      {
        i18n: {
          useNuxtI18nConfig: true,
        },
      },
    ],
  ],
  modules: [
    "@nuxtjs/i18n",
    "cookie-universal-nuxt",
    "vue-scrollto/nuxt",
    "@vue-storefront/middleware/nuxt",
    "@nuxtjs/sitemap",
    "./modules/cms/runtime",
    "@nuxt/image",
  ],
  device: {
    refreshOnResize: true,
  },
  i18n: {
    currency: "AUD",
    country: "US",
    countries: [
      { name: "US", label: "United States" },
      { name: "DE", label: "Germany" },
    ],
    currencies: [
      { name: "EUR", label: "Euro" },
      { name: "USD", label: "Dollar" },
    ],
    locales: [
      {
        code: "en",
        alias: "us",
        label: "English",
        file: "en.js",
        iso: "en",
      },
      {
        code: "de",
        alias: "de",
        label: "German",
        file: "de.js",
        iso: "de",
      },
    ],
    defaultLocale: "en",
    lazy: true,
    seo: true,
    langDir: "lang/",
    vueI18n: {
      fallbackLocale: "en",
      numberFormats: {
        en: {
          currency: {
            style: "currency",
            currency: "USD",
            currencyDisplay: "symbol",
          },
          decimal: {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          },
          percent: {
            style: "percent",
            useGrouping: false,
          },
        },
        de: {
          currency: {
            style: "currency",
            currency: "EUR",
            currencyDisplay: "symbol",
          },
          decimal: {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          },
          percent: {
            style: "percent",
            useGrouping: false,
          },
        },
      },
    },
    detectBrowserLanguage: {
      cookieKey: "vsf-locale",
    },
  },
  styleResources: {
    scss: [
      require.resolve("@storefront-ui/shared/styles/_helpers.scss", {
        paths: [process.cwd()],
      }),
    ],
  },
  build: {
    transpile: ["vee-validate/dist/rules", "storefront-ui"],
    plugins: [
      new webpack.DefinePlugin({
        "process.VERSION": JSON.stringify({
          // eslint-disable-next-line global-require
          version: require("./package.json").version,
          lastCommit: process.env.LAST_COMMIT || "",
        }),
      }),
    ],
    extend(config) {
      config.resolve.extensions.push(".mjs");

      config.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      });
    },
    extractCSS: {
      ignoreOrder: true,
    },
  },
  pwa: {
    manifest: {
      name: process.env.NUXT_PWA_NAME,
      shortName: process.env.NUXT_PWA_SHORTNAME,
      description: process.env.NUXT_PWA_DESCRIPTION,
      lang: process.env.NUXT_PWA_LANG,
      startUrl: process.env.NUXT_PWA_START_URL,
      display: process.env.NUXT_PWA_DISPLAY,
      backgroundColor: process.env.NUXT_PWA_BACKGROUND_COLOR,
      themeColor: process.env.NUXT_PWA_THEME_COLOR,
      icons: [
        {
          src: "/icons/android-icon-48x48.png",
          sizes: "48x48",
          type: "image/png",
        },
        {
          src: "/icons/android-icon-72x72.png",
          sizes: "72x72",
          type: "image/png",
        },
        {
          src: "/icons/android-icon-96x96.png",
          sizes: "96x96",
          type: "image/png",
        },
        {
          src: "/icons/android-icon-144x144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "/icons/android-icon-168x168.png",
          sizes: "168x168",
          type: "image/png",
        },
        {
          src: "/icons/android-icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/icons/android-icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    meta: {
      name: process.env.NUXT_META_NAME,
      author: process.env.NUXT_META_AUTHOR,
      backgroundColor: process.env.NUXT_META_BACKGROUND_COLOR,
      description: process.env.NUXT_META_DESCRIPTION,
      themeColor: process.env.NUXT_META_THEME_COLOR,
      ogHost: process.env.NUXT_META_OG_HOST,
    },
    icon: {
      iconSrc: "src/static/android-icon-512x512.png",
    },
    workbox: {
      offlineStrategy: "StaleWhileRevalidate",
      runtimeCaching: [
        {
          // Match any request that ends with .png, .jpg, .jpeg or .svg.
          urlPattern: /\.(?:png|jpg|jpeg|svg|woff|woff2)$/,
          // Apply a cache-first strategy.
          handler: "CacheFirst",
          options: {
            // TODO: Use a custom cache name.
            cacheName: "SPVSF2Assets",

            // Only cache 100 images.
            expiration: {
              maxEntries: 100,
            },
          },
        },
        {
          urlPattern: /^\/(?:(c)?(\/.*)?)$/,
          handler: "StaleWhileRevalidate",
          strategyOptions: {
            // set a custom cache name
            cacheName: "SPVSF2cached",
            cacheExpiration: {
              maxEntries: 200,
              maxAgeSeconds: 3600,
            },
          },
        },
      ],
    },
  },
};

export default config;
