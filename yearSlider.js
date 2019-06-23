 var dataTime = d3.range(0, 42).map(function(d) {
    return new Date(1955 + d, 1, 1);
  });

  var sliderTime = d3
    .sliderHorizontal()
    .min(d3.min(dataTime))
    .max(d3.max(dataTime))
    .step(1000 * 60 * 60 * 24 * 365)
    .width(1200)
    .tickFormat(d3.timeFormat('%Y'))
    .tickValues(dataTime)
    .default(new Date(1998, 10, 3))
    .on('onchange', val => {
      d3.select('p#value-time').text(d3.timeFormat('%Y')(val));
      console.log(d3.timeFormat('%Y')(val));
      currentTime = +d3.timeFormat('%Y')(val) % 100;
      setColor(STATE_LAWS, currentTime, occupationsToConsider);
    });

  var gTime = d3
    .select("#slider")
    .append('svg')
    .attr('width', 1300)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

  gTime.call(sliderTime);

  d3.select("#value-time").text(d3.timeFormat('%Y')(sliderTime.value()));
