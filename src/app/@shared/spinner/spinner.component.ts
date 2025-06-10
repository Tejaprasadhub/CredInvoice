import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable, Subscription, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { LoadingHttpInterceptorComponent } from '../loading-http-interceptor/loading-http-interceptor.component';

@UntilDestroy({ checkProperties: true})
@Component({
  selector: 'app-spinner',
  standalone: false,
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnDestroy {
  private subsription: Subscription;
  public visible: boolean=false;
  private debounceDelay = 0;

  num : number=1;
  min: number = 1;
  max : number = 11;
  spinnerText:string="";

  educationQuotes=[
    "Education is the kindling of a flame, not the filling of a vessel.",
    "Being a student is easy. Learning requires actual work.",
    "Education is not the filling of a pot but the lighting of a fire.",
    "Change is the end result of all true learning.",
    "It is not from ourselves that we learn to be better than we are.",
    "Education is a progressive discovery of our own ignorance.",
    "I never learned from a man who agreed with me.",
    "Anyone who stops learning is old, whether at twenty or eighty.",
    "Everyone you will ever meet knows something you don’t.",
    "Your attitude, not your aptitude, will determine your altitude.",
    "Don’t make up your mind. “Knowing” is the end of learning.",
    "Never stop learning. Never stop growing.",
  ]

  constructor(private loadingHttpInterceptor: LoadingHttpInterceptorComponent) {
    this.subsription = this.loadingHttpInterceptor
      .anyRequestsLoading
      .pipe(debounce(this.handleDebounce.bind(this)))
      .subscribe((anyRequestLoading:any) => {
        this.visible = anyRequestLoading;
       this.randomNumber();
      });
  }

 

  randomNumber(){
     this.num = Math.round(Math.random() * (this.max - this.min +1) + this.min);    
     this.spinnerText = this.educationQuotes[this.num]; 
  }

  ngOnDestroy(): void {
    this.subsription.unsubscribe();
  }
  private handleDebounce(anyRequestLoading: boolean): Observable<number> {
    if (anyRequestLoading) {
      return timer(this.debounceDelay)
    }
    return timer(0);
  }

}
