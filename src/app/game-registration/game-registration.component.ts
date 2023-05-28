import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExotelService } from '../core/auth/exotel.service';
import { ActivatedRoute } from '@angular/router';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ConfigurationService } from '../core/configuration/configuration.service';
import { GameUserService } from '../gameUsers/game-user.service';

@Component({
  selector: 'app-game-registration',
  templateUrl: './game-registration.component.html',
  styleUrls: ['./game-registration.component.scss']
})
export class GameRegistrationComponent  {
infoForm: FormGroup;
studentsProfiles: any[] = []
auth: any
testOtp: number = 123456
phoneNumber: string = '';
user
isserverError: boolean = false
serverError: { code: string, message: string } = { code: "", message: "" }
currentUser
studentId: any
phone: string;
email: string;
firstname: string
lastname: string;
profiles$: any
btnDisabled: boolean = true
//----------Phone Verification------//
phoneVerification: {
  hideSubmitbtn: boolean, numberChanged: boolean, userInputOtp: string,isPhoneVerified:boolean
  , disablePhoneInput: boolean, hideVerification: boolean, disableSubmit: boolean, hideResendbtn: boolean
  , editPhoneAftersubmit
} = {
    hideSubmitbtn: true,
    numberChanged: false,
    userInputOtp: "",
    disablePhoneInput: false,
    hideVerification: true,
    disableSubmit: true,
    hideResendbtn: true,
    editPhoneAftersubmit: false,
    isPhoneVerified:false
  }
userInputOtp: any = ""
timeOut: any
verificationEmailCode: number;
otpSend: number
phoneAuthError: { code: string, message: string } = { code: "", message: "" }
isphoneAuthError: boolean;
emailInput: string = ""
emailLinkTimeout: any
emailTemplate;

constructor(
 private gameUsers:GameUserService,
  private exotel: ExotelService,
  private fb: FormBuilder,
  private httpClient: HttpClient,
  private route: ActivatedRoute,
  private configurationService: ConfigurationService,

) {
  // this.user = data.currentUser
}

async ngOnInit(): Promise<void> {
  this.setForm()
  this.phone = this.user?.teacherMeta?.phone
  this.email = this.user?.teacherMeta?.email
  this.firstname = this.user?.teacherMeta?.firstName
  this.lastname = this.user?.teacherMeta?.lastName
  this.phoneNumber = this.user?.teacherMeta?.phone.split("+91")[1]
  this.emailInput = this.user?.teacherMeta?.email
  let obj = {
    firstName: this.firstname,
    email: this.email,
    lastName: this.lastname,
    phone: this.phoneNumber
  }
  this.infoForm.valueChanges.subscribe(x => {
    if ((x.firstName != obj.firstName) || (x.lastName != obj.lastName)) {
      this.btnDisabled = false
    }
    else {
      this.btnDisabled = true
    }
  })
  const template:any = await this.configurationService.getEmailUpdateTemplate();
  this.emailTemplate = template['mailTemplate'];
}

onSubmit(infoForm:any) {
  const data = {
    firstName: this.infoForm.value.firstName,
    lastName: this.infoForm.value.lastName,
    name: this.infoForm.value.firstName + " " + this.infoForm.value.lastName,
    phone:this.phoneNumber,
    gameState:this.infoForm.value.gameData
  }
  const value = {
    GameData: data
  }
  console.log(value)
   if(this.phoneVerification.isPhoneVerified){
    this.gameUsers.AddnewGameUser(data)

    alert("Your profile is created")
}
else{
  alert("first verify your phone number")
}
}

//-------------Phone Verification------------//
/* Exotel sms verification */
async verifyPhoneNumber() {
  const ph = '+91' + this.phoneNumber;
  if (this.userInputOtp && this.testOtp == this.userInputOtp) {
    if (true) {
      this.isphoneAuthError = false
      this.phoneVerification.hideVerification = true
      this.phoneVerification.numberChanged = false
      this.phoneVerification.editPhoneAftersubmit = false
      this.phoneVerification.disablePhoneInput = false
      clearTimeout(this.timeOut)
      this.phoneVerification.hideResendbtn = true
      const teacherMeta = {
        phone: ph
      }
      const value = {
        teacherMeta: teacherMeta
      }
      const studentPhone = {
        studentMeta: teacherMeta
      }
      this.phoneVerification.isPhoneVerified=true
      // this.teacherService.updateTeacher(value, this.user.docId)
      // this.userService.updateLoginUser(teacherMeta, this.user.docId)
      // this.studentsProfiles.forEach(student => {
      //   this.studentService.updateStudent(studentPhone, student.docId)
      // });
      alert("Your phone number is verified")
      // this.uiService.alertMessage('Updated', 'Successfully Updated', 'success')
      const token = await this.getTokenFromPhone(ph);
     // this.authService.loginUsingToken(token)
    } else {
       //this.isphoneAuthError = true
      // this.handlePhoneServerError(response.err)
    }
    this.btnDisabled = false
  }
  else {
    alert("oops wrong otp")
 }
}

phoneChange(e:any) {
  const value = "+91" + e.target.value
  this.phoneVerification.hideSubmitbtn = false
  this.phoneVerification.hideResendbtn = true
  let isnum = /^\d+$/.test(value.split("+")[1]);
  if (!isnum || value.length < 13) {
    this.phoneVerification.disableSubmit = true
  }
  else {
    this.phoneVerification.disableSubmit = false
  }
  if (value != this.phone) {
    this.phoneVerification.hideSubmitbtn = false
    this.phoneVerification.numberChanged = true
  } else {
    this.phoneVerification.hideSubmitbtn = true
    this.phoneVerification.numberChanged = false
  }
}

isNumeric(str: string): boolean {
  return /^\d+$/.test(str);
}
handlePhoneServerError(error:any) {
  console.log(error.code)
  switch (error.code) {
    case 'auth/phone-number-already-exists': {
      this.phoneAuthError.code = "already registered";
      this.phoneAuthError.message = "User is already registered"
      break;
    }
    case 'already registered':
      this.phoneAuthError.code = "already registered";
      this.phoneAuthError.message = "User is already registered"
      break;
  }
}

async updatePhoneNumber(ph:any, uid:any): Promise<any> {
  const endUrl = 'https://asia-south1-thinktac-staging.cloudfunctions.net/update_user_profile';

  // const endUrl = 'http://localhost:5000/thinktac-staging/asia-south1/update_user_profile';
  const formData = {
    userUid: uid,
    phone: ph
  }
  const response = this.httpClient.post<any>(endUrl, formData).toPromise().then((res) => {
    return res
  })
  return response;
}

getVerificationCode(e: any) {
  this.userInputOtp = e.target.value
}

async sendOTP() {
  const result = await this.checkPhoneNumberinAuth()
  if (!result.error) {
    this.phoneVerification.editPhoneAftersubmit = true
    this.phoneVerification.disablePhoneInput = true
    this.phoneVerification.numberChanged = true
    this.phoneVerification.hideSubmitbtn = true
    this.phoneVerification.hideVerification = false
    this.phoneVerification.hideResendbtn = true
    // this.btnDisabled = true
    this.isphoneAuthError=false
    const ph = '+91' + this.phoneNumber;
    //this.exotel.createNewOTP(this.phoneNumber);
    this.timeOut = setTimeout(() => {
      this.phoneVerification.hideVerification = true
      this.phoneVerification.hideSubmitbtn = false
      this.phoneVerification.hideResendbtn = false
    }, 100000)
  }
  else {
    this.isphoneAuthError = true
    this.handlePhoneServerError(result)
  }
}

editPhonenumber() {
  this.phoneVerification.hideSubmitbtn = false;
  this.phoneVerification.hideVerification = true;
  this.phoneVerification.editPhoneAftersubmit = false
  this.phoneVerification.disablePhoneInput = false
  this.phoneVerification.hideResendbtn = true
  this.phoneVerification.disableSubmit = true
  this.isphoneAuthError = false
  clearTimeout(this.timeOut)
}

async checkPhoneNumberinAuth(): Promise<any> {
  const ph = '+91' + this.phoneNumber;
  const body = {
    test: "test",
    phone: ph
  }
  const endUrl = 'https://asia-south1-thinktac-staging.cloudfunctions.net/update_user_profile';
  // const endUrl = 'http://localhost:5000/thinktac-staging/asia-south1/update_user_profile';
  const response = await this.httpClient.post<any>(endUrl, body).toPromise().then((res) => {
    console.log(res)
    return res
  })
  return response;
}



ngOnDestroy(): void {
}

setForm() {
  this.infoForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gameData:[[]],
    phone: ['', Validators.required],
  });
}

async getTokenFromPhone(phone:any) {
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


