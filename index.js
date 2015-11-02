var BasePlugin = require('ember-cli-deploy-plugin');
var AWS = require('aws-promised');

module.exports = {
  name: 'ember-cli-deploy-cloudformation',

  createDeployPlugin: function(options) {
    var DeployPlugin = BasePlugin.extend({
      name: options.name,
      stackName: options.stackName,
      capabilities: options.capabilities || [],
      notificationARNs: options.notificationARNs || [],
      resourceTypes: options.resourceTypes || ['AWS::*'],
      stackParameters: options.stackParams || [],

      requiredConfig: [
      	'stackName'.
      	'accessKeyId', 
      	'secretAccessKey'
      ],

      didUpload: function(context) {
        // we want to do this after uploading the assets
        var params = {
				  StackName: this.stackName, /* required */
				  Capabilities: this.capabilities,
				  NotificationARNs: this.notificationARNs,
				  Parameters: this.stackParameters,
				  ResourceTypes: this.resourceTypes,
				};
				params = params.merge(this._getPolicy(context));
				params = params.merge(this._getTemplate(context));
				var cf = AWS.cloudformation();
				return cf.updateStack(params);
      },

      _getPolicy: function(context) {
    		return {
      		StackPolicyBody: 'STRING_VALUE',
				  StackPolicyDuringUpdateBody: 'STRING_VALUE',
				  StackPolicyDuringUpdateURL: 'STRING_VALUE',
				  StackPolicyURL: 'STRING_VALUE'
				};
      },

      _getTemplate: function(context) {
    		return {
      		TemplateBody: 'STRING_VALUE',
				  TemplateURL: 'STRING_VALUE',
				  UsePreviousTemplate: false
				};
      }
    });

    return new DeployPlugin();
  }
};