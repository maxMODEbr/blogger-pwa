import { GithubAssets } from '@/modules/github-assets';
import { Hono } from 'hono';
import { metadata } from '../../metadata';

type HonoContext = {
  Bindings: CloudflareEnv;
  Variables: {
    github: GithubAssets;
  };
};

const getAssetPath = (pathname: string) => {
  if (pathname.endsWith('/')) {
    return `/bucket${pathname}index.html`;
  }
  if (!pathname.slice(pathname.lastIndexOf('/')).includes('.')) {
    return `/bucket${pathname}/index.html`;
  }
  return `/bucket${pathname}`;
};

const app = new Hono<HonoContext>()
  .use(async (c, next) => {
    const github = new GithubAssets(c.executionCtx, metadata.github.repository, metadata.github.branch);

    c.set('github', github);

    await next();
  })
  .get('*', async (c) => {
    switch (c.req.method) {
      case 'GET':
      case 'HEAD': {
        const response = await c.var.github.fetch(c.req.raw, {
          toAsset: (url) => getAssetPath(url.pathname),
          cacheKey(defaultKey) {
            const url = new URL(defaultKey.url);
            url.pathname = `__cache_build_${metadata.build.hash}__${url.pathname}`;
            return new Request(url, defaultKey);
          },
          etag: `build_${metadata.build.hash}_${new URL(c.req.url).pathname}`,
        });
        if (response) {
          if (/\/(service-?worker.js|sw.js)/.test(c.req.url)) {
            response.headers.set('Service-Worker-Allowed', '/');
          }
          return response;
        }
        return c.json(
          {
            success: false,
            error: {
              code: 'not_found',
              message: 'File not found',
            },
          },
          404,
        );
      }
      default: {
        return c.json(
          {
            success: false,
            error: {
              code: 'method_not_allowed',
              message: 'Method not allowed',
            },
          },
          405,
        );
      }
    }
  });

export default {
  fetch: app.fetch,
} satisfies ExportedHandler<CloudflareEnv>;
