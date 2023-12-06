import { Component } from '@angular/core';
import { SpellCheckService } from './services/spell_check.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'WEEKLY-DECEMBER-1-correctionorthographique';
  textToCheck: string = '';
  errors: string[] = [];
  constructor(private spellCheckService: SpellCheckService) {}
  onTextChanged() {
    const lang = 'en'; // Change this to 'fr' for French
    this.spellCheckService
      .detectErrors(this.textToCheck, lang)
      .subscribe((result) => {
        this.errors = result.errors;
      });
  }
  getSuggestions(word: string): string[] {
    // Fetch suggestions from the backend
    // You can make an API call to get suggestions for the misspelled word
    const lang = 'en'; // Change this to 'fr' for French
    return []; // Placeholder; replace with actual suggestions
  }
  replaceWord(oldWord: string, newWord: string) {
    // Replace the misspelled word with the selected suggestion
    this.textToCheck = this.textToCheck.replace(oldWord, newWord);
    // Optionally, you can clear the suggestions for the current word
  }
}
