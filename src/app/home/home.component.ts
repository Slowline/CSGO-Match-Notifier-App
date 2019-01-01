import { NgZone, Component, OnInit, ViewChild, ComponentRef, ElementRef } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { TextField } from "tns-core-modules/ui/text-field";
import { StackLayout } from "ui/layouts/stack-layout";

// https://github.com/nstudio/nativescript-audio
import { TNSPlayer } from 'nativescript-audio';

// https://www.npmjs.com/package/nativescript-vibrate
import { Vibrate } from 'nativescript-vibrate';

// https://www.npmjs.com/package/nativescript-websockets
require('nativescript-websockets'); 

@Component({
    selector: "home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
    
    @ViewChild("setup") setupLayoutRef : ElementRef;
    @ViewChild("listening") listeningLayoutRef : ElementRef;

    @ViewChild("ipAddressTextField") ipTextFieldRef : ElementRef;

    needSetup : boolean = true;
    matchFound : boolean = false;
    isReconnecting : boolean = false;

    wsocket : any = null;

    foundPlayer : TNSPlayer = null;

    constructor(private page : Page, private ngZone: NgZone) {
        // Hide Action Bar
        page.actionBarHidden = true;    

        // Setup Music Player
        this.foundPlayer = new TNSPlayer();
        this.foundPlayer.debug = false;
        this.foundPlayer.initFromFile({
            audioFile: '~/audio/found.mp3', // ~ = app directory
            loop: false
        });
        this.foundPlayer.volume = 0.2;
    }

    ngOnInit(): void {
        
    }

    startListening() : void {
        // Get Native Element of Ip TextField
        let ipTextField : TextField = this.ipTextFieldRef.nativeElement;

        // Check if something is in our textfield if not alert..
        if(ipTextField.text.length <= 0) {
            alert("You need to enter an IP Address, look at the console at your PC.");
        } else {
            // Set Setup to false...
            this.needSetup = false;

            console.log("[Debug] " + ipTextField.text);

            // Setup Websocket
            this.wsocket = new WebSocket("ws://" + ipTextField.text + "/match", []);

            this.wsocket.addEventListener("open", (event) => { 
                alert("[Websocket] Connected to Server..");
            });

            this.wsocket.addEventListener("message", (event) => { 
                // Found Match?
                this.ngZone.run(() => {
                    let message = event.data;

                    if(message.match) {
                        // Start Playing Musik ..
                        this.foundPlayer.play();

                        // Start Vibrating for 2000ms
                        let vibrator = new Vibrate();
                        vibrator.vibrate(2000);

                        // matchFound to true
                        this.matchFound = true;
                    }
                });

                // Reset MatchFound...
                setTimeout(() => {
                    this.ngZone.run(() => {
                        // matchFound to false
                        this.matchFound = false;

                        // Pause Musik
                        this.foundPlayer.pause();
                    });
                }, 12000);
            });

            this.wsocket.addEventListener("close", (event) => {
                //this.switchViewsForRetry();
                // Set isReconnecting to true because we lost connection...
                this.isReconnecting = true;
            });
            
            this.wsocket.addEventListener("error", (event) => {
                this.switchViewsForRetry();
            });
        
        }
    }

    switchViewsForRetry() : void {
        // Run With ngZone otherwise it wont update the ui...
        this.ngZone.run(() => {
            // Set Setup to true...
            this.needSetup = true;

            // Alert the User
            alert("An Error Occured whilest trying to Connect/being connected to the Websocket, try again.");

            // Reset Websocket Object
            this.wsocket = null;
        });

        
    }
}