import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction,
} from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class CreateArticleService {

  constructor(
    public afs: AngularFirestore,

  ) {




   }
   saveArticle(dataObject,subject){
    const collectionRef = this.afs.collection('articles').doc(subject);
     // collectionRef
        //   .update(dataObject)
        //   .then(() => {
        //     console.log('Doc wrttien successfully ');
        //   })
        //   .catch((error) => {
        //     console.error('Error adding document: ', error);
        //   });
   }

   updateArtilce(dataObject,subject){
    const collectionRef = this.afs.collection('articles').doc(subject);
     // collectionRef
        //   .update(dataObject)
        //   .then(() => {
        //     console.log('Doc wrttien successfully ');
        //   })
        //   .catch((error) => {
        //     console.error('Error adding document: ', error);
        //   });
   }

  getAllArticlesdocs(){
    const collectionRef = this.afs
      .collection('articles')
      .snapshotChanges();
      return collectionRef
   }
   saveInAicollection(data1){
    this.afs
    .collection('articles')
    .doc('AIcollection')
    .set(data1, { merge: true });
   }

   setTags(d){
    this.afs.collection('articles').doc('tags').set(d, { merge: true }).then(()=>{

    })
   }

}
