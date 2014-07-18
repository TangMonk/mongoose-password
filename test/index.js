var should = require('should');
var mongoose = require('mongoose');
var mongoose_password = require('../');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String
});
debugger;
UserSchema.plugin(mongoose_password);
var User = mongoose.model('User', UserSchema);

mongoose.connect('mongodb://localhost/mongoose_password')
mongoose.connection.on('error', function (err) {
  console.error('MongoDB error: ' + err.message);
  console.error('Make sure a mongoDB server is running and accessible by this application');
});

describe('password', function() {
    it('have password path', function(){
        UserSchema.path('password').should.not.be.undefined;
    })

    it('compare', function(done){
        User.create({name: "name", password: "123"}, function(err, user){
            if (err) done(err);
            user.comparePassword('123').should.be.true;
            done()
        })
    })
});