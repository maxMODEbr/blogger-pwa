import type { Config } from './types';

export default {
  version: '2.2',
  id: '/',
  name: 'Semeando Vida',
  shortName: 'SemeandoVida',
  description: 'Instale o Semeando Vida na tela inicial de seu celular!',
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
      shortName: 'Hinário',
      description: 'Acesse o Hinário Novo Cântico',
      url: 'https://www.semeandovida.org/2025/12/hinario-presbiteriano-novo-cantico-completo.html',
    },
    {
      name: 'Busca Universal',
      shortName: 'Busca',
      description: 'Buscar hinos, estudos e devocionais',
      url: 'https://www.semeandovida.org/p/busca.html',
    },
    {
      name: 'Páginas Salvas',
      shortName: 'Salvos',
      description: 'Seus textos salvos para ler depois',
      url: 'https://www.semeandovida.org/p/paginas-salvas.html',
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
