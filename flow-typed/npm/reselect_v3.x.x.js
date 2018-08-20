// flow-typed signature: 84ab000391e0f17dd212d57ed0b180f5
// flow-typed version: 5d8678f464/reselect_v3.x.x/flow_>=v0.47.x

type ExtractReturnType = <Return>((...rest: any[]) => Return) => Return;

declare module "reselect" {
  declare type InputSelector<-TState, TProps, TResult> =
    (state: TState, props: TProps, ...rest: any[]) => TResult

  declare type OutputSelector<-TState, TProps, TResult> =
    & InputSelector<TState, TProps, TResult>
    & {
      recomputations(): number,
      resetRecomputations(): void,
      resultFunc(state: TState, props: TProps, ...rest: Array<any>): TResult,
    };

  declare type SelectorCreator = {
    <TState, TProps, TResult, T1>(
      selector1: InputSelector<TState, TProps, T1>,
      resultFunc: (arg1: T1) => TResult
    ): OutputSelector<TState, TProps, TResult>,
    <TState, TProps, TResult, T1>(
      selectors: [InputSelector<TState, TProps, T1>],
      resultFunc: (arg1: T1) => TResult
    ): OutputSelector<TState, TProps, TResult>,

    <TState, TProps, TResult, T1, T2>(
      selector1: InputSelector<TState, TProps, T1>,
      selector2: InputSelector<TState, TProps, T2>,
      resultFunc: (arg1: T1, arg2: T2) => TResult
    ): OutputSelector<TState, TProps, TResult>,
    <TState, TProps, TResult, T1, T2>(
      selectors: [InputSelector<TState, TProps, T1>, InputSelector<TState, TProps, T2>],
      resultFunc: (arg1: T1, arg2: T2) => TResult
    ): OutputSelector<TState, TProps, TResult>,

    <TState, TProps, TResult, T1, T2, T3>(
      selector1: InputSelector<TState, TProps, T1>,
      selector2: InputSelector<TState, TProps, T2>,
      selector3: InputSelector<TState, TProps, T3>,
      resultFunc: (arg1: T1, arg2: T2, arg3: T3) => TResult
    ): OutputSelector<TState, TProps, TResult>,
    <TState, TProps, TResult, T1, T2, T3>(
      selectors: [
        InputSelector<TState, TProps, T1>,
        InputSelector<TState, TProps, T2>,
        InputSelector<TState, TProps, T3>
      ],
      resultFunc: (arg1: T1, arg2: T2, arg3: T3) => TResult
    ): OutputSelector<TState, TProps, TResult>,

    <TState, TProps, TResult, T1, T2, T3, T4>(
      selector1: InputSelector<TState, TProps, T1>,
      selector2: InputSelector<TState, TProps, T2>,
      selector3: InputSelector<TState, TProps, T3>,
      selector4: InputSelector<TState, TProps, T4>,
      resultFunc: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => TResult
    ): OutputSelector<TState, TProps, TResult>,
    <TState, TProps, TResult, T1, T2, T3, T4>(
      selectors: [
        InputSelector<TState, TProps, T1>,
        InputSelector<TState, TProps, T2>,
        InputSelector<TState, TProps, T3>,
        InputSelector<TState, TProps, T4>
      ],
      resultFunc: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => TResult
    ): OutputSelector<TState, TProps, TResult>,

    <TState, TProps, TResult, T1, T2, T3, T4, T5>(
      selector1: InputSelector<TState, TProps, T1>,
      selector2: InputSelector<TState, TProps, T2>,
      selector3: InputSelector<TState, TProps, T3>,
      selector4: InputSelector<TState, TProps, T4>,
      selector5: InputSelector<TState, TProps, T5>,
      resultFunc: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => TResult
    ): OutputSelector<TState, TProps, TResult>,
    <TState, TProps, TResult, T1, T2, T3, T4, T5>(
      selectors: [
        InputSelector<TState, TProps, T1>,
        InputSelector<TState, TProps, T2>,
        InputSelector<TState, TProps, T3>,
        InputSelector<TState, TProps, T4>,
        InputSelector<TState, TProps, T5>
      ],
      resultFunc: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => TResult
    ): OutputSelector<TState, TProps, TResult>,

    <TState, TProps, TResult, T1, T2, T3, T4, T5, T6>(
      selector1: InputSelector<TState, TProps, T1>,
      selector2: InputSelector<TState, TProps, T2>,
      selector3: InputSelector<TState, TProps, T3>,
      selector4: InputSelector<TState, TProps, T4>,
      selector5: InputSelector<TState, TProps, T5>,
      selector6: InputSelector<TState, TProps, T6>,
      resultFunc: (
        arg1: T1,
        arg2: T2,
        arg3: T3,
        arg4: T4,
        arg5: T5,
        arg6: T6
      ) => TResult
    ): OutputSelector<TState, TProps, TResult>,
    <TState, TProps, TResult, T1, T2, T3, T4, T5, T6>(
      selectors: [
        InputSelector<TState, TProps, T1>,
        InputSelector<TState, TProps, T2>,
        InputSelector<TState, TProps, T3>,
        InputSelector<TState, TProps, T4>,
        InputSelector<TState, TProps, T5>,
        InputSelector<TState, TProps, T6>
      ],
      resultFunc: (
        arg1: T1,
        arg2: T2,
        arg3: T3,
        arg4: T4,
        arg5: T5,
        arg6: T6
      ) => TResult
    ): OutputSelector<TState, TProps, TResult>,

    <TState, TProps, TResult, T1, T2, T3, T4, T5, T6, T7>(
      selector1: InputSelector<TState, TProps, T1>,
      selector2: InputSelector<TState, TProps, T2>,
      selector3: InputSelector<TState, TProps, T3>,
      selector4: InputSelector<TState, TProps, T4>,
      selector5: InputSelector<TState, TProps, T5>,
      selector6: InputSelector<TState, TProps, T6>,
      selector7: InputSelector<TState, TProps, T7>,
      resultFunc: (
        arg1: T1,
        arg2: T2,
        arg3: T3,
        arg4: T4,
        arg5: T5,
        arg6: T6,
        arg7: T7
      ) => TResult
    ): OutputSelector<TState, TProps, TResult>,
    <TState, TProps, TResult, T1, T2, T3, T4, T5, T6, T7>(
      selectors: [
        InputSelector<TState, TProps, T1>,
        InputSelector<TState, TProps, T2>,
        InputSelector<TState, TProps, T3>,
        InputSelector<TState, TProps, T4>,
        InputSelector<TState, TProps, T5>,
        InputSelector<TState, TProps, T6>,
        InputSelector<TState, TProps, T7>
      ],
      resultFunc: (
        arg1: T1,
        arg2: T2,
        arg3: T3,
        arg4: T4,
        arg5: T5,
        arg6: T6,
        arg7: T7
      ) => TResult
    ): OutputSelector<TState, TProps, TResult>,

    <TState, TProps, TResult, T1, T2, T3, T4, T5, T6, T7, T8>(
      selector1: InputSelector<TState, TProps, T1>,
      selector2: InputSelector<TState, TProps, T2>,
      selector3: InputSelector<TState, TProps, T3>,
      selector4: InputSelector<TState, TProps, T4>,
      selector5: InputSelector<TState, TProps, T5>,
      selector6: InputSelector<TState, TProps, T6>,
      selector7: InputSelector<TState, TProps, T7>,
      selector8: InputSelector<TState, TProps, T8>,
      resultFunc: (
        arg1: T1,
        arg2: T2,
        arg3: T3,
        arg4: T4,
        arg5: T5,
        arg6: T6,
        arg7: T7,
        arg8: T8
      ) => TResult
    ): OutputSelector<TState, TProps, TResult>,
    <TState, TProps, TResult, T1, T2, T3, T4, T5, T6, T7, T8>(
      selectors: [
        InputSelector<TState, TProps, T1>,
        InputSelector<TState, TProps, T2>,
        InputSelector<TState, TProps, T3>,
        InputSelector<TState, TProps, T4>,
        InputSelector<TState, TProps, T5>,
        InputSelector<TState, TProps, T6>,
        InputSelector<TState, TProps, T7>,
        InputSelector<TState, TProps, T8>
      ],
      resultFunc: (
        arg1: T1,
        arg2: T2,
        arg3: T3,
        arg4: T4,
        arg5: T5,
        arg6: T6,
        arg7: T7,
        arg8: T8
      ) => TResult
    ): OutputSelector<TState, TProps, TResult>,

    <TState, TProps, TResult, T1, T2, T3, T4, T5, T6, T7, T8, T9>(
      selector1: InputSelector<TState, TProps, T1>,
      selector2: InputSelector<TState, TProps, T2>,
      selector3: InputSelector<TState, TProps, T3>,
      selector4: InputSelector<TState, TProps, T4>,
      selector5: InputSelector<TState, TProps, T5>,
      selector6: InputSelector<TState, TProps, T6>,
      selector7: InputSelector<TState, TProps, T7>,
      selector8: InputSelector<TState, TProps, T8>,
      selector9: InputSelector<TState, TProps, T9>,
      resultFunc: (
        arg1: T1,
        arg2: T2,
        arg3: T3,
        arg4: T4,
        arg5: T5,
        arg6: T6,
        arg7: T7,
        arg8: T8,
        arg9: T9
      ) => TResult
    ): OutputSelector<TState, TProps, TResult>,
    <TState, TProps, TResult, T1, T2, T3, T4, T5, T6, T7, T8, T9>(
      selectors: [
        InputSelector<TState, TProps, T1>,
        InputSelector<TState, TProps, T2>,
        InputSelector<TState, TProps, T3>,
        InputSelector<TState, TProps, T4>,
        InputSelector<TState, TProps, T5>,
        InputSelector<TState, TProps, T6>,
        InputSelector<TState, TProps, T7>,
        InputSelector<TState, TProps, T8>,
        InputSelector<TState, TProps, T9>
      ],
      resultFunc: (
        arg1: T1,
        arg2: T2,
        arg3: T3,
        arg4: T4,
        arg5: T5,
        arg6: T6,
        arg7: T7,
        arg8: T8,
        arg9: T9
      ) => TResult
    ): OutputSelector<TState, TProps, TResult>,

    <TState, TProps, TResult, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
      selector1: InputSelector<TState, TProps, T1>,
      selector2: InputSelector<TState, TProps, T2>,
      selector3: InputSelector<TState, TProps, T3>,
      selector4: InputSelector<TState, TProps, T4>,
      selector5: InputSelector<TState, TProps, T5>,
      selector6: InputSelector<TState, TProps, T6>,
      selector7: InputSelector<TState, TProps, T7>,
      selector8: InputSelector<TState, TProps, T8>,
      selector9: InputSelector<TState, TProps, T9>,
      selector10: InputSelector<TState, TProps, T10>,
      resultFunc: (
        arg1: T1,
        arg2: T2,
        arg3: T3,
        arg4: T4,
        arg5: T5,
        arg6: T6,
        arg7: T7,
        arg8: T8,
        arg9: T9,
        arg10: T10
      ) => TResult
    ): OutputSelector<TState, TProps, TResult>,
    <TState, TProps, TResult, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
      selectors: [
        InputSelector<TState, TProps, T1>,
        InputSelector<TState, TProps, T2>,
        InputSelector<TState, TProps, T3>,
        InputSelector<TState, TProps, T4>,
        InputSelector<TState, TProps, T5>,
        InputSelector<TState, TProps, T6>,
        InputSelector<TState, TProps, T7>,
        InputSelector<TState, TProps, T8>,
        InputSelector<TState, TProps, T9>,
        InputSelector<TState, TProps, T10>
      ],
      resultFunc: (
        arg1: T1,
        arg2: T2,
        arg3: T3,
        arg4: T4,
        arg5: T5,
        arg6: T6,
        arg7: T7,
        arg8: T8,
        arg9: T9,
        arg10: T10
      ) => TResult
    ): OutputSelector<TState, TProps, TResult>,

    <TState, TProps, TResult, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(
      selector1: InputSelector<TState, TProps, T1>,
      selector2: InputSelector<TState, TProps, T2>,
      selector3: InputSelector<TState, TProps, T3>,
      selector4: InputSelector<TState, TProps, T4>,
      selector5: InputSelector<TState, TProps, T5>,
      selector6: InputSelector<TState, TProps, T6>,
      selector7: InputSelector<TState, TProps, T7>,
      selector8: InputSelector<TState, TProps, T8>,
      selector9: InputSelector<TState, TProps, T9>,
      selector10: InputSelector<TState, TProps, T10>,
      selector11: InputSelector<TState, TProps, T11>,
      resultFunc: (
        arg1: T1,
        arg2: T2,
        arg3: T3,
        arg4: T4,
        arg5: T5,
        arg6: T6,
        arg7: T7,
        arg8: T8,
        arg9: T9,
        arg10: T10,
        arg11: T11
      ) => TResult
    ): OutputSelector<TState, TProps, TResult>,
    <TState, TProps, TResult, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(
      selectors: [
        InputSelector<TState, TProps, T1>,
        InputSelector<TState, TProps, T2>,
        InputSelector<TState, TProps, T3>,
        InputSelector<TState, TProps, T4>,
        InputSelector<TState, TProps, T5>,
        InputSelector<TState, TProps, T6>,
        InputSelector<TState, TProps, T7>,
        InputSelector<TState, TProps, T8>,
        InputSelector<TState, TProps, T9>,
        InputSelector<TState, TProps, T10>,
        InputSelector<TState, TProps, T11>
      ],
      resultFunc: (
        arg1: T1,
        arg2: T2,
        arg3: T3,
        arg4: T4,
        arg5: T5,
        arg6: T6,
        arg7: T7,
        arg8: T8,
        arg9: T9,
        arg10: T10,
        arg11: T11
      ) => TResult
    ): OutputSelector<TState, TProps, TResult>,

    <
      TState,
      TProps,
      TResult,
      T1,
      T2,
      T3,
      T4,
      T5,
      T6,
      T7,
      T8,
      T9,
      T10,
      T11,
      T12
    >(
      selector1: InputSelector<TState, TProps, T1>,
      selector2: InputSelector<TState, TProps, T2>,
      selector3: InputSelector<TState, TProps, T3>,
      selector4: InputSelector<TState, TProps, T4>,
      selector5: InputSelector<TState, TProps, T5>,
      selector6: InputSelector<TState, TProps, T6>,
      selector7: InputSelector<TState, TProps, T7>,
      selector8: InputSelector<TState, TProps, T8>,
      selector9: InputSelector<TState, TProps, T9>,
      selector10: InputSelector<TState, TProps, T10>,
      selector11: InputSelector<TState, TProps, T11>,
      selector12: InputSelector<TState, TProps, T12>,
      resultFunc: (
        arg1: T1,
        arg2: T2,
        arg3: T3,
        arg4: T4,
        arg5: T5,
        arg6: T6,
        arg7: T7,
        arg8: T8,
        arg9: T9,
        arg10: T10,
        arg11: T11,
        arg12: T12
      ) => TResult
    ): OutputSelector<TState, TProps, TResult>,
    <
      TState,
      TProps,
      TResult,
      T1,
      T2,
      T3,
      T4,
      T5,
      T6,
      T7,
      T8,
      T9,
      T10,
      T11,
      T12
    >(
      selectors: [
        InputSelector<TState, TProps, T1>,
        InputSelector<TState, TProps, T2>,
        InputSelector<TState, TProps, T3>,
        InputSelector<TState, TProps, T4>,
        InputSelector<TState, TProps, T5>,
        InputSelector<TState, TProps, T6>,
        InputSelector<TState, TProps, T7>,
        InputSelector<TState, TProps, T8>,
        InputSelector<TState, TProps, T9>,
        InputSelector<TState, TProps, T10>,
        InputSelector<TState, TProps, T11>,
        InputSelector<TState, TProps, T12>
      ],
      resultFunc: (
        arg1: T1,
        arg2: T2,
        arg3: T3,
        arg4: T4,
        arg5: T5,
        arg6: T6,
        arg7: T7,
        arg8: T8,
        arg9: T9,
        arg10: T10,
        arg11: T11,
        arg12: T12
      ) => TResult
    ): OutputSelector<TState, TProps, TResult>,

    <
      TState,
      TProps,
      TResult,
      T1,
      T2,
      T3,
      T4,
      T5,
      T6,
      T7,
      T8,
      T9,
      T10,
      T11,
      T12,
      T13
    >(
      selector1: InputSelector<TState, TProps, T1>,
      selector2: InputSelector<TState, TProps, T2>,
      selector3: InputSelector<TState, TProps, T3>,
      selector4: InputSelector<TState, TProps, T4>,
      selector5: InputSelector<TState, TProps, T5>,
      selector6: InputSelector<TState, TProps, T6>,
      selector7: InputSelector<TState, TProps, T7>,
      selector8: InputSelector<TState, TProps, T8>,
      selector9: InputSelector<TState, TProps, T9>,
      selector10: InputSelector<TState, TProps, T10>,
      selector11: InputSelector<TState, TProps, T11>,
      selector12: InputSelector<TState, TProps, T12>,
      selector13: InputSelector<TState, TProps, T13>,
      resultFunc: (
        arg1: T1,
        arg2: T2,
        arg3: T3,
        arg4: T4,
        arg5: T5,
        arg6: T6,
        arg7: T7,
        arg8: T8,
        arg9: T9,
        arg10: T10,
        arg11: T11,
        arg12: T12,
        arg13: T13
      ) => TResult
    ): OutputSelector<TState, TProps, TResult>,
    <
      TState,
      TProps,
      TResult,
      T1,
      T2,
      T3,
      T4,
      T5,
      T6,
      T7,
      T8,
      T9,
      T10,
      T11,
      T12,
      T13
    >(
      selectors: [
        InputSelector<TState, TProps, T1>,
        InputSelector<TState, TProps, T2>,
        InputSelector<TState, TProps, T3>,
        InputSelector<TState, TProps, T4>,
        InputSelector<TState, TProps, T5>,
        InputSelector<TState, TProps, T6>,
        InputSelector<TState, TProps, T7>,
        InputSelector<TState, TProps, T8>,
        InputSelector<TState, TProps, T9>,
        InputSelector<TState, TProps, T10>,
        InputSelector<TState, TProps, T11>,
        InputSelector<TState, TProps, T12>,
        InputSelector<TState, TProps, T13>
      ],
      resultFunc: (
        arg1: T1,
        arg2: T2,
        arg3: T3,
        arg4: T4,
        arg5: T5,
        arg6: T6,
        arg7: T7,
        arg8: T8,
        arg9: T9,
        arg10: T10,
        arg11: T11,
        arg12: T12,
        arg13: T13
      ) => TResult
    ): OutputSelector<TState, TProps, TResult>,

    <
      TState,
      TProps,
      TResult,
      T1,
      T2,
      T3,
      T4,
      T5,
      T6,
      T7,
      T8,
      T9,
      T10,
      T11,
      T12,
      T13,
      T14
    >(
      selector1: InputSelector<TState, TProps, T1>,
      selector2: InputSelector<TState, TProps, T2>,
      selector3: InputSelector<TState, TProps, T3>,
      selector4: InputSelector<TState, TProps, T4>,
      selector5: InputSelector<TState, TProps, T5>,
      selector6: InputSelector<TState, TProps, T6>,
      selector7: InputSelector<TState, TProps, T7>,
      selector8: InputSelector<TState, TProps, T8>,
      selector9: InputSelector<TState, TProps, T9>,
      selector10: InputSelector<TState, TProps, T10>,
      selector11: InputSelector<TState, TProps, T11>,
      selector12: InputSelector<TState, TProps, T12>,
      selector13: InputSelector<TState, TProps, T13>,
      selector14: InputSelector<TState, TProps, T14>,
      resultFunc: (
        arg1: T1,
        arg2: T2,
        arg3: T3,
        arg4: T4,
        arg5: T5,
        arg6: T6,
        arg7: T7,
        arg8: T8,
        arg9: T9,
        arg10: T10,
        arg11: T11,
        arg12: T12,
        arg13: T13,
        arg14: T14
      ) => TResult
    ): OutputSelector<TState, TProps, TResult>,
    <
      TState,
      TProps,
      TResult,
      T1,
      T2,
      T3,
      T4,
      T5,
      T6,
      T7,
      T8,
      T9,
      T10,
      T11,
      T12,
      T13,
      T14
    >(
      selectors: [
        InputSelector<TState, TProps, T1>,
        InputSelector<TState, TProps, T2>,
        InputSelector<TState, TProps, T3>,
        InputSelector<TState, TProps, T4>,
        InputSelector<TState, TProps, T5>,
        InputSelector<TState, TProps, T6>,
        InputSelector<TState, TProps, T7>,
        InputSelector<TState, TProps, T8>,
        InputSelector<TState, TProps, T9>,
        InputSelector<TState, TProps, T10>,
        InputSelector<TState, TProps, T11>,
        InputSelector<TState, TProps, T12>,
        InputSelector<TState, TProps, T13>,
        InputSelector<TState, TProps, T14>
      ],
      resultFunc: (
        arg1: T1,
        arg2: T2,
        arg3: T3,
        arg4: T4,
        arg5: T5,
        arg6: T6,
        arg7: T7,
        arg8: T8,
        arg9: T9,
        arg10: T10,
        arg11: T11,
        arg12: T12,
        arg13: T13,
        arg14: T14
      ) => TResult
    ): OutputSelector<TState, TProps, TResult>,

    <
      TState,
      TProps,
      TResult,
      T1,
      T2,
      T3,
      T4,
      T5,
      T6,
      T7,
      T8,
      T9,
      T10,
      T11,
      T12,
      T13,
      T14,
      T15
    >(
      selector1: InputSelector<TState, TProps, T1>,
      selector2: InputSelector<TState, TProps, T2>,
      selector3: InputSelector<TState, TProps, T3>,
      selector4: InputSelector<TState, TProps, T4>,
      selector5: InputSelector<TState, TProps, T5>,
      selector6: InputSelector<TState, TProps, T6>,
      selector7: InputSelector<TState, TProps, T7>,
      selector8: InputSelector<TState, TProps, T8>,
      selector9: InputSelector<TState, TProps, T9>,
      selector10: InputSelector<TState, TProps, T10>,
      selector11: InputSelector<TState, TProps, T11>,
      selector12: InputSelector<TState, TProps, T12>,
      selector13: InputSelector<TState, TProps, T13>,
      selector14: InputSelector<TState, TProps, T14>,
      selector15: InputSelector<TState, TProps, T15>,
      resultFunc: (
        arg1: T1,
        arg2: T2,
        arg3: T3,
        arg4: T4,
        arg5: T5,
        arg6: T6,
        arg7: T7,
        arg8: T8,
        arg9: T9,
        arg10: T10,
        arg11: T11,
        arg12: T12,
        arg13: T13,
        arg14: T14,
        arg15: T15
      ) => TResult
    ): OutputSelector<TState, TProps, TResult>,
    <
      TState,
      TProps,
      TResult,
      T1,
      T2,
      T3,
      T4,
      T5,
      T6,
      T7,
      T8,
      T9,
      T10,
      T11,
      T12,
      T13,
      T14,
      T15
    >(
      selectors: [
        InputSelector<TState, TProps, T1>,
        InputSelector<TState, TProps, T2>,
        InputSelector<TState, TProps, T3>,
        InputSelector<TState, TProps, T4>,
        InputSelector<TState, TProps, T5>,
        InputSelector<TState, TProps, T6>,
        InputSelector<TState, TProps, T7>,
        InputSelector<TState, TProps, T8>,
        InputSelector<TState, TProps, T9>,
        InputSelector<TState, TProps, T10>,
        InputSelector<TState, TProps, T11>,
        InputSelector<TState, TProps, T12>,
        InputSelector<TState, TProps, T13>,
        InputSelector<TState, TProps, T14>,
        InputSelector<TState, TProps, T15>
      ],
      resultFunc: (
        arg1: T1,
        arg2: T2,
        arg3: T3,
        arg4: T4,
        arg5: T5,
        arg6: T6,
        arg7: T7,
        arg8: T8,
        arg9: T9,
        arg10: T10,
        arg11: T11,
        arg12: T12,
        arg13: T13,
        arg14: T14,
        arg15: T15
      ) => TResult
    ): OutputSelector<TState, TProps, TResult>,

    <
      TState,
      TProps,
      TResult,
      T1,
      T2,
      T3,
      T4,
      T5,
      T6,
      T7,
      T8,
      T9,
      T10,
      T11,
      T12,
      T13,
      T14,
      T15,
      T16
    >(
      selector1: InputSelector<TState, TProps, T1>,
      selector2: InputSelector<TState, TProps, T2>,
      selector3: InputSelector<TState, TProps, T3>,
      selector4: InputSelector<TState, TProps, T4>,
      selector5: InputSelector<TState, TProps, T5>,
      selector6: InputSelector<TState, TProps, T6>,
      selector7: InputSelector<TState, TProps, T7>,
      selector8: InputSelector<TState, TProps, T8>,
      selector9: InputSelector<TState, TProps, T9>,
      selector10: InputSelector<TState, TProps, T10>,
      selector11: InputSelector<TState, TProps, T11>,
      selector12: InputSelector<TState, TProps, T12>,
      selector13: InputSelector<TState, TProps, T13>,
      selector14: InputSelector<TState, TProps, T14>,
      selector15: InputSelector<TState, TProps, T15>,
      selector16: InputSelector<TState, TProps, T16>,
      resultFunc: (
        arg1: T1,
        arg2: T2,
        arg3: T3,
        arg4: T4,
        arg5: T5,
        arg6: T6,
        arg7: T7,
        arg8: T8,
        arg9: T9,
        arg10: T10,
        arg11: T11,
        arg12: T12,
        arg13: T13,
        arg14: T14,
        arg15: T15,
        arg16: T16
      ) => TResult
    ): OutputSelector<TState, TProps, TResult>,
    <
      TState,
      TProps,
      TResult,
      T1,
      T2,
      T3,
      T4,
      T5,
      T6,
      T7,
      T8,
      T9,
      T10,
      T11,
      T12,
      T13,
      T14,
      T15,
      T16
    >(
      selectors: [
        InputSelector<TState, TProps, T1>,
        InputSelector<TState, TProps, T2>,
        InputSelector<TState, TProps, T3>,
        InputSelector<TState, TProps, T4>,
        InputSelector<TState, TProps, T5>,
        InputSelector<TState, TProps, T6>,
        InputSelector<TState, TProps, T7>,
        InputSelector<TState, TProps, T8>,
        InputSelector<TState, TProps, T9>,
        InputSelector<TState, TProps, T10>,
        InputSelector<TState, TProps, T11>,
        InputSelector<TState, TProps, T12>,
        InputSelector<TState, TProps, T13>,
        InputSelector<TState, TProps, T14>,
        InputSelector<TState, TProps, T15>,
        InputSelector<TState, TProps, T16>
      ],
      resultFunc: (
        arg1: T1,
        arg2: T2,
        arg3: T3,
        arg4: T4,
        arg5: T5,
        arg6: T6,
        arg7: T7,
        arg8: T8,
        arg9: T9,
        arg10: T10,
        arg11: T11,
        arg12: T12,
        arg13: T13,
        arg14: T14,
        arg15: T15,
        arg16: T16
      ) => TResult
    ): OutputSelector<TState, TProps, TResult>
  };

  declare type Reselect = {
    createSelector: SelectorCreator,

    defaultMemoize: <TFunc: Function>(
      func: TFunc,
      equalityCheck?: (a: any, b: any) => boolean
    ) => TFunc,

    createSelectorCreator: (
      memoize: Function,
      ...memoizeOptions: any[]
    ) => SelectorCreator,

    createStructuredSelector: <TState, TProps, InputSelectors: {[k: string | number]: InputSelector<TState, TProps, any>}>(
      inputSelectors: InputSelectors,
      selectorCreator?: SelectorCreator
    ) => OutputSelector<TState, TProps, $ObjMap<InputSelectors, ExtractReturnType>>
  };

  declare module.exports: Reselect;
}
