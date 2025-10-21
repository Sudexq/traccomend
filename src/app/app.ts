import { Component } from '@angular/core';
import { Search } from "./components/search/search";
import { Result } from "./components/result/result";
import { CommonModule } from '@angular/common';
import { HotelSearcher } from './components/hotel-searcher/hotel-searcher';
import { AppRoutingModule } from './app-routing/app-routing-module';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Search,
    Result,
    CommonModule,
    AppRoutingModule,
    MatTabsModule
],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  showResult: boolean = false;

  // tab <-> route eşlemesi
  tabs = [
    { label: 'FLIGHT OFFERS', route: '/flight-offers' },
    { label: 'HOTELS', route: '/hotel-search' },
  ];

  constructor(private router: Router) {}

  handleSearchCompleted() {
    this.showResult = true;
  }

  goBackToSearch() {
    this.showResult = false;
  }

  // URL'e göre seçili tab index'ini döndür
  get selectedTabIndex(): number {
    const url = this.router.url.split('?')[0];
    const idx = this.tabs.findIndex(t => url.startsWith(t.route));
    return idx >= 0 ? idx : 0;
  }

  // tab değiştiğinde rota yönlendir
  onTabChange(index: number) {
    const r = this.tabs[index]?.route;
    if (r) {
      this.router.navigateByUrl(r);
    }
  }
}