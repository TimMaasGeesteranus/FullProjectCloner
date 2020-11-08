import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SidemenuComponent} from './components/sidemenu/sidemenu.component';
import {HomeComponent} from './components/home/home.component';
import {AboutComponent} from './components/about/about.component';
import {RepositoriesComponent} from './components/repositories/repositories.component';
import {ContactComponent} from './components/contact/contact.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatDialogModule, MatSnackBarModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';

import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {environment} from '../environments/environment';
import {RepositoryPickerComponent} from './components/repositories/repository-picker/repository-picker.component';
import {LoginComponent} from './components/login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {RepositoryInviteComponent} from './components/repositories/repository-invite/repository-invite.component';
import {CloneComponent} from './components/clone/clone.component';
import {CsvDialogComponent} from './dialogues/csv/csvDialog.component';
import {CloneDialogComponent} from './dialogues/clone/cloneDialog.component';


@NgModule({
  declarations: [
    AppComponent,
    SidemenuComponent,
    HomeComponent,
    AboutComponent,
    RepositoriesComponent,
    ContactComponent,
    LoginComponent,
    RepositoryPickerComponent,
    RepositoryInviteComponent,
    CloneComponent,
    CsvDialogComponent,
    CloneDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatCardModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatDialogModule
  ],
  entryComponents: [
    CsvDialogComponent,
    CloneDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
