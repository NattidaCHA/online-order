import { Component, Input, OnInit } from '@angular/core';
import { GrowthData } from 'src/app/models/growth';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-growth-chart',
  templateUrl: './growth-chart.component.html',
  styleUrls: ['./growth-chart.component.scss'],
})
export class GrowthChartComponent implements OnInit {
  @Input() growthChart!: GrowthData[];
  @Input() year!:string[]
  @Input() totalPC!:number[]
  constructor() {}

  ngOnInit(): void {
    console.log(this.totalPC)
    new Chart('growth', {
      type: 'line',
      data: {
        labels: this.year,
        datasets: [
          {
            label: 'My First Dataset',
            data: this.totalPC,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
      options: {},
    });
    // setTimeout(() => {
    //   new Chart('chart-line', {
    //     type: 'line',
    //     data: {
    //       labels: this.year,
    //       datasets: [
    //         {
    //           label: 'My First Dataset',
    //           data:this.totalPC,
    //           fill: false,
    //           borderColor: 'rgb(75, 192, 192)',
    //           tension: 0.1
    //         },
    //       ],
    //     },
    //     options: {
    //     },
    //   });
    // }, 5000);
  }
}
