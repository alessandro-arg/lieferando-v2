import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';

interface Product {
  category: string;
  title: string;
  price: number;
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
export class RestaurantComponent implements AfterViewInit {
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  showLeftArrow = false;
  showRightArrow = true;

  ngAfterViewInit() {
    setTimeout(() => this.checkScroll(), 0);
  }

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({
      left: -200,
      behavior: 'smooth',
    });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({
      left: 200,
      behavior: 'smooth',
    });
  }

  checkScroll() {
    const container = this.scrollContainer.nativeElement;
    this.showLeftArrow = container.scrollLeft > 0;
    this.showRightArrow =
      container.scrollLeft + container.clientWidth < container.scrollWidth;
  }

  categories: Category[] = [
    {
      name: 'Highlights',
      horizontalScroll: true,
      products: [
        {
          category: 'Meat',
          title: 'Gyros Teller',
          price: 11.99,
          description: ['Mit Tzatziki, Pommes, Salat'],
        },
        {
          category: 'Meat',
          title: 'Gyros Teller',
          price: 11.99,
          description: ['Mit Tzatziki, Pommes, Salat'],
        },
        {
          category: 'Meat',
          title: 'Gyros Teller',
          price: 11.99,
          description: ['Mit Tzatziki, Pommes, Salat'],
        },
        {
          category: 'Meat',
          title: 'Gyros Teller',
          price: 11.99,
          description: ['Mit Tzatziki, Pommes, Salat'],
        },
        { title: 'Chickenburger Menü', price: 12.2, category: 'Burger' },
        { title: 'Wunschpizza', price: 12.5, category: 'Pizza' },
        { title: 'Cordon Bleu', price: 14.9, category: 'Meat' },
      ],
    },
    {
      name: 'Offers',
      products: [
        {
          category: 'Offers',
          title: 'Angebot 1',
          price: 28.5,
          description: ['1 Familienpizza mit 4 Zutaten nach Wahl'],
        },
      ],
    },
    {
      name: 'Sopus',
      products: [
        {
          category: 'Soups',
          title: 'Gyros Teller',
          price: 11.99,
          description: ['Mit Tzatziki, Pommes, Salat'],
        },
        {
          category: 'Soups',
          title: 'Schnitzel Wiener Art',
          price: 12.49,
          description: ['Schwein', 'Pommes', 'Zitrone'],
        },
      ],
    },
    { name: 'Salads', products: [] },
    { name: 'Pizza', products: [] },
  ];

  get highlightsCategory(): Category | undefined {
    return this.categories.find((cat) => cat.name === 'Highlights');
  }

  get categoriesWithoutHighlights(): Category[] {
    return this.categories.filter((cat) => cat.name !== 'Highlights');
  }
}
