import InvalidArgumentException from 'app/exception/InvalidArgumentException';
import NoEditablesFound from 'app/exception/NoEditablesFound';
import ParserException from 'app/exception/ParserException';
import PluginNotFoundException from 'app/exception/PluginNotFoundException';

describe('Unit\\Exception', function () {
    describe('InvalidArgumentException', function () {
        it('should be a throwable error', function () {
            expect(function () {
                throw new InvalidArgumentException('foo', 'bar', {});
            }).toThrowError(InvalidArgumentException);
        });
    });

    describe('NoEditablesFound', function () {
        it('should be a throwable error', function () {
            expect(function () {
                throw new NoEditablesFound();
            }).toThrowError(NoEditablesFound);
        });
    });

    describe('ParserException', function () {
        it('should be a throwable error', function () {
            expect(function () {
                throw new ParserException();
            }).toThrowError(ParserException);
        });
    });

    describe('PluginNotFoundException', function () {
        it('should be a throwable error', function () {
            expect(function () {
                throw new PluginNotFoundException('foo', '1.0');
            }).toThrowError(PluginNotFoundException);
        });
    });
});
