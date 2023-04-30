import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  ActualTargetData,
  ActualTargetResponse,
} from 'src/app/models/actual-target';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-actual-target-chart',
  templateUrl: './actual-target-chart.component.html',
  styleUrls: ['./actual-target-chart.component.scss'],
})
export class ActualTargetChartComponent implements OnInit {
  @Input() actualChart!: ActualTargetData[];
  @Input() year!: string[];
  @Input() actual!: number[];
  @Input() target!: number[];
  @Input() total!: number;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      new Chart('chart-bar', {
        type: 'bar',
        data: {
          labels: this.year,
          datasets: [
            {
              label: 'Target',
              data: this.target,
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgb(75, 192, 192)',
              borderWidth: 1,
            },
            {
              label: 'Actual',
              data: this.actual,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderWidth: 1,
            },
          ],
        },
        options: {
        },
      });
    }, 5000);
  }
}
