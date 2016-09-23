'use strict';

var _ = require('lodash');
var Point = require('./Point');

let arrayOfPoints = (points) => !points.map(Point.isValid).includes(false);

var Polygon = function () {

};

/**
 * Collection of points that make up the Polygon
 *
 * @type {Array}
 */
Polygon.prototype.points = [];


Polygon.prototype.rotate = function (deg) {
  this.points = _.map(this.points, function (pt) {
    return pt.rotate(deg);
  });
};

/**
 *
 * @constructor
 */
Polygon.ValidateRawArray = function (arr) {
  if (!_.isArray(arr)) {
    return false;
  }

  return _.reduce(arr, function (carry, point) {
    return _.isArray(point) && point.length == 2;
  }, true);
};

var Factory = Build(Polygon, function () {

  if (!arguments.length) {
    throw new Error('Polygon was passed invalid number arguments');
  }

  let points = arguments[0];

  if (!arrayOfPoints(points) && !Polygon.ValidateRawArray(points)) {
    throw new Error('.points array contains incorrect number of values to make a point (2).');
  }

  let position = arguments[1];

  if (position && !Point.isValid(position)) {
    throw new Error();
  }

  return {
    points: _.map(points, Point),
    position: position
  };
});

/**
 * @param polygon
 * @returns {*}
 */
Factory.Clone = function (polygon) {
  return Factory(
    _.map(polygon.points, _.identity)
  );
};

module.exports = Factory;
