'use strict';

const _ = require('lodash');
const Point = require('./Point');

const arrayOfPoints = (points) => _.isArray(points) && points.length && _.every(points, Point.validate);

const ValidateRawArray = (arr) => {
  if (!_.isArray(arr)) {
    return false;
  }

  return _.reduce(arr, (carry, point) => (_.isArray(point) && point.length == 2), true);
};

let self = module.exports = (points, position) => {

  if (!points) {
    throw new Error();
  }

  if (!arrayOfPoints(points) && !ValidateRawArray(points)) {
    throw new Error('.points array contains incorrect number of values to make a point (2).');
  }

  if (position && !Point.validate(position)) {
    throw new Error();
  }

  points = _.map(points, (pt) => Point(pt));

  const rotate = (deg) => {
    return self(_.map(points, pt => pt.rotate(deg)), position);
  };

  return Object.freeze({ points, position, rotate });
};

module.exports.Clone = (polygon) => {
  return self(
    _.map(polygon.points, p => p)
  );
};

module.exports.ValidateRawArray = ValidateRawArray;
