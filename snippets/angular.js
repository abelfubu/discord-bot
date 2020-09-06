"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.angularSnippets = void 0;
const discord_js_1 = require("discord.js");
const helpMsg = new discord_js_1.MessageEmbed()
    .setColor('#dd0031')
    .setTitle('Angular')
    .setURL('https://angular.io/')
    .setDescription('Angular code snippets')
    .setThumbnail('https://angular.io/assets/images/logos/angular/logo-nav@2x.png')
    .addFields({
    name: '$angular elementRef',
    value: 'https://angular.io/api/core/ElementRef',
}, { name: '$angular guard', value: 'https://angular.io/api/router' }, {
    name: '$angular interceptor',
    value: 'https://angular.io/api/common/http/HttpInterceptor',
}, { name: '$angular jwt', value: 'https://github.com/auth0/angular2-jwt' }, {
    name: '$angular lazy',
    value: 'https://angular.io/api/router/LoadChildrenCallback',
}, {
    name: '$angular resolver',
    value: 'https://angular.io/api/router/Resolve',
}, {
    name: '$angular theme',
    value: 'https://material.angular.io/guide/theming',
})
    .setTimestamp()
    .setFooter('Javascript code snippets');
exports.angularSnippets = (snippet) => {
    switch (snippet) {
        case 'lazy':
            return angular.lazy;
        case 'theme':
            return angular.theme;
        case 'jwt':
            return angular.jwt;
        case 'interceptor':
            return angular.interceptor;
        case 'guard':
            return angular.guard;
        case 'resolver':
            return angular.resolver;
        case 'elementRef':
            return angular.elementRef;
        default:
            return helpMsg;
    }
};
const angular = {
    example: `\`\`\`javascript
  
    \`\`\``,
    theme: `\`\`\`javascript
@import '~@angular/material/theming';

@include mat-core();

$primary: mat-palette($mat-indigo);
$accent:  mat-palette($mat-pink, A200, A100, A400);

$warn:    mat-palette($mat-red);

$theme: mat-light-theme((
  color: (
    primary: $primary,
    accent: $accent,
    warn: $warn,  
  )
));  
@include angular-material-theme($theme);\`\`\``,
    jwt: `\`\`\`javascript
import { JwtHelperService } from "@auth0/angular-jwt";

const helper = new JwtHelperService();

const decodedToken = helper.decodeToken(myRawToken);
const expirationDate = helper.getTokenExpirationDate(myRawToken);
const isExpired = helper.isTokenExpired(myRawToken);\`\`\``,
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
