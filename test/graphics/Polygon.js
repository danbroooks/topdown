'use strict';

const { test } = require('ava');
const Polygon = require('../../src/graphics/Polygon');
const Point = require('../../src/graphics/Point');

test('takes an array of points ([ Points... ])', t => {
  const poly = Polygon([
    Point(0, 0),
    Point(20, 0),
    Point(10, 10)
  ]);

  t.is(poly.points.length, 3);
  t.true(Point.validate(poly.points[2]));
});

test('takes an array of x/y pairs to construct', t => {
  const arrPoly = Polygon([
    [0, 0],
    [20, 0],
    [10, 10]
  ]);

  t.is(arrPoly.points.length, 3);
  t.true(Point.validate(arrPoly.points[2]));

  t.is(arrPoly.points[0].y, 0);
  t.is(arrPoly.points[1].x, 20);
  t.is(arrPoly.points[2].y, 10);
});

test('throws when passed nothing', t => {
  t.throws(_ => Polygon());
});

test('throws when passed non-array value', t => {
  t.throws(_ => Polygon(12));
});

test('throws when not passed array of points', t => {
  t.throws(_ => Polygon([123, 4]));
});

test('throws when passed an invalid array of point data', t => {
  t.throws(_ => Polygon([
    [10, 20], [10, 30], [20, 30, 40]
  ]));
});

test('can be cloned', t => {
  const poly = Polygon([
    [0, 0],
    [20, 0],
    [10, 10]
  ]);

  const clone = Polygon.Clone(poly);

  t.not(poly, clone, 'clone creates duplicated instance, not reference');
  t.not(poly.points, clone.points, 'clone creates duplicated points, does not hand reference to clone');

  clone.rotate(2);
  t.notDeepEqual(poly.points, clone.points);
});

test('can be rotated', t => {
  let poly = Polygon([
    [-5, -10],
    [-5, 10],
    [5, 10],
    [5, -10],
  ]);

  poly = poly.rotate(90);

  t.is(poly.points[0].x, 10);
  t.is(poly.points[0].y, -5);

  t.is(poly.points[1].x, -10);
  t.is(poly.points[1].y, -5);

  t.is(poly.points[2].x, -10);
  t.is(poly.points[2].y, 5);

  t.is(poly.points[3].x, 10);
  t.is(poly.points[3].y, 5);
});
