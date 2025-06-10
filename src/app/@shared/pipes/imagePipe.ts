import {
    Pipe,
    PipeTransform,
    NgZone,
    ChangeDetectorRef,
    OnDestroy
  } from '@angular/core';
import { environment } from '../../../environments/environment';

  @Pipe({
    name: 'imagePipe',
    pure: false
  })
  export class ImagePipe implements PipeTransform {
    private timer!: number;
    constructor(
      private changeDetectorRef: ChangeDetectorRef,
      private ngZone: NgZone
    ) {}

    transform(value: string,from:string) {
    if(from == "profile"){
     if(value){        
        // return this.profileURL + value;
     }else{
        return "assets/images/no-image.jpg";
     }
    }else if(from == "category"){
        if(value){        
            // return this.categoryURL + value;
         }else{
            return "assets/images/no-image.jpg";
         }
    }
    else if(from == "products"){
      if(value){        
          // return this.productsURL + value;
       }else{
          return "assets/images/no-image1.jpg";
       }
  }
    return "";
    }
  }
  