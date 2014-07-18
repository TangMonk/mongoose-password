var bcrypt = require('bcrypt-nodejs');

function passwordPlugin(schema) {
    schema.add({ password: String });

    schema.pre('save', function(next) {
        if (!this.password || !this.isModified('password')) return next();

        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync());
        next();
    });

    schema.methods.comparePassword = comparePassword;
}

function comparePassword(password) {
    if (!this.password) return false;
    return bcrypt.compareSync(password, this.password);
}

module.exports = passwordPlugin;
