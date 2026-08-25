import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

type IconName =
  | 'mail'
  | 'phone'
  | 'map-pin'
  | 'building'
  | 'briefcase'
  | 'home'
  | 'grain'
  | 'package'
  | 'ship'
  | 'laptop'
  | 'cart'
  | 'send'
  | 'globe'
  | 'check'
  | 'search'
  | 'file'
  | 'truck'
  | 'user'
  | 'headset'
  | 'x';

@Component({
  selector: 'app-ui-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path [attr.d]="path"></path>
    </svg>
  `,
  styles: [`
    :host {
      width: 1.1em;
      height: 1.1em;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 auto;
    }

    svg {
      width: 100%;
      height: 100%;
      display: block;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.9;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  `],
})
export class UiIcon {
  @Input({ required: true }) name!: IconName | string;

  get path(): string {
    return ICON_PATHS[this.name as IconName] || ICON_PATHS.globe;
  }
}

const ICON_PATHS: Record<IconName, string> = {
  mail: 'M4 6h16v12H4z M4 7l8 6 8-6',
  phone: 'M6 5l3-1 2 5-2 1c1 2 3 4 5 5l1-2 5 2-1 3c-.5 1.2-1.7 1.8-3 1.5C10 18.5 5.5 14 4.5 8c-.2-1.3.4-2.5 1.5-3z',
  'map-pin': 'M12 21s7-5.6 7-12a7 7 0 10-14 0c0 6.4 7 12 7 12z M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
  building: 'M4 21h16 M6 21V5h8v16 M14 9h4v12 M9 8h2 M9 12h2 M9 16h2 M17 13h1 M17 17h1',
  briefcase: 'M9 6V5a2 2 0 012-2h2a2 2 0 012 2v1 M4 7h16v11a2 2 0 01-2 2H6a2 2 0 01-2-2z M4 12h16 M10 12v2h4v-2',
  home: 'M3 11l9-7 9 7 M5 10v10h14V10 M10 20v-6h4v6',
  grain: 'M12 21V5 M12 8c-4 0-6 2-7 5 4 0 6-2 7-5z M12 12c4 0 6 2 7 5-4 0-6-2-7-5z M12 16c-3 0-5 1.5-6 4 3 0 5-1.5 6-4z',
  package: 'M4 8l8-4 8 4-8 4z M4 8v9l8 4 8-4V8 M12 12v9',
  ship: 'M4 16h16l-2 4H6z M6 16l1-7h10l1 7 M9 9V5h6v4 M3 21c2 1 4 1 6 0 2 1 4 1 6 0 2 1 4 1 6 0',
  laptop: 'M5 5h14v10H5z M3 19h18l-2-4H5z',
  cart: 'M3 4h2l2 11h10l3-8H7 M9 20a1.5 1.5 0 100-3 1.5 1.5 0 000 3z M17 20a1.5 1.5 0 100-3 1.5 1.5 0 000 3z',
  send: 'M3 11l18-8-8 18-2-7z M21 3L11 14',
  globe: 'M12 21a9 9 0 100-18 9 9 0 000 18z M3 12h18 M12 3c3 3 3 15 0 18 M12 3c-3 3-3 15 0 18',
  check: 'M20 6L9 17l-5-5',
  search: 'M11 19a8 8 0 100-16 8 8 0 000 16z M21 21l-4.3-4.3',
  file: 'M6 3h8l4 4v14H6z M14 3v5h5 M9 13h6 M9 17h6',
  truck: 'M3 6h11v10H3z M14 10h4l3 3v3h-7z M7 20a2 2 0 100-4 2 2 0 000 4z M17 20a2 2 0 100-4 2 2 0 000 4z',
  user: 'M12 12a4 4 0 100-8 4 4 0 000 8z M4 21a8 8 0 0116 0',
  headset: 'M4 13v-1a8 8 0 0116 0v1 M4 13h3v5H4z M17 13h3v5h-3z M17 18c0 2-2 3-5 3',
  x: 'M6 6l12 12 M18 6L6 18',
};


