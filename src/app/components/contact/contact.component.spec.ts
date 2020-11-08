import {ContactComponent} from './contact.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule, MatFormFieldModule, MatInputModule, MatSnackBarModule} from '@angular/material';
import {HttpClient, HttpClientModule, HttpHandler, HttpHeaders} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {validate} from 'codelyzer/walkerFactory/walkerFn';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatCardModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        HttpClientModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      declarations: [
        ContactComponent
      ],
      providers: [
        HttpClient,
        HttpHandler,
      ]
    });
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.contactForm.valid).toBeFalsy();
  });

  it('submitting a form with correct input makes the form valid', () => {
    expect(component.contactForm.valid).toBeFalsy();
    component.contactForm.controls['email'].setValue('test@test.com');
    component.contactForm.controls['message'].setValue('testmessage');
    component.contactForm.controls['fullName'].setValue('testname');
    expect(component.contactForm.valid).toBeTruthy();
  });

  it('should turn around every now and then i get a little bit lonely', () => {
    expect(component.submitted).toEqual(false);
    component.onSubmit();
    expect(component.submitted).toEqual(true);
  });
});
