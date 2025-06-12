import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodApiService } from '../services/food-api.service';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-food-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss'],
})
export class FoodListComponent implements OnInit {
  foodItems: any[] = [];
  loading = true;

  constructor(private foodService: FoodApiService) {}

  ngOnInit() {
    this.foodService.getFoodItems().subscribe((data) => {
      this.foodItems = data.results;
      this.loading = false;
    });
  }
}
