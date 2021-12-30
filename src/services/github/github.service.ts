import { UserProxy } from './../../models/user.proxy';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RepositoryProxy } from 'src/models/repository.proxy';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  public async getUserInfo(username: string): Promise<UserProxy> {
    return await this.httpClient.get<UserProxy>('https://api.github.com/users/' + username).toPromise();
  }

  public async getUserRepositories(username: string): Promise<RepositoryProxy[]> {
    return await this.httpClient.get<RepositoryProxy[]>('https://api.github.com/users/' + username + '/repos',
    {
      params:{
        type: 'public',
        sort: 'updated',
        page: '1',
        per_page: '4'
      }
    }).toPromise();
  }
}
