
import { combineReducers } from 'redux';
import { range } from 'd3-array';
import {
  NEW_POSITION
} from '../actions';

//Input Data
const n = 20;
const nodes = range(n * n).map((i) => {
  return {
    index: i
  };
});
const links = [];
for (let y = 0; y < n; ++y) {
  for (let x = 0; x < n; ++x) {
    if (y > 0) links.push({source: (y - 1) * n + x, target: y * n + x});
    if (x > 0) links.push({source: y * n + (x - 1), target: y * n + x});
  }
}

let initialState = {
  size: {width: 1000, height: 1000},
  padding: {r: 10,l: 10,u: 10,d: 10},
  nodes: nodes,
  links: links
};

const data = (state = initialState, action) => {
  switch (action.type) {
    case NEW_POSITION:
      return state;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  data
});

export default rootReducer;

