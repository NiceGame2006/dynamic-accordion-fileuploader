import { Component, Output, EventEmitter, HostListener, Input, OnInit, OnChanges, OnDestroy, AfterViewInit, AfterContentInit, AfterContentChecked } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: [ './fileupload.component.scss' ]
})
export class FileuploadComponent implements OnChanges, OnInit, AfterViewInit, AfterContentInit, AfterContentChecked, OnDestroy {
  //miscell
  @Input() filecompInstance: string;
  @Input() appCompClickFile;

  //date
  date = new DatePipe('en-US');


  //upload status and further progress
  @Output() onUploadDragDrop: EventEmitter<{
    filecompEmitIndex: string,
    filename: string,
    filesize: string,
    uploadtime: string
  }> = new EventEmitter();
  isLoading: boolean = false;
  isFailUpload: boolean = false;
  isNotSupport: boolean = false;


  //ngclass binding flag to various drag event -> and filecomp ngIf flag -> two style grey and blue background
  isShowComp: boolean = false;
  isDropZoneDragOver: boolean = false;


  //Dragover listener
  @HostListener('window: dragover', [ '$event' ]) onDragOverWindow(DragoverEvent) {
    DragoverEvent.preventDefault();

    this.isShowComp = true;
  }
  @HostListener('dragover', [ '$event' ]) onDragOverDropZone(DragoverEvent) {
    //console.log('over dragzone');

    this.isDropZoneDragOver = true;
  }


  //Drop listeners
  @HostListener('window: drop', [ '$event' ]) public onDropWindow(DropEvent) {
    DropEvent.preventDefault();

    this.isShowComp = false;

    //see if window drop triggered -> and show have which instances
    //console.log('have instances:', this.filecompInstance);
  }
  @HostListener('drop', [ '$event' ]) public onDropDropZone(DropEvent) {
    this.isShowComp = false;
    this.isDropZoneDragOver = false;


    //the files contained in the dropEvent
    let files = DropEvent.dataTransfer.files;
    if (files.length > 0) {

      //failupload temp stat => I don't need to do internet related things
      if (files[ 0 ].type === 'application/pdf') {
        this.isFailUpload = true;
      }
      //notsupported temp stat => currently only .txt 
      else if (files[ 0 ].type !== 'text/plain') {
        //notsupport class flag
        this.isNotSupport = true;
      }
      else {
        //uploading class flag
        this.isLoading = true;

        //emit filename object with index back to app comp
        //console.log('dropped instance:', this.filecompInstance);
        this.onUploadDragDrop.emit({
          filecompEmitIndex: this.filecompInstance,
          filename: files[ 0 ].name,
          filesize: files[ 0 ].size.toString(),
          uploadtime: this.date.transform(new Date(), 'yyyy-MM-dd h:mm')
        });
      }

    }

  }


  //Dragleave listeners
  @HostListener('window: dragleave', [ '$event' ]) onLeaveWindow(DragLeaveEvent) {
    this.isShowComp = false;
  }
  @HostListener('dragleave', [ '$event' ]) onLeaveDropZone(DragLeaveEvent) {
    //stop keep back to dragover event => stop flashing between the spaces
    DragLeaveEvent.stopPropagation();

    //console.log('leave dragzone');

    this.isDropZoneDragOver = false;
  }


  //upload status class controllers -> when cancel button
  upLeave() {
    this.isShowComp = false;
    this.isLoading = false;
  }
  failLeave() {
    this.isShowComp = false;
    this.isFailUpload = false;
  }
  notsupLeave() {
    this.isShowComp = false;
    this.isNotSupport = false;
  }




  /////////////////////////////////////////////////////
  ngOnChanges() {
    //console.log('change');
  }
  ngOnInit() {
    //console.log(this.appCompClickFile);
  }
  ngAfterContentChecked() {
  }
  ngAfterContentInit() {
    //console.log(this.appCompClickFile);
  }
  ngAfterViewInit() {
    //console.log(this.appCompClickFile);
  }
  ngOnDestroy() {
    //console.log(this.appCompClickFile);
  }
}
