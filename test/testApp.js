const app = require('../app');
const assert = require('assert');

describe('App tests', function() {
    it('Running app should say it\'s working', function() {
        assert.equal('It works!', app.run());
    });
});
