import { getSyntheticPropertyName } from '@angular/compiler/src/render3/util';
import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';


// Le indicamos a Angular que "confíe" que esta función existe (está declarada de forma global en "src/custom.js")
declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  
  constructor( private settingsService: SettingsService) { }
  
  ngOnInit(): void {
    customInitFunctions();
  }

}
