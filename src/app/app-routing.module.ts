import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'leerqr',
    loadChildren: () => import('./pages/leerqr/leerqr.module').then( m => m.LeerqrPageModule)
  },
  {
    path: 'misdatos',loadChildren: () => import('./pages/misdatos/misdatos.module').then(m => m.MisdatosPageModule)
    path: 'correo',
    loadChildren: () => import('./pages/correo/correo.module').then( m => m.CorreoPageModule)
  },
  {
    path: 'pregunta',
    loadChildren: () => import('./pages/pregunta/pregunta.module').then( m => m.PreguntaPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }