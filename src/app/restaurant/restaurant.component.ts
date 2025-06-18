import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
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
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  highlights: any[] = [];
  categories: any[] = [];

  showLeftArrow = false;
  showRightArrow = true;

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
        setTimeout(() => this.checkScroll(), 0);
      })
      .catch((error) => {
        console.error('Error getting categories:', error);
      });
  }

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
}
