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
  isAtFooter = false;
  isDefault = true;
  lastScrollTop = 0;

  @ViewChild('cart', { static: false }) cartRef!: ElementRef;

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollingDown = scrollTop > this.lastScrollTop;
    this.lastScrollTop = scrollTop;

    const header = document.querySelector('app-header');
    const footer = document.querySelector('app-footer');
    const cart = this.cartRef?.nativeElement;

    const headerBottom = header?.getBoundingClientRect().bottom ?? 0;
    const footerRect = footer?.getBoundingClientRect();
    const cartRect = cart?.getBoundingClientRect();

    const isHeaderVisible = headerBottom > 0;
    const cartBottom = cartRect?.bottom ?? 0;
    const footerTop = footerRect?.top ?? 0;
    const isCartOverlappingFooter = cartBottom >= footerTop;
    const isFooterVisible = footerTop < window.innerHeight;

    if (isHeaderVisible) {
      this.setState(true, false, false);
      return;
    }

    if (isCartOverlappingFooter && scrollingDown) {
      this.setState(false, false, true);
      return;
    }

    if (!scrollingDown && isFooterVisible) {
      this.setState(false, false, true);
      return;
    }

    if (!isHeaderVisible && !isFooterVisible) {
      this.setState(false, true, false);
    } else {
      this.setState(false, false, false);
    }
  }

  ngAfterViewInit() {
    this.onScroll();
  }

  private setState(defaultVal: boolean, fixed: boolean, atFooter: boolean) {
    this.isDefault = defaultVal;
    this.isFixed = fixed;
    this.isAtFooter = atFooter;
  }
}
