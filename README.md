# alokai-shopify

Vue Storefront 2 (Alokai) with Shopify integration

> [!WARNING]
> This project is not ready for production use.

## REQUIREMENTS

- Docker, or
- Node.js (v16.20.2) *mandatory* (note: [nvm](https://github.com/nvm-sh/nvm) is a handy tool for managing node versions)
- Yarn

---

## USAGE

### Initial Setup

1. Run `cp .env.example .env` to create a `.env` file (make sure to fill in the required variables)
2. Run `nvm use lts/gallium` to ensure you are using the correct node version (v16.20.2)
3. Run `yarn install` to install the dependencies

### Local Development

> [!NOTE]
> Make sure you have completed the steps outlined in 'Initial Setup' first.

1. Run `yarn dev` to start the development server
2. Open `http://localhost:3001` in your browser to view the store

### Production Build

1. Run `yarn prod` to build the production files and start the production server
2. Uncomment the relevant production variables in the `.env` file
3. Open `http://localhost:3001` in your browser to view the store

---

## RESOURCES

### 1. Documentation

#### Shopify

- [Vue Storefront Documentation | docs.vuestorefront.io/v2](https://docs.vuestorefront.io/v2/)
- [Shopify Integration for Vue Storefront 2 | docs.alokai.com/shopify](https://docs.alokai.com/shopify)
- [Shopify API, libraries, and tools | shopify.dev](https://shopify.dev/docs/api)

#### Nuxt 2

- [Documentation | v2.nuxt.com](https://v2.nuxt.com/docs)

### 2. Articles

- [What is PWA? Progressive Web Apps in eCommerce Explained | alokai.com/blog](https://alokai.com/blog/pwa)
