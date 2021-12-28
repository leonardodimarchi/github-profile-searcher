import { UserProxy } from './../../models/user.proxy';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
