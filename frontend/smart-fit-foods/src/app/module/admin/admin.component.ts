import {AfterViewInit, Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {Router} from "@angular/router";

declare const jQuery: any;
declare const Chart: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit,AfterViewInit {


  ngOnInit(): void {

  }


  myData: number[] = [11, 10, 14, 7, 4, 15, 7, 9, 15, 13, 7, 24];

  constructor(private elementRef: ElementRef,private  renderer: Renderer2,private router : Router) {}
  // constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    const ctx = this.elementRef.nativeElement.querySelector("#myChart");
    const data = this.myData;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Des'],
        datasets: [{
          label: 'Expense',
          data: data,
          borderWidth: 1,
          borderRadius: 30,
          barThickness: 12,
          backgroundColor: [
            'rgba(114, 92, 255, 1)'
          ],
          borderColor: [
            'rgba(114, 92, 255, 1)'
          ],
          hoverBackgroundColor: [
            'rgba(28, 30, 35, 1)'
          ],
          hoverBorderColor: [
            'rgba(28, 30, 35, 1)'
          ],
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              // Include a dollar sign in the ticks
              callback: function(value, index, ticks) {
                return '$' + value + 'k';
              },
              stepSize: 5,
            },
          },
          x: {
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display:false,
            labels: {
              font: {
                size: 12,
                family: "'Plus Jakarta Sans', sans-serif",
                lineHeight: 18,
                weight: 600
              }
            }
          }
        }
      }
    });

  }
}




