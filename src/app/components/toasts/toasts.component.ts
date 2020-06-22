import { Component, OnInit, TemplateRef, HostBinding } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss'],
})
export class ToastsComponent implements OnInit {
  @HostBinding('attr.class') class = 'ngb-toasts';

  constructor(public toastService: ToastService) {}

  ngOnInit() {}

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
