import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { StoreModule } from './store/store.module';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  //{ path: '', redirectTo: '/store', pathMatch: 'full' }, //TODO: No longer needed?
  { 
    path: 'store', 
    loadChildren: () => import('./store/store.module').then(m => m.StoreModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'login', 
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    canActivate: [AuthGuard]
  },
  { 
    path: '**', 
    loadChildren: () => import('./store/store.module').then(m => m.StoreModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
