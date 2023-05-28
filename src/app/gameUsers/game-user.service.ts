import { Injectable } from '@angular/core';
import { GameUsersFirestore } from './game-firestore';
@Injectable({
  providedIn: 'root'
})
export class GameUserService  {

  randomlyGeneratedId:string
  constructor(
    private gameUsers:GameUsersFirestore
  ) { 

    
  }

  AddnewGameUser(value){
    let id=this.getRandomlygeneratedId()
    return this.gameUsers.createWithId(value,id)
  }

  getRandomlygeneratedId(){
    return this.gameUsers.getRandomGeneratedId()
  }
  updateGameUser(gameData,docId){
    this.gameUsers.update(gameData,docId)
  }

  getDatabyUid(docId){
return this.gameUsers.getDocDataByDocId(docId)
  }
}
