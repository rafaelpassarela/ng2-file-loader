"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var FileReaderComponent = (function () {
    function FileReaderComponent() {
        this.enabled = false;
        this.onCallback = new core_1.EventEmitter();
    }
    FileReaderComponent.prototype.changeListener = function ($event) {
        var self = this;
        var file = $event.target.files[0];
        var myReader = new FileReader();
        myReader.readAsText(file);
        var resultSet = new Array();
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
    };
    FileReaderComponent.prototype.readDone = function (text) {
        this.onCallback.emit(text);
    };
    FileReaderComponent.prototype.onClickHandle = function () {
        var file = document.getElementById('file-input');
        file.click();
    };
    return FileReaderComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], FileReaderComponent.prototype, "enabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FileReaderComponent.prototype, "caption", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FileReaderComponent.prototype, "onCallback", void 0);
FileReaderComponent = __decorate([
    core_1.Component({
        selector: 'filereader',
        template: "\n<style>\n    #file-input {\n        cursor: pointer;\n        outline: none;\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 0;\n        height: 0;\n        overflow: hidden;\n        filter: alpha(opacity=0);\n        /* IE < 9 */\n        opacity: 0;\n    }\n    \n    .input-label {\n        cursor: pointer;\n        position: relative;\n        display: inline-block;\n    }\n</style>\n\n<div>\n    <label for=\"file-input\" class=\"input-label\">        \n        <button class=\"btn btn-primary\" (click)=\"onClickHandle()\" [ngClass]=\"{'disabled': !enabled}\">\n            {{caption}}\n        </button>\n        <input type=\"file\" id=\"file-input\" (change)=\"changeListener($event)\">            \n    </label>\n</div>\n    \n    "
    }),
    __metadata("design:paramtypes", [])
], FileReaderComponent);
exports.FileReaderComponent = FileReaderComponent;
//# sourceMappingURL=file.reader.component.js.map