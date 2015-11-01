var BasePlugin = require('ember-cli-deploy-plugin');
var AWS = require('aws-promised');

module.exports = {
  name: 'ember-cli-deploy-cloudformation',

  createDeployPlugin: function(options) {
    var DeployPlugin = BasePlugin.extend({
      name: options.name,
      stackParameters: options.stackParams || [],

      requiredConfig: [
      	'accessKeyId', 
      	'secretAccessKey'
      ],

      didUpload: function(context) {
        // we want to do this after uploading the assets
        var cf = AWS.cloudformation();
      }
    });

    return new DeployPlugin();
  }
};