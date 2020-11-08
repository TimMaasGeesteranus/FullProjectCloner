import {Serializable} from '../serializable';

export class ProviderdataDto implements Serializable<ProviderdataDto> {
  private _uid: string;
  private _displayName: string;
  private _photoURL: string;
  private _email: string;
  private _phoneNumber: string;
  private _providerId: string;

  public  deserialize(input: any): ProviderdataDto {
  this._uid = input.uid;
  this._displayName = input.displayName;
  this._photoURL = input.photoURL;
  this._email = input.email;
  this._phoneNumber = input.phoneNumber;
  this._providerId = input.providerId;
  return this;
  }


  get uid(): string {
    return this._uid;
  }

  set uid(value: string) {
    this._uid = value;
  }

  get displayName(): string {
    return this._displayName;
  }

  set displayName(value: string) {
    this._displayName = value;
  }

  get photoURL(): string {
    return this._photoURL;
  }

  set photoURL(value: string) {
    this._photoURL = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  set phoneNumber(value: string) {
    this._phoneNumber = value;
  }

  get providerId(): string {
    return this._providerId;
  }

  set providerId(value: string) {
    this._providerId = value;
  }
}

