"use strict";var e=require("./main-c8cb6515.js");function s(){return e.isLoadedAndActive("atom-runner")}require("path"),require("fs"),require("child_process"),require("os"),require("atom"),require("assert"),require("events"),require("buffer"),require("stream"),require("util"),exports.setRunner=function(){if(s())var e=atom.notifications.addInfo("Do you want to set `makensis` as the default runner for NSIS files?",{dismissable:!0,buttons:[{text:"Set makensis",onDidClick:function(){e.dismiss(),atom.config.set("runner.scopes.nsis","makensis -")}},{text:"Cancel",onDidClick:function(){atom.beep(),e.dismiss()}}]});else atom.beep()},exports.unsetRunner=function(){if(s())var e=atom.notifications.addWarning("Do you want to unset `makensis` as the default runner for NSIS files?",{dismissable:!0,buttons:[{text:"Unset makensis",onDidClick:function(){e.dismiss(),atom.config.unset("runner.scopes.nsis")}},{text:"Cancel",onDidClick:function(){e.dismiss(),atom.beep()}}]});else atom.beep()};
//# sourceMappingURL=runner-134cd65f.js.map