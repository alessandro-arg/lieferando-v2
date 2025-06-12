import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FoodApiService {
  private apiUrl = 'https://api.spoonacular.com/recipes/complexSearch';

  constructor(private http: HttpClient) {}

  getFoodItems(): Observable<any> {
    const params = {
      apiKey: environment.spoonacularApiKey,
      number: '10',
      addRecipeInformation: 'true',
    };

    return this.http.get(this.apiUrl, { params });
  }
}
