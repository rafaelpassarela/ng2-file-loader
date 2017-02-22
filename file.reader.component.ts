import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'filereader',
    template: `

<div>
    {{caption}}:
    <input type="file" (change)="changeListener($event)">
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
            var columns = myReader.result.split(/\r\n|\r|\n/g);
            for (var i = 0; i < columns.length; i++) {
                resultSet.push(columns[i].split(' '));
            }
            //self.resultSet = resultSet; // probably dont need to do this atall
            //self.complete.next(self.resultSet); // pass along the data which whould be used by the parent component

            self.readDone(resultSet);
        };
    }

    readDone(text: any) {
        this.onCallback.emit(text);
    }


}