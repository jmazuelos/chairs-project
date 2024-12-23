import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { DotLottie } from '@lottiefiles/dotlottie-web';

@Component({
  selector: 'app-homepage',
  imports: [MatIconModule, MatButtonModule, MatCardModule, MatChipsModule, MatListModule, RouterLink],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})

export class HomepageComponent implements AfterViewInit {
  @ViewChild('coverAnimation') dotLottieCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('coverVideo') coverVideoRef!: ElementRef<HTMLVideoElement>;

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

    // Autoplay video in production. Autoplay policy in some browsers blocks autoplay, showing error 'NotAllowedError: play()'
    setTimeout(() => {
      const video = this.coverVideoRef;
      // Avoid 'ERROR TypeError: video.play is not a function'
      if (video && video instanceof HTMLVideoElement) {
        video.play();
        video.muted = true;
      }
    });
  }
}