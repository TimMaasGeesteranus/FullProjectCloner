import {IssueDto} from '../github/issueDto';

export class SendinviteDto {
  private _URL: string;
  private _issues: Array<IssueDto>;
  private _username: string;
  private _repositoryName: string;

  constructor(URL: string, issues: Array<IssueDto>, username: string, repositoryName: string) {
    this._URL = URL;
    this._issues = issues;
    this._username = username;
    this._repositoryName = repositoryName;
  }

  get URL(): string {
    return this._URL;
  }

  set URL(value: string) {
    this._URL = value;
  }

  get issues(): Array<IssueDto> {
    return this._issues;
  }

  set issues(value: Array<IssueDto>) {
    this._issues = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get repositoryName(): string {
    return this._repositoryName;
  }

  set repositoryName(value: string) {
    this._repositoryName = value;
  }
}
