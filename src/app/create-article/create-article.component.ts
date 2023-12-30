import { Component, OnInit ,AfterViewInit} from '@angular/core';
declare var tinymce: any; // Declare the TinyMCE variable

// import * as firebase from 'firebase/app';
// import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
//import 'tinymce/tinymce';
// import { AngularFireStorage } from '@angular/fire/compat/storage';

import {
  AngularFirestore,
  DocumentChangeAction,
} from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment.prod';

import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
// <reference types="tinymce" />
@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent {

  currentTime = Date.now();
  allrr: any = [];
  paragraphTags:any[]=[]
  aiText: any[] = [];
  topicName
  selectedEdit
  changedTags:any[]=[]
  isChecked: boolean = true;
  question: string;
  tags: any = [];
  questions: any[] = [];
  allArtclesdocs: any = [];
  paratagscopy:any[]=[]
  width: number;
  editorContent: string = ''; // Initial content for the editor
  sub: any = [];
  articletoBeModified: any;
  addText:any[]=[]
  height: number;
  tinyMceConfig = {
    // TinyMCE configuration options go here
    // For example:
    height: 500,
    plugins: 'link image code',
    toolbar:
      'undo redo | formatselect | bold italic | alignleft aligncenter alignright | code',
  };
  constructor(
     private firestore: AngularFireStorage,
     public afs: AngularFirestore,
    private router: Router
  ) {
     initializeApp(environment.firebase);
  }
  ngAfterViewInit(): void {
    //this.editorContent = tinymce.editor.getContent();

  }
  async ngOnInit() {
    this.getAllArticlesdocs();

    // const db = firebase.firestore();

  //   tinymce.init({
  //     selector: 'textarea',
  //     plugins:
  //       'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
  //     toolbar:
  //       'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
  //     tinycomments_mode: 'embedded',
  //     tinycomments_author: 'Author name',
  //     mergetags_list: [
  //       { value: 'First.Name', title: 'First Name' },
  //       { value: 'Email', title: 'Email' },
  //     ],
  //     ai_request: (request, respondWith) =>
  //       respondWith.string(() =>
  //         Promise.reject('See docs to implement AI Assistant')
  //       ),
  //  });
  }

  saveText() {
    let textbox=document.getElementById("mytextarea")as HTMLTextAreaElement
    const text=textbox.value
    // console.log(text)
    // const text = tinymce.get('mytextarea').getContent();
    let p = document.getElementById('text-written') as HTMLElement;
    p.innerHTML = text;
    this.saveData(text);
  }

  async saveData(data: string) {
    let dataObject;
    let dataObject1;
    const subject = (document.getElementById('Subject') as HTMLSelectElement)
      .value;
    const topic = (document.getElementById('topic') as HTMLInputElement).value;
    const topicdetails = (
      document.getElementById('topicdetails') as HTMLInputElement
    ).value;
    let grade1 = (document.getElementById('grade') as HTMLSelectElement).value;
    let Page: any = (document.getElementById('Page') as HTMLInputElement).value;

    const result = await this.inspectDocuments(topic);

    // const db = this.firestore;
    const collectionRef = this.afs.collection('articles').doc(subject);
    const formattedText = data.replace(/\n \+/g, '<br>');
    // const question = (document.getElementById('question') as HTMLInputElement)
    // .value;

    let ntopic=topicdetails.split(' ')
    if(ntopic.length>1){
      ntopic.forEach((top:any)=>{
        if(top.includes('|')){
          top.split('|').forEach((t)=>{
            this.tags.push(t);
          })
        }
        else{
          this.tags.push(top)
        }
      })
    }
    else{
      this.tags.push(topic)
    }
  this.addtagsTopage()

    //=---------------------------- Pagination ---------------------------------//

    if (this.articletoBeModified) {
      this.articletoBeModified.Text[Page - 1] = formattedText;
      let maxindex: any[] = [];
      this.articletoBeModified.Text.forEach((text, index) => {
        maxindex.push(index);
      });
      const max = Math.max(...maxindex);
      for (let i = 0; i < max; i++) {
        if (typeof this.articletoBeModified.Text[i] == 'undefined') {
          this.articletoBeModified.Text[i] = '';
        }
      }

      dataObject = {
        [topic]: {
          Text: this.articletoBeModified.Text,
          Topicdetails: topicdetails,
          Subject: subject,
          time: this.currentTime,
          topicName: topic,
          class: grade1,
        },
      };

      dataObject1 = {
        Text: this.addText,
        Topicdetails: topicdetails,
        Subject: subject,
        time: this.currentTime,
        topicName: topic,
        class: grade1,
       questions: this.questions,
      };
    } else {
      let b: any[] = [];
      b.push(formattedText);
      dataObject = {
        [topic]: {
          Text: b,
          Topicdetails: topicdetails,
          Subject: subject,
          time: this.currentTime,
          topicName: topic,
          class: grade1,
        },
      };
      dataObject1 = {
        Text: this.addText,
        Topicdetails: topicdetails,
        Subject: subject,
        time: this.currentTime,
        topicName: topic,
        class: grade1,
       questions: this.questions,
      };
    }
    console.log("dataobkect1")
    console.log(dataObject1)
    //----------------------------------------------------------------------------//
    if (!this.isChecked) {
      if (result) {
        collectionRef
          .update(dataObject)
          .then(() => {
            console.log('Doc wrttien successfully ');
          })
          .catch((error) => {
            console.error('Error adding document: ', error);
          });
      } else {
        collectionRef
          .set(dataObject, { merge: true })
          .then(() => {
            console.log('Document written with ID: ');
          })
          .catch((error) => {
            console.error('Error adding document: ', error);
          });
      }
    } else {
      let index=this.allArtclesdocs[0]['Articledata'].findIndex(e=>e.topicName==dataObject1.topicName)
      if(index>-1){
        this.allArtclesdocs[0]['Articledata'][index]=dataObject1;

      }
      else{
        this.allArtclesdocs[0]['Articledata'].push(dataObject1);

      }
      let data1 = {
        Articledata: this.allArtclesdocs[0]['Articledata'],
      };
      // console.log(data1);
      this.afs
        .collection('articles')
        .doc('AIcollection')
        .set(data1, { merge: true });
      this.savetagList(
        dataObject1,
        index
      );
    }
    this.questions = [];
    this.allArtclesdocs = [];
    this.allrr = [];
    this.getAllArticlesdocs();
    this.sub.forEach((e) => {
      e.unsubscribe();
    });
  }

  savetagList(de, sz) {
   let alltags= this.allArtclesdocs[5]['Tags'].map(t=>t.tag)
    const updatedTags = this.tags.filter(e=>!alltags.includes(e))
    let indexes=this.checkDup(sz)
    let t: any[] = [];
    updatedTags.forEach((tag)=>{
    let obj={
      doc:de.topicName,
      tag:tag
    }
    this.allArtclesdocs[5]['Tags'].push(obj)
  })
    let d = {
      Tags: this.allArtclesdocs[5]['Tags']
    };
    this.afs.collection('articles').doc('tags').set(d, { merge: true }).then(()=>{
      this.tags = [];

    })
  }

  checkDup(sz){
    const indices = this.allArtclesdocs[5]['Tags'].reduce((accumulator, element, index) => {
      if (element === sz) {
        accumulator.push(index);
      }
      return accumulator;
    }, []);
    return indices
  }

  async getAllArticlesdocs() {
    const collectionRef = await this.afs
      .collection('articles')
      .snapshotChanges();
    let sub = collectionRef.subscribe(
      (documentChanges: DocumentChangeAction<any>[]) => {
        documentChanges.forEach((change) => {
          if (change.type === 'added') {
            const documentData = change.payload.doc.data();
            this.allArtclesdocs.push(documentData);
            this.allrr.push(Object.keys(documentData)[0]);
          }
        });
        this.sub.push(sub);
      }
    );
  }

  async inspectDocuments(topic: string) {
    let result = false;
    let d = this.removeDuplicates(this.allrr);
    if (d.includes(topic)) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }

  removeDuplicates(arr) {
    return arr.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
  }

  uploadImage() {
    const fileInput = document.getElementById(
      'imageInput'
    ) as HTMLInputElement | null;
    if (fileInput?.files && fileInput?.files.length > 0) {
      const file = fileInput.files[0];
      this.saveImageData(file);
    } else {
      console.error('No file selected.');
    }
  }

  saveImageData(file: File) {
    const filename = (document.getElementById('filename') as HTMLInputElement)
      .value;
    const storageRef = this.firestore.ref('images/' + filename);
    const uploadTask = storageRef.put(file);
    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe(
            (downloadURL) => {
              console.log('Image uploaded successfully:', downloadURL);
              this.saveImageURLToDatabase(downloadURL, filename);
            },
            (error) => {
              console.error('Error getting download URL:', error);
            }
          );
        })
      )
      .subscribe();
  }

  saveImageURLToDatabase(downloadURL: string, name: string) {
    const imageObject = {
      [name]: {
        imageUrl: downloadURL,
        caption: name,
      },
    };
    const collectionRef = this.afs.collection('images').doc('allArticles');
    collectionRef
      .update(imageObject)
      .then(() => {
        tinymce.activeEditor.execCommand(
          'mceInsertContent',
          false,
          `<img src="${downloadURL}" alt="Image">`
        );
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  }

  async getText() {
    let alldata = this.filterdata();
    let topic = (document.getElementById('topic') as HTMLInputElement).value;
    let subject = (document.getElementById('Subject') as HTMLInputElement)
      .value;
    let Page: any = (document.getElementById('Page') as HTMLInputElement).value;

    alldata.forEach((e: any) => {
      if (e.Subject == subject && e.topicName == topic) {
        (document.getElementById('topicdetails') as HTMLInputElement).value =
          e.Topicdetails;
        tinymce.get('mytextarea').setContent(e.Text[Page - 1]);
        this.articletoBeModified = e;
      }
    });
  }

  filterdata() {
    let result: any = [];
    this.allArtclesdocs.forEach((doc) => {
      let keys = Object.keys( doc);
      for (const el in doc) {
        result.push(doc[el]);
      }
    });
    return result;
  }

  addQuestion() {
    // const question = (document.getElementById('question') as HTMLInputElement)
    //   .value;
    let Page: any = (document.getElementById('Page') as HTMLInputElement).value;
   // this.tags.push(question);
    //this.questions[Page - 1] = question;
  }

  Logout() {
    this.router.navigateByUrl('/logout');
  }

  checkCheckboxState() {
    if (this.isChecked) {
      console.log('Checkbox is checked');
    } else {
      console.log('Checkbox is not checked');
    }
  }

  addtagsTopage() {
    let Page: any = (document.getElementById('Page') as HTMLInputElement).value;
    this.questions[Page - 1] = this.tags.join(',');
  }

  addExtraText(){
    //const text = tinymce.get('mytextarea').getContent();
    let textbox=document.getElementById("mytextarea")as HTMLTextAreaElement
    const text=textbox.value
    const formattedText = text.replace(/\n \+/g, '<br>');
    let topic = (document.getElementById('topic') as HTMLInputElement).value;
    const topicdetails = (
      document.getElementById('topicdetails') as HTMLInputElement
    ).value;
    // let valNo:any= (document.getElementById('paraNo') as HTMLInputElement).value
    if(topicdetails.includes('|')){
      topicdetails.split('|').forEach((e)=>{
        this.paragraphTags.push(e)
      })
    }
    else{
      this.paragraphTags.push(topicdetails)

    }
    let stringgen=this.paragraphTags.join(',')
this.paratagscopy=this.paragraphTags
    let html=`<p id=mmrg style="display: none;">${stringgen}</p>`

    this.addText.push(formattedText+html)
    this.topicName=topic

  }

  EditInAI(){
    let index
    let selectelm
    const topic = (document.getElementById('topic') as HTMLInputElement).value;
    let Page: any = (document.getElementById('Page') as HTMLInputElement).value;
    let texthtml: any = (document.getElementById('jj') as HTMLElement);

    this.allArtclesdocs[0]['Articledata'].forEach((h)=>{
      if(h.topicName==topic){
        selectelm=h
        this.selectedEdit=selectelm
      }
    })
    if(document.getElementById('topicdetails') as HTMLInputElement){
      (document.getElementById('topicdetails') as HTMLInputElement).value=this.selectedEdit.Topicdetails

    }
    texthtml.innerHTML=selectelm.Text[Page-1]
    let ptag=(document.getElementById('mmrg') as HTMLElement)
    if(typeof(document.getElementById('mmrg'))!=='undefined'&& document.getElementById('mmrg')!==null){

    ptag.style.display='block'
    let textbox=document.getElementById("mytextarea")as HTMLTextAreaElement
    textbox.value=texthtml.innerHTML
   // tinymce.get('mytextarea').setContent(texthtml.innerHTML);
    }

  }

  addtagstopara(){
   let val= (document.getElementById('tags') as HTMLInputElement).value
  //  this.paragraphTags.push(val)
  //  this.tags.push(val)
  val.split(' ').forEach((e)=>{
    this.paragraphTags.push(e)
    this.tags.push(e)
  })
  }

  submitEdit(){
    let ptag
    let html=``
    let arrtags:any[]=[]
    let allhtml=``

    let Page: any = (document.getElementById('Page') as HTMLInputElement).value;
    const topicdetails = (
      document.getElementById('topicdetails') as HTMLInputElement
    ).value;
    this.selectedEdit.Topicdetails=topicdetails
    let texthtml: any = (document.getElementById('jj') as HTMLElement);
    // texthtml.innerHTML=tinymce.get('mytextarea').getContent();
    let textbox=document.getElementById("mytextarea")as HTMLTextAreaElement
    const parser1 = new DOMParser()
      const parsedHTML = parser1.parseFromString(textbox.value, 'text/html');
      texthtml.innerHTML=textbox.value

    if(typeof(document.getElementById('mmrg'))!=='undefined'&& document.getElementById('mmrg')!==null){
        (document.getElementById('mmrg') as HTMLElement).style.display='none'
        ptag=(document.getElementById('mmrg') as HTMLElement).innerText
    arrtags=ptag.split(' ')
    this.changedTags=arrtags
    }
    else{
      let stringgen=this.paragraphTags.join(',')
      html=`<p id=mmrg style="display: none;">${stringgen}</p>`
      arrtags=this.paratagscopy
      this.changedTags=arrtags

    }

    let questiontags:any[]=[]
    if(this.selectedEdit.questions){
      if(this.selectedEdit.questions[0].includes(',')){
        questiontags=this.selectedEdit.questions[0].split(',')

      }
      else if(this.selectedEdit.questions[0].includes('|')){
      questiontags=this.selectedEdit.questions[0].split('|')

      }
      else{
        questiontags=this.selectedEdit.questions[0].split(' ')

      }
    }
    else{
      //this.selectedEdit['questions'][0]=this.paragraphTags
      questiontags=this.paratagscopy
      // if(this.selectedEdit.questions[0].includes(',')){
      //   questiontags=this.selectedEdit.questions[0].split(',')

      // }
      // else if(this.selectedEdit.questions[0].includes('|')){
      // questiontags=this.selectedEdit.questions[0].split('|')

      // }
      // else{
      //   questiontags=this.selectedEdit.questions[0].split(' ')

      // }
    }

let allchangedTag:any[]=[]
    const parser = new DOMParser()
    this.selectedEdit.Text.forEach((text)=>{
      const parsedHTML = parser.parseFromString(text, 'text/html');
      const mmrgPTag = parsedHTML.getElementById('mmrg');
      if(mmrgPTag?.innerText.includes(',')){
        mmrgPTag?.innerText.split(',').forEach((t)=>{
          allchangedTag.push(t)
        })
      }
    })
    let  j=this.removeDuplicates(allchangedTag)
    let filteredtags=arrtags[0].split(',').filter(e=>!j.includes(e))
let resultantTags=this.removeDuplicates(filteredtags.concat(j)).join(',')
if(this.selectedEdit.questions){
  this.selectedEdit.questions[0]=resultantTags

}
else{
  let b:any[]=[]
  b.push(resultantTags)
  this.selectedEdit['questions']=resultantTags
}
    this.selectedEdit.Text[Page-1]=texthtml.innerHTML+html
    this.paragraphTags=[]
  }

  completeEditsubmit(){

    let index=this.allArtclesdocs[0]['Articledata'].findIndex(e=>e.topicName==this.selectedEdit.topicName)
    if(index>-1){
      this.allArtclesdocs[0]['Articledata'][index]=this.selectedEdit;

    }
    else{
      this.allArtclesdocs[0]['Articledata'].push(this.selectedEdit);

    }
    let data1 = {
      Articledata: this.allArtclesdocs[0]['Articledata'],
    };
    this.afs
      .collection('articles')
      .doc('AIcollection')
      .set(data1, { merge: true });
    this.savetagnewTags(
      this.selectedEdit
    );

    this.paragraphTags=[]

  }


  savetagnewTags(selectedData){
    let alltags= this.allArtclesdocs[5]['Tags'].map(t=>t.tag)
    let filtertags=this.allArtclesdocs[5]['Tags'].filter(e=>e.doc!=selectedData.topicName)
    let filtertags1=this.allArtclesdocs[5]['Tags'].filter(e=>e.doc==selectedData.topicName)

    let changedquestionTags:any[]=[]
    if(this.selectedEdit.questions){
    changedquestionTags=selectedData.questions[0].split(',')

    }
    else{
      changedquestionTags=filtertags1

    }

   // this.allArtclesdocs[5]['Tags']=this.allArtclesdocs[5]['Tags'].filter(e=>e.doc!=selectedData.topicName)
    const updatedTags = this.changedTags.filter(e=>!alltags.includes(e))
    // console.log(changedquestionTags)
    // console.log(filtertags)

    changedquestionTags.forEach((tag)=>{
      let ntag
      if(tag.includes('[')){
ntag=tag.split('[')[1]
      }
      else{
        ntag=tag
      }


      let obj={
        doc:selectedData.topicName,
        tag:ntag
      }
      filtertags.push(obj)
    })
      let d = {
        Tags: filtertags
      };
      this.afs.collection('articles').doc('tags').set(d, { merge: true }).then(()=>{
        this.changedTags = [];

      })
  }




}
