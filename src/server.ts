import next from 'next';
import 'dotenv/config';

import fs from 'fs';
import { createServer } from 'http';
import { parse } from 'url';
import path from 'path';

import { privateEnvs } from './shared/config/envs';

const dev = process.env.NODE_ENV !== 'production';

// when using middleware `hostname` and `port` must be provided below
const app = next({ dev });
const handle = app.getRequestHandler();

const dirName = path.resolve('public', 'signin_helpers');

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      if (!req.url) {
        return;
      }

      const parsedUrl = parse(req.url, true);
      const { pathname } = parse(req.url, true);
      const basePath = '/__/auth';

      console.log(pathname, pathname?.startsWith(basePath));

      if (pathname?.startsWith(basePath)) {
        const file = pathname.replace(basePath, '');
        if (file === '/') {
          res.writeHead(302, {
            Location: '/__/auth/index.html',
          });
          res.end();
          return;
        }

        try {
          const filePath = `${dirName}/${file}`;
          fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
              console.error(err);
              res.writeHead(404);
              res.end('File not found');
              return;
            }
            const fileStream = fs.createReadStream(filePath);
            fileStream.pipe(res);
          });
        } catch (error) {
          console.error('oi', error);
          res.writeHead(404);
          res.end('File not found');
        }
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(privateEnvs.PORT, () => {
      console.log(`> Ready`);
    });
});
