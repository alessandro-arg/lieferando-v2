import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  selected = signal<'delivery' | 'collection'>('delivery');

  setMode(mode: 'delivery' | 'collection') {
    this.selected.set(mode);
  }
}
