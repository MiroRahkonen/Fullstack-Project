import { Component, Input } from '@angular/core';

@Component({
  selector: 'alertbox',
  templateUrl: './alertbox.component.html',
  styleUrls: ['./alertbox.component.css']
})
export class AlertboxComponent {
  @Input() alertMessage: any;
}
/*I got help with producing and using this component from this Youtube tutorial video: https://youtu.be/H3WnzYFu-rw*/