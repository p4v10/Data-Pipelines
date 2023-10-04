document.getElementById('reloadButton').addEventListener('click', function() {
    // Remove the existing chart container
    var chartContainer = document.getElementById('container');
    chartContainer.innerHTML = '';

    // Recreate the chart
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
});

document.getElementById('reloadButton2').addEventListener('click', function() {
    // Remove the existing chart container
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
});

document.getElementById('reloadButton3').addEventListener('click', function() {
    // Remove the existing chart container
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
});

document.getElementById('reloadButton4').addEventListener('click', function() {
    // Remove the existing chart container
    var chartContainer = document.getElementById('container4');
    chartContainer.innerHTML = '';
    var chart = Highcharts.chart('container4', {
        chart: {
            type: 'bar',
            backgroundColor: 'white',
        },
        title: {
            text: '',
            style: {
                color: 'black'
            }
        },
        subtitle: {
            text: 'Bitcoin Wallets Distribution October 2023',
            style: {
                color: 'black'
            }
        },
        xAxis: [{
            categories: ['Humpback > 5k', 'Whale 1k-5k', 'Shark 500-1k', 'Dolphin 100-500', 'Fish 50-100', 'Octopus 10-50', 'Crab 1-10', 'Shrimp < 1'],
            labels: {
                style: {
                    color: '#575757'
                }
            },
            gridLineWidth: 0,
            gridLineColor: 'rgba(200, 206, 207, 0.25)',
            tickWidth: 0,
            lineWidth: 1
        },
        {
            opposite: true,
            lineWidth: 1,
            gridLineWidth: 1,
            gridLineColor: 'rgba(200, 206, 207, 0.25)'
        }],
        yAxis: [{
            min: 0,
            title: {
                text: '',
                align: 'high'
            },
            labels: {
                overflow: 'justify',
                enabled: false
            },
            gridLineWidth: 1,
            gridLineColor: 'rgba(200, 206, 207, 0.25)',
            tickWidth: 0,
            lineWidth: 1,
            opposite: true
        }, {
            min: 0,
            title: {
                text: '',
                align: 'high'
            },
            labels: {
                overflow: 'justify',
                enabled: true
            },
            gridLineWidth: 1,
            gridLineColor: 'rgba(200, 206, 207, 0.25)',
            tickWidth: 0,
            lineWidth: 1,
        }],
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                    color: '#575757',
                    formatter: function() {
                        if (this.series.name === 'Percentage of Wallets') {
                            return this.y.toFixed(2) + '%';
                        } else {
                            return this.y;
                        }
                    }
                }
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' %'
        },
        series: [{
            name: 'Percentage of Wallets',
            color: '#f5b40f',
            data: [0.012, 0.076, 0.183, 0.471, 0.548, 3.326, 20.95, 74.42],
            animation: {
                duration: 7000 // duration of the animation in milliseconds
            }
        }, {
            name: 'Wallet Counts',
            color: '#2aaff7',
            data: [83, 523, 1260, 3242, 3778, 22892, 144240, 512308],
            animation: {
                duration: 7000 // duration of the animation in milliseconds
            },
            yAxis: 1,
            tooltip: {
                valueSuffix: ''
            }
        }],
        credits: {
            enabled: true
        }
    });
});