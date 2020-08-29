"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.angular = void 0;
exports.angular = {
    example: `\`\`\`javascript
  
    \`\`\``,
    lazy: `\`\`\`javascript
//LAZY LOADING
[{
  path: 'lazy',
  loadChildren: () => import('./lazy-route/lazy.module').then(mod => mod.LazyModule),
}];\`\`\``,
    interceptor: `\`\`\`javascript
//HTTP INTERCEPTORS
//IT'S IMPORTED IN APP.MODULE UNDER PROVIDERS

export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
    });
    return next.handle(authRequest);
  }
}

//APP MODULE
providers: [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
],\`\`\``,
    guard: `\`\`\`javascript
//AUTH GUARDS
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  canLoad(
    route: Route,
    segments: import('@angular/router').UrlSegment[]
  ): boolean | UrlTree | Observable<boolean | UrlTree> {
    return this.authService.signedin$.pipe(
      skipWhile((value) => value === null),
      take(1),
      tap((signedin) => !signedin && this.router.navigateByUrl('/'))
    );
  }
}

//IMPORTED IN APP ROUTING MODULE

const routes: Routes = [
  {
    path: 'inbox',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./inbox/inbox.module').then((mod) => mod.InboxModule),
  },
];\`\`\``,
    resolver: `\`\`\`javascript
//RESOLVER
export class EmailResolverService implements Resolve<Email> {
  constructor(private emailService: EmailService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot): Email | Observable<Email> {
    const { id } = route.params;
    return this.emailService.getSingleEmail(id).pipe(
      catchError(() => {
        this.router.navigateByUrl('/inbox/not-found');
        return EMPTY;
      })
    );
  }
}

//RESOLVER ROUTE
const routes: Routes = [
  {
    path: '',
    component: HomeInboxComponent,
    children: [
      { path: '', component: PlaceholderComponent },
      {
        path: ':id',
        component: EmailShowComponent,
        resolve: { email: EmailResolverService },
      },
    ],
  },
];\`\`\``,
    elementRef: `\`\`\`javascript
//APPENDING ELEMENT TO THE BODY
import { ElementRef } from '@angular/core';

ngOnInit(){
  document.body.appendChild(this.el.nativeElement);
}

ngOnDestroy(){
  this.el.nativeElement.remove();
}\`\`\``,
};
