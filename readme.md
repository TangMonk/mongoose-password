# mongoose-password

```js
var UserSchema = new Schema({
    name: String
});
UserSchema.plugin(mongoose_password);

User.create({name: "name", password: "123"}, function(err, user){
    user.comparePassword('123').should.be.true;
})
```