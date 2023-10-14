import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { AuthServiceFirestore } from '../core/auth/authUser/auth-service.firestore';
import { AuthServiceService } from '../core/auth/authUser/auth-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

declare const window: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user;
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
userForm:FormGroup
  constructor(
      private authService: AuthServiceService,
      private ngZone: NgZone,
     // private domainService: DomainService,
   //   private consentService: ConsentService,
      private router: Router,
      private formBuilder: FormBuilder,
      private _activatedRoute: ActivatedRoute,
      private afAuth: AngularFireAuth,
     // private _fuseLoadingService: FuseLoadingService,
  ) {
    initializeApp(environment.firebase);

  }
  ngOnInit(): void {
// this.userForm =this.formBuilder.group({
//     otp: ['', Validators.required],
//     phone:['']
//   });
    const auth = getAuth();
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
      this.ngZone.run(() => {
          const auth = getAuth();
          console.log(auth)
          this.windowRef = this.getWindow;
          this.windowRef.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
              'size': 'visible',
              'callback': () => {
                  this.ngZone.run(() => {
                      this.captchaHide = true;
                      this.sendOTPBtnHide = false;
                  });
              },
              'expired-callback': () => {
                  console.error('Expired');
                  this.captchaHide = false;
                  // Response expired. Ask user to solve reCAPTCHA again.
                  // ...
              }
          }, auth);
          this.windowRef.recaptchaVerifier
              .render()
              .then((widgetId) => {
                  this.windowRef.recaptchaWidgetId = widgetId;
              });
      });
  }

  async sendLoginCode() {
      this.invalidOTP = false;
      this.sendOTPBtnTimeDisabled = true;
      const appVerifier = this.windowRef.recaptchaVerifier;
      const num ='+91'+this.phoneNumber;
      (await this.afAuth.settings).appVerificationDisabledForTesting = true;
      this.afAuth
          .signInWithPhoneNumber(num, appVerifier)
          .then((result:any) => {
              this.windowRef.confirmationResult = result;
              this.hideVerification = false;
              this.resendOTPBtnHide = false;
              console.log(result.user.phoneNumber)
              setTimeout(() => {
                  this.sendOTPBtnTimeDisabled = false;
              }, 5000 * 6);
          })
          .catch(error => console.log(error));
  }

  verifyLoginCode() {
      this.disableLoginBtn = true;
      this.windowRef.confirmationResult.confirm(this.verificationCode).then(async (result) => {
        //  await this._authService.updateFirstLogin(result.user);
          this.user = result.user;
          this.authService.setUser(this.user,result.user.phoneNumber);

          // if (await this._authService.isFirstTimeUser() && this.domainService.isRamanDomain()) {
          //     const num = '91' + this.phoneNumber;
          //     await this.consentService.postRegWhatsappMsg(num);
          // }
          this.disableLoginBtn = false;

      })
          .catch((error) => {
              console.error(error.message);
              if (error.code === 'auth/invalid-verification-code') {
                  this.invalidOTP = true;
              }
              this.disableLoginBtn = false;

          });
  }
  getWindow() {
      return window;
  }
  async loginWithPhoneNumber(user) {

      //const checkFirstLogin = await this._authService.isFirstTimeUser()
      // if (checkFirstLogin) {
      //     const userDetails = await this._authService.getFirstLoginUserData(user);
      //     this._authService.addFirstTimeLogin(userDetails)
      // }
      //const loginDetails = await this._authService.getLoginUserData(user);
     // await this._authService.addLogin(loginDetails, user)

      // Navigate to the redirect url
      const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/dashboard';

      //this._fuseLoadingService._setLoadingStatus(true, redirectURL);

      this.router.navigateByUrl(redirectURL);
  }
  onSubmit(){

  }
}
