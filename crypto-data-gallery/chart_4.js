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