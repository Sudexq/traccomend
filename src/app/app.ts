import { Component, signal } from '@angular/core';
import { Search } from "./components/search/search";
import { Result } from "./components/result/result";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Search, Result, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  showResult: boolean = false;

  handleSearchCompleted() {
    this.showResult = true;
  }

  goBackToSearch() {
    this.showResult = false;
  }

}
