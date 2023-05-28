import { Injectable } from "@angular/core";
import { FirestoreService } from "src/app/modules/firebase/firestore.service";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class MasterFirestore extends FirestoreService<any> {

    // protected basePath: string = 'Users/' + this.uid$ + '/Student';
    protected basePath: string = 'Master';

}