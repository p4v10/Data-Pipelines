var chart = Highcharts.chart('container2', {
    chart: {
        type: 'column',
        backgroundColor: 'white',
        events: {
            load: function() {
                setTimeout(() => {
                    this.renderer.text('Total Inscriptions: 14.95 Millions', 110, 90)
                        .css({
                            color: 'black',
                            fontSize: '12px'
                        })
                        .add();
                }, 6000);
            }
        }
    },
    title: {
        text: '',
        style: {
            color: 'black'
        }
    },
    subtitle: {
        text: 'Bitcoin Ordinals - Weekly Inscriptions',
        style: {
            color: 'black'
        }
    },
    xAxis: [{
        categories: ['Jan 2', 'Jan 9', 'Jan 16', 'Jan 23', 'Feb 6', 'Feb 13', 'Feb 20', 'Feb 27', 'Mar 6', 'Mar 13', 'Mar 20', 'Mar 27', 'Apr 3', 'Apr 10', 'Apr 17', 'Apr 24', 'May 1', 'May 8', 'May 15', 'May 22', 'May 29', 'Jun 5', 'Jun 12', 'Jun 19', 'Jun 26', 'Jul 3'],
        tickWidth: 0,
        lineWidth: 0.5,
        tickInterval: 3,
        labels: {
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
        column: {
            pointPadding: 0,
            borderWidth: 0.5,
            dataLabels: {
                enabled: true,
                color: '#575757',
                formatter: function() {
                    var value = this.y;
                    if (value >= 1000000 || value >= 99999) {
                        return (value / 1000000).toFixed(2) + 'M';
                    } else if (value <= 99999) {
                        return (value / 1000).toFixed(0) + 'K';
                    } else if (value < 1000) {
                        return value;
                    }
                }
            }
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
        name: 'Weekly Inscriptions',
        color: '#f5b40f',
        data: [1, 5, 48, 211, 5004, 63794, 78634, 47208, 117388, 129806, 89166, 72088, 153390, 293926, 76837, 413838, 1154827, 1805087, 2254922, 1687014, 1382146, 1073172, 728712, 1100909, 942225, 926562, 352835],
        animation: {
            duration: 6000 // duration of the animation in milliseconds
        }
    }],
    legend: {
        itemStyle: {
            color: 'black'
        }
    },
    credits: {
        enabled: true
    }
});
