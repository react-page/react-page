// flow-typed signature: 8762affaffc164ef5b55cc24c2fe11aa
// flow-typed version: a9e64f6272/ramda_v0.x.x/flow_>=v0.34.x

/* eslint-disable no-unused-vars, no-redeclare */

type Transformer<A,B> = {
  '@@transducer/step': <I,R>(r: A, a: *) => R,
  '@@transducer/init': () => A,
  '@@transducer/result': (result: *) => B
}


declare module ramda {
  declare type UnaryFn<A,R> = (a: A) => R;
  declare type BinaryFn<A,B,R> = ((a: A, b: B) => R) & ((a:A) => (b: B) => R);
  declare type UnarySameTypeFn<T> = UnaryFn<T,T>
  declare type BinarySameTypeFn<T> = BinaryFn<T,T,T>
  declare type NestedObject<T> = { [k: string]: T | NestedObject<T> }
  declare type UnaryPredicateFn<T> = (x:T) => boolean
  declare type BinaryPredicateFn<T> = (x:T, y:T) => boolean
  declare type BinaryPredicateFn2<T,S> = (x:T, y:S) => boolean

  declare interface ObjPredicate {
    (value: any, key: string): boolean;
  }

  declare type CurriedFunction2<T1, T2, R> =
    & ((t1: T1, t2: T2) => R)
    & ((t1: T1, ...rest: Array<void>) => (t2: T2) => R)

  declare type CurriedFunction3<T1, T2, T3, R> =
    & ((t1: T1, t2: T2, t3: T3) => R)
    & ((t1: T1, t2: T2, ...rest: Array<void>) => (t3: T3) => R)
    & ((t1: T1, ...rest: Array<void>) => CurriedFunction2<T2, T3, R>)

  declare type CurriedFunction4<T1, T2, T3, T4, R> =
    & ((t1: T1, t2: T2, t3: T3, t4: T4) => R)
    & ((t1: T1, t2: T2, t3: T3, ...rest: Array<void>) => (t4: T4) => R)
    & ((t1: T1, t2: T2, ...rest: Array<void>) => CurriedFunction2<T3, T4, R>)
    & ((t1: T1, ...rest: Array<void>) => CurriedFunction3<T2, T3, T4, R>)

  declare type CurriedFunction5<T1, T2, T3, T4, T5, R> =
    & ((t1: T1) => CurriedFunction4<T2, T3, T4, T5, R>)
    & ((t1: T1, t2: T2) => CurriedFunction3<T3, T4, T5, R>)
    & ((t1: T1, t2: T2, t3: T3) => CurriedFunction2<T4, T5, R>)
    & ((t1: T1, t2: T2, t3: T3, t4: T4) => (t5: T5) => R)
    & ((t1: T1, t2: T2, t3: T3, t4: T4, t5: T5) => R)

  declare type CurriedFunction6<T1, T2, T3, T4, T5, T6, R> =
    & ((t1: T1) => CurriedFunction5<T2, T3, T4, T5, T6, R>)
    & ((t1: T1, t2: T2) => CurriedFunction4<T3, T4, T5, T6, R>)
    & ((t1: T1, t2: T2, t3: T3) => CurriedFunction3<T4, T5, T6, R>)
    & ((t1: T1, t2: T2, t3: T3, t4: T4) => CurriedFunction2<T5, T6, R>)
    & ((t1: T1, t2: T2, t3: T3, t4: T4, t5: T5) => (t6: T6) => R)
    & ((t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6) => R)

  declare type Pipe = (<A,B,C,D,E,F,G>(ab: UnaryFn<A,B>, bc: UnaryFn<B,C>, cd: UnaryFn<C,D>, de: UnaryFn<D,E>, ef: UnaryFn<E,F>, fg: UnaryFn<F,G>, ...rest: Array<void>) => UnaryFn<A,G>)
    & (<A,B,C,D,E,F>(ab: UnaryFn<A,B>, bc: UnaryFn<B,C>, cd: UnaryFn<C,D>, de: UnaryFn<D,E>, ef: UnaryFn<E,F>, ...rest: Array<void>) => UnaryFn<A,F>)
    & (<A,B,C,D,E>(ab: UnaryFn<A,B>, bc: UnaryFn<B,C>, cd: UnaryFn<C,D>, de: UnaryFn<D,E>, ...rest: Array<void>) => UnaryFn<A,E>)
    & (<A,B,C,D>(ab: UnaryFn<A,B>, bc: UnaryFn<B,C>, cd: UnaryFn<C,D>, ...rest: Array<void>) => UnaryFn<A,D>)
    & (<A,B,C>(ab: UnaryFn<A,B>, bc: UnaryFn<B,C>, ...rest: Array<void>) => UnaryFn<A,C>)
    & (<A,B>(ab: UnaryFn<A,B>, ...rest: Array<void>) => UnaryFn<A,B>)

  declare type Compose = & (<A,B,C,D,E,F,G>(fg: UnaryFn<F,G>, ef: UnaryFn<E,F>, de: UnaryFn<D,E>, cd: UnaryFn<C,D>, bc: UnaryFn<B,C>, ab: UnaryFn<A,B>, ...rest: Array<void>) => UnaryFn<A,G>)
    & (<A,B,C,D,E,F>(ef: UnaryFn<E,F>, de: UnaryFn<D,E>, cd: UnaryFn<C,D>, bc: UnaryFn<B,C>, ab: UnaryFn<A,B>, ...rest: Array<void>) => UnaryFn<A,F>)
    & (<A,B,C,D,E>(de: UnaryFn<D,E>, cd: UnaryFn<C,D>, bc: UnaryFn<B,C>, ab: UnaryFn<A,B>, ...rest: Array<void>) => UnaryFn<A,E>)
    & (<A,B,C,D>(cd: UnaryFn<C,D>, bc: UnaryFn<B,C>, ab: UnaryFn<A,B>, ...rest: Array<void>) => UnaryFn<A,D>)
    & (<A,B,C>(bc: UnaryFn<B,C>, ab: UnaryFn<A,B>, ...rest: Array<void>) => UnaryFn<A,C>)
    & (<A,B>(ab: UnaryFn<A,B>, ...rest: Array<void>) => UnaryFn<A,B>)

  declare type Curry = & (<T1, T2, TResult>(fn: (a: T1, b: T2) => TResult) => CurriedFunction2<T1,T2, TResult>)
    & (<T1, T2, T3, TResult>(fn: (a: T1, b: T2, c: T3) => TResult) => CurriedFunction3<T1,T2, T3, TResult>)
    & (<T1, T2, T3, T4, TResult>(fn: (a: T1, b: T2, c: T3, d: T4) => TResult) => CurriedFunction4<T1,T2, T3, T4, TResult>)
    & (<T1, T2, T3, T4, T5, TResult>(fn: (a: T1, b: T2, c: T3, d: T4, e: T5) => TResult) => CurriedFunction5<T1,T2, T3, T4, T5, TResult>)
    & (<T1, T2, T3, T4, T5, T6, TResult>(fn: (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6) => TResult) => CurriedFunction6<T1,T2, T3, T4, T5, T6, TResult>)
    & ((fn: Function) => Function)

  declare type Filter =
    & (<K,V,T:Array<V>|{[key:K]:V}>(fn: UnaryPredicateFn<V>, xs:T) => T)
    & (<K,V,T:Array<V>|{[key:K]:V}>(fn: UnaryPredicateFn<V>) => (xs:T) => T)


  declare class Monad<T> {
    chain: Function
  }

  declare class Semigroup<T> {}

  declare class Chain {
    chain<T,V: Monad<T>|Array<T>>(fn: (a:T) => V, x: V): V;
    chain<T,V: Monad<T>|Array<T>>(fn: (a:T) => V): (x: V) => V;
  }

  declare class GenericContructor<T> {
    constructor(x: T): GenericContructor<any>
  }

  declare class GenericContructorMulti {
    constructor(...args: Array<any>): GenericContructor<any>
  }


  /**
  * DONE:
  * Function*
  * List*
  * Logic
  * Math
  * Object*
  * Relation
  * String
  * Type
  */

  declare var compose: Compose;
  declare var pipe: Pipe;
  declare var curry: Curry;
  declare function curryN(length: number, fn: (...args: Array<any>) => any): Function

  // *Math
  declare var add: CurriedFunction2<number,number,number>;
  declare var inc: UnaryFn<number,number>;
  declare var dec: UnaryFn<number,number>;
  declare var mean: UnaryFn<Array<number>,number>;
  declare var divide: CurriedFunction2<number,number,number>
  declare var mathMod: CurriedFunction2<number,number,number>;
  declare var median: UnaryFn<Array<number>,number>;
  declare var modulo: CurriedFunction2<number,number,number>;
  declare var multiply: CurriedFunction2<number,number,number>;
  declare var negate: UnaryFn<number,number>;
  declare var product: UnaryFn<Array<number>,number>;
  declare var subtract: CurriedFunction2<number,number,number>;
  declare var sum: UnaryFn<Array<number>,number>;

  // Filter
  declare var filter: Filter;
  declare var reject: Filter;

  // *String
  declare var match: CurriedFunction2<RegExp,string,Array<string|void>>;
  declare var replace: CurriedFunction3<RegExp|string,string,string,string>;
  declare var split: CurriedFunction2<RegExp|string,string,Array<string>>
  declare var test: CurriedFunction2<RegExp,string,boolean>
  declare function toLower(a: string): string;
  declare function toString(a: any): string;
  declare function toUpper(a: string): string;
  declare function trim(a: string): string;

  // *Type
  declare function is<T>(t: T, ...rest: Array<void>): (v: any) => boolean;
  declare function is<T>(t: T, v: any): boolean;
  declare var propIs: CurriedFunction3<any,string,Object,boolean>;
  declare function type(x: ?any): string;
  declare function isArrayLike(x: any): boolean;
  declare function isNil(x: ?any): boolean;

  // *List
  declare function adjust<T>(fn:(a: T) => T, ...rest: Array<void>): (index: number, ...rest: Array<void>) => (src: Array<T>) => Array<T>;
  declare function adjust<T>(fn:(a: T) => T, index: number, ...rest: Array<void>): (src: Array<T>) => Array<T>;
  declare function adjust<T>(fn:(a: T) => T, index: number, src: Array<T>): Array<T>;

  declare function all<T>(fn: UnaryPredicateFn<T>, xs: Array<T>): boolean;
  declare function all<T>(fn: UnaryPredicateFn<T>, ...rest: Array<void>): (xs: Array<T>) => boolean;

  declare function any<T>(fn: UnaryPredicateFn<T>, xs: Array<T>): boolean;
  declare function any<T>(fn: UnaryPredicateFn<T>, ...rest: Array<void>): (xs: Array<T>) => boolean;

  declare function aperture<T>(n: number, xs: Array<T>): Array<Array<T>>;
  declare function aperture<T>(n: number, ...rest: Array<void>): (xs: Array<T>) => Array<Array<T>>;

  declare function append<E>(x: E, xs: Array<E>): Array<E>
  declare function append<E>(x: E, ...rest: Array<void>): (xs: Array<E>) => Array<E>

  declare function prepend<E>(x: E, xs: Array<E>): Array<E>
  declare function prepend<E>(x: E, ...rest: Array<void>): (xs: Array<E>) => Array<E>

  declare function concat<V,T:Array<V>|string>(x: T, y: T): T;
  declare function concat<V,T:Array<V>|string>(x: T): (y: T) => T;

  declare function contains<E,T:Array<E>|string>(x: E, xs: T): boolean
  declare function contains<E,T:Array<E>|string>(x: E, ...rest: Array<void>): (xs: T) => boolean

  declare function drop<V,T:Array<V>|string>(n: number, ...rest: Array<void>):(xs: T) => T;
  declare function drop<V,T:Array<V>|string>(n: number, xs: T): T;

  declare function dropLast<V,T:Array<V>|string>(n: number, ...rest: Array<void>):(xs: T) => T;
  declare function dropLast<V,T:Array<V>|string>(n: number, xs: T): T;

  declare function dropLastWhile<V,T:Array<V>>(fn: UnaryPredicateFn<V>, ...rest: Array<void>): (xs:T) => T;
  declare function dropLastWhile<V,T:Array<V>>(fn: UnaryPredicateFn<V>, xs:T): T;

  declare function dropWhile<V,T:Array<V>>(fn: UnaryPredicateFn<V>, ...rest: Array<void>): (xs:T) => T;
  declare function dropWhile<V,T:Array<V>>(fn: UnaryPredicateFn<V>, xs:T): T;

  declare function dropRepeats<V,T:Array<V>>(xs:T): T;

  declare function dropRepeatsWith<V,T:Array<V>>(fn: BinaryPredicateFn<V>, ...rest: Array<void>): (xs:T) => T;
  declare function dropRepeatsWith<V,T:Array<V>>(fn: BinaryPredicateFn<V>, xs:T): T;

  declare function groupBy<T>(fn: (x: T) => string, xs: Array<T>): {[key: string]: Array<T>}
  declare function groupBy<T>(fn: (x: T) => string, ...rest: Array<void>): (xs: Array<T>) => {[key: string]: Array<T>}

  declare function groupWith<T,V:Array<T>|string>(fn: BinaryPredicateFn<T>, xs: V): Array<V>
  declare function groupWith<T,V:Array<T>|string>(fn: BinaryPredicateFn<T>, ...rest: Array<void>): (xs: V) => Array<V>

  declare function head<T,V:Array<T>>(xs: V): ?T
  declare function head<T,V:string>(xs: V): V

  declare function into<I,T,A:Array<T>,R:Array<*>|string|Object>(accum: R, xf: (a: A) => I, input: A): R
  declare function into<I,T,A:Array<T>,R>(accum: Transformer<I,R>, xf: (a: A) => R, input: A): R

  declare function indexOf<E>(x: E, xs: Array<E>): number
  declare function indexOf<E>(x: E, ...rest: Array<void>): (xs: Array<E>) => number

  declare function indexBy<V,T:{[key: string]:*}>(fn: (x: T) => string, ...rest: Array<void>): (xs: Array<T>) => {[key: string]: T}
  declare function indexBy<V,T:{[key: string]:*}>(fn: (x: T) => string, xs: Array<T>): {[key: string]: T}

  declare function insert<T>(index: number, ...rest: Array<void>): (elem: T) => (src: Array<T>) => Array<T>
  declare function insert<T>(index: number, elem: T, ...rest: Array<void>): (src: Array<T>) => Array<T>
  declare function insert<T>(index: number, elem: T, src: Array<T>): Array<T>

  declare function insertAll<T,S>(index: number, ...rest: Array<void>): (elem: Array<S>) => (src: Array<T>) => Array<S|T>
  declare function insertAll<T,S>(index: number, elems: Array<S>, ...rest: Array<void>): (src: Array<T>) => Array<S|T>
  declare function insertAll<T,S>(index: number, elems: Array<S>, src: Array<T>): Array<S|T>

  declare function join(x: string, xs: Array<any>): string
  declare function join(x: string, ...rest: Array<void>): (xs: Array<any>) => string

  declare function last<T,V:Array<T>>(xs: V): ?T
  declare function last<T,V:string>(xs: V): V

  declare function none<T>(fn: UnaryPredicateFn<T>, xs: Array<T>): boolean;
  declare function none<T>(fn: UnaryPredicateFn<T>, ...rest: Array<void>): (xs: Array<T>) => boolean;

  declare function nth<V,T:Array<V>>(i: number, xs: T): ?V
  declare function nth<V,T:Array<V>|string>(i: number, ...rest: Array<void>): ((xs: string) => string)&((xs: T) => ?V)
  declare function nth<T:string>(i: number, xs: T):  T

  declare function find<V,O:{[key:string]:*},T:Array<V>|O>(fn: UnaryPredicateFn<V>, ...rest: Array<void>): (xs:T|O) => ?V|O;
  declare function find<V,O:{[key:string]:*},T:Array<V>|O>(fn: UnaryPredicateFn<V>, xs:T|O): ?V|O;
  declare function findLast<V,O:{[key:string]:*},T:Array<V>|O>(fn: UnaryPredicateFn<V>, ...rest: Array<void>): (xs:T|O) => ?V|O;
  declare function findLast<V,O:{[key:string]:*},T:Array<V>|O>(fn: UnaryPredicateFn<V>, xs:T|O): ?V|O;

  declare function findIndex<K,V,T:Array<V>|{[key:K]:V}>(fn: UnaryPredicateFn<V>, ...rest: Array<void>): (xs:T) => number
  declare function findIndex<K,V,T:Array<V>|{[key:K]:V}>(fn: UnaryPredicateFn<V>, xs:T): number
  declare function findLastIndex<K,V,T:Array<V>|{[key:K]:V}>(fn: UnaryPredicateFn<V>, ...rest: Array<void>): (xs:T) => number
  declare function findLastIndex<K,V,T:Array<V>|{[key:K]:V}>(fn: UnaryPredicateFn<V>, xs:T): number

  declare function forEach<T,V>(fn:(x:T) => ?V, xs: Array<T>): Array<T>
  declare function forEach<T,V>(fn:(x:T) => ?V, ...rest: Array<void>): (xs: Array<T>) => Array<T>

  declare function lastIndexOf<E>(x: E, xs: Array<E>): number
  declare function lastIndexOf<E>(x: E, ...rest: Array<void>): (xs: Array<E>) => number

  declare function map<T,R>(fn: (x:T) => R, xs: Array<T>): Array<R>;
  declare function map<T,R,S:{map:Function}>(fn: (x:T) => R, xs: S): S;
  declare function map<T,R>(fn: (x:T) => R, ...rest: Array<void>): ((xs: {[key: string]: T}) => {[key: string]: R}) & ((xs: Array<T>) => Array<R>)
  declare function map<T,R,S:{map:Function}>(fn: (x:T) => R, ...rest: Array<void>): ((xs:S) => S) & ((xs: S) => S)
  declare function map<T,R>(fn: (x:T) => R, xs: {[key: string]: T}): {[key: string]: R}

  declare type AccumIterator<A,B,R> = (acc: R, x: A) => [R,B]
  declare function mapAccum<A,B,R>(fn: AccumIterator<A,B,R>, acc: R, xs: Array<A>): [R, Array<B>];
  declare function mapAccum<A,B,R>(fn: AccumIterator<A,B,R>, ...rest: Array<void>): (acc: R, xs: Array<A>) => [R, Array<B>];

  declare function mapAccumRight<A,B,R>(fn: AccumIterator<A,B,R>, acc: R, xs: Array<A>): [R, Array<B>];
  declare function mapAccumRight<A,B,R>(fn: AccumIterator<A,B,R>, ...rest: Array<void>): (acc: R, xs: Array<A>) => [R, Array<B>];

  declare function intersperse<E>(x: E, xs: Array<E>): Array<E>
  declare function intersperse<E>(x: E, ...rest: Array<void>): (xs: Array<E>) => Array<E>

  declare function pair<A,B>(a:A, b:B): [A,B]
  declare function pair<A,B>(a:A, ...rest: Array<void>): (b:B) => [A,B]

  declare function partition<K,V,T:Array<V>|{[key:K]:V}>(fn: UnaryPredicateFn<V>, xs:T): [T,T]
  declare function partition<K,V,T:Array<V>|{[key:K]:V}>(fn: UnaryPredicateFn<V>, ...rest: Array<void>): (xs:T) => [T,T]

  declare function pluck<V,K:string|number,T:Array<Array<V>|{[key:string]:V}>>(k: K, xs: T): Array<V>
  declare function pluck<V,K:string|number,T:Array<Array<V>|{[key:string]:V}>>(k: K,...rest: Array<void>): (xs: T) => Array<V>

  declare var range: CurriedFunction2<number,number,Array<number>>;

  declare function remove<T>(from: number, ...rest: Array<void>): ((to: number, ...rest: Array<void>) => (src: Array<T>) => Array<T>) & ((to: number, src: Array<T>) => Array<T>)
  declare function remove<T>(from: number, to: number, ...rest: Array<void>): (src: Array<T>) => Array<T>
  declare function remove<T>(from: number, to: number, src: Array<T>): Array<T>

  declare function repeat<T>(x: T, times: number): Array<T>
  declare function repeat<T>(x: T, ...rest: Array<void>): (times: number) => Array<T>

  declare function slice<V,T:Array<V>|string>(from: number, ...rest: Array<void>): ((to: number, ...rest: Array<void>) => (src: T) => T) & ((to: number, src: T) => T)
  declare function slice<V,T:Array<V>|string>(from: number, to: number, ...rest: Array<void>): (src: T) => T
  declare function slice<V,T:Array<V>|string>(from: number, to: number, src: T): T

  declare function sort<V,T:Array<V>>(fn: (a:V, b:V) => number, xs:T): T
  declare function sort<V,T:Array<V>>(fn: (a:V, b:V) => number, ...rest: Array<void>): (xs:T) => T

  declare function times<T>(fn:(i: number) => T, n: number): Array<T>
  declare function times<T>(fn:(i: number) => T, ...rest: Array<void>): (n: number) => Array<T>

  declare function take<V,T:Array<V>|string>(n: number, xs: T): T;
  declare function take<V,T:Array<V>|string>(n: number):(xs: T) => T;

  declare function takeLast<V,T:Array<V>|string>(n: number, xs: T): T;
  declare function takeLast<V,T:Array<V>|string>(n: number):(xs: T) => T;

  declare function takeLastWhile<V,T:Array<V>>(fn: UnaryPredicateFn<V>, xs:T): T;
  declare function takeLastWhile<V,T:Array<V>>(fn: UnaryPredicateFn<V>): (xs:T) => T;

  declare function takeWhile<V,T:Array<V>>(fn: UnaryPredicateFn<V>, xs:T): T;
  declare function takeWhile<V,T:Array<V>>(fn: UnaryPredicateFn<V>): (xs:T) => T;

  declare function unfold<T,R>(fn: (seed: T) => [R, T]|boolean, ...rest: Array<void>): (seed: T) => Array<R>
  declare function unfold<T,R>(fn: (seed: T) => [R, T]|boolean, seed: T): Array<R>

  declare function uniqBy<T,V>(fn:(x: T) => V, ...rest: Array<void>): (xs: Array<T>) => Array<T>
  declare function uniqBy<T,V>(fn:(x: T) => V, xs: Array<T>): Array<T>

  declare function uniqWith<T>(fn: BinaryPredicateFn<T>, ...rest: Array<void>): (xs: Array<T>) => Array<T>
  declare function uniqWith<T>(fn: BinaryPredicateFn<T>, xs: Array<T>): Array<T>

  declare function update<T>(index: number, ...rest: Array<void>): ((elem: T, ...rest: Array<void>) => (src: Array<T>) => Array<T>) & ((elem: T, src: Array<T>) => Array<T>)
  declare function update<T>(index: number, elem: T, ...rest: Array<void>): (src: Array<T>) => Array<T>
  declare function update<T>(index: number, elem: T, src: Array<T>): Array<T>

  // TODO `without` as a transducer
  declare function without<T>(xs: Array<T>, src: Array<T>): Array<T>
  declare function without<T>(xs: Array<T>, ...rest: Array<void>): (src: Array<T>) => Array<T>

  declare function xprod<T,S>(xs: Array<T>, ys: Array<S>): Array<[T,S]>
  declare function xprod<T,S>(xs: Array<T>, ...rest: Array<void>): (ys: Array<S>) => Array<[T,S]>

  declare function zip<T,S>(xs: Array<T>, ys: Array<S>): Array<[T,S]>
  declare function zip<T,S>(xs: Array<T>, ...rest: Array<void>): (ys: Array<S>) => Array<[T,S]>

  declare function zipObj<T:string,S>(xs: Array<T>, ys: Array<S>): {[key:T]:S}
  declare function zipObj<T:string,S>(xs: Array<T>, ...rest: Array<void>): (ys: Array<S>) => {[key:T]:S}

  declare type NestedArray<T> = Array<T | NestedArray<T>>
  declare function flatten<T>(xs: NestedArray<T>): Array<T>;

  declare function fromPairs<T,V>(pair: Array<[T,V]>): {[key: string]:V};

  declare function init<T,V:Array<T>|string>(xs: V): V;

  declare function length<T>(xs: Array<T>): number;

  declare function mergeAll(objs: Array<{[key: string]: any}>):{[key: string]: any};

  declare function reverse<T,V:Array<T>|string>(xs: V): V;

  declare function reduce<A, B>(fn: (acc: A, elem: B) => A, ...rest: Array<void>): ((init: A, xs: Array<B>) => A) & ((init: A, ...rest: Array<void>) => (xs: Array<B>) => A);
  declare function reduce<A, B>(fn: (acc: A, elem: B) => A, init: A, ...rest: Array<void>): (xs: Array<B>) => A;
  declare function reduce<A, B>(fn: (acc: A, elem: B) => A, init: A, xs: Array<B>): A;

  declare function reduceBy<A, B>(fn: (acc: B, elem: A) => B, ...rest: Array<void>):
  ((acc: B, ...rest: Array<void>) => ((keyFn:(elem: A) => string, ...rest: Array<void>) => (xs: Array<A>) => {[key: string]: B}) & ((keyFn:(elem: A) => string, xs: Array<A>) => {[key: string]: B}))
  & ((acc: B, keyFn:(elem: A) => string, ...rest: Array<void>) => (xs: Array<A>) => {[key: string]: B})
  & ((acc: B, keyFn:(elem: A) => string, xs: Array<A>) => {[key: string]: B})
  declare function reduceBy<A, B>(fn: (acc: B, elem: A) => B, acc: B, ...rest: Array<void>):
  ((keyFn:(elem: A) => string, ...rest: Array<void>) => (xs: Array<A>) => {[key: string]: B})
  & ((keyFn:(elem: A) => string, xs: Array<A>) => {[key: string]: B})
  declare function reduceBy<A, B>(fn: (acc: B, elem: A) => B, acc: B, keyFn:(elem: A) => string): (xs: Array<A>) => {[key: string]: B};
  declare function reduceBy<A, B>(fn: (acc: B, elem: A) => B, acc: B, keyFn:(elem: A) => string, xs: Array<A>): {[key: string]: B};

  declare function reduceRight<A, B>(fn: (acc: A, elem: B) => A, ...rest: Array<void>): ((init: A, xs: Array<B>) => A) & ((init: A, ...rest: Array<void>) => (xs: Array<B>) => A);
  declare function reduceRight<A, B>(fn: (acc: A, elem: B) => A, init: A, ...rest: Array<void>): (xs: Array<B>) => A;
  declare function reduceRight<A, B>(fn: (acc: A, elem: B) => A, init: A, xs: Array<B>): A;

  declare function scan<A, B>(fn: (acc: A, elem: B) => A, ...rest: Array<void>): ((init: A, xs: Array<B>) => A) & ((init: A, ...rest: Array<void>) => (xs: Array<B>) => A);
  declare function scan<A, B>(fn: (acc: A, elem: B) => A, init: A, ...rest: Array<void>): (xs: Array<B>) => A;
  declare function scan<A, B>(fn: (acc: A, elem: B) => A, init: A, xs: Array<B>): A;

  declare function splitAt<V,T:Array<V>|string>(i: number, xs: T): [T,T];
  declare function splitAt<V,T:Array<V>|string>(i: number): (xs: T) => [T,T];
  declare function splitEvery<V,T:Array<V>|string>(i: number, xs: T): Array<T>;
  declare function splitEvery<V,T:Array<V>|string>(i: number): (xs: T) => Array<T>;
  declare function splitWhen<V,T:Array<V>>(fn: UnaryPredicateFn<V>, xs:T): [T,T];
  declare function splitWhen<V,T:Array<V>>(fn: UnaryPredicateFn<V>): (xs:T) => [T,T];

  declare function tail<T,V:Array<T>|string>(xs: V): V;

  declare function transpose<T>(xs: Array<Array<T>>): Array<Array<T>>;

  declare function uniq<T>(xs: Array<T>): Array<T>;

  declare function unnest<T>(xs: NestedArray<T>): NestedArray<T>;

  declare function zipWith<T,S,R>(fn: (a: T, b: S) => R, ...rest: Array<void>): ((xs: Array<T>, ys: Array<S>) => Array<R>) & ((xs: Array<T>, ...rest: Array<void> ) => (ys: Array<S>) => Array<R>)
  declare function zipWith<T,S,R>(fn: (a: T, b: S) => R, xs: Array<T>, ...rest: Array<void>): (ys: Array<S>) => Array<R>;
  declare function zipWith<T,S,R>(fn: (a: T, b: S) => R, xs: Array<T>, ys: Array<S>): Array<R>;

  // *Relation
  declare function equals<T>(x: T, ...rest: Array<void>): (y: T) => boolean;
  declare function equals<T>(x: T, y: T): boolean;

  declare function eqBy<A,B>(fn: (x: A) => B, ...rest: Array<void>): ((x: A, y: A) => boolean) & ((x: A, ...rest: Array<void>) => (y: A) => boolean);
  declare function eqBy<A,B>(fn: (x: A) => B, x: A, ...rest: Array<void>): (y: A) => boolean;
  declare function eqBy<A,B>(fn: (x: A) => B, x: A, y: A): boolean;

  declare function propEq(prop: string, ...rest: Array<void>): ((val: *, o: {[k:string]: *}) => boolean) & ((val: *, ...rest: Array<void>) => (o: {[k:string]: *}) => boolean)
  declare function propEq(prop: string, val: *, ...rest: Array<void>): (o: {[k:string]: *}) => boolean;
  declare function propEq(prop: string, val: *, o: {[k:string]:*}): boolean;

  declare function pathEq(path: Array<string>, ...rest: Array<void>): ((val: any, o: Object) => boolean) & ((val: any, ...rest: Array<void>) => (o: Object) => boolean);
  declare function pathEq(path: Array<string>, val: any, ...rest: Array<void>): (o: Object) => boolean;
  declare function pathEq(path: Array<string>, val: any, o: Object): boolean;

  declare function clamp<T:number|string|Date>(min: T, ...rest: Array<void>):
    ((max: T, ...rest: Array<void>) => (v: T) => T) & ((max: T, v: T) => T);
  declare function clamp<T:number|string|Date>(min: T, max: T, ...rest: Array<void>): (v: T) => T;
  declare function clamp<T:number|string|Date>(min: T, max: T, v: T): T;

  declare function countBy<T>(fn: (x: T) => string, ...rest: Array<void>): (list: Array<T>) => {[key: string]: number};
  declare function countBy<T>(fn: (x: T) => string, list: Array<T>): {[key: string]: number};

  declare function difference<T>(xs1: Array<T>, ...rest: Array<void>): (xs2: Array<T>) => Array<T>;
  declare function difference<T>(xs1: Array<T>, xs2: Array<T>): Array<T>;

  declare function differenceWith<T>(fn: BinaryPredicateFn<T>, ...rest: Array<void>): ((xs1: Array<T>) => (xs2: Array<T>) => Array<T>) & ((xs1: Array<T>, xs2: Array<T>) => Array<T>);
  declare function differenceWith<T>(fn: BinaryPredicateFn<T>, xs1: Array<T>, ...rest: Array<void>): (xs2: Array<T>) => Array<T>;
  declare function differenceWith<T>(fn: BinaryPredicateFn<T>, xs1: Array<T>, xs2: Array<T>): Array<T>;

  declare function eqBy<T>(fn: (x: T) => T, x: T, y: T): boolean;
  declare function eqBy<T>(fn: (x: T) => T): (x: T, y: T) => boolean;
  declare function eqBy<T>(fn: (x: T) => T, x: T): (y: T) => boolean;
  declare function eqBy<T>(fn: (x: T) => T): (x: T) => (y: T) => boolean;

  declare function gt<T>(x: T, ...rest: Array<void>): (y: T) => boolean;
  declare function gt<T>(x: T, y: T): boolean;

  declare function gte<T>(x: T, ...rest: Array<void>): (y: T) => boolean;
  declare function gte<T>(x: T, y: T): boolean;

  declare function identical<T>(x: T, ...rest: Array<void>): (y: T) => boolean;
  declare function identical<T>(x: T, y: T): boolean;

  declare function intersection<T>(x: Array<T>, y: Array<T>): Array<T>;
  declare function intersection<T>(x: Array<T>): (y: Array<T>) => Array<T>;

  declare function intersectionWith<T>(fn: BinaryPredicateFn<T>, ...rest: Array<void>): ((x: Array<T>, y: Array<T>) => Array<T>) & ((x: Array<T>) => (y: Array<T>) => Array<T>);
  declare function intersectionWith<T>(fn: BinaryPredicateFn<T>, x: Array<T>, ...rest: Array<void>): (y: Array<T>) => Array<T>;
  declare function intersectionWith<T>(fn: BinaryPredicateFn<T>, x: Array<T>, y: Array<T>): Array<T>;

  declare function lt<T>(x: T, ...rest: Array<void>): (y: T) => boolean;
  declare function lt<T>(x: T, y: T): boolean;

  declare function lte<T>(x: T, ...rest: Array<void>): (y: T) => boolean;
  declare function lte<T>(x: T, y: T): boolean;

  declare function max<T>(x: T, ...rest: Array<void>): (y: T) => T;
  declare function max<T>(x: T, y: T): T;

  declare function maxBy<T,V>(fn: (x:T) => V, ...rest: Array<void>): ((x: T, y: T) => T) & ((x: T) => (y: T) => T);
  declare function maxBy<T,V>(fn: (x:T) => V, x: T, ...rest: Array<void>): (y: T) => T;
  declare function maxBy<T,V>(fn: (x:T) => V, x: T, y: T): T;

  declare function min<T>(x: T, ...rest: Array<void>): (y: T) => T;
  declare function min<T>(x: T, y: T): T;

  declare function minBy<T,V>(fn: (x:T) => V, ...rest: Array<void>): ((x: T, y: T) => T) & ((x: T) => (y: T) => T);
  declare function minBy<T,V>(fn: (x:T) => V, x: T, ...rest: Array<void>): (y: T) => T;
  declare function minBy<T,V>(fn: (x:T) => V, x: T, y: T): T;

  // TODO: sortBy: Started failing in v38...
  // declare function sortBy<T,V>(fn: (x:T) => V, ...rest: Array<void>): (x: Array<T>) => Array<T>;
  // declare function sortBy<T,V>(fn: (x:T) => V, x: Array<T>): Array<T>;

  declare function symmetricDifference<T>(x: Array<T>, ...rest: Array<void>): (y: Array<T>) => Array<T>;
  declare function symmetricDifference<T>(x: Array<T>, y: Array<T>): Array<T>;

  declare function symmetricDifferenceWith<T>(fn: BinaryPredicateFn<T>, ...rest: Array<void>): ((x: Array<T>, ...rest: Array<void>) => (y: Array<T>) => Array<T>) & ((x: Array<T>, y: Array<T>) => Array<T>);
  declare function symmetricDifferenceWith<T>(fn: BinaryPredicateFn<T>, x: Array<T>, ...rest: Array<void>): (y: Array<T>) => Array<T>;
  declare function symmetricDifferenceWith<T>(fn: BinaryPredicateFn<T>, x: Array<T>, y: Array<T>): Array<T>;

  declare function union<T>(x: Array<T>, ...rest: Array<void>): (y: Array<T>) => Array<T>;
  declare function union<T>(x: Array<T>, y: Array<T>): Array<T>;

  declare function unionWith<T>(fn: BinaryPredicateFn<T>, ...rest: Array<void>): ((x: Array<T>, ...rest: Array<void>) => (y: Array<T>) => Array<T>) & (x: Array<T>, y: Array<T>) => Array<T>;
  declare function unionWith<T>(fn: BinaryPredicateFn<T>, x: Array<T>, ...rest: Array<void>): (y: Array<T>) => Array<T>;
  declare function unionWith<T>(fn: BinaryPredicateFn<T>, x: Array<T>, y: Array<T>): Array<T>;

  // *Object
  declare function assoc<T,S>(key: string, ...args: Array<void>):
    ((val: T, ...rest: Array<void>) => (src: {[k:string]:S}) => {[k:string]:S|T}) & ((val: T, src: {[k:string]:S}) => {[k:string]:S|T});
  declare function assoc<T,S>(key: string, val:T, ...args: Array<void>): (src: {[k:string]:S}) => {[k:string]:S|T};
  declare function assoc<T,S>(key: string, val: T, src: {[k:string]:S}): {[k:string]:S|T};

  declare function assocPath<T,S>(key: Array<string>, ...args: Array<void>):
    ((val: T, ...rest: Array<void>) => (src: {[k:string]:S}) => {[k:string]:S|T})
    & ((val: T) => (src: {[k:string]:S}) => {[k:string]:S|T});
  declare function assocPath<T,S>(key: Array<string>, val:T, ...args: Array<void>): (src: {[k:string]:S}) => {[k:string]:S|T};
  declare function assocPath<T,S>(key: Array<string>, val:T, src: {[k:string]:S}): {[k:string]:S|T};

  declare function clone<T>(src: T): $Shape<T>;

  declare function dissoc<T>(key: string, ...args: Array<void>):
    ((val: T, ...rest: Array<void>) => (src: {[k:string]:T}) => {[k:string]:T}) & ((val: T, src: {[k:string]:T}) => {[k:string]:T});
  declare function dissoc<T>(key: string, val:T, ...args: Array<void>): (src: {[k:string]:T}) => {[k:string]:T};
  declare function dissoc<T>(key: string, val: T, src: {[k:string]:T}): {[k:string]:T};

  declare function dissocPath<T>(key: Array<string>, ...args: Array<void>):
    ((val: T, ...rest: Array<void>) => (src: {[k:string]:T}) => {[k:string]:T})
    & ((val: T) => (src: {[k:string]:T}) => {[k:string]:T});
  declare function dissocPath<T>(key: Array<string>, val:T, ...args: Array<void>): (src: {[k:string]:T}) => {[k:string]:T};
  declare function dissocPath<T>(key: Array<string>, val:T, src: {[k:string]:T}): {[k:string]:T};

  // TODO: Started failing in v31... (Attempt to fix below)
  // declare type __UnwrapNestedObjectR<T, U, V: NestedObject<(t: T) => U>> = U
  // declare type UnwrapNestedObjectR<T> = UnwrapNestedObjectR<*, *, T>
  //
  // declare function evolve<R, T: NestedObject<(x:any) => R>>(fn: T, ...rest: Array<void>): (src: NestedObject<any>) => UnwrapNestedObjectR<T>;
  // declare function evolve<R: NestedObject<(x:any) => R>>(fn: T, src: NestedObject<any>): UnwrapNestedObjectR<T>;

  declare function eqProps(key: string, ...args: Array<void>):
  ((o1: Object, ...rest: Array<void>) => (o2: Object) => boolean)
  & ((o1: Object, o2: Object) => boolean);
  declare function eqProps(key: string, o1: Object, ...args: Array<void>): (o2: Object) => boolean;
  declare function eqProps(key: string, o1: Object, o2: Object): boolean;

  declare function has(key: string, o: Object): boolean;
  declare function has(key: string):(o: Object) => boolean;

  declare function hasIn(key: string, o: Object): boolean;
  declare function hasIn(key: string): (o: Object) => boolean;

  declare function invert(o: Object): {[k: string]: Array<string>};
  declare function invertObj(o: Object): {[k: string]: string};

  declare function keys(o: Object): Array<string>;

  /* TODO
  lens
  lensIndex
  lensPath
  lensProp
  */

  declare function mapObjIndexed<A,B>(fn: (val: A, key: string, o: Object) => B, o: {[key: string]: A}): {[key: string]: B};
  declare function mapObjIndexed<A,B>(fn: (val: A, key: string, o: Object) => B, ...args: Array<void>): (o: {[key: string]: A}) => {[key: string]: B};

  declare function merge<A,B>(o1: A, ...rest: Array<void>): (o2: B) => A & B;
  declare function merge<A,B>(o1: A, o2: B): A & B;

  declare function mergeAll<T>(os: Array<{[k:string]:T}>): {[k:string]:T};

  declare function mergeWith<T,S,R,A:{[k:string]:T},B:{[k:string]:S}>(fn: (v1: T, v2: S) => R):
  ((o1: A, ...rest: Array<void>) => (o2: B) => A & B) & ((o1: A, o2: B) => A & B);
  declare function mergeWith<T,S,R,A:{[k:string]:T},B:{[k:string]:S}>(fn: (v1: T, v2: S) => R, o1: A, o2: B): A & B;
  declare function mergeWith<T,S,R,A:{[k:string]:T},B:{[k:string]:S}>(fn: (v1: T, v2: S) => R, o1: A, ...rest: Array<void>): (o2: B) => A & B;

  declare function mergeWithKey<T,S,R,A:{[k:string]:T},B:{[k:string]:S}>(fn: (key: $Keys<A&B>, v1: T, v2: S) => R):
  ((o1: A, ...rest: Array<void>) => (o2: B) => A & B) & ((o1: A, o2: B) => A & B);
  declare function mergeWithKey<T,S,R,A:{[k:string]:T},B:{[k:string]:S}>(fn: (key: $Keys<A&B>, v1: T, v2: S) => R, o1: A, o2: B): A & B;
  declare function mergeWithKey<T,S,R,A:{[k:string]:T},B:{[k:string]:S}>(fn: (key: $Keys<A&B>, v1: T, v2: S) => R, o1: A, ...rest: Array<void>): (o2: B) => A & B;

  declare function objOf<T>(key: string, ...rest: Array<void>): (val: T) => {[key: string]: T};
  declare function objOf<T>(key: string, val: T): {[key: string]: T};

  declare function omit<T:Object>(keys: Array<$Keys<T>>, ...rest: Array<void>): (val: T) => Object;
  declare function omit<T:Object>(keys: Array<$Keys<T>>, val: T): Object;

  // TODO over

  declare function path<V,A:?NestedObject<V>>(p: Array<string>, ...rest: Array<void>): (o: A) => ?V;
  declare function path<V,A:?NestedObject<V>>(p: Array<string>, o: A): ?V;

  declare function pathOr<T,V,A:NestedObject<V>>(or: T, ...rest: Array<void>):
  ((p: Array<string>, ...rest: Array<void>) => (o: ?A) => V|T)
  & ((p: Array<string>, o: ?A) => V|T);
  declare function pathOr<T,V,A:NestedObject<V>>(or: T, p: Array<string>, ...rest: Array<void>): (o: ?A) => V|T;
  declare function pathOr<T,V,A:NestedObject<V>>(or: T, p: Array<string>, o: ?A): V|T;

  declare function pick<A>(keys: Array<string>, ...rest: Array<void>): (val: {[key:string]: A}) => {[key:string]: A};
  declare function pick<A>(keys: Array<string>, val: {[key:string]: A}): {[key:string]: A};

  declare function pickAll<A>(keys: Array<string>, ...rest: Array<void>): (val: {[key:string]: A}) => {[key:string]: ?A};
  declare function pickAll<A>(keys: Array<string>, val: {[key:string]: A}): {[key:string]: ?A};

  declare function pickBy<A>(fn: BinaryPredicateFn2<A,string>, ...rest: Array<void>): (val: {[key:string]: A}) => {[key:string]: A};
  declare function pickBy<A>(fn: BinaryPredicateFn2<A,string>, val: {[key:string]: A}): {[key:string]: A};

  declare function project<T>(keys: Array<string>, ...rest: Array<void>): (val: Array<{[key:string]: T}>) => Array<{[key:string]: T}>;
  declare function project<T>(keys: Array<string>, val: Array<{[key:string]: T}>): Array<{[key:string]: T}>;

  declare function prop<T,O:{[k:string]:T}>(key: $Keys<O>, ...rest: Array<void>): (o: O) => ?T;
  declare function prop<T,O:{[k:string]:T}>(key: $Keys<O>, o: O): ?T;

  declare function propOr<T,V,A:{[k:string]:V}>(or: T, ...rest: Array<void>):
  ((p: $Keys<A>, ...rest: Array<void>) => (o: A) => V|T)
  & ((p: $Keys<A>, o: A) => V|T);
  declare function propOr<T,V,A:{[k:string]:V}>(or: T, p: $Keys<A>, ...rest: Array<void>): (o: A) => V|T;
  declare function propOr<T,V,A:{[k:string]:V}>(or: T, p: $Keys<A>, o: A): V|T;

  declare function keysIn(o: Object): Array<string>;

  declare function props<T,O:{[k:string]:T}>(keys: Array<$Keys<O>>, ...rest: Array<void>): (o: O) => Array<?T>;
  declare function props<T,O:{[k:string]:T}>(keys: Array<$Keys<O>>, o: O): Array<?T>;

  // TODO set

  declare function toPairs<T,O:{[k:string]:T}>(o: O): Array<[$Keys<O>, T]>;

  declare function toPairsIn<T,O:{[k:string]:T}>(o: O): Array<[string, T]>;


  declare function values<T,O:{[k:string]:T}>(o: O): Array<T>;

  declare function valuesIn<T,O:{[k:string]:T}>(o: O): Array<T|any>;

  declare function where<T>(predObj: {[key: string]: UnaryPredicateFn<T>}, ...rest: Array<void>): (o: {[k:string]:T}) => boolean;
  declare function where<T>(predObj: {[key: string]: UnaryPredicateFn<T>}, o: {[k:string]:T}): boolean;

  declare function whereEq<T,S,O:{[k:string]:T},Q:{[k:string]:S}>(predObj: O, ...rest: Array<void>): (o: $Shape<O&Q>) => boolean;
  declare function whereEq<T,S,O:{[k:string]:T},Q:{[k:string]:S}>(predObj: O, o: $Shape<O&Q>): boolean;

  // TODO view

  // *Function
  declare var __: *;

  declare var T: (_: any) => boolean;
  declare var F: (_: any) => boolean;

  declare function addIndex<A,B>(iterFn:(fn:(x:A) => B, xs: Array<A>) => Array<B>): (fn: (x: A, idx: number, xs: Array<A>) => B, xs: Array<A>) => Array<B>;

  declare function always<T>(x:T): (x: any) => T;

  declare function ap<T,V>(fns: Array<(x:T) => V>, ...rest: Array<void>): (xs: Array<T>) => Array<V>;
  declare function ap<T,V>(fns: Array<(x:T) => V>, xs: Array<T>): Array<V>;

  declare function apply<T,V>(fn: (...args: Array<T>) => V, ...rest: Array<void>): (xs: Array<T>) => V;
  declare function apply<T,V>(fn: (...args: Array<T>) => V, xs: Array<T>): V;

  declare function applySpec<S,V,T:NestedObject<(...args: Array<V>) => S>>(spec: T): (...args: Array<V>) => NestedObject<S>;

  declare function binary<T>(fn:(...args: Array<any>) => T): (x: any, y: any) => T;

  declare function bind<T>(fn: (...args: Array<any>) => any, thisObj: T): (...args: Array<any>) => any;

  declare function call<T,V>(fn: (...args: Array<V>) => T, ...args: Array<V>): T;

  declare function comparator<T>(fn: BinaryPredicateFn<T>): (x:T, y:T) => number;

  // TODO add tests
  declare function construct<T>(ctor: Class<GenericContructor<T>>): (x: T) => GenericContructor<T>;

  // TODO add tests
  declare function constructN<T>(n: number, ctor: Class<GenericContructorMulti<any>>): (...args: any) => GenericContructorMulti<any>;

  // TODO make less generic
  declare function converge(after: Function, fns: Array<Function>): Function;

  declare function empty<T>(x: T): T;

  declare function flip<A,B,TResult>(fn: (arg0: A, arg1: B) => TResult): CurriedFunction2<B,A,TResult>;
  declare function flip<A,B,C,TResult>(fn: (arg0: A, arg1: B, arg2: C) => TResult): (( arg0: B, arg1: A, ...rest: Array<void>) => (arg2: C) => TResult) & (( arg0: B, arg1: A, arg2: C) => TResult);
  declare function flip<A,B,C,D,TResult>(fn: (arg0: A, arg1: B, arg2: C, arg3: D) => TResult): ((arg1: B, arg0: A, ...rest: Array<void>) => (arg2: C, arg3: D) => TResult) & ((arg1: B, arg0: A, arg2: C, arg3: D) => TResult);
  declare function flip<A,B,C,D,E,TResult>(fn: (arg0: A, arg1: B, arg2: C, arg3: D, arg4:E) => TResult): ((arg1: B, arg0: A, ...rest: Array<void>) => (arg2: C, arg3: D, arg4: E) => TResult) & ((arg1: B, arg0: A, arg2: C, arg3: D, arg4: E) => TResult);

  declare function identity<T>(x:T): T;

  declare function invoker<A,B,C,D,O:{[k:string]: Function}>(arity: number, name: $Enum<O>): CurriedFunction2<A,O,D> & CurriedFunction3<A,B,O,D> & CurriedFunction4<A,B,C,O,D>

  declare function juxt<T,S>(fns: Array<(...args: Array<S>) => T>): (...args: Array<S>) => Array<T>;

  // TODO lift

  // TODO liftN

  declare function memoize<A,B,T:(...args: Array<A>) => B>(fn:T):T;

  declare function nAry<T>(arity: number, fn:(...args: Array<any>) => T): (...args: Array<any>) => T;

  declare function nthArg<T>(n: number): (...args: Array<T>) => T;

  declare function of<T>(x: T): Array<T>;

  declare function once<A,B,T:(...args: Array<A>) => B>(fn:T):T;

  // TODO partial
  // TODO partialRight
  // TODO pipeK
  // TODO pipeP

  declare function tap<T>(fn: (x: T) => any, ...rest: Array<void>): (x: T) => T;
  declare function tap<T>(fn: (x: T) => any, x: T): T;

  // TODO tryCatch

  declare function unapply<T,V>(fn: (xs: Array<T>) => V): (...args: Array<T>) => V;

  declare function unary<T>(fn:(...args: Array<any>) => T): (x: any) => T;

  declare var uncurryN:
    & (<A, B, C>(2, A => B => C) => (A, B) => C)
    & (<A, B, C, D>(3, A => B => C => D) => (A, B, C) => D)
    & (<A, B, C, D, E>(4, A => B => C => D => E) => (A, B, C, D) => E)
    & (<A, B, C, D, E, F>(5, A => B => C => D => E => F) => (A, B, C, D, E) => F)
    & (<A, B, C, D, E, F, G>(6, A => B => C => D => E => F => G) => (A, B, C, D, E, F) => G)
    & (<A, B, C, D, E, F, G, H>(7, A => B => C => D => E => F => G => H) => (A, B, C, D, E, F, G) => H)
    & (<A, B, C, D, E, F, G, H, I>(8, A => B => C => D => E => F => G => H => I) => (A, B, C, D, E, F, G, H) => I)

  //TODO useWith

  declare function wrap<A,B,C,D,F:(...args: Array<A>) => B>(fn: F, fn2: (fn: F, ...args: Array<C>) => D): (...args: Array<A|C>) => D;

  // *Logic

  declare function allPass<T>(fns: Array<(...args: Array<T>) => boolean>): (...args: Array<T>) => boolean;

  declare function and(x: boolean, ...rest: Array<void>): (y: boolean) => boolean;
  declare function and(x: boolean, y: boolean): boolean;

  declare function anyPass<T>(fns: Array<(...args: Array<T>) => boolean>): (...args: Array<T>) => boolean;

  declare function both<T>(x: (...args: Array<T>) => boolean, ...rest: Array<void>): (y: (...args: Array<T>) => boolean) => (...args: Array<T>) => boolean;
  declare function both<T>(x: (...args: Array<T>) => boolean, y: (...args: Array<T>) => boolean): (...args: Array<T>) => boolean;

  declare function complement<T>(x: (...args: Array<T>) => boolean): (...args: Array<T>) => boolean;

  declare function cond<A,B>(fns: Array<[(...args: Array<A>) => boolean, (...args: Array<A>) => B]>): (...args: Array<A>) => B;


  declare function defaultTo<T,V>(d: T, ...rest: Array<void>): (x: ?V) => V|T;
  declare function defaultTo<T,V>(d: T, x: ?V): V|T;

  declare function either(x: (...args: Array<any>) => boolean, ...rest: Array<void>): (y: (...args: Array<any>) => boolean) => (...args: Array<any>) => boolean;
  declare function either(x: (...args: Array<any>) => boolean, y: (...args: Array<any>) => boolean): (...args: Array<any>) => boolean;

  declare function ifElse<A,B,C>(cond:(...args: Array<A>) => boolean, ...rest: Array<void>):
  ((f1: (...args: Array<A>) => B, ...rest: Array<void>) => (f2: (...args: Array<A>) => C) => (...args: Array<A>) => B|C)
  & ((f1: (...args: Array<A>) => B, f2: (...args: Array<A>) => C) => (...args: Array<A>) => B|C)
  declare function ifElse<A,B,C>(
    cond:(...args: Array<any>) => boolean,
    f1: (...args: Array<any>) => B,
    f2: (...args: Array<any>) => C
  ): (...args: Array<A>) => B|C;

  declare function isEmpty(x:?Array<any>|Object|string): boolean;

  declare function not(x:boolean): boolean;

  declare function or(x: boolean, y: boolean): boolean;
  declare function or(x: boolean): (y: boolean) => boolean;

  // TODO: pathSatisfies: Started failing in v39...
  // declare function pathSatisfies<T>(cond: (x: T) => boolean, path: Array<string>, o: NestedObject<T>): boolean;
  // declare function pathSatisfies<T>(cond: (x: T) => boolean, path: Array<string>, ...rest: Array<void>): (o: NestedObject<T>) => boolean;
  // declare function pathSatisfies<T>(cond: (x: T) => boolean, ...rest: Array<void>):
  // ((path: Array<string>, ...rest: Array<void>) => (o: NestedObject<T>) => boolean)
  // & ((path: Array<string>, o: NestedObject<T>) => boolean)

  declare function propSatisfies<T>(cond: (x: T) => boolean, prop: string, o: NestedObject<T>): boolean;
  declare function propSatisfies<T>(cond: (x: T) => boolean, prop: string, ...rest: Array<void>): (o: NestedObject<T>) => boolean;
  declare function propSatisfies<T>(cond: (x: T) => boolean, ...rest: Array<void>):
  ((prop: string, ...rest: Array<void>) => (o: NestedObject<T>) => boolean)
  & ((prop: string, o: NestedObject<T>) => boolean)

  declare function unless<T,V,S>(pred: UnaryPredicateFn<T>, ...rest: Array<void>):
  ((fn: (x: S) => V, ...rest: Array<void>) => (x: T|S) => T|V)
  & ((fn: (x: S) => V, x: T|S) => T|V);
  declare function unless<T,V,S>(pred: UnaryPredicateFn<T>, fn: (x: S) => V, ...rest: Array<void>): (x: T|S) => V|T;
  declare function unless<T,V,S>(pred: UnaryPredicateFn<T>, fn: (x: S) => V, x: T|S): T|V;

  declare function until<T>(pred: UnaryPredicateFn<T>, ...rest: Array<void>):
  ((fn: (x: T) => T, ...rest: Array<void>) => (x: T) => T)
  & ((fn: (x: T) => T, x: T) => T);
  declare function until<T>(pred: UnaryPredicateFn<T>, fn: (x: T) => T, ...rest: Array<void>): (x: T) => T;
  declare function until<T>(pred: UnaryPredicateFn<T>, fn: (x: T) => T, x: T): T;

  declare function when<T,V,S>(pred: UnaryPredicateFn<T>, ...rest: Array<void>):
  ((fn: (x: S) => V, ...rest: Array<void>) => (x: T|S) => T|V)
  & ((fn: (x: S) => V, x: T|S) => T|V);
  declare function when<T,V,S>(pred: UnaryPredicateFn<T>, fn: (x: S) => V, ...rest: Array<void>): (x: T|S) => V|T;
  declare function when<T,V,S>(pred: UnaryPredicateFn<T>, fn: (x: S) => V, x: T|S): T|V;
}
