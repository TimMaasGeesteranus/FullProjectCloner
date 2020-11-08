import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ContactFormDto} from '../../entities/contact/contactform.dto';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})

export class ContactComponent implements OnInit {

  @ViewChild(FormGroupDirective)
  formGroupDirective: FormGroupDirective;

  contactFormDto: ContactFormDto;
  contactForm: FormGroup;
  submitted = false;
  formSent = false;
  MAIL_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxrBysjuMbBGdWRyaOXpW2PwkavvyLePxSmQeJC5CdAQEHS3ys/exec';

  constructor(private readonly formBuilder: FormBuilder, private readonly http: HttpClient, public snackBar: MatSnackBar) {
    this.contactForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

  onSubmit() {

    this.submitted = true;
    this.formSent = false;

    if (this.contactForm.invalid) {
      return;
    }

    if (this.contactForm.valid) {
      this.contactFormDto = new ContactFormDto(
        this.contactForm.controls.fullName.value,
        this.contactForm.controls.email.value,
        this.contactForm.controls.message.value
      );

      const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
      this.http.post(this.MAIL_SCRIPT_URL, this.contactFormDto, {headers: headers})
        .subscribe(() => {
        });
      this.openSnackBar('Contact form has been sent!', 'close');
      this.contactForm.reset();
      this.formGroupDirective.resetForm();
      this.formSent = true;
    }
  }

  ngOnInit() {
  }

}
