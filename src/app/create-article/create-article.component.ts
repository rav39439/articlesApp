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
import { AngularFirestore, AngularFirestoreModule, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment.prod';
import { finalize, firstValueFrom, merge } from 'rxjs';
@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {
  currentTime = Date.now();
allrr:any=[]
  allArtclesdocs:any=[]
  width: number;
  editorContent: string = ''; // Initial content for the editor
sub:any=[]
articletoBeModified:any
  height: number;
  tinyMceConfig = {
    // TinyMCE configuration options go here
    // For example:
    height: 500,
    plugins: 'link image code',
    toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | code'
  };
  constructor(
    private firestore: AngularFireStorage,
    protected afs: AngularFirestore,

  ) {

    initializeApp(environment.firebase);
  }
  ngOnInit(): void {

    this.getAllArticlesdocs()
    tinymce.init({
      selector: 'textarea',
      plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
      toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
      tinycomments_mode: 'embedded',
      tinycomments_author: 'Author name',
      mergetags_list: [
        { value: 'First.Name', title: 'First Name' },
        { value: 'Email', title: 'Email' },
      ],
      ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant"))
    });
    // throw new Error('Method not implemented.');
  }

  saveText() {
    const text = tinymce.get('mytextarea').getContent();
    let p = document.getElementById('text-written') as HTMLElement
    p.innerHTML = text;
    this.saveData(text);
  }

  async saveData(data: string) {
    let dataObject
    const subject = (document.getElementById('Subject') as HTMLSelectElement).value;
    const topic = (document.getElementById('topic') as HTMLInputElement).value;
    const topicdetails = (document.getElementById('topicdetails') as HTMLInputElement).value;
    let grade1 = (document.getElementById('grade')as HTMLSelectElement).value
    let Page:any =(document.getElementById('Page')as HTMLInputElement).value


    const result = await this.inspectDocuments(topic);

      const db = this.firestore;
      const collectionRef = this.afs.collection('articles').doc(subject);
      const formattedText = data.replace(/\n \+/g, '<br>');

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
  this.articletoBeModified.Text[Page - 1] = formattedText
  let highestIndex = -1; // Initialize with a value that's less than any valid array index
  let maxindex:any[] = []
  this.articletoBeModified.Text.forEach((text, index) => {                    // if (typeof articletoBeModified[i] !== 'undefined' && i > highestIndex) {
      //     highestIndex = i;
      // }
      maxindex.push(index)
  })
  const max = Math.max(...maxindex);
  console.log(max)
  for (let i = 0; i < 9; i++) {
      if (typeof (this.articletoBeModified.Text[i]) == 'undefined') {

          this.articletoBeModified.Text[i] = ''
      }
  }

  dataObject = {
      [topic]: {
          Text: this.articletoBeModified.Text,
          Topicdetails: topicdetails,
          Subject: subject,
          time: this.currentTime,
          topicName: topic,
          class: grade1
      }

  };
}
else {
  let b:any[] = []
  b.push(formattedText)
  dataObject = {
      [topic]: {
          Text: b,
          Topicdetails: topicdetails,
          Subject: subject,
          time: this.currentTime,
          topicName: topic,
          class: grade1
      }
  };
}





//----------------------------------------------------------------------------//




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
          .set(dataObject,{merge:true})
          .then(() => {
            console.log('Document written with ID: ');
          })
          .catch((error) => {
            console.error('Error adding document: ', error);
          });
      }
      this.sub.forEach((e)=>{
        e.unsubscribe()
      })
    this.allArtclesdocs=[]
    this.allrr=[]
    this.getAllArticlesdocs()

  }

  async getAllArticlesdocs(){
    const db = this.firestore;
    const collectionRef = await this.afs.collection('articles').snapshotChanges();
     let sub= collectionRef.subscribe(
        (documentChanges: DocumentChangeAction<any>[]) => {
          documentChanges.forEach(change => {
            if (change.type === 'added') {
              const documentData = change.payload.doc.data();
              this.allArtclesdocs.push(documentData)
              this.allrr.push(Object.keys(documentData)[0])
            }
          });
        this.sub.push(sub)
   })
   setTimeout(()=>{
    console.log(this.allArtclesdocs)
   },7000)
  }

  async inspectDocuments(topic: string)  {
    let result = false;
  let d=this.removeDuplicates(this.allrr)
  console.log(d)
  if(d.includes(topic)){
    result=true
  }
  else{
    result=false
  }
  return result
  }


  removeDuplicates(arr) {
    return arr.filter((value, index, self) => self.indexOf(value) === index);
}

  uploadImage() {
    const fileInput = document.getElementById('imageInput') as HTMLInputElement | null;
    if (fileInput?.files && fileInput?.files.length > 0) {
      const file = fileInput.files[0];
      this.saveImageData(file);
    } else {
      console.error('No file selected.');
    }
  }

  saveImageData(file: File) {
    const filename = (document.getElementById('filename') as HTMLInputElement).value;
    const storageRef = this.firestore.ref('images/' + filename);

    const uploadTask = storageRef.put(file);
    uploadTask.snapshotChanges().pipe(
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
    ).subscribe();
  }

  saveImageURLToDatabase(downloadURL: string, name: string) {
    const imageObject = {
      [name]: {
        imageUrl: downloadURL,
        caption: name
      }
    };

    const collectionRef = this.afs.collection('images').doc('allArticles');

    collectionRef.update(imageObject).then(() => {
      tinymce.activeEditor.execCommand('mceInsertContent', false, `<img src="${downloadURL}" alt="Image">`);
    }).catch((error) => {
      console.error('Error adding document: ', error);
    });
  }


  async  getText() {

    let alldata= this.filterdata()
      let topic=(document.getElementById('topic') as HTMLInputElement).value
      let subject=(document.getElementById('Subject') as HTMLInputElement).value
      let Page:any =(document.getElementById('Page')as HTMLInputElement).value

    alldata.forEach((e:any)=>{
      if((e.Subject==subject)&&(e.topicName==topic)){
        (document.getElementById('topicdetails') as HTMLInputElement).value=e.Topicdetails
         tinymce.get('mytextarea').setContent(e.Text[Page - 1]);
         this.articletoBeModified = e

         console.log( this.articletoBeModified)
      }
    })

  }

filterdata(){
  let result:any=[]
  this.allArtclesdocs.forEach((doc) => {
    let keys=Object.keys(doc)
    for(const el in doc){
        result.push(doc[el])
    }
})
return result
}

}
