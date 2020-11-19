import { Component, ViewChildren, QueryList, OnInit } from '@angular/core';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { DatePipe } from '@angular/common';

interface ModalContent {
  documentType: string;
}
interface Accordion {
  accordionName: string;
  accordionContent: Array<{
    fileName: string,
    fileSize: string,
    uploadTime: string
  }>;
  modalContent: ModalContent[];
  uploadedFileList: Array<string>;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
})
export class AppComponent implements OnInit {
  //for button fileupload -> bind to components template variable fUpload
  @ViewChildren('fUpload') fileups: QueryList<FileuploadComponent>;

  //date
  date = new DatePipe('en-US');


  //data array
  // accordionList: Accordion[] = [];
  accordionList: Accordion[] = [
    {
      accordionName: 'COS',
      accordionContent: [
        {
          fileName: 'res_form.pdf',
          fileSize: '100 KB',
          uploadTime: '2020-06-06 15:41'
        },
        {
          fileName: 'client_deposit_receipt.pdf',
          fileSize: '200 KB',
          uploadTime: '2020-06-08 15:41'
        },
        {
          fileName: 'floorplan.pdf',
          fileSize: '300 KB',
          uploadTime: '2020-06-08 15:41'
        },
        {
          fileName: 'executed_COS.pdf',
          fileSize: '400 KB',
          uploadTime: '2020-06-09 15:41'
        }
      ],
      modalContent: [
        {
          documentType: 'Executed COS 1'
        },
        {
          documentType: 'signed_cos&vendorstatment 1'
        },
        {
          documentType: 'signed_special_rebate 1'
        }
      ],
      uploadedFileList: [
        'sad.txt'
      ]
    },

    {
      accordionName: 'Transaction',
      accordionContent: [
        {
          fileName: 'res_form.pdfclient_deposit_receipt.pdfclient_deposit_receipt.pdfclient_deposit_receipt.pdfclient_deposit_receipt.pdf',
          fileSize: '500 KB',
          uploadTime: '2020-06-06 15:41'
        },
        {
          fileName: 'client_deposit_receipt.pdfclient_deposit_receipt.pdfclient_deposit_receipt.pdfclient_deposit_receipt.pdf',
          fileSize: '600 KB',
          uploadTime: '2020-06-08 15:41'
        },
        {
          fileName: 'floorplan.pdfclient_deposit_receipt.pdfclient_deposit_receipt.pdfclient_deposit_receipt.pdfclient_deposit_receipt.pdf',
          fileSize: '700 KB',
          uploadTime: '2020-06-08 15:41'
        },
        {
          fileName: 'executed_COS.pdfclient_deposit_receipt.pdfclient_deposit_receipt.pdfclient_deposit_receipt.pdfclient_deposit_receipt.pdf',
          fileSize: '800 KB',
          uploadTime: '2020-06-09 15:41'
        }
      ],
      modalContent: [
        {
          documentType: 'Executed COS 2'
        },
        {
          documentType: 'signed_cos&vendorstatment 2'
        },
        {
          documentType: 'signed_special_rebate 2'
        }
      ],
      uploadedFileList: [
        'happy.txt'
      ]
    }
  ];



  //target send which modal data from the big array
  modalData: ModalContent;
  accordionIndex;

  //ngIf boolean control popup init or destroy
  isShowPopup: boolean = false;
  dtypeAccordionIndex;
  dtypeModalIndex;
  selectedDType: string;

  //Popup omponent controller
  showPopup(md: ModalContent, aI) {
    this.modalData = md;
    this.accordionIndex = aI;
    this.isShowPopup = true;
  }
  hidePopup() {
    this.modalData = null;
    this.isShowPopup = false;

    this.isUploading = false;
    this.isDelete = false;

    //change back button-text-1 to default name after uploading
    this.canUpload = false;
    console.log('just uploaded accordion', this.uploadacIndex);
    document.getElementById("filelist" + this.uploadacIndex).innerText = "Upload new file";
  }
  selectDocumentType(typewithIndex) {
    this.dtypeAccordionIndex = typewithIndex.sdAI;
    this.dtypeModalIndex = typewithIndex.sT;
    //selected which document type and associate indexs
    console.log(this.dtypeAccordionIndex);
    console.log(this.dtypeModalIndex);

    //output modal selected document type
    this.selectedDType = this.accordionList[ this.dtypeAccordionIndex ].modalContent[ this.dtypeModalIndex ].documentType;
    console.log(this.selectedDType);

    document.getElementById("dtype" + this.dtypeAccordionIndex).innerText = this.selectedDType;
  }

  //Uploading status
  isUploading: boolean = false;
  uploadacIndex;
  showUpload(upacIndex) {
    this.uploadFile();

    this.uploadacIndex = upacIndex;
  }
  //Delete status
  isDelete: boolean = false;
  sdDelRow;
  delaIndex;
  delrIndex;
  modaldeletedontShowAgain: boolean = false;
  showDelete(aRow, aIndex, rIndex) {
    this.isDelete = true;

    //console.log(aRow, aIndex, rIndex);

    this.delaIndex = aIndex;
    this.delrIndex = rIndex;

    //send to popup comp for delete control
    this.sdDelRow = aRow;

    //checked box -> immediate here do delete
    if (this.modaldeletedontShowAgain === true) {
      console.log('hi');
      this.deleteFileRow(this.modaldeletedontShowAgain);

      this.isDelete = false;
    }
  }
  deleteFileRow(mddeldontshowagn) {
    this.modaldeletedontShowAgain = mddeldontshowagn;
    console.log(this.modaldeletedontShowAgain);

    //console.log(this.accordionList[ this.delaIndex ].accordionContent[ this.delrIndex ]);

    this.accordionList[ this.delaIndex ].accordionContent.splice(this.delrIndex, 1);

    console.log(this.accordionList);
  }


  //Download status -> temp url until have server?
  download() {
    console.log('hi');
    window.location.href = "https://www.google.com.hk/";
  }


  //Upload by button
  uploadedfileName: string;
  uploadedfileSize: string;
  uploadedfileTime: string;
  canUpload: boolean = false;
  upfileIndex;
  getfile(filedata, acIndex) {
    console.log('accord instance:', acIndex);
    console.log('.............................');

    //control fileupload comp type check
    if (filedata.target.files[ 0 ].type === 'application/pdf') {
      console.log('fail');

      //control fileupload comp's flag
      this.fileups.toArray()[ acIndex ].isFailUpload = true;
    }
    else if (filedata.target.files[ 0 ].type !== 'text/plain') {
      console.log('not sup');

      //control fileupload comp's flag
      this.fileups.toArray()[ acIndex ].isNotSupport = true;
    }
    else {
      console.log('success');

      //save the file data in app comp
      this.upfileIndex = acIndex;
      this.uploadedfileName = filedata.target.files[ 0 ].name;
      this.uploadedfileSize = filedata.target.files[ 0 ].size.toString();
      this.uploadedfileTime = this.date.transform(new Date(), 'yyyy-MM-dd h:mm');


      //push to main array fileList
      this.accordionList[ acIndex ].uploadedFileList.push(filedata.target.files[ 0 ].name);
      console.log('accordion instance' + acIndex + ': ' + this.accordionList[ acIndex ].uploadedFileList);

      document.getElementById("filelist" + acIndex).innerText = filedata.target.files[ 0 ].name;

      this.canUpload = true;
    }
  }


  //Upload by Drag and Drop and change button-text-1 name
  DragDropFile({ filecompEmitIndex, filename, filesize, uploadtime }: {
    //filename object fetched from fileuploadcomp
    filecompEmitIndex: string,
    filename: string
    filesize: string,
    uploadtime: string
  }) {
    //whole object get from event
    //console.log(filecompEmitIndex, filename);

    //save the file data in app comp
    this.upfileIndex = filecompEmitIndex;
    this.uploadedfileName = filename;
    this.uploadedfileSize = filesize;
    this.uploadedfileTime = uploadtime;

    this.accordionList[ filecompEmitIndex ].uploadedFileList.push(filename);
    console.log('accordion instance' + filecompEmitIndex + ': ' + this.accordionList[ filecompEmitIndex ].uploadedFileList);

    document.getElementById("filelist" + filecompEmitIndex).innerText = filename;

    this.canUpload = true;
  }


  //Upload the file row to menu after confirm
  uploadFile() {
    if (this.canUpload === true) {
      this.accordionList[ this.upfileIndex ].accordionContent.splice(0, 0,
        { fileName: this.uploadedfileName, fileSize: this.uploadedfileSize + ' KB', uploadTime: this.uploadedfileTime });

      console.log('upload');
      this.isUploading = true;
    }
    else {
      console.log('cant upload');
    }
  }

  ngOnInit() {
    // fetch('http://localhost:3000/api/getaccordionlist').then(response => {
    //   return response.json();
    // }).then(accordionList => {
    //   this.accordionList = accordionList;
    // }).catch(error => {
    //   console.log(error);
    // });
    // //console.log(this.date.transform(new Date(), 'yyyy-MM-dd h:mm'));
  }
}
