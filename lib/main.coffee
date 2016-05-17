Makensis = require './makensis'
Config = require './config'

module.exports = NsisCore =
  subscriptions: null

  activate: (state) ->
    {CompositeDisposable} = require 'atom'

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register commands
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS:save-&-compile': => Makensis.buildScript()
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS:create-.atom–build-file': => Config.createBuildFile()
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS:set-default-runner': => Config.setRunner()
    @subscriptions.add atom.commands.add 'atom-workspace', 'NSIS:remove-default-runner': => Config.removeRunner()

  deactivate: ->
    @subscriptions.dispose()
