import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { RepositoryProxy } from 'src/models/repository.proxy';
import { UserProxy } from '../../models/user.proxy';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  public async getUserInfo(username: string): Promise<UserProxy> {
    return await this.httpClient.get<UserProxy>('https://api.github.com/users/' + username)
      .pipe(
        catchError(errorFromGet => {
            throw new Error(errorFromGet.error.message || errorFromGet.message);
        }),
      ).toPromise();
  }

  public async getUserRepositories(username: string): Promise<RepositoryProxy[]> {
    return await this.httpClient.get<RepositoryProxy[]>('https://api.github.com/users/' + username + '/repos',
      {
        params: {
          type: 'public',
          sort: 'updated',
          page: '1',
          per_page: '4',
        },
      }).pipe(
      catchError(errorFromGet => {
        throw new Error(errorFromGet.error.message || errorFromGet.message);
      }),
    ).toPromise();
  }
}
