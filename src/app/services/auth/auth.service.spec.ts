import {async, TestBed} from '@angular/core/testing';
import {AuthService} from './auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {DatabaseService} from '../database/database.service';
import {AngularFireModule, FirebaseAuth} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {RouterModule} from '@angular/router';
import {LoginComponent} from '../../components/login/login.component';
import {Observable} from 'rxjs';
import {auth, User} from 'firebase';

class MockDatabaseService implements Partial<MockDatabaseService> {

}
class MockAngularFireAuth implements Partial<AngularFireAuth> {
  private zone;
  readonly auth: FirebaseAuth;
  readonly authState: Observable<User | null>;
  readonly idToken: Observable<string | null>;
  readonly user: Observable<User | null>;
  readonly idTokenResult: Observable<auth.IdTokenResult | null>;
}

describe('AuthService', () => {
  let sut: AuthService;
  let databaseService: DatabaseService;
  let af_auth: AngularFireAuth;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [
      ]
    });
    TestBed.overrideComponent(AuthService, {
      set: {
        providers: [
          {provide: DatabaseService, useClass: MockDatabaseService},
          {provide: AngularFireAuth, useClass: MockAngularFireAuth}
        ]
      }
    });
    sut = TestBed.get(AuthService);
    databaseService = TestBed.get(DatabaseService);
    af_auth = TestBed.get(AngularFireAuth);
  }));

  // it('', () => {
  // });

});

