import { Component, Input } from '@angular/core';

@Component({
  selector: 'alertbox',
  templateUrl: './alertbox.component.html',
  styleUrls: ['./alertbox.component.css']
})
export class AlertboxComponent {
  @Input() alertMessage: any;
}
