'use strict';

const { test } = require('ava');
const Vector = require('../../src/graphics/Vector');
const P = require('../../src/graphics/Point');
const CONSTRUCTOR_ERROR = 'Vector constructor takes two Point objects.';
const round = (n) => Math.round(n * 100) / 100;

test('takes two Point objects as parameters', t => {
  t.notThrows(_ => Vector(P(), P()));
});

test('throws if only passed one valid parameter', t => {
  t.throws(_ => Vector(P()), CONSTRUCTOR_ERROR);
});

test('throws if passed erroneous parameters', t => {
  t.throws(_ => Vector(2, 'hello'), CONSTRUCTOR_ERROR);
});

test('throws if not passed any parameters', t => {
  t.throws(_ => Vector(), CONSTRUCTOR_ERROR)
});

test('can calculate angle', t => {
  const c = P(0, 0);

  let v0 = Vector(c, P(0, 1));
  t.is(v0.angle(), 0);

  let v45 = Vector(c, P(1, 1));
  t.is(v45.angle(), 45);

  let v90 = Vector(c, P(1, 0));
  t.is(v90.angle(), 90);

  let v135 = Vector(c, P(1, -1));
  t.is(v135.angle(), 135);

  let v180 = Vector(c, P(0, -1));
  t.is(v180.angle(), 180);

  let v225 = Vector(c, P(-1, -1));
  t.is(v225.angle(), 225);

  let v270 = Vector(c, P(-1, 0));
  t.is(v270.angle(), 270);

  let v315 = Vector(c, P(-1, 1));
  t.is(v315.angle(), 315);
});

test('can calculate length', t => {
  const c = P(0, 0);

  const same = Vector(c, c).length();
  t.is(same, 0);

  const one = Vector(c, P(0, 1)).length();
  t.is(one, 1);

  const negativeOne = Vector(c, P(0, -1)).length();
  t.is(negativeOne, 1);

  const angled = Vector(c, P(700, 500)).length();
  t.is(round(angled), 860.23);
});

test('can check for intersections', t => {
  const A = P(-1, -1);
  const B = P( 1,  1);
  const C = P( 1, -1);
  const D = P(-1,  1);

  const va = Vector(A, C);
  const vb = Vector(D, B);
  t.false(va.collision(vb));

  const vc = Vector(D, C);
  const vd = Vector(A, B);
  const { x, y } = vc.collision(vd);
  t.is(x, 0);
  t.is(y, 0);
});
