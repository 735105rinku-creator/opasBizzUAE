import { isPlatformBrowser } from '@angular/common';
import { Component, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);

  bannerImages = [
    'assets/banners/hero_img1.jpg',
    // 'assets/banners/hero_img2.jpg',
    // 'assets/banners/hero_img3.jpg',
  ];

  currentBanner = 0;
  private bannerTimer?: ReturnType<typeof setInterval>;

  highlights = ['Grains', 'Fresh Fruits', 'Fresh Vegetables', 'Import & Export'];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startBannerSlider();
    }
  }

  ngOnDestroy(): void {
    if (this.bannerTimer) {
      clearInterval(this.bannerTimer);
    }
  }

  private startBannerSlider(): void {
    if (this.bannerImages.length <= 1) return;

    this.bannerTimer = setInterval(() => {
      this.currentBanner =
        this.currentBanner === this.bannerImages.length - 1
          ? 0
          : this.currentBanner + 1;
    }, 4200);
  }
}
