import {ProviderdataDto} from './providerdata.dto';
import {StsTokenManager} from './ststokenmanager.dto';
import {Serializable} from '../serializable';


export class UserDto implements Serializable<UserDto> {
  private _uid: string;
  private _displayName: string;
  private _photoURL: string;
  private _email: string;
  private _emailVerified: boolean;
  private _phoneNumber: string;
  private _isAnonymous: boolean;
  private _providerData: ProviderdataDto;
  private _apiKey: string;
  private _appName: string;
  private _authDomain: string;
  private _stsTokenManager: StsTokenManager;
  private _redirectEventId: number;
  private _lastLoginAt: string;
  private _createdAt: string;


  public deserialize(input: any): this {
   this._uid = input.uid;
   this._displayName = input.displayName;
   this._photoURL = input.photoURL;
   this._email = input.email;
   this._emailVerified = input.emailVerified;
   this._phoneNumber = input.phoneNumber;
   this._isAnonymous = input.isAnonymous;
   this._providerData = new ProviderdataDto().deserialize(input.providerData[0]);
   this._apiKey = input.apiKey;
   this._appName = input.appName;
   this._authDomain = input.authDomain;
   this._stsTokenManager =  new StsTokenManager().deserialize(input.stsTokenManager);
   this._redirectEventId = input.redirectEventId;
   this._lastLoginAt = input.lastLoginAt;
   this._createdAt = input.createdAt;
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

  get emailVerified(): boolean {
    return this._emailVerified;
  }

  set emailVerified(value: boolean) {
    this._emailVerified = value;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  set phoneNumber(value: string) {
    this._phoneNumber = value;
  }

  get isAnonymous(): boolean {
    return this._isAnonymous;
  }

  set isAnonymous(value: boolean) {
    this._isAnonymous = value;
  }

  get providerData(): ProviderdataDto {
    return this._providerData;
  }

  set providerData(value: ProviderdataDto) {
    this._providerData = value;
  }

  get apiKey(): string {
    return this._apiKey;
  }

  set apiKey(value: string) {
    this._apiKey = value;
  }

  get appName(): string {
    return this._appName;
  }

  set appName(value: string) {
    this._appName = value;
  }

  get authDomain(): string {
    return this._authDomain;
  }

  set authDomain(value: string) {
    this._authDomain = value;
  }

  get stsTokenManager(): StsTokenManager {
    return this._stsTokenManager;
  }

  set stsTokenManager(value: StsTokenManager) {
    this._stsTokenManager = value;
  }

  get redirectEventId(): number {
    return this._redirectEventId;
  }

  set redirectEventId(value: number) {
    this._redirectEventId = value;
  }

  get lastLoginAt(): string {
    return this._lastLoginAt;
  }

  set lastLoginAt(value: string) {
    this._lastLoginAt = value;
  }

  get createdAt(): string {
    return this._createdAt;
  }

  set createdAt(value: string) {
    this._createdAt = value;
  }
}
