import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { HostListener } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  MatTabChangeEvent,
  MatTabGroup,
  MatTabsModule,
} from '@angular/material/tabs';

import {
  Firestore,
  collection,
  getDocs,
  CollectionReference,
  DocumentData,
} from '@angular/fire/firestore';

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
    CommonModule,
  ],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.scss',
})
export class RestaurantComponent implements AfterViewInit, OnInit {
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  highlights: any[] = [];
  categories: any[] = [];
  tabLabels: string[] = [
    'Highlights',
    'Offers',
    'Pasta',
    'Sopus',
    'Salads',
    'Pizza',
    'Sides',
    'Burgers',
    'Desserts',
    'Drinks',
  ];
  sectionOffsets: { id: string; offsetTop: number }[] = [];
  currentActiveTab: string | null = null;

  showLeftArrow = false;
  showRightArrow = true;

  isStuck = false;

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    const categoriesCollectionRef = collection(
      this.firestore,
      'categories'
    ) as CollectionReference<DocumentData>;

    getDocs(categoriesCollectionRef)
      .then((querySnapshot) => {
        const categoriesArray: any[] = [];

        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          const id = docSnap.id;
          categoriesArray.push({ id, ...data });
        });

        this.categories = categoriesArray.filter(
          (cat) => cat.id !== 'highlights'
        );
        const highlightsDoc = categoriesArray.find(
          (cat) => cat.id === 'highlights'
        );
        this.highlights = highlightsDoc?.products || [];

        this.categories = categoriesArray
          .filter((cat) => cat.id !== 'highlights')
          .sort((a, b) => {
            const indexA = this.tabLabels.findIndex(
              (label) => this.sanitizeId(label) === a.id
            );
            const indexB = this.tabLabels.findIndex(
              (label) => this.sanitizeId(label) === b.id
            );
            return indexA - indexB;
          });

        setTimeout(() => this.checkScroll(), 0);
      })
      .catch((error) => {
        console.error('Error getting categories:', error);
      });
  }

  ngAfterViewInit() {
    setTimeout(() => this.checkScroll(), 0);
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const stickyTarget = document.querySelector('.sticky-wrapper');
    const hero = document.querySelector('.hero');

    if (stickyTarget && hero) {
      const heroBottom = hero.getBoundingClientRect().bottom;
      this.isStuck = heroBottom <= 0;
    }
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

  sanitizeId(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

  onTabChange(event: MatTabChangeEvent): void {
    const selectedLabel = this.tabLabels[event.index];
    const id = this.sanitizeId(selectedLabel);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -180;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
}
