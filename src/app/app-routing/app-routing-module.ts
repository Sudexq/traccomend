import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelSearcher } from '../components/hotel-searcher/hotel-searcher';

// Diğer component'leriniz varsa import edip routes dizisine ekleyin
// import { FlightOffers } from './components/flight-offers/flight-offers';

// app-routing.module.ts (root)
const routes: Routes = [
  {
    path: 'hotel',
    loadChildren: () => import('../components/hotel-searcher/hotel-searcher').then(m => m.HotelSearcher)
  },
  { path: '', redirectTo: 'hotel', pathMatch: 'full' },
  { path: '**', redirectTo: 'hotel' }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}