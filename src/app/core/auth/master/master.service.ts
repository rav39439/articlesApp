import { Injectable } from '@angular/core';
import { MasterFirestore } from './master.firestore';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, CollectionReference, QueryFn } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private _httpClient: HttpClient,
    private afs: AngularFirestore,
    private masterFirestore: MasterFirestore) {
}

  getGameFromMaster(gameName){
     const query: QueryFn = (ref: CollectionReference) =>
        ref.where('name', '==' ,gameName)
  return this.masterFirestore.collection$(query).pipe(map((elem:any)=> elem.gameNames.filter((e:any)=>e.name==gameName)));
  }

  getGamesUsingDoc(docname){
    return this.masterFirestore.getDocDataByDocId(docname)

  }

  getAllGames(){
    return this.masterFirestore.doc$('games').pipe()
  }

  getCurrentGame(gameName){
    return this.masterFirestore.doc$('games').pipe(map(elem=>elem.gameNames.filter((e)=>e.name==gameName)))

  }
}
