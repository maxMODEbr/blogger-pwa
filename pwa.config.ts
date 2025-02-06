import type { Config } from './types';

export default {
  version: '1.0',
  id: '/',
  name: 'Semeando Vida',
  shortName: 'SemeandoVida',
  description: 'Instale o Semeando Vida na tela inicial de seu celular! Acesso rápido!',
  direction: 'auto',
  language: 'en-US',
  backgroundColor: '#fff',
  themeColor: '#fff',
  display: 'standalone',
  orientation: 'any',
  scope: '/',
  startUrl: '/?utm_source=homescreen',
  appleStatusBarStyle: 'black-translucent',
  preferRelatedApplications: false,
  shortcuts: [
    {
      name: 'Hinário',
      shortName: 'Hinos',
      description: 'Acesse o Hinário',
      url: 'https://www.semeandovida.org/2011/08/historia-por-tras-dos-hinos_26.html',
    },
    {
      name: 'Devocionais',
      shortName: 'Devocionais',
      description: 'Acesse Devocionais',
      url: 'https://www.semeandovida.org/2023/05/1300-devocionais-cristas.html',
    },
    {
      name: 'Estudos Bíblicos',
      shortName: 'Estudos',
      description: 'Acesse Estudos Bíblicos',
      url: 'https://www.semeandovida.org/2012/05/estudos-biblicos-para-download.html',
    },
    {
      name: 'Explore a Bíblia',
      shortName: 'Bíblia',
      description: 'Acesse Bíblia em detalhes',
      url: 'https://www.semeandovida.org/2023/05/guia-de-estudo-pessoal-da-biblia.html',
    },
    {
      name: 'Sermões',
      shortName: 'Sermões',
      description: 'Acesse Sermões',
      url: 'https://www.semeandovida.org/search/label/serm%C3%A3o',
    },
    {
      name: 'Séries Teológicas',
      shortName: 'Séries',
      description: 'Acesse Séries Teológicas',
      url: 'https://www.semeandovida.org/search/label/s%C3%A9rie',
    },
      ],
  pwa: {
    logs: true,
    // OneSignal is not available if you are not using cloudflare workers
    oneSignalEnabled: false,
    oneSignalConfig: {
      appId: '********-****-****-****-************',
      allowLocalhostAsSecureOrigin: true,
    },
  },
  // Please replace with your blog url if you are using CDN (JsDelivr)
  origin: 'https://www.semeandovida.org',
} satisfies Config;
