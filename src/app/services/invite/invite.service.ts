import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {sha256} from 'js-sha256';
import {SendinviteDto} from '../../entities/invite/sendinvite.dto';

@Injectable({
  providedIn: 'root'
})
export class InviteService {
  private _hash: string;

  constructor(private readonly _db: AngularFirestore) {
  }

  hashRandomString(randomString: string) {
    this._hash = sha256(randomString);
    return this._hash;
  }

  pushToDatabase(randomString: string, content: SendinviteDto) {
    this._db.collection('request')
      .doc(this.hashRandomString(randomString))
      .set(JSON.parse(JSON.stringify(content)));
  }

  async getData(randomString: string) {
    let checkValidation = false;
    await this._db.collection('request')
      .doc(this.hashRandomString(randomString))
      .ref
      .get().then(function (doc) {
        if (doc.exists) {
          checkValidation = true;
        }
      }).catch(function () {
        // Error getting document
      });
    return checkValidation;
  }

}
