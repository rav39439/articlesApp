import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ConfigurationsFirestore } from './configuration.firestore';
import { ReplaySubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  constructor(
    private configureFirestore: ConfigurationsFirestore,
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
   
  ) { }
  public boardListSub = new BehaviorSubject(null)
  public chainSub = new BehaviorSubject(null)
  public subjectsSub = new BehaviorSubject(null)
  public languageListSub = new BehaviorSubject(null)
  public institutionTypesListSub = new BehaviorSubject(null)
  public defaultsProgrammes = new BehaviorSubject(null)

  // async getProgrammeByBGS(boardName, grade, subject) {
  //   const defaultProg = await this.configureFirestore.getDocDataByDocId('programmes')
  //   const programme = defaultProg['defaults']['defaultProgramme']?.[`${grade}-Science`]
  //   // const programme = defaultProg['defaults']?.[boardName]?.[`${grade}-${subject}`] || defaultProg['defaults']['defaultProgramme']
  //   return programme
  // }



  // getAllConfigure() {
  //   this.getBoardList('BoardListAll')
  //   this.getLanguageList('Languages')
  //   this.getInstituteTypesList('InstitutionTypes')
  //   /*  this.getBoardList('BoardListAll');
  //   this.getLanguageList('Languages');
  //   this.getInstituteTypesList('InstitutionTypes'); */
  // }

  // getInstitutesChainInfo(){
  //   return this.configureFirestore.doc$('InstitutionChains').pipe(take(1)).subscribe(d => {
  //     this.chainSub.next(d.chainsInfo)
  //   })
  // }

  // setInstitutesChainInfo(value){
  //   return this.configureFirestore.update(value, 'InstitutionChains')
  // }
  // getBoardList(id) {
  //   return this.configureFirestore.doc$(id).pipe(take(1)).subscribe(d => {
  //     this.boardListSub.next(d.boards)
  //   })
  // }
  // getLanguageList(id) {
  //   return this.configureFirestore.doc$(id).pipe(take(1)).subscribe(d => {
  //     this.languageListSub.next(d.langTypes)
  //   })
  // }
  // getInstituteTypesList(id) {
  //   return this.configureFirestore.doc$(id).pipe(take(1)).subscribe(d => {
  //     this.institutionTypesListSub.next(d.InstitutionTypes)
  //   })
  // }

  // getSubjects() {
  //   return this.configureFirestore.doc$('subjects').pipe(take(1)).subscribe(d => {
  //     this.subjectsSub.next(d.subjectsNames)
  //   })
  // }
  // getDoc(id) {
  //   return this.configureFirestore.doc$(id).pipe(take(1)).subscribe(d => {
  //     return this.subjectsSub.next(d)
  //   })
  // }

 
  async getEmailUpdateTemplate() {
    return await this.configureFirestore.getDocDataByDocId('email_otp_for_profile_update_teachersCorner');
  }

 AddNotifications(templateChnage,emailTemplate,email){
  this.afs.collection('EmailNotifications').add({
    message: {
      // html: this.mailTemplate['html'],
      html: templateChnage,
      subject: emailTemplate['subject'],
    },
    to: email,
  }).catch(err => {
    console.error(err);
  });

}


}
