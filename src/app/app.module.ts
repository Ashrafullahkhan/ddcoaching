import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { XyzComponent } from './xyz/xyz.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NewsComponent } from './news/news.component';
import { AboutComponent } from './about/about.component';
import { CoursesComponent } from './courses/courses.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularFireModule} from '@angular/fire/compat';
<<<<<<< HEAD
import { MatTableModule } from '@angular/material/table' 
=======

>>>>>>> 86228e29f412194d2f3376ef5534c26afe69ebe9
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import { environment } from 'src/environments/environment';
import { LayoutComponent } from './admin/layout/layout.component';
<<<<<<< HEAD
import { DashboardComponent,DialogOverviewExampleDelete } from './admin/dashboard/dashboard.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CreateCourseComponent,DialogOverviewExampleDialog } from './admin/create-course/create-course.component';
import {MatInputModule} from '@angular/material/input';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import {MatDialogModule} from '@angular/material/dialog';
import { QuillModule } from 'ngx-quill';
import {MatRadioModule} from '@angular/material/radio';
import { AuthService } from './services/auth.service';
=======
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';

>>>>>>> 86228e29f412194d2f3376ef5534c26afe69ebe9
import { HotToastModule } from '@ngneat/hot-toast';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
@NgModule({
  declarations: [
    AppComponent,
    XyzComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    NewsComponent,
    AboutComponent,
    CoursesComponent,
    LayoutComponent,
    DashboardComponent,
    CreateCourseComponent,
    DialogOverviewExampleDialog,
    DialogOverviewExampleDelete
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    SlickCarouselModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatPaginatorModule,
    MatTableModule,
    MatTabsModule,
    MatDialogModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    NgxMatFileInputModule,
  MatFormFieldModule,
 MatRadioModule,
   FormsModule,
    ReactiveFormsModule,
    HotToastModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),


  ],
  providers: [AuthService],
bootstrap: [AppComponent]
})
export class AppModule { }
