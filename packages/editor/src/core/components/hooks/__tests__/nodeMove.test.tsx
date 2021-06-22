import { getTargetIndexForUpAndDownMove } from '../nodeMove';
describe('getTargetIndexForUpAndDownMove', () => {
  /*
0 --> left 0f 0
    1 --> leftof 1
    2 --> rightof 2


    x x x   3

    o   o   2

    0 --> left 0f 
    1 --> rightof 3





    0 --> left f 0
    1 --> right

    x x x x

    o  o  o


    0 --> left 0f 0
    1 --> leftof 2
    2 --> rightof 3

    */

  describe('cases where target row will same amount of siblings', () => {
    it('moves first to the left', () => {
      expect(getTargetIndexForUpAndDownMove(3, 2, 0)).toEqual({
        index: 0,
        action: 'leftOf',
      });
    });

    it('moves middle to the middle', () => {
      expect(getTargetIndexForUpAndDownMove(3, 2, 1)).toEqual({
        index: 1,
        action: 'leftOf',
      });
    });
    it('moves last to the right', () => {
      expect(getTargetIndexForUpAndDownMove(3, 2, 2)).toEqual({
        index: 1,
        action: 'rightOf',
      });
    });
  });

  describe('cases where target row will have less', () => {
    it('moves first of 3 to the left', () => {
      expect(getTargetIndexForUpAndDownMove(3, 1, 0)).toEqual({
        index: 0,
        action: 'leftOf',
      });
    });

    it('moves middle of 3 to the right', () => {
      expect(getTargetIndexForUpAndDownMove(3, 1, 1)).toEqual({
        index: 0,
        action: 'rightOf',
      });
    });
    it('moves last of 3 to the right', () => {
      expect(getTargetIndexForUpAndDownMove(3, 1, 2)).toEqual({
        index: 0,
        action: 'rightOf',
      });
    });

    it('moves first of 4 to the left', () => {
      expect(getTargetIndexForUpAndDownMove(4, 1, 0)).toEqual({
        index: 0,
        action: 'leftOf',
      });
    });

    it('moves 2nd of 4 to the left', () => {
      expect(getTargetIndexForUpAndDownMove(4, 1, 1)).toEqual({
        index: 0,
        action: 'leftOf',
      });
    });
    it('moves 3rd of 4 to the right', () => {
      expect(getTargetIndexForUpAndDownMove(4, 1, 2)).toEqual({
        index: 0,
        action: 'rightOf',
      });
    });
    it('moves last of 4 to the right', () => {
      expect(getTargetIndexForUpAndDownMove(4, 1, 3)).toEqual({
        index: 0,
        action: 'rightOf',
      });
    });
  });

  describe('cases where target row will have more than current', () => {
    it('moves first of 2 to the left of 3', () => {
      expect(getTargetIndexForUpAndDownMove(2, 2, 0)).toEqual({
        index: 0,
        action: 'leftOf',
      });
    });
    it('moves last of 2 to the right of 3', () => {
      expect(getTargetIndexForUpAndDownMove(2, 2, 1)).toEqual({
        index: 1,
        action: 'rightOf',
      });
    });

    it('moves first of 2 to the left of 4', () => {
      expect(getTargetIndexForUpAndDownMove(2, 3, 0)).toEqual({
        index: 0,
        action: 'leftOf',
      });
    });
    it('moves last of 2 to the right of 4', () => {
      expect(getTargetIndexForUpAndDownMove(2, 3, 1)).toEqual({
        index: 2,
        action: 'rightOf',
      });
    });

    /*
      x  x  x
      0  0  0
      x 0 0 0
    */
    it('moves first of 3 to the left of 4', () => {
      expect(getTargetIndexForUpAndDownMove(3, 3, 0)).toEqual({
        index: 0,
        action: 'leftOf',
      });
    });

    /*
      x  x  x
      0  0  0
      0 x 0 0
    */
    it('moves 2nd of 3 to middle of 4', () => {
      expect(getTargetIndexForUpAndDownMove(3, 3, 1)).toEqual({
        index: 1,
        action: 'leftOf',
      });
    });

    /*
      x  x  x
      0  0  0
      0 0 0 x
    */
    it('moves last of 3 to last of 4', () => {
      expect(getTargetIndexForUpAndDownMove(3, 3, 2)).toEqual({
        index: 2,
        action: 'rightOf',
      });
    });

    /*
      x   x   x
      0  0  0 0
      x 0 0 0 0
    */
    it('moves first of 3 to the left of 5', () => {
      expect(getTargetIndexForUpAndDownMove(3, 4, 0)).toEqual({
        index: 0,
        action: 'leftOf',
      });
    });

    /*
      x   x   x
      0  0  0 0
      0 0 x 0 0
    */

    it('moves 2nd of 3 to middle of 5', () => {
      expect(getTargetIndexForUpAndDownMove(3, 4, 1)).toEqual({
        index: 1,
        action: 'rightOf',
      });
    });
    /*
      x   x   x
      0  0  0 0
      0 0 0 0 x
    */

    it('moves last of 3 to last of 5', () => {
      expect(getTargetIndexForUpAndDownMove(3, 4, 2)).toEqual({
        index: 3,
        action: 'rightOf',
      });
    });
  });
});
