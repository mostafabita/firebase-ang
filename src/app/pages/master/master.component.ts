import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
})
export class MasterComponent implements OnInit {
  title: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((route: ActivatedRoute) => {
          return this.route.snapshot.firstChild.data;
        })
      )
      .subscribe((data) => {
        this.title = data?.title;
      });
  }

  ngOnInit(): void {}
}
