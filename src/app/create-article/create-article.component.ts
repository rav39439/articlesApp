/// <reference types="tinymce" />
import { Component, OnInit } from '@angular/core';
declare var tinymce: any; // Declare the TinyMCE variable

// import * as firebase from 'firebase/app';
// import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
import 'firebase/firestore';
import 'tinymce/tinymce';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { AngularFireModule } from '@angular/fire/compat';
import {
  AngularFirestore,
  AngularFirestoreModule,
  DocumentChangeAction,
} from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment.prod';
import { finalize, firstValueFrom, merge } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
})
export class CreateArticleComponent implements OnInit {
  currentTime = Date.now();
  allrr: any = [];
  aiText: any[] = [];
  isChecked: boolean = true;
  question: string;
  tags: any = [];
  questions: any[] = [];
  allArtclesdocs: any = [];
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
    protected afs: AngularFirestore,
    private router: Router
  ) {
    initializeApp(environment.firebase);
  }
  async ngOnInit() {
    this.getAllArticlesdocs();
    tinymce.init({
      selector: 'textarea',
      plugins:
        'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
      toolbar:
        'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
      tinycomments_mode: 'embedded',
      tinycomments_author: 'Author name',
      mergetags_list: [
        { value: 'First.Name', title: 'First Name' },
        { value: 'Email', title: 'Email' },
      ],
      ai_request: (request, respondWith) =>
        respondWith.string(() =>
          Promise.reject('See docs to implement AI Assistant')
        ),
    });
    //     const upRef = (document.getElementById('AI') as HTMLSelectElement).value;
    // console.log(upRef)
    // console.log(await this.getAIdata())
    // throw new Error('Method not implemented.');
  }

  saveText() {
    const text = tinymce.get('mytextarea').getContent();
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

    const db = this.firestore;
    const collectionRef = this.afs.collection('articles').doc(subject);
    const formattedText = data.replace(/\n \+/g, '<br>');
//this.addText.push(formattedText)
    // const dataObject = {
    //   [topic]: {
    //     Text: formattedText,
    //     Topicdetails: topicdetails,
    //     Subject: subject,
    //     time: this.currentTime,
    //     topicName: topic,
    //     class:grade1

    //   }
    // };

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
    //----------------------------------------------------------------------------//
    if (!this.isChecked) {
      if (result) {
        collectionRef
          .update(dataObject)
          .then(() => {
            console.log('Document written with ID: ');
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
      console.log(data1);
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

    let indexes=this.checkDup(sz)
    let t: any[] = [];
  this.tags.forEach((tag)=>{
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
    const db = this.firestore;
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
    //  setTimeout(()=>{
    //   console.log(this.allArtclesdocs)
    //  },7000)
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
    return arr.filter((value, index, self) => self.indexOf(value) === index);
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
    const question = (document.getElementById('question') as HTMLInputElement)
      .value;
    let Page: any = (document.getElementById('Page') as HTMLInputElement).value;
    this.tags.push(question);
    this.questions[Page - 1] = question;
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
    // this.tags = [];
  }

  addExtraText(){
    const text = tinymce.get('mytextarea').getContent();
    const formattedText = text.replace(/\n \+/g, '<br>');

    this.addText.push(formattedText)
  }

  EditInAI(){
    let index
    const topic = (document.getElementById('topic') as HTMLInputElement).value;

    index=this.allArtclesdocs[0]['Articledata'].findIndex(e=>e.topicName==topic)


    (document.getElementById('grade') as HTMLSelectElement).value=this.allArtclesdocs[0]['Articledata'][index].grade
    (document.getElementById('topicdetails') as HTMLSelectElement).value=this.allArtclesdocs[0]['Articledata'][index].topicdetails
    (document.getElementById('mytextarea') as HTMLSelectElement).value=this.allArtclesdocs[0]['Articledata'][index].Text
    (document.getElementById('question') as HTMLSelectElement).value=this.allArtclesdocs[0]['Articledata'][index].questions


  }

}
