import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {PostrequestDto} from '../../entities/github/postrequest.dto';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private _baseUrl = 'https://api.github.com';
  barredRockHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.github.barred-rock-preview'
  });
  inertiaPreviewHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.github.inertia-preview+json'
  });

  constructor(private readonly http: HttpClient) {
  }

  get baseUrl(): string {
    return this._baseUrl;
  }

  set baseUrl(value: string) {
    this._baseUrl = value;
  }

  static handleError(error: HttpErrorResponse): Observable<never> {
    // return an observable with a user-facing error message
    return throwError(error);
  }

  getRepositories(token: string, username: string): Observable<Object> {
    const url = this._baseUrl + '/users/' + username + '/repos?access_token=' + token;
    return this.http.get(url).pipe(
      catchError(GithubService.handleError)
    );
  }

  getRepositoryIssues(token: string, username: string, repository: string): Observable<Object> {
    const url = this._baseUrl + '/repos/' + username + '/' + repository + '/issues?access_token=' + token;
    return this.http.get(url).pipe(
      catchError(GithubService.handleError)
    );
  }

  importRepository(token: string, username: string, repository: string, content: Object): Observable<Object> {
    const url = this._baseUrl + '/repos/' + username + '/' + repository + '-' + username + '/import?access_token=' + token;
    return this.http.put(url, JSON.stringify(content), {headers: this.barredRockHeader});
  }

  persistIssue(token: string, username: string, repository: string, content: Object): Promise<Object> {
    const url = this._baseUrl + '/repos/' + username + '/' + repository + '/issues?access_token=' + token;
    return this.http.post(url, JSON.stringify(content), {headers: this.barredRockHeader}).toPromise();
  }

  persistRepository(token: string, name: string): Promise<Object> {
    const url = this._baseUrl + '/user/repos?access_token=' + token;
    const content = new PostrequestDto(name, '© Fullprojectcloner ' + name, 'https://github.com/', false, true, true, true);
    return this.http.post(url, JSON.stringify(content), {headers: this.barredRockHeader}).toPromise();
  }

  getProjects(token: string, name: string, repository: string): Observable<Object> {
    const url = 'https://api.github.com/repos/' + name + '/' + repository + '/projects?access_token=' + token;
    return this.http.get(url, {headers: this.inertiaPreviewHeader});
  }

  getUsingUrl(token: string, sourceUrl: string): Observable<Object> {
    const url = sourceUrl + '?access_token=' + token;
    return this.http.get(url, {headers: this.inertiaPreviewHeader});
  }

  persistProject(token: string, name: string, repository: string, content: Object): Promise<Object> {
    const url = 'https://api.github.com/repos/' + name + '/' + repository + '/projects?access_token=' + token;
    return this.http.post(url, JSON.stringify(content), {headers: this.inertiaPreviewHeader}).toPromise();
  }

  persistColumn(token: string, projectId: number, content: Object): Promise<Object> {
    const url = 'https://api.github.com/projects/' + projectId + '/columns?access_token=' + token;
    return this.http.post(url, JSON.stringify(content), {headers: this.inertiaPreviewHeader}).toPromise();
  }

  persistCard(token: string, columnId: number, content: Object): Promise<Object> {
    const url = 'https://api.github.com/projects/columns/' + columnId + '/cards?access_token=' + token;
    return this.http.post(url, JSON.stringify(content), {headers: this.inertiaPreviewHeader}).toPromise();
  }
}
