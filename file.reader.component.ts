import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'filereader',
    template: `
<style>
    #file-input {
        cursor: pointer;
        outline: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        overflow: hidden;
        filter: alpha(opacity=0);
        /* IE < 9 */
        opacity: 0;
    }
    
    .input-label {
        cursor: pointer;
        position: relative;
        display: inline-block;
    }
</style>

<div>
    <label for="file-input" class="input-label">        
        <button class="btn btn-primary" (click)="onClickHandle()" [ngClass]="{'disabled': !enabled}">
            <span class="glyphicon glyphicon-{{image}}" aria-hidden="true"></span>&nbsp;&nbsp;{{caption}}
        </button>
        <input type="file" id="file-input" (change)="changeListener($event)">            
    </label>
</div>
    
    `
})

export class FileReaderComponent {
    @Input() enabled: boolean = true;
    @Input() caption: string = "Load File";
    /**
     * readMode:
     *   text:  read the contents of the file as a text string.
     *   data:  the data as a URL representing the file's data as a base64 encoded string (like images)
     *   array: the result attribute contains an ArrayBuffer representing the file's data.
     */
    @Input() readMode: string = "text";
    @Input() image: string = "folder-open";
    @Input() onValidate: (value: File) => boolean;
    @Output() onCallback: EventEmitter<any> = new EventEmitter();

    constructor() { }

    changeListener($event: any) {
        let self = this;
        let file: File = $event.target.files[0];
        let myReader: FileReader = new FileReader();

        if (this.doValidate(file)) {
            if (this.readMode == "array")
                myReader.readAsArrayBuffer(file)
            else if (this.readMode == "data")
                myReader.readAsDataURL(file);
            else // text
                myReader.readAsText(file);

            myReader.onloadend = function (e) {
                self.onReadDone(myReader.result);
            };
        }
    }

    onReadDone(text: any) {
        this.onCallback.emit(text);
    }

    onClickHandle() {
        let file = document.getElementById('file-input');
        file.click();
    }

    doValidate(file: File) {
        let value: boolean = false;
        
        if (this.onValidate != undefined) {
            value = this.onValidate(file);
        }
        return value;
    }

}