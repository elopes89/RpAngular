import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CoronaVacService } from './service/corona-vac.service';


export const privadoGuard: CanActivateFn = (route, state) => {
  if (inject(CoronaVacService).verificarUsuarioLogado())
    return true;
  else
    return inject(Router).createUrlTree(['/nao-autenticado']);
};

export const publicoGuard: CanActivateFn = (route, state) => {
  if (!inject(CoronaVacService).verificarUsuarioLogado())
    return true;
  else
    return inject(Router).createUrlTree(['/private/home']);
};
