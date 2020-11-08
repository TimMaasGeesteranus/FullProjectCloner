import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AboutComponent} from './components/about/about.component';
import {RepositoriesComponent} from './components/repositories/repositories.component';
import {ContactComponent} from './components/contact/contact.component';
import {CloneComponent} from './components/clone/clone.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'repositories', component: RepositoriesComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'clone/:cloneID', component: CloneComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
