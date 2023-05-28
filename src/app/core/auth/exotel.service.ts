import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExotelService {
  otp: number
  constructor(
    private afFun: AngularFireFunctions

  ) { }

  generateOtp = function (size:any) {
    const zeros = '0'.repeat(size - 1);
    const x = parseFloat('1' + zeros);
    const y = parseFloat('9' + zeros);
    const confirmationCode = Math.floor(x + Math.random() * y);
    return confirmationCode;
  }

  async sendSms(exotelData:any) {
    // this.afFun.useFunctionsEmulator("http://localhost:5000/thinktac-staging/asia-south1/get_user_login_token_from_phone")
    let req = await this.afFun.httpsCallable('exotelSms')(exotelData)
    await lastValueFrom(req).then(res => {
      console.log(res);
    }).catch(er => console.error(er))
  }


  async createOTP(phone:any) {
    this.otp = this.generateOtp(6)
    let exotelData = {
      // docPath: d.path + '/Communications/welcome',
      To: phone,
      Body: `${this.otp.toString()} is your OTP to log in to ThinkTac's Teacher Corner Platform. Your OTP is valid for 5 minutes. -ThinkTac`,
      DltTemplateId: '1107167394121275027'
    }
    this.sendSms(exotelData)
  }

  async createNewOTP(phone:any) {
    this.otp = this.generateOtp(6)
    let exotelData = {
      // docPath: d.path + '/Communications/welcome',
      To: phone,
      Body: `${this.otp.toString()} is your OTP to change your registered mobile number on
       ThinkTac's UnLab Platform. Your OTP is valid for 5 minutes.-ThinkTac`,
      DltTemplateId: '1107167577387467790'
    }
    this.sendSms(exotelData)
  }


}



