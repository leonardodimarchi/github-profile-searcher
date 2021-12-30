import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RepositoryProxy } from 'src/models/repository.proxy';
import { UserProxy } from 'src/models/user.proxy';
import { GithubService } from 'src/services/github/github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  @HostBinding('class') hostClass: string = 'theme-light';

  constructor(
    private readonly githubService: GithubService,
    private readonly snackBar: MatSnackBar,
  ) { }

  public nameToSearchFormControl: FormControl = new FormControl('', [Validators.required]);
  public darkModeToggleFormControl: FormControl = new FormControl(false);

  public showingProfile: UserProxy | null = null;
  public showingProfileRepositories: RepositoryProxy[] = [];

  public isLoadingProfile: boolean = false;

  public ngOnInit(): void {
    this.darkModeToggleFormControl.valueChanges.subscribe(isActive => {
      this.hostClass = isActive ? 'theme-dark' : 'theme-light';
    });
  }

  public async search(): Promise<void> {
    if (this.nameToSearchFormControl.invalid) {
      return;
    }

    try {
      this.isLoadingProfile = true;

      this.showingProfile = await this.githubService.getUserInfo(this.nameToSearchFormControl.value);
      this.showingProfileRepositories = await this.githubService.getUserRepositories(this.nameToSearchFormControl.value);

    } catch (error) {
      await this.snackBar.open(error.message, 'Ok', { duration: 2000 });
    } finally {
      this.isLoadingProfile = false;
    }
  }

  public redirectToProfile(): void {
    window.open('https://www.github.com/' + this.showingProfile?.login, '_blank');
  }
}
