const bcrypt = require('bcrypt');
const _ = require('underscore');

module.exports = function(sequelize, dataTypes) {
  var user =  sequelize.define('user', {
    username: {
      type: dataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 20]
      }
    },
    salt: {
      type: dataTypes.STRING
    },
    passHashed: {
      type: dataTypes.STRING
    },
    password: {
      type: dataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        len: [6, 50]
      },
      set: function(value) {
        var salt = bcrypt.genSaltSync(10);
        var hashedPass = bcrypt.hashSync(value, salt);

        this.setDataValue('password', value);
        this.setDataValue('salt', salt);
        this.setDataValue('passHashed', hashedPass);
      }
    }

  }, {
    hooks: {
        beforeValidate: function(user, options) {
          if(typeof user.username === 'string') {
            user.username = user.username.toLowerCase();
          }
        }
    },
    classMethods: {
      authhenticate: function (body) {
        return new Promise(function (resolve, reject) {
          	if(typeof body.username !== 'string' || typeof body.password !== 'string') {
          			return reject();
          	}
          	user.findOne({where: {username: body.username} }).then(function(user) {
          		if(!user || !bcrypt.compareSync(body.password, user.get('passHashed'))) {
          			return reject();
          		}
          		resolve(user);
          	}, function(e) {
          			reject();
          	});
        });
      }
    },
    instanceMethods: {
      toPublicJSON: function () {
        var json = this.toJSON();
        return _.pick(json, 'id', 'username', 'createdAt', 'updatedAt');
      }
    }
  });

  return user;
};
