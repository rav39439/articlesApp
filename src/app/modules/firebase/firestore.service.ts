import { Inject, Injectable } from "@angular/core";
import { AngularFirestore, QueryFn } from "@angular/fire/compat/firestore";
import { environment } from "src/environments/environment";
import { serverTimestamp } from "firebase/firestore";
import { async, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { map } from 'rxjs/operators';

@Injectable()
export abstract class FirestoreService<T> {

    protected abstract basePath: string;
    uid$: Observable<string>
    getClients:any
    constructor(
        @Inject(AngularFirestore) protected afs: AngularFirestore,
        // protected authService: AuthService

    ) {
        // this.uid$ = this.authService.authUserSubject.pipe(map((user: User) => user.uid))

    }
    async getDocDataByDocId(docId: string) {
        return this.afs.doc(`${this.basePath}/${docId}`).get().toPromise().then(d => d?.data())
    }
    getRandomGeneratedId() {
        return this.afs.createId();
    }
    doc$(docId: string): Observable<any> {
        return this.afs.doc<T>(`${this.basePath}/${docId}`).valueChanges().pipe(
            tap(r => {
                if (!environment.production) {
                    console.groupCollapsed(`Firestore Streaming [${this.basePath}] [doc$] ${docId}`)
                    console.log(r)
                    console.groupEnd()
                }
            }),
        );
    }

    collection$(queryFn?: QueryFn): Observable<T[]> {
        return this.afs.collection<T>(`${this.basePath}`, queryFn).valueChanges().pipe(
            tap(r => {
                if (!environment.production) {
                    console.groupCollapsed(`Firestore Streaming [${this.basePath}] [collection$]`)
                    console.table(r)
                    console.groupEnd()
                }
            }),
        );
    }

    collectionSnapshot(queryFn: QueryFn) {
        return this.afs.collection<T>(`${this.basePath}`, queryFn).snapshotChanges().pipe(
            tap(r => {

                if (!environment.production) {
                    console.groupCollapsed(`Firestore Streaming [${this.basePath}] [collection$]`)
                    console.table(r)
                    console.groupEnd()
                }
            }),
        );
    }

    create(value: T) {
        const docId = this.afs.createId();
        return this.collection.doc(docId).set(Object.assign({}, { docId, createdAt: serverTimestamp() }, value)).then(_ => {
            if (!environment.production) {
                console.groupCollapsed(`Firestore Service [${this.basePath}] [create]`)
                console.log('[docId]', docId, value)
                console.groupEnd()
            }
            return _
        })
    }
    createWithId(value: T, docId:any) {
        return this.collection.doc(docId).set(Object.assign({}, { docId, createdAt: serverTimestamp() }, value)).then(_ => {
            if (!environment.production) {
                console.groupCollapsed(`Firestore Service [${this.basePath}] [create]`)
                console.log('[docId]', docId, value)
                console.groupEnd()
            }
            return _
        })
    }
    addClassroom(value: T, docId:any) {
        return this.collection.doc(docId).set(Object.assign({}, { docId, createdAt: serverTimestamp() }, value)).then(_ => {
            if (!environment.production) {
                console.groupCollapsed(`Firestore Service [${this.basePath}] [create]`)
                console.log('[docId]', docId, value)
                console.groupEnd()
            }
            return _
        })
    }
    update(value: T, docId: string) {
        return this.collection.doc(docId).set(Object.assign({}, { docId, updatedAt: serverTimestamp() }, value,), { merge: true }).then(_ => {
            if (!environment.production) {
                console.groupCollapsed(`Firestore Service [${this.basePath}] [create]`)
                console.log('[docId]', docId, value)
                console.groupEnd()
            }
        })
    }
    updateCls(value: T, docId: string) {
        return this.collection.doc(docId).update(Object.assign({}, { docId, updatedAt: serverTimestamp() }, value)).then(_ => {
            if (!environment.production) {
                console.groupCollapsed(`Firestore Service [${this.basePath}] [create]`)
                console.log('[docId]', docId, value)
                console.groupEnd()
            }
        })
    }
    updateUsingUpdate(docId:any, value:any) {
       return this.collection.doc(docId).update(Object.assign({}, { docId, updatedAt: serverTimestamp() }, value)).then(_ => {
            if (!environment.production) {
                console.groupCollapsed(`Firestore Service [${this.basePath}] [create]`)
                console.log('[docId]', docId, value)
                console.groupEnd()
            }
        })
    }

    updateArrayUnion(value: T, docId: string) {
        return this.collection.doc(docId).set({ value }, { merge: true }).then(_ => {
            if (!environment.production) {
                console.groupCollapsed(`Firestore Service [${this.basePath}] [create]`)
                console.log('[docId]', docId, value)
                console.groupEnd()
            }
        })
    }

    delete(docId: string) {
        return this.collection.doc(docId).delete().then(_ => {
            if (!environment.production) {
                console.groupCollapsed(`Firestore Service [${this.basePath}] [delete]`)
                console.log('[docId]', docId)
                console.groupEnd()
            }
        })
    }

    getBatchRef() {
        this.afs.firestore.batch();
    }
    private get collection() {
        return this.afs.collection(`${this.basePath}`);
    }

    getDatabyParams(phoneNumber:any){
        
        return this.collection.valueChanges().pipe(map(elem=> elem.filter((e:any)=>e.phone==phoneNumber)));

        
    }
    
}
