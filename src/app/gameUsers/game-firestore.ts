import { Injectable } from "@angular/core";
import { FirestoreService } from "../modules/firebase/firestore.service";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class GameUsersFirestore extends FirestoreService<any> {

    // protected basePath: string = 'Users/' + this.uid$ + '/Student';
    protected basePath: string ='GamesUsers';

}