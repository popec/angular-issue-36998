/* tslint:disable: member-ordering forin */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forbiddenNameValidator } from '../shared/forbidden-name.directive';
import { identityRevealedValidator } from '../shared/identity-revealed.directive';
import { UniqueAlterEgoValidator } from '../shared/alter-ego.directive';

@Component({
  selector: 'app-hero-form-reactive',
  templateUrl: './hero-form-reactive.component.html',
  styleUrls: ['./hero-form-reactive.component.css'],
})
export class HeroFormReactiveComponent implements OnInit {

  powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];

  hero = { name: 'Dr.', alterEgo: 'Dr. What', power: this.powers[0] };

  heroForm: FormGroup;

  ngOnInit(): void {
this.heroForm = new FormGroup({
  'name': new FormControl(this.hero.name, {
    validators: [Validators.required, Validators.minLength(4), forbiddenNameValidator(/bob/i)],
    updateOn: 'change'
  }),
  'alterEgo': new FormControl(this.hero.alterEgo, {
    validators: [Validators.required],
    updateOn: 'change'
  }),
  'power': new FormControl(this.hero.power, {
    validators: [Validators.required],
    updateOn: 'change'
  })
}, {
  validators: identityRevealedValidator,
  asyncValidators:  [this.alterEgoValidator.validate.bind(this.alterEgoValidator)],
  updateOn: 'submit'
});
  }

  get name() { return this.heroForm.get('name'); }

  get power() { return this.heroForm.get('power'); }

  get alterEgo() { return this.heroForm.get('alterEgo'); }

  constructor(private alterEgoValidator: UniqueAlterEgoValidator) { }
}
