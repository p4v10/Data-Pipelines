Highcharts.setOptions({
    lang: {
        numericSymbols: ['k', 'M', 'B', 'T', 'P', 'E'] // or [' thousands', ' millions', ' billions', ' trillion', 'P', 'E']
    }
});

var chart = Highcharts.chart('container3', {
    chart: {
        type: 'line',
        backgroundColor: 'white',
        events: {
            load: function() {
              // event for USDC depeg
                setTimeout(() => {
                    this.renderer.text('USDC Depegs on March 10', 100, 80)
                        .css({
                            color: 'black',
                            fontSize: '12px'
                        })
                        .add();
                }, 3000);
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
        text: 'Top 5 Uniswap Pairs by Trading Volume',
        style: {
            color: 'black'
        }
    },
    xAxis: [{
        categories: ['Jan 2', 'Jan 9', 'Jan 16', 'Jan 23', 'Jan 30', 'Feb 6', 'Feb 13', 'Feb 20', 'Feb 27', 'Mar 6', 'Mar 13', 'Mar 20', 'Mar 27', 'April 3', 'April 10', 'April 17', 'April 24', 'May 1', 'May 8', 'May 15', 'May 22', 'May 29', 'Jun 5', 'Jun 12', 'Jun 19', 'Jun 26', 'Jun 3'],
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
    },{
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
        lineWidth: 0.5,
        gridLineWidth: 1,
        gridLineColor: 'rgba(200, 206, 207, 0.25)',
        title: {
            text: 'Total Weekly Volume (USD)',
            color: 'black'
        },
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
                s += '<br/><span style="color:' + points[i].series.color + '">\u25CF</span> ' + points[i].series.name + ': ' + Highcharts.numberFormat(points[i].y, 0, '.', ',');
            }
            return s;
        }
    },
    series: [{
        name: 'WBTC-WETH',
        type: 'line',
        color: '#792af7',
        data: [137773178, 644577413, 563108808, 739681842, 527463445, 457650485, 634894610, 507421208, 362154188, 1053555678, 1875023795, 1067319041, 576392866, 513187741, 889784538, 563801979, 609854948, 493128735, 450985289, 229486875, 252421596, 236184053, 464892449, 438271981, 730939385, 492740276, 316026556],
        animation: {
            duration: 7000 //duration of the animation in milliseconds
        }
    }, {
        name: 'USDT-WETH',
        type: 'line',
        color: '#2aaff7',
        data: [324372618, 555096575, 713610696, 670560247, 683908381, 714755994, 986249296, 797618626, 630371728, 3955369508, 2910560501, 1781699755, 1064208971, 872294024, 1061582435, 971690608, 1053893858, 1171457161, 947937605, 610065244, 733277049, 687807528, 1103906542, 897520528, 1283468184, 1201528408, 760383844],
        animation: {
            duration: 7000 //duration of the animation in milliseconds
        }
    }, {
        name: 'USDC-WETH',
        type: 'line',
        color: '#c74863',
        data: [1776041023, 4853104762, 5163833462, 4688597290, 4975017245, 4995524376, 6099368448, 5376015353, 4661113098, 10692301415, 8308837732, 5287125977, 3477544672, 3313742651, 3916869897, 4087485465, 3903759062, 3377967221, 3154235429, 1955551537, 1927738921, 2088901058, 3205390682, 2111203007, 3187690959, 3284975231, 2181707759],
        animation: {
            duration: 7000 //duration of the animation in milliseconds
        }
    }, {
        name: 'USDC-USDT',
        type: 'line',
        color: '#f5b40f',
        data: [1795408765, 3337341876, 2728725492, 2674191918, 2163020711, 2400623568, 3168096231, 1652802856, 2128418377, 13167400614, 5542364115, 2957351764, 2104258279, 1401316764, 1791247003, 1464099389, 1672728857, 1221583716, 1301637531, 1171456804, 1385982357, 1440626357, 2120072455, 2352339329, 2143670343, 1627978995, 1055664569],
        animation: {
            duration: 7000 //duration of the animation in milliseconds
        }
    }, {
        name: 'PEPE-WETH',
        type: 'line',
        color: '#09b33c',
        data: [1937, 183, 240, 1291, 134, 146, 192, 194, 255248, 191, 893, 27, 225081, 415, 15016998, 479860712, 293865703, 1722491789, 888146178, 249859589, 112555248, 81492397, 109180291, 64091393, 222305476, 109004366, 100353398],
        animation: {
            duration: 7000 //duration of the animation in milliseconds
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
