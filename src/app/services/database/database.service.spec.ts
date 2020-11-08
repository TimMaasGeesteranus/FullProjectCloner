import {TestBed} from '@angular/core/testing';

import {DatabaseService} from './database.service';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';


export class AngularFirestoreMock implements Partial<AngularFirestore> {

}

describe('DatabaseService', () => {

  let sut: DatabaseService;
  let angularFireStore: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ 'provide': AngularFirestore, 'useValue': AngularFirestoreMock }],
    });
    sut = TestBed.get(DatabaseService);
    angularFireStore = TestBed.get(AngularFirestore);

  });

  describe('pushToDatabase', () => {
    it('should push data', done =>  {
      done();
    });
  });
});
