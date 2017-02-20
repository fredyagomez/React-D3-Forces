import React, { PropTypes } from 'react';
import { forceSimulation, forceManyBody, forceLink } from 'd3-force';

//Redux
import { connect } from 'react-redux';

class ChartForce extends React.Component {
  static propTypes = {
    //dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props);
	this.simulate = this.simulate.bind(this);
  }
  componentDidMount() {
    let {nodes, links} = this.props.data;
	let refs = this.refs;
	this.simulate(nodes, links, refs);
  }
  simulate(nodes, links, refs) { 
    forceSimulation(nodes)
      .force("link", forceLink(links).strength(1).distance(20).iterations(10))
      .force("charge", forceManyBody().strength(-14))
      .on("tick", ticked);
	function ticked () {
      nodes.map((index, key) => {
        refs["nodes"+key].setAttribute('cx', nodes[key].x+400); 
        refs["nodes"+key].setAttribute('cy', nodes[key].y+400);
      });
      links.map((index, key) => {
        refs["lines"+key].setAttribute('x1', links[key].source.x+400);
        refs["lines"+key].setAttribute('y1', links[key].source.y+400);
        refs["lines"+key].setAttribute('x2', links[key].target.x+400);
        refs["lines"+key].setAttribute('y2', links[key].target.y+400);
      });
    }
  }
  render() {
    let {size, padding, nodes, links} = this.props.data;
    return (
      <div style={{padding: `${padding.r} ${padding.l} ${padding.u} ${padding.d}`}}>
        <svg width={size.width} height={size.height}>
          {nodes.map((index, key) => {
            return (
              <circle key={key} ref={"nodes"+key} r={2} stroke="black" fill="black"/> 
            );
          })}
          {links.map((index, key) => {
            return (
              <line key={key} ref={"lines"+key} stroke="black" strokeWidth={0.6} opacity={0.5} />
            );
          })}   	
        </svg>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { data } = state;
  return {
    data
  };
};

export default connect(mapStateToProps)(ChartForce);

