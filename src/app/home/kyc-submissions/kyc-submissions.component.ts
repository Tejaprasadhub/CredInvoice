import { Component } from '@angular/core';
import { KycService } from '../../@shared/services/kyc.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-kyc-submissions',
  standalone: false,
  templateUrl: './kyc-submissions.component.html',
  styleUrl: './kyc-submissions.component.scss'
})
export class KycSubmissionsComponent {
      private ngUnsubscribe = new Subject();
      first = 0;
  kycSubmissions: any[] = [
  ];
  constructor(private kycService: KycService) {
  }
ngOnInit(){
  this.getKycSubmissions();
}
 getKycSubmissions() {   
      this.kycService.getAdminKycSubmissions()
        .pipe(takeUntil(this.ngUnsubscribe)).subscribe((result: any) => {
          if(result.data?.length > 0) {
           this.kycSubmissions = result.data;          
          }else {
            this.kycSubmissions= [];
          }
        })
  }

  onRowExpand(event: any) {
    console.log('Row expanded', event);
  }
  onRowCollapse(event: any) {
    console.log('Row collapsed', event);
  }
  downloadBase64File(base64String: string, fileName: string, fileType: string) {
    const linkSource = `data:${fileType};base64,${base64String}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

   acceptOrRejectSubmissions(kycId:string,status:string) {   
    let dataObject:any={};
    dataObject.status = status;
    dataObject.review_notes = "";
      this.kycService.acceptOrRejectKycSubmission(kycId,dataObject)
        .pipe(takeUntil(this.ngUnsubscribe)).subscribe((result: any) => {
          this.getKycSubmissions();
        })
  }
}
