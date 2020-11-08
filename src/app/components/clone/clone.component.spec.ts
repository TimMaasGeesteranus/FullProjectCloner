import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CloneComponent} from './clone.component';
import {MatCardModule, MatDialogModule, MatExpansionModule, MatSnackBar, MatSnackBarModule} from '@angular/material';
import {LoginComponent} from '../login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../../services/auth/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';

describe('CloneComponent', () => {
  let component: CloneComponent;
  let fixture: ComponentFixture<CloneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatExpansionModule,
        BrowserAnimationsModule,
        MatCardModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        MatSnackBarModule,
        MatDialogModule
      ],
      declarations: [
        CloneComponent,
        LoginComponent
      ],
      providers: [
        AuthService,
        AngularFireAuth,
        AngularFirestore,
        HttpClient,
        HttpHandler,
      ]
    });

    fixture = TestBed.createComponent(CloneComponent);
    component = fixture.componentInstance;
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

