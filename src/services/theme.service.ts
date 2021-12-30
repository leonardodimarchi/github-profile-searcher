import { HostBinding, Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public setTheme(isDarkMode: boolean): void {
    localStorage.setItem(environment.keys.theme, isDarkMode.toString());
  }

  public isDarkMode(): boolean {
    const isDarkThemeFromStorage = localStorage.getItem(environment.keys.theme);

    return isDarkThemeFromStorage ? JSON.parse(isDarkThemeFromStorage) : false;
  }
}
