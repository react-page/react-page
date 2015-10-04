import timeout from 'app/pkg/timeout';

describe('Unit\\pkg\\timeout', function () {
            var called = false;

            beforeEach(function (done) {
                timeout.setTimeout(() => {
                    called = true;
                    done();
                }, 1);
            });

            it('should properly use the browsers timeout function', function () {
                expect(called).toBe(true);
            })
});
