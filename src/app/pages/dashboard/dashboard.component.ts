import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MessagingService } from 'src/app/services/messaging.service';
import { ToastService } from 'src/app/services/toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  message$: Observable<any>;
  message;

  constructor(private messagingService: MessagingService) {}

  ngOnInit() {
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.message$ = this.messagingService.currentMessage$;

    this.messagingService.currentMessage$.subscribe((res) => {
      setTimeout(() => {
        this.message = res;
      }, 1000);
    });
  }
}
