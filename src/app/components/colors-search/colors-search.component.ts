import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';

@Component({
  selector: 'colors-search',
  templateUrl: './colors-search.component.html',
  styleUrls: ['./colors-search.component.css'],
  animations: [
    trigger('items', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }), // initial
        animate(
          '1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({ transform: 'scale(1)', opacity: 1 })
        ), // final
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate(
          '1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({
            transform: 'scale(0.5)',
            opacity: 0,
            height: '0px',
            margin: '0px',
          })
        ),
      ]),
    ]),
  ],
})
export class ColorsSearchComponent implements OnInit {
  private selectedColorsSubj: BehaviorSubject<Color[]> = new BehaviorSubject<
    Color[]
  >([]);
  selectedColors$: Observable<Color[]> = this.selectedColorsSubj.asObservable();
  searchRes$: Observable<Color[]>;
  addedColors: number;
  showErrorMessage = false;

  searchGroup = this.fb.group({
    color: this.fb.control(''),
  });

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchGroup
      .get('color')
      .valueChanges.pipe(debounceTime(1000))
      .subscribe((res) => {
        if (res) {
          this.callColorsApi(res);
        }
      });
    this.addedColors = this.selectedColorsSubj.getValue().length;
  }

  addColor(selectedColor: Color): void {
    const newList = this.selectedColorsSubj.getValue();
    newList.push(selectedColor);
    this.selectedColorsSubj.next(newList);
    this.addedColors = this.selectedColorsSubj.getValue().length;
  }

  removeColor(index: number): void {
    const newList = this.selectedColorsSubj.getValue();
    newList.splice(index, 1);
    this.selectedColorsSubj.next(newList);
    this.addedColors = this.selectedColorsSubj.getValue().length;
  }

  callColorsApi(term: string): void {
    this.searchRes$ = this.http
      .get<Response>(
        `https://api.color.pizza/v1/names/?name=${term}&goodnamesonly=true`
      )
      .pipe(map((item) => item.colors));
  }
}

interface Response {
  colors: Color[];
}

interface Color {
  name: string;
  hex: string;
  rgb: {
    r: number;
    g: number;
    b: number;
  };
  hsl: {
    h: number;
    s: number;
    l: number;
  };
  luminance: number;
}
