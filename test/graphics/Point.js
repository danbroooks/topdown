'use strict';

const { test } = require('ava');
const Point = require('../../src/graphics/Point');

test('defaults x & y to 0 when no arguments passed in', t => {
  let { x, y } = Point();
  t.is(x, 0);
  t.is(y, 0);
});

test('takes arguments (x, y)', t => {
  let { x, y } = Point(10, 20);
  t.is(x, 10);
  t.is(y, 20);
});

test('accepts array of size 2 as ([x, y])', t => {
  let { x, y } = Point([10, 20]);
  t.is(x, 10);
  t.is(y, 20);
});

test('accepts object with numeric { x, y }', t => {
  let { x, y } = Point({ x: 12, y: 12 });
  t.is(x, 12);
  t.is(y, 12);
});

test('throws exception when passed invalid array', t => {
  t.plan(2);
  t.throws(_ => Point([10]));
  t.throws(_ => Point([10, 20, 30]));
});

test('throws exception when not passed enough arguments', t => {
  t.plan(1);
  t.throws(_ => Point(10));
});

test('can shift given (x, y)', t => {
  let { x, y } = Point(30, 20).shift(-10, 20);
  t.is(x, 20);
  t.is(y, 40);
});

test('can shift given (Point)', t => {
  let { x, y } = Point(30, 20).shift(Point(40, -30));
  t.is(x, 70);
  t.is(y, -10);
});

test('shift throws when given invalid args', t => {
  t.throws(_ => Point(30, 20).shift('10', 10));
});

test('shift is chainable', t => {
  let { x, y } = Point(30, 20).shift(10, 10).shift(10, 10);
  t.is(x, 50);
  t.is(y, 40);
});

test('can be inverted', t => {
  let { x, y } = Point(-10, 20).invert();
  t.is(x, 10);
  t.is(y, -20);
});

test('inverting does not lead to negative zeroes', t => {
  let { x, y } = Point(0, 0).invert();
  let negativeZero = (n) => (n == 0 && (1 / n) !== Number.POSITIVE_INFINITY);

  t.false(negativeZero(x));
  t.false(negativeZero(y));
});

test('inverting is chainable', t => {
  let { x, y } = Point(-10, 20).invert().invert().invert();
  t.is(x, 10);
  t.is(y, -20);
});

test('can be rotated', t => {
  const pt = Point(0, 20);

  const full = pt.rotate(360);
  t.is(full.x, 0);
  t.is(full.y, 20);

  const half = pt.rotate(180);
  t.is(half.x, 0);
  t.is(half.y, -20);

  const quart = pt.rotate(-90);
  t.is(quart.x, 20);
  t.is(quart.y, 0);

  const eigth = pt.rotate(-45);
  t.is(Number(eigth.x.toFixed(4)), 14.1421);
  t.is(Number(eigth.y.toFixed(4)), 14.1421);
});

test('can be rotated given ([x, y], deg)', t => {
  t.notThrows(_ => Point().rotate([1, 2], 180));
});

test('can be rotated given (Point(), deg)', t => {
  t.notThrows(_ => Point().rotate(Point(1, 2), 90));
});

test('rotate throws when passed invalid arguments', t => {
  const p = Point();

  t.throws(_ => p.rotate('stringval'));
  t.throws(_ => p.rotate(Point()));
});

test('throws when axis argument passed in is invalid', t => {
  const VALID_DEGREES = 10;
  const p = Point();

  t.throws(_ => p.rotate('10', VALID_DEGREES));
  t.throws(_ => p.rotate(10, VALID_DEGREES));
  t.throws(_ => p.rotate([10], VALID_DEGREES));
});

test('throws when degrees passed in is not numeric', t => {
  const VALID_AXIS = [ 50, 50 ];
  t.throws(_ => p.rotate(VALID_AXIS, '0'))
});
