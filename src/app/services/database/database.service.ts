import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  constructor(private readonly afs: AngularFirestore) {
  }

  pushToDatabase(subject: string, key: string, object: Object): void {
    this.afs.collection(subject).doc(key).set(JSON.parse(JSON.stringify(object)));
  }

  async getData(subject: string, key: string): Promise<firebase.firestore.DocumentData> {
    const document = await this.afs.collection(subject).doc(key).ref.get();
    return document.data();
  }
  async deleteData(subject: string, key: string) {
    return this.afs.collection(subject).doc(key).delete();
  }
}
