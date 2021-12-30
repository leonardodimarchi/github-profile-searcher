import { Component } from '@angular/core';
import { GithubService } from 'src/services/github/github.service';
import { UserProxy } from 'src/models/user.proxy';
import { RepositoryProxy } from 'src/models/repository.proxy';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private readonly githubService: GithubService,
  ) { }

  public nameToSearch: string = '';

  public showingProfile: UserProxy | null = null;
  public showingProfileRepositories: RepositoryProxy[] = [];

  public async search(): Promise<void> {
    this.showingProfile = await this.githubService.getUserInfo(this.nameToSearch);
    this.showingProfileRepositories = await this.githubService.getUserRepositories(this.nameToSearch);
  }
}
