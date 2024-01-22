<template>
  <canvas id="canvas" height="100"></canvas>
</template>

<script>
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import $ from "jquery";

export default {
  name: "Week",
  props: {
    plays: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      nightMode: false
    };
  },
  watch: {
    plays: {
      deep: true,
      handler() {
        this.drawChart();
      }
    }
  },
  mounted() {
    this.nightMode = $("body").css("background-color") === "rgb(0, 0, 0)";
    this.drawChart();
  },
  methods: {
    drawChart() {
      const context = document.getElementById("canvas").getContext("2d");

      const gradientStroke = context.createLinearGradient(500, 0, 100, 0);
      if (this.nightMode) {
        gradientStroke.addColorStop(0, "#FFF");
      } else {
        gradientStroke.addColorStop(0, "#42747C");
        gradientStroke.addColorStop(1, "#22545A");
      }

      Chart.plugins.register(ChartDataLabels);

      const chart = new Chart(context, {
        type: "line",
        data: {
          labels: this.plays.map(p => p.date),
          datasets: [
            {
              data: this.plays.map(p => p.count),
              backgroundColor: "rgba(0, 0, 0, 0)",
              borderColor: "#DCE3E5",
              borderWidth: 3,
              hoverBorderWidth: 3,
              pointBackgroundColor: gradientStroke,
              pointBorderColor: gradientStroke,
              pointHitRadius: 10,
              radius: 4,
              hoverRadius: 4,
              tension: 0.3
            }
          ]
        },
        options: {
          hover: {
            animationDuration: 20
          },
          onHover: (event, chartElement) => {
            event.target.style.cursor = chartElement[0] ? "pointer" : "default";
          },
          onClick: event => {
            const activePoints = chart.getElementsAtEventForMode(
              event,
              "point",
              chart.options
            );
            const firstPoint = activePoints[0];
            const label = chart.data.labels[firstPoint._index];
            window.location = `https://www.last.fm/user/${process.env.VUE_APP_LAST_FM_USER}/library?from=${label}&to=${label}`;
          },
          layout: {
            padding: {
              left: 20,
              right: 30,
              top: 20,
              bottom: 20
            }
          },
          legend: {
            display: false
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false
                },
                ticks: {
                  display: false
                }
              }
            ],
            yAxes: [
              {
                gridLines: {
                  display: false
                },
                ticks: {
                  display: false
                }
              }
            ]
          },
          tooltips: {
            enabled: false
          },
          plugins: {
            datalabels: {
              align: "bottom",
              color: "#BDBFC0",
              padding: {
                top: 15
              }
            }
          }
        }
      });
    }
  }
};
</script>
