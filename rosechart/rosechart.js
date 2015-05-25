/**
 * Country charts
 */

  /**
   * Issues rose chart
   */
  function rosechartOptions() {
    var roseOptions = {
      chart: {
          polar: true,
      },
      title: {
          text: ''
      },
      pane: {
          startAngle: 0,
          endAngle: 360,
          background: {
            backgroundColor: '#eeeeee'
          }
      },
      plotOptions: {
          column: {
              pointPadding: 0,
              groupPadding: 0,
          },
        series: {
            pointStart: 0,
          },
      },
      xAxis: {
        categories: [],
        lineWidth: 0,
        tickWidth: 0,
        title: {
          text: ''
        },
        labels: {
          enabled: false
        },
        gridLineWidth: 0
      },
      yAxis: {
        endOnTick: false,
        lineWidth: 0,
        tickWidth: 0,
        title: {
          text: ''
        },
        labels: {
          enabled: false
        },
        gridLineWidth: 0,
        min: 0,
        max: 100,
      },
      legend: {
        enabled: false
      },
      tooltip: {
        valueDecimals: 2,
        formatter: function() {
            return '<b>' + this.x + '</b>';
        }
      },
      navigation: {
        buttonOptions: {
          theme: {
            'stroke-width': 1,
            stroke: '#fff',
            r: 0,
            states: {
              hover: {
                fill: '#ddd',
                stroke: '#fff',
              },
              select: {
                stroke: '#fff',
                fill: '#bbb'
              }
            }
          }
        }
      },
      credits: {
        enabled: false
      },
      series: [{
          type: 'column',
          borderWidth: 2,
          data: []
      }]
    };
    
    return roseOptions;
  }

/*
 * Histogram
 */
function histogramOptions(options) {
  onHover = (options && options.onHover) || null;
  seriesData = (options && options.data) || [{}];
  
  var histOptions = {
    title: {
      text: ''
    },
    chart: {
      type: 'column',
      backgroundColor:'rgba(255, 255, 255, 0)'
    },
    plotOptions: {
      series: {
        color: '#45d8e1',
        states: {
            select: {
              color: '#ff9600',
              borderColor: '#ffffff'
            },
            hover: {
              enabled: false
            }
        },
        pointPadding: 0,
        groupPadding: 0,
        borderWidth: 0.5
      }
    },
    xAxis: {
      categories: [],
      lineWidth: 0,
      tickWidth: 0,
      title: {
        text: ''
      },
      labels: {
        enabled: false
      },
      gridLineWidth: 0
      
    },
    yAxis: {
      lineWidth: 0,
      tickWidth: 0,
      title: {
        text: ''
      },
      labels: {
        enabled: false
      },
      gridLineWidth: 0
    },
    legend: {
      enabled: false
    },
    tooltip: {
      enabled: false
      //formatter: function() {
      //    return this.x + ': '+ (this.y);
      //}
    },
    credits: {
      enabled: false
    },
    series: [{
      data: seriesData
    }],
  };
  
  if (onHover !== null) {
    histOptions.plotOptions.series.point = {
      events: {
        mouseOver: function() {
          jQuery.doTimeout( 'hover', 200, onHover, this.name);
        },
        mouseOut: function() {
          jQuery.doTimeout( 'hover');
        },
      }
    };
  }
  return histOptions;
}

/*
 * Bubble Chart
 */
function bubblechartOptions(options) {
  xTitle = (options && options.xTitle) || '';
  yTitle = (options && options.yTitle) || '';
  
  var bubbleOptions = {
    title: {
      text: ''
    },
  chart: {
      type: 'bubble',
      zoomType: 'xy',
      renderTo: 'container',
  },
  plotOptions: {
    bubble: {
      tooltip: {
        headerFormat: '<b>{series.name}:</b> ',
        pointFormat: '{point.z}'
      },
      color: '#5fd8e3',
      marker: {
        states: {
          hover: {
            fillColor: '#ff6d24',
            lineColor: '#ff6d24',
          }
        },
      },
    }
  },
  xAxis : {
    title: {
      style: {
          color: 'black'
      },
      text: xTitle,
      style: {
          color: '#808080',
          fontFamily: 'pf_centro_sans_promedium',
          fontStyle: 'normal',
          fontWeight: 'normal',
          textTransform: 'uppercase'
      }
    }
  },
  yAxis: {
    showFirstLabel: false,
    title: {
      style: {
        color: 'black'
      },
      text: yTitle,
      style: {
        color: '#808080',
        fontFamily: 'pf_centro_sans_promedium',
        fontStyle: 'normal',
        fontWeight: 'normal',
        textTransform: 'uppercase'
      }
    }
  },
  credits: {
    enabled: false
  },
  legend: {
    enabled: false,
  },
  };
  
  return bubbleOptions;
}



/*
 * World Map
 */
var worldMap = {
    map: 'world_mill_en',
    backgroundColor: 'transparent',
    zoomButtons: false,
    zoomOnScroll: false,
    regionStyle: {
      initial: {
        fill: '#cbc7c6'
      },
      hover: {
        "fill-opacity": 1,
      },
      
      selected: {
        fill: '#ff6d24',
        "fill-opacity": 1,
      }
    },
    series: {
      regions: [{
        scale: ['#bff0f4', '#00c2d4'],
        attribute: 'fill',
      }]
    },
    onRegionOver: function(event, code){
      if (typeof mapScores[code] !== 'undefined') {
        jQuery.doTimeout( 'hover', 250, selectRegion, code);
      }
    },
    onRegionOut: function(){
      jQuery.doTimeout( 'hover');
    },
    onRegionClick: function(event, code){
      goToCountry(code);
    },
    onRegionLabelShow: function(e, label, code) {
      var rank = '', score = '';
      if (typeof mapScores[code] !== 'undefined') {
        rank = countryValues[code].rank + '. ';
        score = ' EPI: '+ mapScores[code] + ' Overall Score';
      }
      label.html(
        '<span class="title">'+ rank + label.html() + '</span> ' + score
      );
    }
}
