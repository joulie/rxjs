import { Component, OnInit, signal, VERSION } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {of, from, map, tap, take} from 'rxjs';


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

    of(2, 4, 6).pipe(
      //map(item => item * 2) : multiplie chaque élément par 2 → les valeurs deviennent 4, 8, 12.
      map(item => item * 2),
      //tap(item => console.log(item)) : affiche chaque élément dans la console sans le modifier. C’est utile pour le débogage.
      tap(item => console.log(item)),
      //take(3) : prend les 3 premiers éléments du flux, donc ici tous les éléments (4, 8, 12).
      take(3)
      // les autres opérateurs peuvent etre trouvés dans https://rxjs.dev/guide/overview aller dans reference
    ).subscribe({
      next: item => console.log(`Transformed item: ${item}`)});
  }
}
