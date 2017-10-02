import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
// commented out worker for now because not supported in safari.
platformBrowserDynamic()
  .bootstrapModule(AppModule)     // bootstrap the application with AppModule
//  .then(() => {
//    if ('serviceWorker' in navigator) {
//      navigator.serviceWorker.register('./../worker-basic.js');
//    }
//  })
  .catch(err => console.log(err));
