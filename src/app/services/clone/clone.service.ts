import {Injectable} from '@angular/core';
import {GithubService} from '../github/github.service';
import {ImportDto} from '../../entities/github/import.dto';
import {IssuerequestDto} from '../../entities/github/issuerequest.dto';
import {AuthdataDto} from '../../entities/auth/authdata.dto';

@Injectable({
  providedIn: 'root'
})
export class CloneService {
  constructor(private readonly github: GithubService) {
  }

  async importRepository(auth: AuthdataDto, requestData: Object) {
    const request = JSON.parse(JSON.stringify(requestData));
    const token = auth.token;
    const sourceRepository = request._repositoryName;
    const recipient = auth.username;
    const newRepository = sourceRepository + '-' + recipient;

    await this.github.persistRepository(token, newRepository)
      .then(async Reporesponse => {
        if (Reporesponse != null) {
          await this.github.importRepository(token, recipient, sourceRepository, new ImportDto(request._URL)).toPromise();
        }
      });
  }

  async importProjectBoard(auth: AuthdataDto, requestData: Object) {
    const request = JSON.parse(JSON.stringify(requestData));
    const token = auth.token;
    const recipient = auth.username;
    const sourceRepository = request._repositoryName;
    const newRepositoryName = sourceRepository + '-' + recipient;

    // Obtain projects
    const projects = await this.github.getProjects(token, request._username, sourceRepository).toPromise();
    let projectId: number;
    let columnId: number;
    let contentId: number;

    for (let projectCount = 0; projectCount < Object.keys(projects).length; projectCount++) {
      const projectContent = {name: projects[projectCount].name, body: projects[projectCount].body};
      // Create project
      await this.github.persistProject(token, recipient, newRepositoryName, projectContent).then(async response => {
        projectId = JSON.parse(JSON.stringify(response)).id;
      });

      // Obtain all columns.
      const columns = await this.github.getUsingUrl(token, projects[projectCount].columns_url).toPromise();
      for (let columnCount = 0; columnCount < Object.keys(columns).length; columnCount++) {
        const columnContent = {name: columns[columnCount].name};
        await this.github.persistColumn(token, projectId, columnContent).then(async response => {
          columnId = JSON.parse(JSON.stringify(response)).id;
        });

        // Obtain all cards.
        const cards = await this.github.getUsingUrl(token, columns[columnCount].cards_url).toPromise();
        for (let cardCount = (Object.keys(cards).length - 1); cardCount > -1; cardCount--) {
          if (cards[cardCount].note === null) { // If the card has no note, it's an issue
            const issue = await this.github.getUsingUrl(token, cards[cardCount].content_url).toPromise();
            const issueTitle = JSON.parse(JSON.stringify(issue)).title;
            const issueBody = JSON.parse(JSON.stringify(issue)).body;
            const issueContent = {title: issueTitle, body: issueBody};

            // Create issue.
            await this.github.persistIssue(token, recipient, newRepositoryName, issueContent).then(async response => {
              contentId = JSON.parse(JSON.stringify(response)).id;
            });

            // Create card and link with issue.
            const cardsContent = {note: null, content_id: contentId, content_type: 'Issue'};
            await this.github.persistCard(token, columnId, cardsContent).then(async response => {
            });
          } else {
            // Create card.
            const cardsContent = {note: cards[cardCount].note};
            await this.github.persistCard(token, columnId, cardsContent).then(async response => {
            });
          }
        }
      }
    }
  }

  async cloneFullProject(auth: AuthdataDto, requestData: Object) {
    await this.importRepository(auth, requestData);
    await this.importProjectBoard(auth, requestData);
  }
}



