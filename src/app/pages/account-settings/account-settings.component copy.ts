import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {
  constructor(private settingsServices: SettingsService) { }

  ngOnInit(): void {
    // this.$a = document.querySelectorAll('.selector');
    // this.checkCurrentTheme();
    this.settingsServices.checkCurrentTheme();
  }

  changeTheme(theme:string) {
    this.settingsServices.changeTheme(theme);
    // this.checkCurrentTheme();
  }

  // checkCurrentTheme() {
  //   this.$a.forEach( element => {
  //     element.classList.remove('working');
  //     const theme = element.getAttribute('data-theme');
  //     let currentTheme: string = this.linkTheme.getAttribute('href').split('/').pop();
  //     currentTheme = currentTheme.split('.')[0];
  //     if (theme.toLowerCase() === currentTheme.toLowerCase()) {
  //       element.classList.add('working');
  //     }
  //   })
  // }
}
