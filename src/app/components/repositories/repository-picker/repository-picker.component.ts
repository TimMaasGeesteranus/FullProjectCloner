import {Component, Input, OnInit} from '@angular/core';
import {GithubService} from '../../../services/github/github.service';
import {AuthdataDto} from '../../../entities/auth/authdata.dto';

@Component({
  selector: 'app-repository-picker',
  templateUrl: './repository-picker.component.html',
  styleUrls: ['./repository-picker.component.sass']
})
export class RepositoryPickerComponent implements OnInit {

  @Input() repositories: Object;
  @Input() data: GithubService;
  @Input() authData: AuthdataDto;
  public showAllRepositories: boolean;
  chosenRepository: string;

  constructor() {
    this.showAllRepositories = true;
    this.chosenRepository = null;
  }

  ngOnInit() {
  }

  chooseRepository(repositoryName: string) {
    this.showAllRepositories = false;
    this.chosenRepository = repositoryName;
  }

  setShowAllRepositories(showAllRepositories: boolean) {
    this.showAllRepositories = showAllRepositories;
  }
}
