import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { DomainService } from '../game-registration/domain.service';
import { ExotelService } from '../core/auth/exotel.service';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../core/auth/authUser/auth-service.service';
import { getAuth } from 'firebase/auth';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-game-login',
  templateUrl: './game-login.component.html',
  styleUrls: ['./game-login.component.scss']
})
export class GameLoginComponent implements OnInit {
  auth: any
  users: any
  phoneNumber: string = '';
  verificationCode: any;
  hideVerification: boolean = true;
  sendOTPBtnHide = true;
  notRegistered=false
  resendOTPBtnHide = true;
  testOtp = '123456'
  sendOTPBtnTimeDisabled = false;
  consentInput = false;
  subscription: Subscription
  userData: any
  invalidOtp = false;
  loginSpinner: boolean = false;
  constructor(private _authService: AuthServiceService,
    public exotel: ExotelService,
    private afauth: AngularFireAuth,
    private httpClient: HttpClient) { }

  ngOnInit(): void {
  }
  onchangePhone() {
    this.notRegistered=false

    const num: any = [this.phoneNumber];
    if (/^\d{10}$/.test(num)) {
      this.sendOTPBtnHide = false;
    } else {
      this.sendOTPBtnHide = true;
      this.hideVerification = true;
    }
  }
  async sendLoginCode() {
    let data
    await this._authService.getUserFromCollection(this.phoneNumber).then(data => {
      this.subscription = data.subscribe(d => {
        this.userData = d
        if (d.length !== 0) {
          console.log(d)
          this.notRegistered=false
          this.sendOTPBtnHide = true
          this.hideVerification = false;
          const ph = '+91' + this.phoneNumber;
          // this.exotel.createNewOTP(this.phoneNumber);
          setTimeout(() => {
            this.sendOTPBtnHide = false
            this.resendOTPBtnHide = false
          }, 500000)
        }
        else {
          this.notRegistered=true
        }
      })
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  async verifyLoginCode() {
    this.loginSpinner = true
    const ph = '+91' + this.phoneNumber;
    if (this.verificationCode && this.testOtp == this.verificationCode) {
      const firebaseAuthToken = await this.getTokenFromPhone(ph);
      this._authService.loginUsingToken(firebaseAuthToken, ph);
    }
    else {
      this.invalidOtp = true
      this.loginSpinner = false
    }
  }

  async getTokenFromPhone(phone) {
    const endUrl = 'https://asia-south1-thinktac-staging.cloudfunctions.net/add_users_and_get_firebase_login_token_from_phone';
    const formData = {
      phone: phone
    }
    const httpOption: any = {
      responseType: 'application/json'
    };
    return await this.httpClient.post<any>(endUrl, formData, httpOption).toPromise().then((response) => {
      return response
    }).catch(error => {
      return error
    });
  }

}

