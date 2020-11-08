import {GithubService} from './github.service';
import {fakeAsync, TestBed} from '@angular/core/testing';
import {async} from 'q';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Observable} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';
import {fail} from 'assert';

describe('GithubService', () => {
  let sut: GithubService;
  let httpMock: HttpTestingController;
  const httpResponseMock = [
    {title: 'test', body: 'data'}
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GithubService],
      imports: [HttpClientTestingModule]
    });

    sut = TestBed.get(GithubService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getRepositories', () => {
    it('should return an Observable', fakeAsync(() => {

      const username = 'Kevin';
      const token = 'abc';

      sut.getRepositories(token, username).subscribe(repository => {
          expect(<any>repository).toEqual(httpResponseMock);
        }
      );
      const req = httpMock.expectOne(sut.baseUrl + '/users/' + username + '/repos?access_token=' + token);
      expect(req.request.method).toBe('GET');
      req.flush(httpResponseMock);
    }));

    it('should throw Observable error', (done) => {
      const username = 'Kevin';
      const token = 'abc';

      const mockErrorResponse = {message: 'bad request'};
      sut.getRepositories(token, username).subscribe(() => {
      }, err => {
        expect(err.error.message).toEqual(mockErrorResponse.message);
        expect(err.status).toEqual(400);
        done();
      });

      const req = httpMock.expectOne(sut.baseUrl + '/users/' + username + '/repos?access_token=' + token);
      req.flush({message: mockErrorResponse.message}, {status: 400, statusText: ''});
      httpMock.verify();
    });
  });


  describe('#getRepositoryIssues', () => {
    it('should return an Observable', fakeAsync(() => {

      const username = 'Kevin';
      const token = 'abc';
      const repository = 'repo';

      sut.getRepositoryIssues(token, username, repository).subscribe(issues => {
          expect(<any>issues).toEqual(httpResponseMock);
        }
      );
      const req = httpMock.expectOne(sut.baseUrl + '/repos/' + username + '/' + repository + '/issues?access_token=' + token);
      expect(req.request.method).toBe('GET');
      req.flush(httpResponseMock);
    }));

    it('should throw Observable error', (done) => {
      const username = 'Kevin';
      const token = 'abc';
      const repository = 'repo';

      const mockErrorResponse = {message: 'bad request'};
      sut.getRepositoryIssues(token, username, repository).subscribe(() => {
      }, err => {
        expect(err.error.message).toEqual(mockErrorResponse.message);
        expect(err.status).toEqual(400);
        done();
      });

      const req = httpMock.expectOne(sut.baseUrl + '/repos/' + username + '/' + repository + '/issues?access_token=' + token);
      req.flush({message: mockErrorResponse.message}, {status: 400, statusText: ''});
      httpMock.verify();
    });
  });


  describe('#importRepository', () => {
    it('should return an Observable', fakeAsync(() => {

      const username = 'Kevin';
      const token = 'abc';
      const repository = 'repo';

      sut.importRepository(token, username, repository, {}).subscribe(resp => {
          expect(<any>resp).toEqual(httpResponseMock);
        }
      );
      const req = httpMock.expectOne(sut.baseUrl +
        '/repos/' + username + '/' + repository + '-' + username + '/import?access_token=' + token);

      expect(req.request.method).toBe('PUT');
      expect(req.request.responseType).toEqual('json');

      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      expect(req.request.headers.get('Accept')).toBe('application/vnd.github.barred-rock-preview');

      req.flush(httpResponseMock);
    }));

    it('should throw Observable error', (done) => {
      const username = 'Kevin';
      const token = 'abc';
      const repository = 'repo';

      const mockErrorResponse = {message: 'bad request'};
      sut.importRepository(token, username, repository, {}).subscribe(() => {
      }, err => {
        expect(err.error.message).toEqual(mockErrorResponse.message);
        expect(err.status).toEqual(400);
        done();
      });

      const req = httpMock.expectOne(sut.baseUrl +
        '/repos/' + username + '/' + repository + '-' + username + '/import?access_token=' + token);

      req.flush({message: mockErrorResponse.message}, {status: 400, statusText: ''});
      httpMock.verify();
    });
  });


  describe('#persistIssue', () => {
    it('should resolve promise', done => {
        const username = 'Kevin';
        const token = 'abc';
        const repository = 'repo';
        sut.persistIssue(token, username, repository, {}).then(() => {
          done();
        }).catch(() => {
          fail('promise should not be rejected');
        });

        const req = httpMock.expectOne(sut.baseUrl + '/repos/' + username + '/' + repository + '/issues?access_token=' + token);

        expect(req.request.method).toBe('POST');
        expect(req.request.responseType).toEqual('json');

        expect(req.request.headers.get('Content-Type')).toBe('application/json');
        expect(req.request.headers.get('Accept')).toBe('application/vnd.github.barred-rock-preview');
        req.flush(httpResponseMock);
      }
    );
    it('should reject promise', done => {
      const username = 'Kevin';
      const token = 'abc';
      const repository = 'repo';
      const mockErrorResponse = {message: 'bad request'};

      const promise = sut.persistIssue(token, username, repository, {});

      const req = httpMock.expectOne(sut.baseUrl + '/repos/' + username + '/' + repository + '/issues?access_token=' + token);

      expect(req.request.method).toBe('POST');
      expect(req.request.responseType).toEqual('json');

      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      expect(req.request.headers.get('Accept')).toBe('application/vnd.github.barred-rock-preview');
      req.flush({message: mockErrorResponse.message}, {status: 400, statusText: ''});

      promise.then(function () {
        fail('promise should not be resolved');
      }).catch(() => {
        done();
      });
    });
  });
  describe('#persistRepository', () => {
    it('should resolve promise', done => {
        const token = 'abc';
        const repository = 'repo';
        sut.persistRepository(token, repository).then(() => {
          done();
        }).catch(() => {
          fail('promise should not be rejected');
        });

        const req = httpMock.expectOne(sut.baseUrl + '/user/repos?access_token=' + token);

        expect(req.request.method).toBe('POST');
        expect(req.request.responseType).toEqual('json');

        expect(req.request.headers.get('Content-Type')).toBe('application/json');
        req.flush(httpResponseMock);
      }
    );
    it('should reject promise', done => {
      const token = 'abc';
      const repository = 'repo';
      const mockErrorResponse = {message: 'bad request'};

      const promise = sut.persistRepository(token, repository);

      const req = httpMock.expectOne(sut.baseUrl + '/user/repos?access_token=' + token);
      expect(req.request.method).toBe('POST');
      expect(req.request.responseType).toEqual('json');

      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      req.flush({message: mockErrorResponse.message}, {status: 400, statusText: ''});

      promise.then(function () {
        fail('promise should not be resolved');
      }).catch(() => {
        done();
      });
    });
  });
  describe('#persistProject', () => {
    it('should resolve promise', done => {
        const token = 'abc';
        const repository = 'repo';
        const name = 'jim';
        sut.persistProject(token, name, repository, {}).then(() => {
          done();
        }).catch(() => {
          fail('promise should not be rejected');
        });

        const req = httpMock.expectOne(sut.baseUrl + '/repos/' + name + '/' + repository + '/projects?access_token=' + token);

        expect(req.request.method).toBe('POST');
        expect(req.request.responseType).toEqual('json');

        expect(req.request.headers.get('Content-Type')).toBe('application/json');
        expect(req.request.headers.get('Accept')).toBe('application/vnd.github.inertia-preview+json');
        req.flush(httpResponseMock);
      }
    );
    it('should reject promise', done => {
      const token = 'abc';
      const repository = 'repo';
      const name = 'jim';
      const mockErrorResponse = {message: 'bad request'};

      const promise = sut.persistProject(token, name, repository, {});

      const req = httpMock.expectOne(sut.baseUrl + '/repos/' + name + '/' + repository + '/projects?access_token=' + token);
      expect(req.request.method).toBe('POST');
      expect(req.request.responseType).toEqual('json');

      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      expect(req.request.headers.get('Accept')).toBe('application/vnd.github.inertia-preview+json');
      req.flush({message: mockErrorResponse.message}, {status: 400, statusText: ''});

      promise.then(function () {
        fail('promise should not be resolved');
      }).catch(() => {
        done();
      });
    });
  });
  describe('#persistColumn', () => {
    it('should resolve promise', done => {
        const token = 'abc';
        const projectId = 123;
        sut.persistColumn(token, projectId, {}).then(() => {
          done();
        }).catch(() => {
          fail('promise should not be rejected');
        });

        const req = httpMock.expectOne(sut.baseUrl + '/projects/' + projectId + '/columns?access_token=' + token);

        expect(req.request.method).toBe('POST');
        expect(req.request.responseType).toEqual('json');

        expect(req.request.headers.get('Content-Type')).toBe('application/json');
        expect(req.request.headers.get('Accept')).toBe('application/vnd.github.inertia-preview+json');
        req.flush(httpResponseMock);
      }
    );
    it('should reject promise', done => {
      const token = 'abc';
      const projectId = 123;
      const mockErrorResponse = {message: 'bad request'};

      const promise = sut.persistColumn(token, projectId, {});

      const req = httpMock.expectOne(sut.baseUrl + '/projects/' + projectId + '/columns?access_token=' + token);
      expect(req.request.method).toBe('POST');
      expect(req.request.responseType).toEqual('json');

      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      expect(req.request.headers.get('Accept')).toBe('application/vnd.github.inertia-preview+json');
      req.flush({message: mockErrorResponse.message}, {status: 400, statusText: ''});

      promise.then(function () {
        fail('promise should not be resolved');
      }).catch(() => {
        done();
      });
    });
  });
  describe('#persistCard', () => {
    it('should resolve promise', done => {
        const token = 'abc';
        const columnId = 5;
        sut.persistCard(token, columnId, {}).then(() => {
          done();
        }).catch(() => {
          fail('promise should not be rejected');
        });

        const req = httpMock.expectOne(sut.baseUrl + '/projects/columns/' + columnId + '/cards?access_token=' + token);

        expect(req.request.method).toBe('POST');
        expect(req.request.responseType).toEqual('json');

        expect(req.request.headers.get('Content-Type')).toBe('application/json');
        expect(req.request.headers.get('Accept')).toBe('application/vnd.github.inertia-preview+json');
        req.flush(httpResponseMock);
      }
    );
    it('should reject promise', done => {
      const token = 'abc';
      const columnId = 5;
      const mockErrorResponse = {message: 'bad request'};

      const promise = sut.persistCard(token, columnId, {});

      const req = httpMock.expectOne(sut.baseUrl + '/projects/columns/' + columnId + '/cards?access_token=' + token);
      expect(req.request.method).toBe('POST');
      expect(req.request.responseType).toEqual('json');

      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      expect(req.request.headers.get('Accept')).toBe('application/vnd.github.inertia-preview+json');
      req.flush({message: mockErrorResponse.message}, {status: 400, statusText: ''});

      promise.then(function () {
        fail('promise should not be resolved');
      }).catch(() => {
        done();
      });
    });
  });
  describe('#getProjects', () => {
    it('should return an Observable', fakeAsync(() => {
      const username = 'jim';
      const token = 'abc';
      const repository = 'repo';

      sut.getProjects(token, username, repository).subscribe(issues => {
          expect(<any>issues).toEqual(httpResponseMock);
        }
      );
      const req = httpMock.expectOne(sut.baseUrl + '/repos/' + username + '/' + repository + '/projects?access_token=' + token);
      expect(req.request.method).toBe('GET');
      req.flush(httpResponseMock);
    }));

    it('should throw Observable error', (done) => {
      const username = 'jim';
      const token = 'abc';
      const repository = 'repo';

      const mockErrorResponse = {message: 'bad request'};
      sut.getProjects(token, username, repository).subscribe(() => {
      }, err => {
        expect(err.error.message).toEqual(mockErrorResponse.message);
        expect(err.status).toEqual(400);
        done();
      });

      const req = httpMock.expectOne(sut.baseUrl + '/repos/' + username + '/' + repository + '/projects?access_token=' + token);
      req.flush({message: mockErrorResponse.message}, {status: 400, statusText: ''});
      httpMock.verify();
    });
  });
});


