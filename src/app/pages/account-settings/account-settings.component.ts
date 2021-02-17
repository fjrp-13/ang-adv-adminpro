import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {
  private $themeLinks: NodeListOf<Element>;
  
  constructor(private settingsServices: SettingsService) { }

  ngOnInit(): void {
    this.$themeLinks = document.querySelectorAll('.selector');
    this.settingsServices.checkCurrentTheme(this.$themeLinks);
  }

  changeTheme(theme:string) {
    this.settingsServices.changeTheme(theme, this.$themeLinks);
  }
}
