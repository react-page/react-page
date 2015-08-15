import DefaultPluginManagerFactory from 'app/factory/DefaultPluginManagerFactory';


describe('Integration', function () {
    describe('Factory', function () {
        describe('DefaultPluginManagerFactory', function () {
            it('should be instantiable', function() {
                expect(new DefaultPluginManagerFactory()).toBeDefined();
            });
        });
    });
});
