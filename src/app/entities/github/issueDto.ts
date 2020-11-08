export class IssueDto {
  private _number: number;
  private _title: string;
  _body: string;

  constructor(number: number, title: string, body: string) {
    this._number = number;
    this._title = title;
    this._body = body;
  }
  get number(): number {
    return this._number;
  }

  set number(value: number) {
    this._number = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get body(): string {
    return this._body;
  }

  set body(value: string) {
    this._body = value;
  }
}
