import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GithubService} from '../../../services/github/github.service';
import {InviteFormDto} from '../../../entities/invite/inviteform.dto';
import {AuthService} from '../../../services/auth/auth.service';
import {InviteService} from '../../../services/invite/invite.service';
import {AuthdataDto} from '../../../entities/auth/authdata.dto';
import {IssueDto} from '../../../entities/github/issueDto';
import {MatDialog, MatSnackBar} from '@angular/material';
import {SendinviteDto} from '../../../entities/invite/sendinvite.dto';
import {CsvDialogComponent} from '../../../dialogues/csv/csvDialog.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-repository-invite',
  templateUrl: './repository-invite.component.html',
  styleUrls: ['./repository-invite.component.sass']
})
export class RepositoryInviteComponent implements OnInit {
  @Input() data: GithubService;
  @Input() chosenRepository: string;
  @Input() authData: AuthdataDto;
  @Output() valueChange = new EventEmitter();
  singleRecipientForm: FormGroup;
  goBackValue: boolean;
  formSent: boolean;
  submitted: boolean;
  issues: Array<IssueDto> = [];

  @ViewChild('myInput')
  myInput: ElementRef;

  INVITEMAIL_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby_p7M2HDMFWvTS8XR9XqrwmredHAogJmAU_r8GCX0f80V1g7o/exec';
  private inviteFormDto: InviteFormDto;
  private inviteID: string;
  textContent: string;

  constructor(private readonly sendInviteData: InviteService,
              private readonly formBuilder: FormBuilder, private readonly http: HttpClient, public snackBar: MatSnackBar,
              public authService: AuthService, private readonly githubService: GithubService,
              public dialog: MatDialog
  ) {
    this.singleRecipientForm = this.formBuilder.group({
      email: ['', [Validators.required]],
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CsvDialogComponent, {
      data: {
        textContent: this.stringReplace(this.textContent),
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sendMailCSVInput();
      } else {
        return;
      }
    });
  }

  ngOnInit() {
    this.githubService.getRepositoryIssues(this.authData.token, this.authData.username, this.chosenRepository.split('/')[1])
      .subscribe(data => {
        this.initialiseIssues(data);
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

  initialiseIssues(issues: object) {
    const issueObject = JSON.parse(JSON.stringify(issues));
    for (const issue of issueObject.reverse()) {
      this.issues.push(new IssueDto(issue.number, issue.title, issue.body));
    }
  }

  goBack() {
    this.goBackValue = true;
    this.valueChange.emit(this.goBackValue);
  }

  inviteIdGenerator(): string {
    this.inviteID = this.randomStringGenerator();
    if (this.sendInviteData.getData(this.inviteID)) {
      this.inviteID = this.randomStringGenerator();
    }
    return this.inviteID;
  }

  sendMailTextInput(recipients: string) {
    this.submitted = true;
    this.formSent = false;
    if (this.singleRecipientForm.valid) {
      recipients = this.stringReplace(recipients);
      this.sendInviteMail(recipients);
      this.singleRecipientForm.reset();
      this.formSent = true;
    }
  }

  sendMailCSVInput() {
    let recipients: string;
    recipients = this.textContent;
    this.sendInviteMail(recipients);
  }

  private sendInviteMail(recipient: string) {
    this.sendInviteToUser(
      recipient,
      'http://localhost:4200/clone/' + this.inviteIdGenerator(),
      this.chosenRepository,
      this.chosenRepository.split('/')[0]
    );
    this.sendInviteData.pushToDatabase(this.inviteID,
      new SendinviteDto(
        'https://github.com/' + this.authData.username + '/' + this.chosenRepository.split('/')[1],
        this.issues,
        this.authData.username,
        this.chosenRepository.split('/')[1]
      ));
    this.openSnackBar('Request has been sent!', 'close');
    this.myInput.nativeElement.value = '';
  }

  sendInviteToUser(emailaddress: string, url: string, repositoryname: string, invitator: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    this.inviteFormDto = new InviteFormDto(emailaddress, url, repositoryname, invitator);
    this.http.post(this.INVITEMAIL_SCRIPT_URL, this.inviteFormDto, {headers: headers})
      .subscribe((response) => {
      });
  }

  private randomStringGenerator() {
    const maxRadix = 36;
    const stringLength = 7;
    return Math.random().toString(maxRadix).substring(stringLength);
  }

  onFileLoad(fileLoadedEvent) {
    const csvContent = fileLoadedEvent.target.result;
    this.textContent = this.stringReplace(csvContent);
  }

  onFileSelect(input: HTMLInputElement) {
    const files = input.files;
    if (files && files.length) {
      const fileToRead = files[0];
      const fileReader = new FileReader();
      fileReader.onload = this.onFileLoad.bind(this);
      fileReader.readAsText(fileToRead, 'UTF-8');
    }
  }

  private stringReplace(content: string) {
    const re = /;/gi;
    return content.toString().replace(re, ',');
  }
}
