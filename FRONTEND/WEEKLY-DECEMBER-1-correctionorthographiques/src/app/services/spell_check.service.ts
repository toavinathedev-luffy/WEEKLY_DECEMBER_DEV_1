import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpellCheckService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  detectErrors(text: string, lang: string): Observable<any> {
    const data = { text, lang };
    return this.http.post<any>(`${this.apiUrl}/detect`, data);
  }

  getSuggestions(word: string, lang: string): Observable<any> {
    const data = { word, lang };
    return this.http.post<any>(`${this.apiUrl}/suggest`, data);
  }

  analyzeText(text: string, lang: string): Observable<any> {
    const data = { text, lang };
    return this.http.post<any>(`${this.apiUrl}/analyze`, data);
  }
}
