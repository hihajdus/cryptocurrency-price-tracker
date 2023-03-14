import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainViewComponent } from './main-view/main-view.component';
import { DetailsViewComponent } from './details-view/details-view.component';

const routes: Routes = [
  { path: 'main', component: MainViewComponent },
  { path: 'details', component: DetailsViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
