import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CloneDialogComponent} from './cloneDialog.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('CloneDialogComponent', () => {
  let component: CloneDialogComponent;
  let fixture: ComponentFixture<CloneDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CloneDialogComponent
      ],
      imports: [
        MatDialogModule,
        BrowserAnimationsModule
      ],
      providers: [
        {provide: MatDialogTitle, useValue: {}},
        {
          provide: MatDialogRef, useValue: {
            close: () => {
            }
          }
        },
        {provide: MAT_DIALOG_DATA, useValue: []}]
    });
    fixture = TestBed.createComponent(CloneDialogComponent);
    component = fixture.componentInstance;
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('No calls onNoClick()', async(() => {
    spyOn(component, 'onNoClick');
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('#no');
    button.click();
    expect(component.onNoClick).toHaveBeenCalled();
  }));

  it('Yes calls onYesClick()', async(() => {
    spyOn(component, 'onYesClick');
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('#yes');
    button.click();
    expect(component.onYesClick).toHaveBeenCalled();
  }));

  it('dialog should be closed after onYesClick()', () => {
    const spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.onYesClick();
    expect(spy).toHaveBeenCalled();
  });

  it('dialog should be closed after onNoClick()', () => {
    const spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.onNoClick();
    expect(spy).toHaveBeenCalled();
  });

});
