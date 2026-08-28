import type { Config } from './types';

export default {
  version: '2.1',
  id: '/',
  name: 'Semeando Vida',
  shortName: 'SemeandoVida',
  description: 'Instale o Semeando Vida na tela inicial de seu celular!',
  direction: 'auto',
  language: 'pt-BR',
  backgroundColor: '#ffffff',
  themeColor: '#ffffff',
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
      description: 'Abrir Hinário',
      url: '/2025/12/hinario-presbiteriano-novo-cantico-completo.html?utm_source=shortcut',
    },
    {
      name: 'Busca',
      shortName: 'Buscar',
      description: 'Buscar hinos, estudos e devocionais',
      url: '/p/busca.html?utm_source=shortcut',
    },
    {
      name: 'Páginas Salvas',
      shortName: 'Salvos',
      description: 'Seus textos salvos para ler depois',
      url: '/p/paginas-salvas.html?utm_source=shortcut',
    },
  ],
  pwa: {
    logs: true,
    oneSignalEnabled: false,
    oneSignalConfig: {
      appId: '********-****-****-****-************',
      allowLocalhostAsSecureOrigin: true,
    },
  },
  origin: 'https://www.semeandovida.org',
} satisfies Config;
