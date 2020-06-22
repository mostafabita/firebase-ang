import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  success(textOrTpl: string | TemplateRef<any>) {
    this.show(textOrTpl, {
      classname: 'bg-success text-light',
    });
  }

  error(textOrTpl: string | TemplateRef<any>) {
    this.show(textOrTpl, {
      classname: 'bg-danger text-light',
    });
  }

  warning(textOrTpl: string | TemplateRef<any>) {
    this.show(textOrTpl, {
      classname: 'bg-warning text-light',
    });
  }

  info(textOrTpl: string | TemplateRef<any>) {
    this.show(textOrTpl, {
      classname: 'bg-info text-light',
    });
  }
}
