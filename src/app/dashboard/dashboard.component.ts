import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { RestaurantComponent } from '../restaurant/restaurant.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RestaurantComponent, CartComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements AfterViewInit {
  isFixed = false;
  isFooterVisible = false;

  @ViewChild('footer', { static: false }) footerRef!: ElementRef;

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    this.isFixed = scrollTop > 72;

    const footer = document.querySelector('app-footer');
    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      this.isFooterVisible = footerRect.top < window.innerHeight;
    }
  }

  ngAfterViewInit() {
    this.onScroll();
  }
}
