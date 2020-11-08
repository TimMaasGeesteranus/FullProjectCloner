export class InviteFormDto {
  email: string;
  url: string;
  repository: string;
  invitator: string;

  constructor(email: string, url: string, repository: string, invitator: string) {
    this.email = email;
    this.url = url;
    this.repository = repository;
    this.invitator = invitator;
  }
}
