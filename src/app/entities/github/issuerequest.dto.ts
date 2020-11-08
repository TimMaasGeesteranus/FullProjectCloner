export class IssuerequestDto {
  body: string;
  number: string;
  title: string;


  constructor(body: string, number: string, title: string) {
    this.body = body;
    this.number = number;
    this.title = title;
  }
}
