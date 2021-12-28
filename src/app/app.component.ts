import { Component } from '@angular/core';
import { GithubService } from 'src/services/github/github.service';

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

  public async search(): Promise<void> {
    const userInfo = await this.githubService.getUserInfo(this.nameToSearch);
  }
}
