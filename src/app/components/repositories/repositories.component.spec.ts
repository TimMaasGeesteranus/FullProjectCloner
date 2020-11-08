import {async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule, MatFormFieldModule} from '@angular/material';
import {RepositoryPickerComponent} from './repository-picker/repository-picker.component';
import {RepositoryInviteComponent} from './repository-invite/repository-invite.component';
import {toArray} from 'rxjs/operators';

describe('RepositoryPickerComponent', () => {
  let component: RepositoryPickerComponent;
  let fixture: ComponentFixture<RepositoryPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule
      ],
      declarations: [
        RepositoryPickerComponent,
        RepositoryInviteComponent
      ]
    });

    fixture = TestBed.createComponent(RepositoryPickerComponent);
    component = fixture.componentInstance;
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

});
