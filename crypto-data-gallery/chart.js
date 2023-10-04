var chart = Highcharts.chart('container', {
    chart: {
        backgroundColor: 'white'
    },
    title: {
        text: '',
        style: {
            color: 'black'
        }
    },
    subtitle: {
        text: 'Sanbox unique LAND owners and total LAND sold',
        style: {
            color: 'black'
        }
    },
    xAxis: [{
        categories: ['Jan 21', 'Feb 21', 'Mar 21', 'Apr 21', 'May 21', 'Jun 21', 'Jul 21', 'Aug 21', 'Sep 21', 'Oct 21', 'Nov 21', 'Dec 21', 'Jan 22', 'Feb 22', 'Mar 22', 'Apr 22', 'May 22', 'Jun 22', 'Jul 22', 'Aug 22', 'Sep 22', 'Oct 22', 'Nov 22', 'Dec 22'],
        tickWidth: 0,
        lineWidth: 0.5,
        tickInterval: 3,
        labels: {
            enabled: true,
            style: {
                color: '#575757',
                textAlign: 'center'
            },
            align: 'center',
            x: 25
        },
        gridLineWidth: 0,
        gridLineColor: 'rgba(200, 206, 207, 0.25)'
    },
    {
        opposite: true,
        lineWidth: 0.5,
        gridLineWidth: 1,
        gridLineColor: 'rgba(200, 206, 207, 0.25)'
    }],
    yAxis: [{
        title: {
            text: '',
            color: 'black'
        },
        tickWidth: 0,
        lineWidth: 0.5,
        labels: {
            enabled: true,
            style: {
                color: '#575757'
            }
        },
        gridLineWidth: 1,
        gridLineColor: 'rgba(200, 206, 207, 0.25)'
    },
    {
        opposite: true,
        title: {
            text: '',
            color: 'black'
        },
        tickWidth: 0,
        lineWidth: 0.5,
        labels: {
            enabled: true,
            style: {
                color: '#575757'
            }
        },
        gridLineWidth: 1,
        gridLineColor: 'rgba(200, 206, 207, 0.25)'
    }],
    plotOptions: {
        line: {
            step: false,
            marker: {
                enabled: false,
            },
            lineWidth: 2.5,
        }
    },
    tooltip: {
        shared: true,
        crosshairs: true,
        formatter: function() {
            var s = '<b>'+ this.x +'</b>';
            var points = this.points;
            var pointsLen = points.length;
            for(var i = 0; i < pointsLen; i++) {
                s += '<br/><span style="color:' + points[i].series.color + '">\u25CF</span> ' + points[i].series.name + ': ' + points[i].y;
            }
            return s;
        }
    },
    series: [{
        name: 'Unique Owners',
        type: 'line',
        color: '#09b33c',
        data: [4457, 5282, 5637, 6452, 7140, 7566, 8921, 10621, 11793, 12552, 16117, 17812, 18183, 17139, 17271, 14729, 16367, 15203, 14280, 14262, 13515, 12908, 12764, 12562],
        animation: {
            duration: 7000 //duration of the animation in milliseconds
        }
      },
      {
        name: 'LAND Sold',
        type: 'line',
        color: '#f5b40f',
        data: [68778, 68780, 76025, 76649, 81027, 84421, 88588, 93757, 98232, 102022, 102087, 103582, 104296, 105448, 107133, 108430, 109457, 111779, 112020, 112094, 112138, 112185, 112196, 112479],
        yAxis: 1,
        animation: {
            duration: 7000 //duration of the animation in milliseconds
        }
    }
  ],
  legend: {
      itemStyle: {
          color: 'black'
      }
  },
  credits: {
    enabled: true
  }
});
