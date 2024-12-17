import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DotLottie } from '@lottiefiles/dotlottie-web';

@Component({
  selector: 'app-homepage',
  imports: [MatIconModule, MatButtonModule, MatCardModule, MatChipsModule, MatListModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})

export class HomepageComponent implements AfterViewInit {
  @ViewChild('lottieAnimation') dotLottieCanvas!: ElementRef<HTMLCanvasElement>;

  readonly platformId = inject(PLATFORM_ID);

  ngAfterViewInit(): void { 
    if (isPlatformBrowser(this.platformId)) {
      new DotLottie({
        autoplay: true,
        loop: true,
        canvas: this.dotLottieCanvas.nativeElement,
        src: 'lottie/slide-text-animation.lottie',
      });
    }
  }
}
