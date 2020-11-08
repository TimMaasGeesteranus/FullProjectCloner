import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Errorcode} from './errorcode.enum';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],

})
export class LoginComponent implements OnInit {
  public loginError: string | boolean = false;

  constructor(public authService: AuthService) {
  }

  public signInWithGithub(): void {
    this.authService.loginwithGithubProvider()
      .then(this.loginError = null)
      .catch(err => {
          if (err === Errorcode.FIREBASE_POPUP_CLOSED) {
            this.loginError = 'The popup has been closed before authentication';
          }
          if (err === Errorcode.FIREBASE_REQUEST_EXESS) {
            this.loginError = 'To many requests to the server';
          }
        }
      );
  }

  public logout(): void {
    this.authService.logout()
      .then(this.loginError = null)
      .catch(err => {
          if (err === Errorcode.FIREBASE_NO_USER) {
            this.loginError = 'No user found | Try to login/logout again';
          }
        }
      );
  }

  ngOnInit() {
  }

}
