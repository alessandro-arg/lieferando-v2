import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';

interface Product {
  title: string;
  price: number;
  fromPrice?: boolean;
  originalPrice?: number;
  description?: string[];
}

interface Category {
  name: string;
  horizontalScroll?: boolean;
  products: Product[];
}

@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    NgFor,
    NgIf,
    CommonModule,
  ],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.scss',
})
export class RestaurantComponent {
  categories: Category[] = [
    {
      name: 'Highlights',
      horizontalScroll: true,
      products: [
        { title: 'Angebot 1', price: 28.5 },
        { title: 'Chickenburger Menü', price: 12.2 },
        { title: 'Wunschpizza', price: 12.5, fromPrice: true },
        { title: 'Cordon Bleu', price: 14.9 },
      ],
    },
    {
      name: 'Angebote',
      products: [
        {
          title: 'Angebot 1',
          price: 28.5,
          description: ['1 Familienpizza mit 4 Zutaten nach Wahl'],
        },
      ],
    },
    {
      name: 'Suppen',
      products: [
        {
          title: 'Gyros Teller',
          price: 11.99,
          description: ['Mit Tzatziki', 'Pommes', 'Salat'],
        },
        {
          title: 'Schnitzel Wiener Art',
          price: 12.49,
          description: ['Schwein', 'Pommes', 'Zitrone'],
        },
      ],
    },
    { name: 'Salate', products: [] },
    { name: 'Pizza', products: [] },
    { name: 'Wunschpizza', products: [] },
    { name: 'Amerikanische', products: [] },
  ];

  get highlightsCategory(): Category | undefined {
    return this.categories.find((cat) => cat.name === 'Highlights');
  }

  get categoriesWithoutHighlights(): Category[] {
    return this.categories.filter((cat) => cat.name !== 'Highlights');
  }
}
