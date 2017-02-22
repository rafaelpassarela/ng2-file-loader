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
            {{caption}}
        </button>
        <input type="file" id="file-input" (change)="changeListener($event)">            
    </label>
</div>
    
    `
})

export class FileReaderComponent {
    @Input() enabled: boolean = false;
    @Input() caption: string;

    @Output() onCallback: EventEmitter<any> = new EventEmitter();

    constructor() { }

    changeListener($event: any) {
        let self = this;
        let file: File = $event.target.files[0];
        let myReader: FileReader = new FileReader();
        myReader.readAsText(file);

        let resultSet = new Array<any>();
        myReader.onloadend = function (e) {
            // you can perform an action with data read here
            // as an example i am just splitting strings by spaces
            // var columns = myReader.result.split(/\r\n|\r|\n/g);
            // for (var i = 0; i < columns.length; i++) {
            //     resultSet.push(columns[i].split(' '));
            // }

            resultSet = myReader.result;

            self.readDone(resultSet);
        };
    }

    readDone(text: any) {
        this.onCallback.emit(text);
    }

    onClickHandle() {
        let file = document.getElementById('file-input');
        file.click();
    }

}