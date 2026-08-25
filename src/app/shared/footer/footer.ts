import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Lang } from '../../services/lang';
import { UiIcon } from '../ui-icon/ui-icon';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterModule, UiIcon],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer implements OnInit {

  year = new Date().getFullYear();
  currentLang = 'en';

  constructor(private langService: Lang) {}

  ngOnInit() {
    this.currentLang = this.langService.getLang();
  }

  t(key: string): string {
    return this.langService.translate(key);
  }
}
