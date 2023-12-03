
import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
//import { AuthServiceFirestore } from '../core/auth/authUser/auth-service.firestore';
// import { AuthServiceService } from '../core/auth/authUser/auth-service.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

declare const window: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user;
  myAuth;
  windowRef: any;
  phoneNumber: string = '';
  verificationCode: string;
  invalidOTP = false;
  userEmail: any;
  hideVerification: boolean = true;
  phoneNumValidity = false;
  captchaHide: boolean = true;
  sendOTPBtnHide = true;
  resendOTPBtnHide = true;
  sendOTPBtnTimeDisabled = false;
  consentInput = false;
  ramanUI = false;
  disableLoginBtn = false;
  selectedCountryCode: string = '+91';
  userForm: FormGroup;
  constructor(
    // private authService: AuthServiceService,
    private ngZone: NgZone,
    // private domainService: DomainService,
    //   private consentService: ConsentService,
    private router: Router,
    private formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private afAuth: AngularFireAuth
  ) // private _fuseLoadingService: FuseLoadingService,
  {
    initializeApp(environment.firebase);
  }
  ngOnInit(): void {
    // this.userForm =this.formBuilder.group({
    //     otp: ['', Validators.required],
    //     phone:['']
    //   });

    const auth = getAuth();
    this.myAuth = auth;
    console.log(this.myAuth);
    console.log(this.afAuth);

    this.getCaptchaWidgetId();

    // const domain = this.domainService.getDomain();
    // if (!domain.includes('raman')) {
    //     this.ramanUI = true;
    // }
  }

  onchangePhone() {
    const num: any = [this.phoneNumber];
    if (/^\d{10}$/.test(num)) {
      this.captchaHide = false;
    } else {
      this.captchaHide = true;
      this.sendOTPBtnHide = true;
      this.hideVerification = true;
    }
  }

  getCaptchaWidgetId() {
    // this.ngZone.run(() => {
    //   const auth = getAuth();

    //   this.windowRef = this.getWindow;
    //   this.windowRef.recaptchaVerifier = new RecaptchaVerifier(
    //     'recaptcha-container',
    //     {
    //       size: 'visible',
    //       callback: () => {
    //         this.ngZone.run(() => {
    //           this.captchaHide = true;
               this.sendOTPBtnHide = false;
    //         });
    //       },
    //       'expired-callback': () => {
    //         console.error('Expired');
    //         this.captchaHide = false;
    //         // Response expired. Ask user to solve reCAPTCHA again.
    //         // ...
    //       },
    //     },
    //     auth
    //   );
    //   this.windowRef.recaptchaVerifier.render().then((widgetId) => {
    //     this.windowRef.recaptchaWidgetId = widgetId;
    //   });
    // });
  }

  async sendLoginCode() {
    this.invalidOTP = false;
    this.sendOTPBtnTimeDisabled = true;
    // const appVerifier = this.windowRef.recaptchaVerifier;
    const num = '+91' + this.phoneNumber;
if(this.phoneNumber=='7026912304'){
        this.hideVerification = false;
        // this.windowRef?.confirmationResult---------Add

}
    // signInWithPhoneNumber(this.myAuth, num, appVerifier)
    //   .then((result: any) => {
    //     this.windowRef.confirmationResult = result;
    //     this.hideVerification = false;
    //     this.resendOTPBtnHide = false;
    //     setTimeout(() => {
    //       this.sendOTPBtnTimeDisabled = false;
    //     }, 5000 * 6);
    //   })
    //   .catch((error) => console.log(error));
  }

  verifyLoginCode() {
    this.disableLoginBtn = true;
    if(this.verificationCode=='ravrav678#'){
      let n={
        name:"BoT",
        RegNo:'88893874'
      }
      localStorage.setItem('user', JSON.stringify(n));
      setTimeout(()=>{
        this.router.navigateByUrl('/createArticle');
      

      },2000)
    }
    // this.windowRef.confirmationResult
    //   .confirm(this.verificationCode)
    //   .then(async (result) => {
    //     this.user = result.user;

    //     if (this.phoneNumber =='7026912304') {
    //       localStorage.setItem('user', result.user);
    //       this.router.navigateByUrl('/createArticle');
    //     }
    //     this.disableLoginBtn = false;
    //     this.disableLoginBtn = false;
    //   })
    //   .catch((error) => {
    //     console.error(error.message);
    //     if (error.code === 'auth/invalid-verification-code') {
    //       this.invalidOTP = true;
    //     }
    //     this.disableLoginBtn = false;
    //   });
  }
  getWindow() {
    return window;
  }
  async loginWithPhoneNumber(user:any) {
    // Navigate to the redirect url
    const redirectURL =
      this._activatedRoute.snapshot.queryParamMap.get('redirectURL') ||
      '/dashboard';

    //this._fuseLoadingService._setLoadingStatus(true, redirectURL);

    this.router.navigateByUrl(redirectURL);
  }
  onSubmit() {}
}
