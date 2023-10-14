import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  CollectionReference,
  QueryFn,
} from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceFirestore } from './auth-service.firestore';
import { BehaviorSubject, Subscription, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  isUserLoggedin: boolean;
  notRegisteredPhone;
  subscription: Subscription;
  gameUser: BehaviorSubject<any> = new BehaviorSubject<any>('');
  innerSubscription: Subscription;
  constructor(
    private _httpClient: HttpClient,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private authFireUsers: AuthServiceFirestore
  ) {
    this.isUserLoggedin = false;
  }

  loginUsingToken(token, phone) {
    this.getUserFromCollection(phone);

    return this.afAuth
      .signInWithCustomToken(token)
      .then((re) => {
        const redirectURL =
          this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/';
        console.log(redirectURL);
        this.isUserLoggedin = true;
        this._router.navigateByUrl(redirectURL);
      })
      .catch((e) => {
        return false;
      });
  }

  setUser(user,phone) {
    //if (user) {
      if(phone=='+917026912304'){
        localStorage.setItem('user',user);

      }
      
     this._router.navigateByUrl('/createArticle');
    // } else {
    //   this._router.navigate)
    // }
  }

  AuthLogin(): boolean {
    let user:any = localStorage.getItem('user')
    if (user!=null) {

      return true
    }
    else {
      return false

    // this._router.navigateByUrl('/game-login')
    }
  }

  getCurrentAuthUser(phone: any) {
    // console.log(phone)
    // const query: QueryFn = (ref: CollectionReference) =>
    //     ref.where('phone', '==' ,phone)
    //     return this.authFireUsers.collection$(query).pipe(take(1),
    //     tap((gameUser: any) => {
    //         if (gameUser.length)
    //             return gameUser
    //         else return false
    //     }))
    // return this.authFireUsers.
  }

  async getUserFromCollection(phone: any): Promise<any> {
    this.authFireUsers.getDatabyParams(phone).subscribe((data: any) => {
      if (data.length != 0) {
        this.gameUser.next(data);
        localStorage.setItem('currentUser', JSON.stringify(data));
      }
    });
    return await this.authFireUsers.getDatabyParams(phone).pipe();
  }

  getAllgames() {
    this.authFireUsers.collection$();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getGameUser(): BehaviorSubject<any> {
    return this.gameUser;
  }
}
