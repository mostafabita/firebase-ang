import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
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

  constructor(
    private messagingService: MessagingService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.message$ = this.messagingService.currentMessage$;

    this.message$.subscribe((payload) => {
      setTimeout(() => {
        if (payload) {
          const favicon = document.getElementById('favicon');
          favicon.setAttribute('href', 'favicon-unread.png');
        }
        this.changeDetector.detectChanges();
      }, 1);
    });
  }
}
