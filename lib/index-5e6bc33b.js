"use strict";var e=require("./main-390b0dc7.js"),t=require("path"),n=require("child_process"),r=require("./index-2fd4e130.js"),o=require("fs"),i=require("os"),s=require("assert"),a=require("events"),c=require("buffer"),d=require("stream"),l=require("util");function u(e,t){return t.forEach((function(t){t&&"string"!=typeof t&&!Array.isArray(t)&&Object.keys(t).forEach((function(n){if("default"!==n&&!(n in e)){var r=Object.getOwnPropertyDescriptor(t,n);Object.defineProperty(e,n,r.get?r:{enumerable:!0,get:function(){return t[n]}})}}))})),Object.freeze(e)}var p={exports:{}},m={exports:{}};const f="win32"===process.platform||"cygwin"===process.env.OSTYPE||"msys"===process.env.OSTYPE,g=t,x=f?";":":",h=r.isexe_1,y=e=>Object.assign(new Error(`not found: ${e}`),{code:"ENOENT"}),b=(e,t)=>{const n=t.colon||x,r=e.match(/\//)||f&&e.match(/\\/)?[""]:[...f?[process.cwd()]:[],...(t.path||process.env.PATH||"").split(n)],o=f?t.pathExt||process.env.PATHEXT||".EXE;.CMD;.BAT;.COM":"",i=f?o.split(n):[""];return f&&-1!==e.indexOf(".")&&""!==i[0]&&i.unshift(""),{pathEnv:r,pathExt:i,pathExtExe:o}},v=(e,t,n)=>{"function"==typeof t&&(n=t,t={}),t||(t={});const{pathEnv:r,pathExt:o,pathExtExe:i}=b(e,t),s=[],a=n=>new Promise(((o,i)=>{if(n===r.length)return t.all&&s.length?o(s):i(y(e));const a=r[n],d=/^".*"$/.test(a)?a.slice(1,-1):a,l=g.join(d,e),u=!d&&/^\.[\\\/]/.test(e)?e.slice(0,2)+l:l;o(c(u,n,0))})),c=(e,n,r)=>new Promise(((d,l)=>{if(r===o.length)return d(a(n+1));const u=o[r];h(e+u,{pathExt:i},((o,i)=>{if(!o&&i){if(!t.all)return d(e+u);s.push(e+u)}return d(c(e,n,r+1))}))}));return n?a(0).then((e=>n(null,e)),n):a(0)};var S=v;v.sync=(e,t)=>{t=t||{};const{pathEnv:n,pathExt:r,pathExtExe:o}=b(e,t),i=[];for(let s=0;s<n.length;s++){const a=n[s],c=/^".*"$/.test(a)?a.slice(1,-1):a,d=g.join(c,e),l=!c&&/^\.[\\\/]/.test(e)?e.slice(0,2)+d:d;for(let e=0;e<r.length;e++){const n=l+r[e];try{if(h.sync(n,{pathExt:o})){if(!t.all)return n;i.push(n)}}catch(e){}}}if(t.all&&i.length)return i;if(t.nothrow)return null;throw y(e)};var w={exports:{}};const E=(e={})=>{const t=e.env||process.env;return"win32"!==(e.platform||process.platform)?"PATH":Object.keys(t).reverse().find((e=>"PATH"===e.toUpperCase()))||"Path"};w.exports=E,w.exports.default=E;var I=w.exports;const T=t,G=S,C=I;function P(e,t){const n=e.options.env||process.env,r=process.cwd(),o=null!=e.options.cwd,i=o&&void 0!==process.chdir&&!process.chdir.disabled;if(i)try{process.chdir(e.options.cwd)}catch(e){}let s;try{s=G.sync(e.command,{path:n[C({env:n})],pathExt:t?T.delimiter:void 0})}catch(e){}finally{i&&process.chdir(r)}return s&&(s=T.resolve(o?e.options.cwd:"",s)),s}var O=function(e){return P(e)||P(e,!0)},A={};const j=/([()\][%!^"`<>&|;, *?])/g;A.command=function(e){return e=e.replace(j,"^$1")},A.argument=function(e,t){return e=(e=`"${e=(e=(e=`${e}`).replace(/(\\*)"/g,'$1$1\\"')).replace(/(\\*)$/,"$1$1")}"`).replace(j,"^$1"),t&&(e=e.replace(j,"^$1")),e};const $=/^#!(.*)/;const _=o,R=(e="")=>{const t=e.match($);if(!t)return null;const[n,r]=t[0].replace(/#! ?/,"").split(" "),o=n.split("/").pop();return"env"===o?r:r?`${o} ${r}`:o};var B=function(e){const t=Buffer.alloc(150);let n;try{n=_.openSync(e,"r"),_.readSync(n,t,0,150,0),_.closeSync(n)}catch(e){}return R(t.toString())};const L=t,N=O,k=A,M=B,U="win32"===process.platform,D=/\.(?:com|exe)$/i,F=/node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;function q(e){if(!U)return e;const t=function(e){e.file=N(e);const t=e.file&&M(e.file);return t?(e.args.unshift(e.file),e.command=t,N(e)):e.file}(e),n=!D.test(t);if(e.options.forceShell||n){const n=F.test(t);e.command=L.normalize(e.command),e.command=k.command(e.command),e.args=e.args.map((e=>k.argument(e,n)));const r=[e.command].concat(e.args).join(" ");e.args=["/d","/s","/c",`"${r}"`],e.command=process.env.comspec||"cmd.exe",e.options.windowsVerbatimArguments=!0}return e}var H=function(e,t,n){t&&!Array.isArray(t)&&(n=t,t=null);const r={command:e,args:t=t?t.slice(0):[],options:n=Object.assign({},n),file:void 0,original:{command:e,args:t}};return n.shell?r:q(r)};const K="win32"===process.platform;function X(e,t){return Object.assign(new Error(`${t} ${e.command} ENOENT`),{code:"ENOENT",errno:"ENOENT",syscall:`${t} ${e.command}`,path:e.command,spawnargs:e.args})}function V(e,t){return K&&1===e&&!t.file?X(t.original,"spawn"):null}var W={hookChildProcess:function(e,t){if(!K)return;const n=e.emit;e.emit=function(r,o){if("exit"===r){const r=V(o,t);if(r)return n.call(e,"error",r)}return n.apply(e,arguments)}},verifyENOENT:V,verifyENOENTSync:function(e,t){return K&&1===e&&!t.file?X(t.original,"spawnSync"):null},notFoundError:X};const Y=n,z=H,Z=W;function Q(e,t,n){const r=z(e,t,n),o=Y.spawn(r.command,r.args,r.options);return Z.hookChildProcess(o,r),o}m.exports=Q,m.exports.spawn=Q,m.exports.sync=function(e,t,n){const r=z(e,t,n),o=Y.spawnSync(r.command,r.args,r.options);return o.error=o.error||Z.verifyENOENTSync(o.status,r),o},m.exports._parse=z,m.exports._enoent=Z;var J=m.exports,ee={exports:{}};!function(e){const n=t,r=I,o=e=>{let t;e={cwd:process.cwd(),path:process.env[r()],execPath:process.execPath,...e};let o=n.resolve(e.cwd);const i=[];for(;t!==o;)i.push(n.join(o,"node_modules/.bin")),t=o,o=n.resolve(o,"..");const s=n.resolve(e.cwd,e.execPath,"..");return i.push(s),i.concat(e.path).join(n.delimiter)};e.exports=o,e.exports.default=o,e.exports.env=t=>{const n={...(t={env:process.env,...t}).env},o=r({env:n});return t.path=n[o],n[o]=e.exports(t),n}}(ee);var te=ee.exports,ne={exports:{}},re={exports:{}};const oe=(e,t)=>{for(const n of Reflect.ownKeys(t))Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n));return e};re.exports=oe,re.exports.default=oe;const ie=re.exports,se=new WeakMap,ae=(e,t={})=>{if("function"!=typeof e)throw new TypeError("Expected a function");let n,r=0;const o=e.displayName||e.name||"<anonymous>",i=function(...s){if(se.set(i,++r),1===r)n=e.apply(this,s),e=null;else if(!0===t.throw)throw new Error(`Function \`${o}\` can only be called once`);return n};return ie(i,e),se.set(i,r),i};ne.exports=ae,ne.exports.default=ae,ne.exports.callCount=e=>{if(!se.has(e))throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);return se.get(e)};var ce=ne.exports,de={},le={},ue={};Object.defineProperty(ue,"__esModule",{value:!0}),ue.SIGNALS=void 0;ue.SIGNALS=[{name:"SIGHUP",number:1,action:"terminate",description:"Terminal closed",standard:"posix"},{name:"SIGINT",number:2,action:"terminate",description:"User interruption with CTRL-C",standard:"ansi"},{name:"SIGQUIT",number:3,action:"core",description:"User interruption with CTRL-\\",standard:"posix"},{name:"SIGILL",number:4,action:"core",description:"Invalid machine instruction",standard:"ansi"},{name:"SIGTRAP",number:5,action:"core",description:"Debugger breakpoint",standard:"posix"},{name:"SIGABRT",number:6,action:"core",description:"Aborted",standard:"ansi"},{name:"SIGIOT",number:6,action:"core",description:"Aborted",standard:"bsd"},{name:"SIGBUS",number:7,action:"core",description:"Bus error due to misaligned, non-existing address or paging error",standard:"bsd"},{name:"SIGEMT",number:7,action:"terminate",description:"Command should be emulated but is not implemented",standard:"other"},{name:"SIGFPE",number:8,action:"core",description:"Floating point arithmetic error",standard:"ansi"},{name:"SIGKILL",number:9,action:"terminate",description:"Forced termination",standard:"posix",forced:!0},{name:"SIGUSR1",number:10,action:"terminate",description:"Application-specific signal",standard:"posix"},{name:"SIGSEGV",number:11,action:"core",description:"Segmentation fault",standard:"ansi"},{name:"SIGUSR2",number:12,action:"terminate",description:"Application-specific signal",standard:"posix"},{name:"SIGPIPE",number:13,action:"terminate",description:"Broken pipe or socket",standard:"posix"},{name:"SIGALRM",number:14,action:"terminate",description:"Timeout or timer",standard:"posix"},{name:"SIGTERM",number:15,action:"terminate",description:"Termination",standard:"ansi"},{name:"SIGSTKFLT",number:16,action:"terminate",description:"Stack is empty or overflowed",standard:"other"},{name:"SIGCHLD",number:17,action:"ignore",description:"Child process terminated, paused or unpaused",standard:"posix"},{name:"SIGCLD",number:17,action:"ignore",description:"Child process terminated, paused or unpaused",standard:"other"},{name:"SIGCONT",number:18,action:"unpause",description:"Unpaused",standard:"posix",forced:!0},{name:"SIGSTOP",number:19,action:"pause",description:"Paused",standard:"posix",forced:!0},{name:"SIGTSTP",number:20,action:"pause",description:'Paused using CTRL-Z or "suspend"',standard:"posix"},{name:"SIGTTIN",number:21,action:"pause",description:"Background process cannot read terminal input",standard:"posix"},{name:"SIGBREAK",number:21,action:"terminate",description:"User interruption with CTRL-BREAK",standard:"other"},{name:"SIGTTOU",number:22,action:"pause",description:"Background process cannot write to terminal output",standard:"posix"},{name:"SIGURG",number:23,action:"ignore",description:"Socket received out-of-band data",standard:"bsd"},{name:"SIGXCPU",number:24,action:"core",description:"Process timed out",standard:"bsd"},{name:"SIGXFSZ",number:25,action:"core",description:"File too big",standard:"bsd"},{name:"SIGVTALRM",number:26,action:"terminate",description:"Timeout or timer",standard:"bsd"},{name:"SIGPROF",number:27,action:"terminate",description:"Timeout or timer",standard:"bsd"},{name:"SIGWINCH",number:28,action:"ignore",description:"Terminal window size changed",standard:"bsd"},{name:"SIGIO",number:29,action:"terminate",description:"I/O is available",standard:"other"},{name:"SIGPOLL",number:29,action:"terminate",description:"Watched event",standard:"other"},{name:"SIGINFO",number:29,action:"ignore",description:"Request for process information",standard:"other"},{name:"SIGPWR",number:30,action:"terminate",description:"Device running out of power",standard:"systemv"},{name:"SIGSYS",number:31,action:"core",description:"Invalid system call",standard:"other"},{name:"SIGUNUSED",number:31,action:"terminate",description:"Invalid system call",standard:"other"}];var pe={};Object.defineProperty(pe,"__esModule",{value:!0}),pe.SIGRTMAX=pe.getRealtimeSignals=void 0;pe.getRealtimeSignals=function(){const e=ge-fe+1;return Array.from({length:e},me)};const me=function(e,t){return{name:`SIGRT${t+1}`,number:fe+t,action:"terminate",description:"Application-specific signal (realtime)",standard:"posix"}},fe=34,ge=64;pe.SIGRTMAX=ge,Object.defineProperty(le,"__esModule",{value:!0}),le.getSignals=void 0;var xe=i,he=ue,ye=pe;le.getSignals=function(){const e=(0,ye.getRealtimeSignals)();return[...he.SIGNALS,...e].map(be)};const be=function({name:e,number:t,description:n,action:r,forced:o=!1,standard:i}){const{signals:{[e]:s}}=xe.constants,a=void 0!==s;return{name:e,number:a?s:t,description:n,supported:a,action:r,forced:o,standard:i}};Object.defineProperty(de,"__esModule",{value:!0}),de.signalsByNumber=de.signalsByName=void 0;var ve=i,Se=le,we=pe;const Ee=function(e,{name:t,number:n,description:r,supported:o,action:i,forced:s,standard:a}){return{...e,[t]:{name:t,number:n,description:r,supported:o,action:i,forced:s,standard:a}}},Ie=(0,Se.getSignals)().reduce(Ee,{});de.signalsByName=Ie;const Te=function(e,t){const n=Ge(e,t);if(void 0===n)return{};const{name:r,description:o,supported:i,action:s,forced:a,standard:c}=n;return{[e]:{name:r,number:e,description:o,supported:i,action:s,forced:a,standard:c}}},Ge=function(e,t){const n=t.find((({name:t})=>ve.constants.signals[t]===e));return void 0!==n?n:t.find((t=>t.number===e))},Ce=function(){const e=(0,Se.getSignals)(),t=we.SIGRTMAX+1,n=Array.from({length:t},((t,n)=>Te(n,e)));return Object.assign({},...n)}();de.signalsByNumber=Ce;const{signalsByName:Pe}=de;var Oe=({stdout:e,stderr:t,all:n,error:r,signal:o,exitCode:i,command:s,escapedCommand:a,timedOut:c,isCanceled:d,killed:l,parsed:{options:{timeout:u}}})=>{i=null===i?void 0:i;const p=void 0===(o=null===o?void 0:o)?void 0:Pe[o].description,m=(({timedOut:e,timeout:t,errorCode:n,signal:r,signalDescription:o,exitCode:i,isCanceled:s})=>e?`timed out after ${t} milliseconds`:s?"was canceled":void 0!==n?`failed with ${n}`:void 0!==r?`was killed with ${r} (${o})`:void 0!==i?`failed with exit code ${i}`:"failed")({timedOut:c,timeout:u,errorCode:r&&r.code,signal:o,signalDescription:p,exitCode:i,isCanceled:d}),f=`Command ${m}: ${s}`,g="[object Error]"===Object.prototype.toString.call(r),x=g?`${f}\n${r.message}`:f,h=[x,t,e].filter(Boolean).join("\n");return g?(r.originalMessage=r.message,r.message=h):r=new Error(h),r.shortMessage=x,r.command=s,r.escapedCommand=a,r.exitCode=i,r.signal=o,r.signalDescription=p,r.stdout=e,r.stderr=t,void 0!==n&&(r.all=n),"bufferedData"in r&&delete r.bufferedData,r.failed=!0,r.timedOut=Boolean(c),r.isCanceled=d,r.killed=l&&!c,r},Ae={exports:{}};const je=["stdin","stdout","stderr"],$e=e=>{if(!e)return;const{stdio:t}=e;if(void 0===t)return je.map((t=>e[t]));if((e=>je.some((t=>void 0!==e[t])))(e))throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${je.map((e=>`\`${e}\``)).join(", ")}`);if("string"==typeof t)return t;if(!Array.isArray(t))throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof t}\``);const n=Math.max(t.length,je.length);return Array.from({length:n},((e,n)=>t[n]))};Ae.exports=$e,Ae.exports.node=e=>{const t=$e(e);return"ipc"===t?"ipc":void 0===t||"string"==typeof t?[t,t,t,"ipc"]:t.includes("ipc")?t:[...t,"ipc"]};var _e,Re=Ae.exports,Be={exports:{}},Le={exports:{}};var Ne=e.commonjsGlobal.process;const ke=function(e){return e&&"object"==typeof e&&"function"==typeof e.removeListener&&"function"==typeof e.emit&&"function"==typeof e.reallyExit&&"function"==typeof e.listeners&&"function"==typeof e.kill&&"number"==typeof e.pid&&"function"==typeof e.on};if(ke(Ne)){var Me,Ue=s,De=(_e||(_e=1,(Je=Le).exports=["SIGABRT","SIGALRM","SIGHUP","SIGINT","SIGTERM"],"win32"!==process.platform&&Je.exports.push("SIGVTALRM","SIGXCPU","SIGXFSZ","SIGUSR2","SIGTRAP","SIGSYS","SIGQUIT","SIGIOT"),"linux"===process.platform&&Je.exports.push("SIGIO","SIGPOLL","SIGPWR","SIGSTKFLT","SIGUNUSED")),Le.exports),Fe=/^win/i.test(Ne.platform),qe=a;"function"!=typeof qe&&(qe=qe.EventEmitter),Ne.__signal_exit_emitter__?Me=Ne.__signal_exit_emitter__:((Me=Ne.__signal_exit_emitter__=new qe).count=0,Me.emitted={}),Me.infinite||(Me.setMaxListeners(1/0),Me.infinite=!0),Be.exports=function(t,n){if(!ke(e.commonjsGlobal.process))return function(){};Ue.equal(typeof t,"function","a callback must be provided for exit handler"),!1===Ve&&We();var r="exit";n&&n.alwaysLast&&(r="afterexit");return Me.on(r,t),function(){Me.removeListener(r,t),0===Me.listeners("exit").length&&0===Me.listeners("afterexit").length&&He()}};var He=function(){Ve&&ke(e.commonjsGlobal.process)&&(Ve=!1,De.forEach((function(e){try{Ne.removeListener(e,Xe[e])}catch(e){}})),Ne.emit=Ze,Ne.reallyExit=Ye,Me.count-=1)};Be.exports.unload=He;var Ke=function(e,t,n){Me.emitted[e]||(Me.emitted[e]=!0,Me.emit(e,t,n))},Xe={};De.forEach((function(t){Xe[t]=function(){ke(e.commonjsGlobal.process)&&(Ne.listeners(t).length===Me.count&&(He(),Ke("exit",null,t),Ke("afterexit",null,t),Fe&&"SIGHUP"===t&&(t="SIGINT"),Ne.kill(Ne.pid,t)))}})),Be.exports.signals=function(){return De};var Ve=!1,We=function(){!Ve&&ke(e.commonjsGlobal.process)&&(Ve=!0,Me.count+=1,De=De.filter((function(e){try{return Ne.on(e,Xe[e]),!0}catch(e){return!1}})),Ne.emit=Qe,Ne.reallyExit=ze)};Be.exports.load=We;var Ye=Ne.reallyExit,ze=function(t){ke(e.commonjsGlobal.process)&&(Ne.exitCode=t||0,Ke("exit",Ne.exitCode,null),Ke("afterexit",Ne.exitCode,null),Ye.call(Ne,Ne.exitCode))},Ze=Ne.emit,Qe=function(t,n){if("exit"===t&&ke(e.commonjsGlobal.process)){void 0!==n&&(Ne.exitCode=n);var r=Ze.apply(this,arguments);return Ke("exit",Ne.exitCode,null),Ke("afterexit",Ne.exitCode,null),r}return Ze.apply(this,arguments)}}else Be.exports=function(){return function(){}};var Je,et=Be.exports;const tt=i,nt=et,rt=(e,t,n,r)=>{if(!ot(t,n,r))return;const o=st(n),i=setTimeout((()=>{e("SIGKILL")}),o);i.unref&&i.unref()},ot=(e,{forceKillAfterTimeout:t},n)=>it(e)&&!1!==t&&n,it=e=>e===tt.constants.signals.SIGTERM||"string"==typeof e&&"SIGTERM"===e.toUpperCase(),st=({forceKillAfterTimeout:e=!0})=>{if(!0===e)return 5e3;if(!Number.isFinite(e)||e<0)throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);return e};var at={spawnedKill:(e,t="SIGTERM",n={})=>{const r=e(t);return rt(e,t,n,r),r},spawnedCancel:(e,t)=>{e.kill()&&(t.isCanceled=!0)},setupTimeout:(e,{timeout:t,killSignal:n="SIGTERM"},r)=>{if(0===t||void 0===t)return r;let o;const i=new Promise(((r,i)=>{o=setTimeout((()=>{((e,t,n)=>{e.kill(t),n(Object.assign(new Error("Timed out"),{timedOut:!0,signal:t}))})(e,n,i)}),t)})),s=r.finally((()=>{clearTimeout(o)}));return Promise.race([i,s])},validateTimeout:({timeout:e})=>{if(void 0!==e&&(!Number.isFinite(e)||e<0))throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`)},setExitHandler:async(e,{cleanup:t,detached:n},r)=>{if(!t||n)return r;const o=nt((()=>{e.kill()}));return r.finally((()=>{o()}))}};const ct=e=>null!==e&&"object"==typeof e&&"function"==typeof e.pipe;ct.writable=e=>ct(e)&&!1!==e.writable&&"function"==typeof e._write&&"object"==typeof e._writableState,ct.readable=e=>ct(e)&&!1!==e.readable&&"function"==typeof e._read&&"object"==typeof e._readableState,ct.duplex=e=>ct.writable(e)&&ct.readable(e),ct.transform=e=>ct.duplex(e)&&"function"==typeof e._transform;var dt=ct,lt={exports:{}};const{PassThrough:ut}=d;const{constants:pt}=c,mt=d,{promisify:ft}=l,gt=e=>{e={...e};const{array:t}=e;let{encoding:n}=e;const r="buffer"===n;let o=!1;t?o=!(n||r):n=n||"utf8",r&&(n=null);const i=new ut({objectMode:o});n&&i.setEncoding(n);let s=0;const a=[];return i.on("data",(e=>{a.push(e),o?s=a.length:s+=e.length})),i.getBufferedValue=()=>t?a:r?Buffer.concat(a,s):a.join(""),i.getBufferedLength=()=>s,i},xt=ft(mt.pipeline);class ht extends Error{constructor(){super("maxBuffer exceeded"),this.name="MaxBufferError"}}async function yt(e,t){if(!e)throw new Error("Expected a stream");t={maxBuffer:1/0,...t};const{maxBuffer:n}=t,r=gt(t);return await new Promise(((t,o)=>{const i=e=>{e&&r.getBufferedLength()<=pt.MAX_LENGTH&&(e.bufferedData=r.getBufferedValue()),o(e)};(async()=>{try{await xt(e,r),t()}catch(e){i(e)}})(),r.on("data",(()=>{r.getBufferedLength()>n&&i(new ht)}))})),r.getBufferedValue()}lt.exports=yt,lt.exports.buffer=(e,t)=>yt(e,{...t,encoding:"buffer"}),lt.exports.array=(e,t)=>yt(e,{...t,array:!0}),lt.exports.MaxBufferError=ht;var bt=lt.exports;const{PassThrough:vt}=d;const St=dt,wt=bt,Et=function(){var e=[],t=new vt({objectMode:!0});return t.setMaxListeners(0),t.add=n,t.isEmpty=function(){return 0==e.length},t.on("unpipe",r),Array.prototype.slice.call(arguments).forEach(n),t;function n(o){return Array.isArray(o)?(o.forEach(n),this):(e.push(o),o.once("end",r.bind(null,o)),o.once("error",t.emit.bind(t,"error")),o.pipe(t,{end:!1}),this)}function r(n){!(e=e.filter((function(e){return e!==n}))).length&&t.readable&&t.end()}},It=async(e,t)=>{if(e){e.destroy();try{return await t}catch(e){return e.bufferedData}}},Tt=(e,{encoding:t,buffer:n,maxBuffer:r})=>{if(e&&n)return t?wt(e,{encoding:t,maxBuffer:r}):wt.buffer(e,{maxBuffer:r})};var Gt={handleInput:(e,t)=>{void 0!==t&&void 0!==e.stdin&&(St(t)?t.pipe(e.stdin):e.stdin.end(t))},makeAllStream:(e,{all:t})=>{if(!t||!e.stdout&&!e.stderr)return;const n=Et();return e.stdout&&n.add(e.stdout),e.stderr&&n.add(e.stderr),n},getSpawnedResult:async({stdout:e,stderr:t,all:n},{encoding:r,buffer:o,maxBuffer:i},s)=>{const a=Tt(e,{encoding:r,buffer:o,maxBuffer:i}),c=Tt(t,{encoding:r,buffer:o,maxBuffer:i}),d=Tt(n,{encoding:r,buffer:o,maxBuffer:2*i});try{return await Promise.all([s,a,c,d])}catch(r){return Promise.all([{error:r,signal:r.signal,timedOut:r.timedOut},It(e,a),It(t,c),It(n,d)])}},validateInputSync:({input:e})=>{if(St(e))throw new TypeError("The `input` option cannot be a stream in sync mode")}};const Ct=(async()=>{})().constructor.prototype,Pt=["then","catch","finally"].map((e=>[e,Reflect.getOwnPropertyDescriptor(Ct,e)]));var Ot={mergePromise:(e,t)=>{for(const[n,r]of Pt){const o="function"==typeof t?(...e)=>Reflect.apply(r.value,t(),e):r.value.bind(t);Reflect.defineProperty(e,n,{...r,value:o})}return e},getSpawnedPromise:e=>new Promise(((t,n)=>{e.on("exit",((e,n)=>{t({exitCode:e,signal:n})})),e.on("error",(e=>{n(e)})),e.stdin&&e.stdin.on("error",(e=>{n(e)}))}))};const At=(e,t=[])=>Array.isArray(t)?[e,...t]:[e],jt=/^[\w.-]+$/,$t=/"/g,_t=/ +/g;var Rt={joinCommand:(e,t)=>At(e,t).join(" "),getEscapedCommand:(e,t)=>At(e,t).map((e=>(e=>"string"!=typeof e||jt.test(e)?e:`"${e.replace($t,'\\"')}"`)(e))).join(" "),parseCommand:e=>{const t=[];for(const n of e.trim().split(_t)){const e=t[t.length-1];e&&e.endsWith("\\")?t[t.length-1]=`${e.slice(0,-1)} ${n}`:t.push(n)}return t}};const Bt=t,Lt=n,Nt=J,kt=e=>{const t="string"==typeof e?"\n":"\n".charCodeAt(),n="string"==typeof e?"\r":"\r".charCodeAt();return e[e.length-1]===t&&(e=e.slice(0,e.length-1)),e[e.length-1]===n&&(e=e.slice(0,e.length-1)),e},Mt=te,Ut=ce,Dt=Oe,Ft=Re,{spawnedKill:qt,spawnedCancel:Ht,setupTimeout:Kt,validateTimeout:Xt,setExitHandler:Vt}=at,{handleInput:Wt,getSpawnedResult:Yt,makeAllStream:zt,validateInputSync:Zt}=Gt,{mergePromise:Qt,getSpawnedPromise:Jt}=Ot,{joinCommand:en,parseCommand:tn,getEscapedCommand:nn}=Rt,rn=(e,t,n={})=>{const r=Nt._parse(e,t,n);return e=r.command,t=r.args,(n={maxBuffer:1e8,buffer:!0,stripFinalNewline:!0,extendEnv:!0,preferLocal:!1,localDir:(n=r.options).cwd||process.cwd(),execPath:process.execPath,encoding:"utf8",reject:!0,cleanup:!0,all:!1,windowsHide:!0,...n}).env=(({env:e,extendEnv:t,preferLocal:n,localDir:r,execPath:o})=>{const i=t?{...process.env,...e}:e;return n?Mt.env({env:i,cwd:r,execPath:o}):i})(n),n.stdio=Ft(n),"win32"===process.platform&&"cmd"===Bt.basename(e,".exe")&&t.unshift("/q"),{file:e,args:t,options:n,parsed:r}},on=(e,t,n)=>"string"==typeof t||Buffer.isBuffer(t)?e.stripFinalNewline?kt(t):t:void 0===n?void 0:"",sn=(e,t,n)=>{const r=rn(e,t,n),o=en(e,t),i=nn(e,t);let s;Xt(r.options);try{s=Lt.spawn(r.file,r.args,r.options)}catch(e){const t=new Lt.ChildProcess,n=Promise.reject(Dt({error:e,stdout:"",stderr:"",all:"",command:o,escapedCommand:i,parsed:r,timedOut:!1,isCanceled:!1,killed:!1}));return Qt(t,n)}const a=Jt(s),c=Kt(s,r.options,a),d=Vt(s,r.options,c),l={isCanceled:!1};s.kill=qt.bind(null,s.kill.bind(s)),s.cancel=Ht.bind(null,s,l);const u=Ut((async()=>{const[{error:e,exitCode:t,signal:n,timedOut:a},c,u,p]=await Yt(s,r.options,d),m=on(r.options,c),f=on(r.options,u),g=on(r.options,p);if(e||0!==t||null!==n){const c=Dt({error:e,exitCode:t,signal:n,stdout:m,stderr:f,all:g,command:o,escapedCommand:i,parsed:r,timedOut:a,isCanceled:l.isCanceled,killed:s.killed});if(!r.options.reject)return c;throw c}return{command:o,escapedCommand:i,exitCode:0,stdout:m,stderr:f,all:g,failed:!1,timedOut:!1,isCanceled:!1,killed:!1}}));return Wt(s,r.options.input),s.all=zt(s,r.options),Qt(s,u)};p.exports=sn;var an=p.exports.sync=(e,t,n)=>{const r=rn(e,t,n),o=en(e,t),i=nn(e,t);let s;Zt(r.options);try{s=Lt.spawnSync(r.file,r.args,r.options)}catch(e){throw Dt({error:e,stdout:"",stderr:"",all:"",command:o,escapedCommand:i,parsed:r,timedOut:!1,isCanceled:!1,killed:!1})}const a=on(r.options,s.stdout,s.error),c=on(r.options,s.stderr,s.error);if(s.error||0!==s.status||null!==s.signal){const e=Dt({stdout:a,stderr:c,error:s.error,signal:s.signal,exitCode:s.status,command:o,escapedCommand:i,parsed:r,timedOut:s.error&&"ETIMEDOUT"===s.error.code,isCanceled:!1,killed:null!==s.signal});if(!r.options.reject)return e;throw e}return{command:o,escapedCommand:i,exitCode:0,stdout:a,stderr:c,failed:!1,timedOut:!1,isCanceled:!1,killed:!1}},cn=p.exports.command=(e,t)=>{const[n,...r]=tn(e);return sn(n,r,t)},dn=p.exports.commandSync=(e,t)=>{const[n,...r]=tn(e);return sn.sync(n,r,t)},ln=p.exports.node=(e,t,n={})=>{t&&!Array.isArray(t)&&"object"==typeof t&&(n=t,t=[]);const r=Ft.node(n),o=process.execArgv.filter((e=>!e.startsWith("--inspect"))),{nodePath:i=process.execPath,nodeOptions:s=o}=n;return sn(i,[...s,e,...Array.isArray(t)?t:[]],{...n,stdin:void 0,stdout:void 0,stderr:void 0,stdio:r,shell:!1})},un=p.exports,pn=u({__proto__:null,command:cn,commandSync:dn,default:e.getDefaultExportFromCjs(un),node:ln,sync:an},[un]);exports.index=pn;