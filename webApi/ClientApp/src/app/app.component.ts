import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Message } from './models/Message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ClientApp';

  private _hubConnection: HubConnection;
  public msgs: Message[] = [];

  public messageType: string = 'someType';
  public messagePayload: string = 'some content';

  public timer: any;
  public timerIndex: number = 0;

  constructor(private httpClient: HttpClient){}

  ngOnInit() {
    
    this._hubConnection = new HubConnectionBuilder().withUrl('http://localhost:5000/myhub').build();
    this._hubConnection
      .start()
      .then(() => console.log('Connection started!'))
      .catch(err => console.log('Error while establishing connection :('));

    this._hubConnection.on('BroadcastMessage', (type: string, payload: string) => {
      this.msgs.push({ type: type, payload: payload });
      if (this.msgs.length > 50){
        this.msgs.shift();
      }
    });
  }

  sendMessage(){
    //console.log('send');
    let newMsg = new Message(this.messageType, this.messagePayload);
    //console.log('newMsg');
    this.httpClient.post<Message>('http://localhost:5000/api/values', newMsg)
    .subscribe(
      data => {
          console.log("POST Request is successful ", data);
      },
      error => {
          console.log("Error", error);
      }
    );
  }

  toggleTimer(){
    if (this.timer){
      console.log('stop timer');
      clearInterval(this.timer);
      this.timer = null;
      this.timerIndex = 0;
      return;
    }
    console.log('start timer');
    this.timer = setInterval(() => {
      let newMsg = new Message('Timer', this.timerIndex.toString());
      this.timerIndex += 1;
      this.httpClient.post<Message>('http://localhost:5000/api/values', newMsg)
      .subscribe(
        data => {
            console.log("POST Request is successful ", data);
        },
        error => {
            console.log("Error", error);
        }
      );
    }, 2000);
  }
}
