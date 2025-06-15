import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  selected = signal<'delivery' | 'collection'>('delivery');

  setMode(mode: 'delivery' | 'collection') {
    this.selected.set(mode);
  }
}
