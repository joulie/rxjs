import { Component, OnInit, signal, VERSION } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {of, from} from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  name = 'Angular ' + VERSION.major;
  protected readonly title = signal('rxjs');

  ngOnInit(): void {
    of(2,4,6,8).subscribe(item => console.log(item));

    from([1,2,3,4]).subscribe({
      next: item => console.log(`resulting item .. ${item}`),
      error: err => console.error('Error:', err),
      complete: () => console.log('Completed')
    });

    of('Apple1', 'Apple2', 'Apple3').subscribe({
      next: (apple) => console.log(`Apple emitted: ${apple}`),
      error: err => console.error('Error:', err),
      complete: () => console.log('Completed of()')
    });
  }
}
