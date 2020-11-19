import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

interface ModalContent {
  documentType: string;
}

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: [ './popup.component.scss' ]
})
export class PopupComponent implements OnInit {
  @Input() sentModalData: ModalContent;
  @Input() sendAccordionIndex;
  @Input() uploadStatus;
  @Input() deleteStatus;
  @Input() sendDelRow;

  @Output() onCloseModal: EventEmitter<null> = new EventEmitter();
  @Output() onSelectDocumentType: EventEmitter<{
    sdAI: string,
    sT: string
  }> = new EventEmitter();
  @Output() onDeleteFile: EventEmitter<any> = new EventEmitter();

  //status
  showMainModel: boolean = true;

  hide() {
    //close modal when cancel
    this.onCloseModal.emit();
  }


  //modal select document type to app comp
  sdType;
  selectType(selectedDocumentType) {
    this.sdType = selectedDocumentType;
  }
  sendSelectedDocumentType() {
    this.onSelectDocumentType.emit(
      {
        sdAI: this.sendAccordionIndex,
        sT: this.sdType
      });

    //also close modal when confirmed
    this.onCloseModal.emit();
  }


  //delete file row
  dontshowagainCheckbox;
  dontshowagainStatus;
  delFile() {
    this.dontshowagainCheckbox = document.getElementById('dontshowagain');
    this.dontshowagainStatus = this.dontshowagainCheckbox.checked;
    //console.log(this.dontshowagainStatus);

    this.onDeleteFile.emit(this.dontshowagainStatus);
  }




  /////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    //show upload modal according to flag
    if (this.uploadStatus === true) {
      this.showMainModel = false;
    }
    //show delete modal according to flag
    else if (this.deleteStatus === true) {
      this.showMainModel = false;
    }

  }
}
