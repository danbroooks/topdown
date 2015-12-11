var _ = require('lodash');
var Build = require('../util/Factory').Build;
var Point = require('./Point');

/**
 *
 * @param points
 * @returns {boolean}
 */
function arrayOfPoints(points) {
  var allPoints = true;
  points.forEach(function (point) {
    if (allPoints && !Point.Created(point)) {
      allPoints = false;
    }
  });
  return allPoints;
}

var Polygon = function () {

};

/**
 * Collection of points that make up the Polygon
 *
 * @type {Array}
 */
Polygon.prototype.points = [];


Polygon.prototype.rotate = function (deg) {
  _.each(this.points, function (pt) {
    pt.rotate(deg);
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

  var opts = {};

  opts.points = arguments[0];

  if (!arrayOfPoints(opts.points)) {
    if (!Polygon.ValidateRawArray(opts.points)) {
      throw new Error('.points array contains incorrect number of values to make a point (2).');
    }

    opts.points = _.map(opts.points, function (pts) {
      return Point(pts);
    });
  }

  opts.position = arguments[1];

  if (opts.position && !Point.Created(opts.position)) {
    throw new Error();
  }

  return opts;
});

module.exports = Factory;
