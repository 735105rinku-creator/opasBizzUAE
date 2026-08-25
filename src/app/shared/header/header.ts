import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Lang } from '../../services/lang';
import { UiIcon } from '../ui-icon/ui-icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, UiIcon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  isScrolled = false;
  mobileOpen = false;
  currentLang = 'en';

  constructor(private langService: Lang) {}

  ngOnInit(): void {
    this.currentLang = this.langService.getLang();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 40;
  }

  toggleMobile(): void {
    this.mobileOpen = !this.mobileOpen;
  }

  closeMobile(): void {
    this.mobileOpen = false;
  }

  setLang(lang: 'en' | 'ar'): void {
    this.currentLang = lang;
    this.langService.setLang(lang);
    this.closeMobile();
  }

  t(key: string): string {
    return this.langService.translate(key);
  }
}
