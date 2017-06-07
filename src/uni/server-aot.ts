import 'zone.js/dist/zone-node';
import { enableProdMode } from '@angular/core';
import { AppServerModuleNgFactory } from '../../aot/src/uni/app.server.ngfactory';
import { ngUniversalEngine } from './universal-engine';

enableProdMode();

const server = require('express')();

// set our angular engine as the handler for html files, so it will be used to render them.
server.engine('html', ngUniversalEngine({
  bootstrap: [AppServerModuleNgFactory]
}));

// set default view directory
server.set('views', 'src');

// handle requests for routes in the app.  ngExpressEngine does the rendering.
server.get(['/', '/login', '/dashboard'], (req: any, res: any) => {
  res.render('index-aot.html', { req });
});

// handle requests for static files
server.get(['/*.js', '/*.css'], (req: any, res: any, next: any) => {
  let fileName: string = req.originalUrl;
  console.log(fileName);
  let root = fileName.startsWith('/node_modules/') ? '.' : 'src';
  res.sendFile(fileName, { root: root }, (err: any) => {
    if (err) {
      next(err);
    }
  });
});

// start the server
server.listen(3200, () => {
  console.log('listening on port 3200...');
});
