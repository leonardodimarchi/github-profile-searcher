import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RepositoryProxy } from 'src/models/repository.proxy';
import { UserProxy } from 'src/models/user.proxy';
import { GithubService } from 'src/services/github/github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(
    private readonly githubService: GithubService,
  ) { }

  public nameToSearchFormControl = new FormControl('', [Validators.required]);

  public showingProfile: UserProxy | null = null;
  public showingProfileRepositories: RepositoryProxy[] = [];

  public isLoadingProfile: boolean = false;

  public async search(): Promise<void> {
    if (this.nameToSearchFormControl.invalid)
      return;

    this.isLoadingProfile = true;

    this.showingProfile = await this.githubService.getUserInfo(this.nameToSearchFormControl.value);
    this.showingProfileRepositories = await this.githubService.getUserRepositories(this.nameToSearchFormControl.value);

    this.isLoadingProfile = false;
  }

  public redirectToProfile(): void {
    window.open('https://www.github.com/' + this.showingProfile?.login, '_blank');
  }
}
