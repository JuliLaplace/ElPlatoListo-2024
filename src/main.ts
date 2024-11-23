import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { IonicModule } from '@ionic/angular';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)), 
    importProvidersFrom(IonicModule.forRoot()),
    provideFirebaseApp(() => initializeApp({"projectId":"el-plato-listo","appId":"1:672867578350:web:792bc52f8bd8002c619eff","storageBucket":"el-plato-listo.appspot.com","apiKey":"AIzaSyAWtH8J6rQU1LZ-8ixY063tXBtesswlw3g","authDomain":"el-plato-listo.firebaseapp.com","messagingSenderId":"672867578350"})), 
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore()),
    provideHttpClient(),
    provideAnimations()
  ],
});
