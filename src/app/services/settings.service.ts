import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private linkTheme = document.querySelector('#theme');
  private defaultUrlTheme = './assets/css/colors/default-dark.css';

  constructor() { 
    this.setTheme();
  }

  // Inicializar el tema según el LocalStorage (o el defaultUrlTheme)
  setTheme() {
    let themeUrl: string = localStorage.getItem('theme') || '';
    if (themeUrl.trim().length == 0) {
      themeUrl = this.defaultUrlTheme;
      localStorage.setItem('theme', themeUrl);
    }
    this.linkTheme.setAttribute('href', themeUrl);
  }

  // Cambiar el tema por el que se le pasa por parámetro
  changeTheme(theme:string, $themeLinks: NodeListOf<Element>) {
    let newThemeUrl: string = this.linkTheme.getAttribute('href');
    let arr: string[] = newThemeUrl.split('/');
    arr.pop(); //.pop(); //.join('/') + `${ theme}.css`;
    newThemeUrl = arr.join('/') + `/${ theme}.css`;

    this.linkTheme.setAttribute('href', newThemeUrl);
    localStorage.setItem('theme', newThemeUrl);
    this.checkCurrentTheme($themeLinks);
  }

  // Marcar el elemento que identifica el tema actual
  checkCurrentTheme($themeLinks: NodeListOf<Element>) {
    // const $a = document.querySelectorAll('.selector');
  
    $themeLinks.forEach( element => {
      element.classList.remove('working');
      const theme = element.getAttribute('data-theme');
      let currentTheme: string = this.linkTheme.getAttribute('href').split('/').pop();
      currentTheme = currentTheme.split('.')[0];
      if (theme.toLowerCase() === currentTheme.toLowerCase()) {
        element.classList.add('working');
      }
    })

  }

}
