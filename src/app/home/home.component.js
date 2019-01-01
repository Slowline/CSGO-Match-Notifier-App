"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
// https://github.com/nstudio/nativescript-audio
var nativescript_audio_1 = require("nativescript-audio");
// https://www.npmjs.com/package/nativescript-vibrate
var nativescript_vibrate_1 = require("nativescript-vibrate");
// https://www.npmjs.com/package/nativescript-websockets
require('nativescript-websockets');
var HomeComponent = /** @class */ (function () {
    function HomeComponent(page, ngZone) {
        this.page = page;
        this.ngZone = ngZone;
        this.needSetup = true;
        this.matchFound = false;
        this.isReconnecting = false;
        this.wsocket = null;
        this.foundPlayer = null;
        // Hide Action Bar
        page.actionBarHidden = true;
        // Setup Music Player
        this.foundPlayer = new nativescript_audio_1.TNSPlayer();
        this.foundPlayer.debug = false;
        this.foundPlayer.initFromFile({
            audioFile: '~/audio/found.mp3',
            loop: false
        });
        this.foundPlayer.volume = 0.2;
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent.prototype.startListening = function () {
        var _this = this;
        // Get Native Element of Ip TextField
        var ipTextField = this.ipTextFieldRef.nativeElement;
        // Check if something is in our textfield if not alert..
        if (ipTextField.text.length <= 0) {
            alert("You need to enter an IP Address, look at the console at your PC.");
        }
        else {
            // Set Setup to false...
            this.needSetup = false;
            console.log("[Debug] " + ipTextField.text);
            // Setup Websocket
            this.wsocket = new WebSocket("ws://" + ipTextField.text + "/match", []);
            this.wsocket.addEventListener("open", function (event) {
                alert("[Websocket] Connected to Server..");
            });
            this.wsocket.addEventListener("message", function (event) {
                // Found Match?
                _this.ngZone.run(function () {
                    var message = event.data;
                    if (message.match) {
                        // Start Playing Musik ..
                        _this.foundPlayer.play();
                        // Start Vibrating for 2000ms
                        var vibrator = new nativescript_vibrate_1.Vibrate();
                        vibrator.vibrate(2000);
                        // matchFound to true
                        _this.matchFound = true;
                    }
                });
                // Reset MatchFound...
                setTimeout(function () {
                    _this.ngZone.run(function () {
                        // matchFound to false
                        _this.matchFound = false;
                        // Pause Musik
                        _this.foundPlayer.pause();
                    });
                }, 12000);
            });
            this.wsocket.addEventListener("close", function (event) {
                //this.switchViewsForRetry();
                // Set isReconnecting to true because we lost connection...
                _this.isReconnecting = true;
            });
            this.wsocket.addEventListener("error", function (event) {
                _this.switchViewsForRetry();
            });
        }
    };
    HomeComponent.prototype.switchViewsForRetry = function () {
        var _this = this;
        // Run With ngZone otherwise it wont update the ui...
        this.ngZone.run(function () {
            // Set Setup to true...
            _this.needSetup = true;
            // Alert the User
            alert("An Error Occured whilest trying to Connect/being connected to the Websocket, try again.");
            // Reset Websocket Object
            _this.wsocket = null;
        });
    };
    __decorate([
        core_1.ViewChild("setup"),
        __metadata("design:type", core_1.ElementRef)
    ], HomeComponent.prototype, "setupLayoutRef", void 0);
    __decorate([
        core_1.ViewChild("listening"),
        __metadata("design:type", core_1.ElementRef)
    ], HomeComponent.prototype, "listeningLayoutRef", void 0);
    __decorate([
        core_1.ViewChild("ipAddressTextField"),
        __metadata("design:type", core_1.ElementRef)
    ], HomeComponent.prototype, "ipTextFieldRef", void 0);
    HomeComponent = __decorate([
        core_1.Component({
            selector: "home",
            moduleId: module.id,
            templateUrl: "./home.component.html",
            styleUrls: ["./home.component.css"]
        }),
        __metadata("design:paramtypes", [page_1.Page, core_1.NgZone])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUErRjtBQUMvRixzREFBcUQ7QUFJckQsZ0RBQWdEO0FBQ2hELHlEQUErQztBQUUvQyxxREFBcUQ7QUFDckQsNkRBQStDO0FBRS9DLHdEQUF3RDtBQUN4RCxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQVFuQztJQWVJLHVCQUFvQixJQUFXLEVBQVUsTUFBYztRQUFuQyxTQUFJLEdBQUosSUFBSSxDQUFPO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQVJ2RCxjQUFTLEdBQWEsSUFBSSxDQUFDO1FBQzNCLGVBQVUsR0FBYSxLQUFLLENBQUM7UUFDN0IsbUJBQWMsR0FBYSxLQUFLLENBQUM7UUFFakMsWUFBTyxHQUFTLElBQUksQ0FBQztRQUVyQixnQkFBVyxHQUFlLElBQUksQ0FBQztRQUczQixrQkFBa0I7UUFDbEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFFNUIscUJBQXFCO1FBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSw4QkFBUyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDO1lBQzFCLFNBQVMsRUFBRSxtQkFBbUI7WUFDOUIsSUFBSSxFQUFFLEtBQUs7U0FDZCxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7SUFDbEMsQ0FBQztJQUVELGdDQUFRLEdBQVI7SUFFQSxDQUFDO0lBRUQsc0NBQWMsR0FBZDtRQUFBLGlCQTZEQztRQTVERyxxQ0FBcUM7UUFDckMsSUFBSSxXQUFXLEdBQWUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUM7UUFFaEUsd0RBQXdEO1FBQ3hELElBQUcs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QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHVCQUF1QjtZQUNwQyxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztTQUN0QyxDQUFDO3lDQWdCNkIsV0FBSSxFQUFrQixhQUFNO09BZjlDLGFBQWEsQ0ErR3pCO0lBQUQsb0JBQUM7Q0FBQSxBQS9HRCxJQStHQztBQS9HWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nWm9uZSwgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgQ29tcG9uZW50UmVmLCBFbGVtZW50UmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZVwiO1xyXG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS90ZXh0LWZpZWxkXCI7XHJcbmltcG9ydCB7IFN0YWNrTGF5b3V0IH0gZnJvbSBcInVpL2xheW91dHMvc3RhY2stbGF5b3V0XCI7XHJcblxyXG4vLyBodHRwczovL2dpdGh1Yi5jb20vbnN0dWRpby9uYXRpdmVzY3JpcHQtYXVkaW9cclxuaW1wb3J0IHsgVE5TUGxheWVyIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWF1ZGlvJztcclxuXHJcbi8vIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL25hdGl2ZXNjcmlwdC12aWJyYXRlXHJcbmltcG9ydCB7IFZpYnJhdGUgfSBmcm9tICduYXRpdmVzY3JpcHQtdmlicmF0ZSc7XHJcblxyXG4vLyBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9uYXRpdmVzY3JpcHQtd2Vic29ja2V0c1xyXG5yZXF1aXJlKCduYXRpdmVzY3JpcHQtd2Vic29ja2V0cycpOyBcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiaG9tZVwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaG9tZS5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL2hvbWUuY29tcG9uZW50LmNzc1wiXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBcclxuICAgIEBWaWV3Q2hpbGQoXCJzZXR1cFwiKSBzZXR1cExheW91dFJlZiA6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKFwibGlzdGVuaW5nXCIpIGxpc3RlbmluZ0xheW91dFJlZiA6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgQFZpZXdDaGlsZChcImlwQWRkcmVzc1RleHRGaWVsZFwiKSBpcFRleHRGaWVsZFJlZiA6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgbmVlZFNldHVwIDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBtYXRjaEZvdW5kIDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgaXNSZWNvbm5lY3RpbmcgOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgd3NvY2tldCA6IGFueSA9IG51bGw7XHJcblxyXG4gICAgZm91bmRQbGF5ZXIgOiBUTlNQbGF5ZXIgPSBudWxsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZSA6IFBhZ2UsIHByaXZhdGUgbmdab25lOiBOZ1pvbmUpIHtcclxuICAgICAgICAvLyBIaWRlIEFjdGlvbiBCYXJcclxuICAgICAgICBwYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7ICAgIFxyXG5cclxuICAgICAgICAvLyBTZXR1cCBNdXNpYyBQbGF5ZXJcclxuICAgICAgICB0aGlzLmZvdW5kUGxheWVyID0gbmV3IFROU1BsYXllcigpO1xyXG4gICAgICAgIHRoaXMuZm91bmRQbGF5ZXIuZGVidWcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZvdW5kUGxheWVyLmluaXRGcm9tRmlsZSh7XHJcbiAgICAgICAgICAgIGF1ZGlvRmlsZTogJ34vYXVkaW8vZm91bmQubXAzJywgLy8gfiA9IGFwcCBkaXJlY3RvcnlcclxuICAgICAgICAgICAgbG9vcDogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmZvdW5kUGxheWVyLnZvbHVtZSA9IDAuMjtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzdGFydExpc3RlbmluZygpIDogdm9pZCB7XHJcbiAgICAgICAgLy8gR2V0IE5hdGl2ZSBFbGVtZW50IG9mIElwIFRleHRGaWVsZFxyXG4gICAgICAgIGxldCBpcFRleHRGaWVsZCA6IFRleHRGaWVsZCA9IHRoaXMuaXBUZXh0RmllbGRSZWYubmF0aXZlRWxlbWVudDtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgc29tZXRoaW5nIGlzIGluIG91ciB0ZXh0ZmllbGQgaWYgbm90IGFsZXJ0Li5cclxuICAgICAgICBpZihpcFRleHRGaWVsZC50ZXh0Lmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiWW91IG5lZWQgdG8gZW50ZXIgYW4gSVAgQWRkcmVzcywgbG9vayBhdCB0aGUgY29uc29sZSBhdCB5b3VyIFBDLlwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBTZXQgU2V0dXAgdG8gZmFsc2UuLi5cclxuICAgICAgICAgICAgdGhpcy5uZWVkU2V0dXAgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW0RlYnVnXSBcIiArIGlwVGV4dEZpZWxkLnRleHQpO1xyXG5cclxuICAgICAgICAgICAgLy8gU2V0dXAgV2Vic29ja2V0XHJcbiAgICAgICAgICAgIHRoaXMud3NvY2tldCA9IG5ldyBXZWJTb2NrZXQoXCJ3czovL1wiICsgaXBUZXh0RmllbGQudGV4dCArIFwiL21hdGNoXCIsIFtdKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMud3NvY2tldC5hZGRFdmVudExpc3RlbmVyKFwib3BlblwiLCAoZXZlbnQpID0+IHsgXHJcbiAgICAgICAgICAgICAgICBhbGVydChcIltXZWJzb2NrZXRdIENvbm5lY3RlZCB0byBTZXJ2ZXIuLlwiKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLndzb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgKGV2ZW50KSA9PiB7IFxyXG4gICAgICAgICAgICAgICAgLy8gRm91bmQgTWF0Y2g/XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtZXNzYWdlID0gZXZlbnQuZGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYobWVzc2FnZS5tYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTdGFydCBQbGF5aW5nIE11c2lrIC4uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm91bmRQbGF5ZXIucGxheSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3RhcnQgVmlicmF0aW5nIGZvciAyMDAwbXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZpYnJhdG9yID0gbmV3IFZpYnJhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlicmF0b3IudmlicmF0ZSgyMDAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1hdGNoRm91bmQgdG8gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hdGNoRm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJlc2V0IE1hdGNoRm91bmQuLi5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1hdGNoRm91bmQgdG8gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXRjaEZvdW5kID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQYXVzZSBNdXNpa1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvdW5kUGxheWVyLnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMjAwMCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy53c29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbG9zZVwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5zd2l0Y2hWaWV3c0ZvclJldHJ5KCk7XHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgaXNSZWNvbm5lY3RpbmcgdG8gdHJ1ZSBiZWNhdXNlIHdlIGxvc3QgY29ubmVjdGlvbi4uLlxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1JlY29ubmVjdGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy53c29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3dpdGNoVmlld3NGb3JSZXRyeSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3dpdGNoVmlld3NGb3JSZXRyeSgpIDogdm9pZCB7XHJcbiAgICAgICAgLy8gUnVuIFdpdGggbmdab25lIG90aGVyd2lzZSBpdCB3b250IHVwZGF0ZSB0aGUgdWkuLi5cclxuICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBTZXQgU2V0dXAgdG8gdHJ1ZS4uLlxyXG4gICAgICAgICAgICB0aGlzLm5lZWRTZXR1cCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAvLyBBbGVydCB0aGUgVXNlclxyXG4gICAgICAgICAgICBhbGVydChcIkFuIEVycm9yIE9jY3VyZWQgd2hpbGVzdCB0cnlpbmcgdG8gQ29ubmVjdC9iZWluZyBjb25uZWN0ZWQgdG8gdGhlIFdlYnNvY2tldCwgdHJ5IGFnYWluLlwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlc2V0IFdlYnNvY2tldCBPYmplY3RcclxuICAgICAgICAgICAgdGhpcy53c29ja2V0ID0gbnVsbDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iXX0=