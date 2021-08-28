"use strict";var e=require("path"),t=require("child_process"),n=require("./which-2d6c5d76.js"),r=require("fs"),o=require("os"),i=require("assert"),s=require("events"),a=require("buffer"),c=require("stream"),d=require("util");function u(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var l=u(e),p=u(t),m=u(r),f=u(o),g=u(i),x=u(s),h=u(a),b=u(c),y=u(d),S={exports:{}},v={exports:{}},w={exports:{}};const I=(e={})=>{const t=e.env||process.env;return"win32"!==(e.platform||process.platform)?"PATH":Object.keys(t).reverse().find((e=>"PATH"===e.toUpperCase()))||"Path"};w.exports=I,w.exports.default=I;const T=l.default,G=n.which_1,C=w.exports;function E(e,t){const n=e.options.env||process.env,r=process.cwd(),o=null!=e.options.cwd,i=o&&void 0!==process.chdir&&!process.chdir.disabled;if(i)try{process.chdir(e.options.cwd)}catch(e){}let s;try{s=G.sync(e.command,{path:n[C({env:n})],pathExt:t?T.delimiter:void 0})}catch(e){}finally{i&&process.chdir(r)}return s&&(s=T.resolve(o?e.options.cwd:"",s)),s}var P=function(e){return E(e)||E(e,!0)},O={};const A=/([()\][%!^"`<>&|;, *?])/g;O.command=function(e){return e=e.replace(A,"^$1")},O.argument=function(e,t){return e=(e=`"${e=(e=(e=`${e}`).replace(/(\\*)"/g,'$1$1\\"')).replace(/(\\*)$/,"$1$1")}"`).replace(A,"^$1"),t&&(e=e.replace(A,"^$1")),e};const $=/^#!(.*)/;const R=m.default,_=(e="")=>{const t=e.match($);if(!t)return null;const[n,r]=t[0].replace(/#! ?/,"").split(" "),o=n.split("/").pop();return"env"===o?r:r?`${o} ${r}`:o};var j=function(e){const t=Buffer.alloc(150);let n;try{n=R.openSync(e,"r"),R.readSync(n,t,0,150,0),R.closeSync(n)}catch(e){}return _(t.toString())};const B=l.default,L=P,N=O,k=j,M="win32"===process.platform,U=/\.(?:com|exe)$/i,D=/node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;function F(e){if(!M)return e;const t=function(e){e.file=L(e);const t=e.file&&k(e.file);return t?(e.args.unshift(e.file),e.command=t,L(e)):e.file}(e),n=!U.test(t);if(e.options.forceShell||n){const n=D.test(t);e.command=B.normalize(e.command),e.command=N.command(e.command),e.args=e.args.map((e=>N.argument(e,n)));const r=[e.command].concat(e.args).join(" ");e.args=["/d","/s","/c",`"${r}"`],e.command=process.env.comspec||"cmd.exe",e.options.windowsVerbatimArguments=!0}return e}var q=function(e,t,n){t&&!Array.isArray(t)&&(n=t,t=null);const r={command:e,args:t=t?t.slice(0):[],options:n=Object.assign({},n),file:void 0,original:{command:e,args:t}};return n.shell?r:F(r)};const K="win32"===process.platform;function H(e,t){return Object.assign(new Error(`${t} ${e.command} ENOENT`),{code:"ENOENT",errno:"ENOENT",syscall:`${t} ${e.command}`,path:e.command,spawnargs:e.args})}function X(e,t){return K&&1===e&&!t.file?H(t.original,"spawn"):null}var V={hookChildProcess:function(e,t){if(!K)return;const n=e.emit;e.emit=function(r,o){if("exit"===r){const r=X(o,t);if(r)return n.call(e,"error",r)}return n.apply(e,arguments)}},verifyENOENT:X,verifyENOENTSync:function(e,t){return K&&1===e&&!t.file?H(t.original,"spawnSync"):null},notFoundError:H};const W=p.default,z=q,Z=V;function Q(e,t,n){const r=z(e,t,n),o=W.spawn(r.command,r.args,r.options);return Z.hookChildProcess(o,r),o}v.exports=Q,v.exports.spawn=Q,v.exports.sync=function(e,t,n){const r=z(e,t,n),o=W.spawnSync(r.command,r.args,r.options);return o.error=o.error||Z.verifyENOENTSync(o.status,r),o},v.exports._parse=z,v.exports._enoent=Z;var Y={exports:{}};!function(e){const t=l.default,n=w.exports,r=e=>{let r;e={cwd:process.cwd(),path:process.env[n()],execPath:process.execPath,...e};let o=t.resolve(e.cwd);const i=[];for(;r!==o;)i.push(t.join(o,"node_modules/.bin")),r=o,o=t.resolve(o,"..");const s=t.resolve(e.cwd,e.execPath,"..");return i.push(s),i.concat(e.path).join(t.delimiter)};e.exports=r,e.exports.default=r,e.exports.env=t=>{const r={...(t={env:process.env,...t}).env},o=n({env:r});return t.path=r[o],r[o]=e.exports(t),r}}(Y);var J={exports:{}},ee={exports:{}};const te=(e,t)=>{for(const n of Reflect.ownKeys(t))Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n));return e};ee.exports=te,ee.exports.default=te;const ne=ee.exports,re=new WeakMap,oe=(e,t={})=>{if("function"!=typeof e)throw new TypeError("Expected a function");let n,r=0;const o=e.displayName||e.name||"<anonymous>",i=function(...s){if(re.set(i,++r),1===r)n=e.apply(this,s),e=null;else if(!0===t.throw)throw new Error(`Function \`${o}\` can only be called once`);return n};return ne(i,e),re.set(i,r),i};J.exports=oe,J.exports.default=oe,J.exports.callCount=e=>{if(!re.has(e))throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);return re.get(e)};var ie={},se={},ae={};Object.defineProperty(ae,"__esModule",{value:!0}),ae.SIGNALS=void 0;ae.SIGNALS=[{name:"SIGHUP",number:1,action:"terminate",description:"Terminal closed",standard:"posix"},{name:"SIGINT",number:2,action:"terminate",description:"User interruption with CTRL-C",standard:"ansi"},{name:"SIGQUIT",number:3,action:"core",description:"User interruption with CTRL-\\",standard:"posix"},{name:"SIGILL",number:4,action:"core",description:"Invalid machine instruction",standard:"ansi"},{name:"SIGTRAP",number:5,action:"core",description:"Debugger breakpoint",standard:"posix"},{name:"SIGABRT",number:6,action:"core",description:"Aborted",standard:"ansi"},{name:"SIGIOT",number:6,action:"core",description:"Aborted",standard:"bsd"},{name:"SIGBUS",number:7,action:"core",description:"Bus error due to misaligned, non-existing address or paging error",standard:"bsd"},{name:"SIGEMT",number:7,action:"terminate",description:"Command should be emulated but is not implemented",standard:"other"},{name:"SIGFPE",number:8,action:"core",description:"Floating point arithmetic error",standard:"ansi"},{name:"SIGKILL",number:9,action:"terminate",description:"Forced termination",standard:"posix",forced:!0},{name:"SIGUSR1",number:10,action:"terminate",description:"Application-specific signal",standard:"posix"},{name:"SIGSEGV",number:11,action:"core",description:"Segmentation fault",standard:"ansi"},{name:"SIGUSR2",number:12,action:"terminate",description:"Application-specific signal",standard:"posix"},{name:"SIGPIPE",number:13,action:"terminate",description:"Broken pipe or socket",standard:"posix"},{name:"SIGALRM",number:14,action:"terminate",description:"Timeout or timer",standard:"posix"},{name:"SIGTERM",number:15,action:"terminate",description:"Termination",standard:"ansi"},{name:"SIGSTKFLT",number:16,action:"terminate",description:"Stack is empty or overflowed",standard:"other"},{name:"SIGCHLD",number:17,action:"ignore",description:"Child process terminated, paused or unpaused",standard:"posix"},{name:"SIGCLD",number:17,action:"ignore",description:"Child process terminated, paused or unpaused",standard:"other"},{name:"SIGCONT",number:18,action:"unpause",description:"Unpaused",standard:"posix",forced:!0},{name:"SIGSTOP",number:19,action:"pause",description:"Paused",standard:"posix",forced:!0},{name:"SIGTSTP",number:20,action:"pause",description:'Paused using CTRL-Z or "suspend"',standard:"posix"},{name:"SIGTTIN",number:21,action:"pause",description:"Background process cannot read terminal input",standard:"posix"},{name:"SIGBREAK",number:21,action:"terminate",description:"User interruption with CTRL-BREAK",standard:"other"},{name:"SIGTTOU",number:22,action:"pause",description:"Background process cannot write to terminal output",standard:"posix"},{name:"SIGURG",number:23,action:"ignore",description:"Socket received out-of-band data",standard:"bsd"},{name:"SIGXCPU",number:24,action:"core",description:"Process timed out",standard:"bsd"},{name:"SIGXFSZ",number:25,action:"core",description:"File too big",standard:"bsd"},{name:"SIGVTALRM",number:26,action:"terminate",description:"Timeout or timer",standard:"bsd"},{name:"SIGPROF",number:27,action:"terminate",description:"Timeout or timer",standard:"bsd"},{name:"SIGWINCH",number:28,action:"ignore",description:"Terminal window size changed",standard:"bsd"},{name:"SIGIO",number:29,action:"terminate",description:"I/O is available",standard:"other"},{name:"SIGPOLL",number:29,action:"terminate",description:"Watched event",standard:"other"},{name:"SIGINFO",number:29,action:"ignore",description:"Request for process information",standard:"other"},{name:"SIGPWR",number:30,action:"terminate",description:"Device running out of power",standard:"systemv"},{name:"SIGSYS",number:31,action:"core",description:"Invalid system call",standard:"other"},{name:"SIGUNUSED",number:31,action:"terminate",description:"Invalid system call",standard:"other"}];var ce={};Object.defineProperty(ce,"__esModule",{value:!0}),ce.SIGRTMAX=ce.getRealtimeSignals=void 0;ce.getRealtimeSignals=function(){const e=le-ue+1;return Array.from({length:e},de)};const de=function(e,t){return{name:`SIGRT${t+1}`,number:ue+t,action:"terminate",description:"Application-specific signal (realtime)",standard:"posix"}},ue=34,le=64;ce.SIGRTMAX=le,Object.defineProperty(se,"__esModule",{value:!0}),se.getSignals=void 0;var pe=f.default,me=ae,fe=ce;se.getSignals=function(){const e=(0,fe.getRealtimeSignals)();return[...me.SIGNALS,...e].map(ge)};const ge=function({name:e,number:t,description:n,action:r,forced:o=!1,standard:i}){const{signals:{[e]:s}}=pe.constants,a=void 0!==s;return{name:e,number:a?s:t,description:n,supported:a,action:r,forced:o,standard:i}};Object.defineProperty(ie,"__esModule",{value:!0}),ie.signalsByNumber=ie.signalsByName=void 0;var xe=f.default,he=se,be=ce;const ye=function(e,{name:t,number:n,description:r,supported:o,action:i,forced:s,standard:a}){return{...e,[t]:{name:t,number:n,description:r,supported:o,action:i,forced:s,standard:a}}},Se=(0,he.getSignals)().reduce(ye,{});ie.signalsByName=Se;const ve=function(e,t){const n=we(e,t);if(void 0===n)return{};const{name:r,description:o,supported:i,action:s,forced:a,standard:c}=n;return{[e]:{name:r,number:e,description:o,supported:i,action:s,forced:a,standard:c}}},we=function(e,t){const n=t.find((({name:t})=>xe.constants.signals[t]===e));return void 0!==n?n:t.find((t=>t.number===e))},Ie=function(){const e=(0,he.getSignals)(),t=be.SIGRTMAX+1,n=Array.from({length:t},((t,n)=>ve(n,e)));return Object.assign({},...n)}();ie.signalsByNumber=Ie;const{signalsByName:Te}=ie;var Ge=({stdout:e,stderr:t,all:n,error:r,signal:o,exitCode:i,command:s,escapedCommand:a,timedOut:c,isCanceled:d,killed:u,parsed:{options:{timeout:l}}})=>{i=null===i?void 0:i;const p=void 0===(o=null===o?void 0:o)?void 0:Te[o].description,m=`Command ${(({timedOut:e,timeout:t,errorCode:n,signal:r,signalDescription:o,exitCode:i,isCanceled:s})=>e?`timed out after ${t} milliseconds`:s?"was canceled":void 0!==n?`failed with ${n}`:void 0!==r?`was killed with ${r} (${o})`:void 0!==i?`failed with exit code ${i}`:"failed")({timedOut:c,timeout:l,errorCode:r&&r.code,signal:o,signalDescription:p,exitCode:i,isCanceled:d})}: ${s}`,f="[object Error]"===Object.prototype.toString.call(r),g=f?`${m}\n${r.message}`:m,x=[g,t,e].filter(Boolean).join("\n");return f?(r.originalMessage=r.message,r.message=x):r=new Error(x),r.shortMessage=g,r.command=s,r.escapedCommand=a,r.exitCode=i,r.signal=o,r.signalDescription=p,r.stdout=e,r.stderr=t,void 0!==n&&(r.all=n),"bufferedData"in r&&delete r.bufferedData,r.failed=!0,r.timedOut=Boolean(c),r.isCanceled=d,r.killed=u&&!c,r},Ce={exports:{}};const Ee=["stdin","stdout","stderr"],Pe=e=>{if(!e)return;const{stdio:t}=e;if(void 0===t)return Ee.map((t=>e[t]));if((e=>Ee.some((t=>void 0!==e[t])))(e))throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${Ee.map((e=>`\`${e}\``)).join(", ")}`);if("string"==typeof t)return t;if(!Array.isArray(t))throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof t}\``);const n=Math.max(t.length,Ee.length);return Array.from({length:n},((e,n)=>t[n]))};Ce.exports=Pe,Ce.exports.node=e=>{const t=Pe(e);return"ipc"===t?"ipc":void 0===t||"string"==typeof t?[t,t,t,"ipc"]:t.includes("ipc")?t:[...t,"ipc"]};var Oe,Ae={exports:{}},$e={exports:{}};(Oe=$e).exports=["SIGABRT","SIGALRM","SIGHUP","SIGINT","SIGTERM"],"win32"!==process.platform&&Oe.exports.push("SIGVTALRM","SIGXCPU","SIGXFSZ","SIGUSR2","SIGTRAP","SIGSYS","SIGQUIT","SIGIOT"),"linux"===process.platform&&Oe.exports.push("SIGIO","SIGPOLL","SIGPWR","SIGSTKFLT","SIGUNUSED");var Re,_e=g.default,je=$e.exports,Be=/^win/i.test(process.platform),Le=x.default;function Ne(){Ue&&(Ue=!1,je.forEach((function(e){try{process.removeListener(e,Me[e])}catch(e){}})),process.emit=Ke,process.reallyExit=Fe,Re.count-=1)}function ke(e,t,n){Re.emitted[e]||(Re.emitted[e]=!0,Re.emit(e,t,n))}"function"!=typeof Le&&(Le=Le.EventEmitter),process.__signal_exit_emitter__?Re=process.__signal_exit_emitter__:((Re=process.__signal_exit_emitter__=new Le).count=0,Re.emitted={}),Re.infinite||(Re.setMaxListeners(1/0),Re.infinite=!0),Ae.exports=function(e,t){_e.equal(typeof e,"function","a callback must be provided for exit handler"),!1===Ue&&De();var n="exit";t&&t.alwaysLast&&(n="afterexit");return Re.on(n,e),function(){Re.removeListener(n,e),0===Re.listeners("exit").length&&0===Re.listeners("afterexit").length&&Ne()}},Ae.exports.unload=Ne;var Me={};je.forEach((function(e){Me[e]=function(){process.listeners(e).length===Re.count&&(Ne(),ke("exit",null,e),ke("afterexit",null,e),Be&&"SIGHUP"===e&&(e="SIGINT"),process.kill(process.pid,e))}})),Ae.exports.signals=function(){return je},Ae.exports.load=De;var Ue=!1;function De(){Ue||(Ue=!0,Re.count+=1,je=je.filter((function(e){try{return process.on(e,Me[e]),!0}catch(e){return!1}})),process.emit=He,process.reallyExit=qe)}var Fe=process.reallyExit;function qe(e){process.exitCode=e||0,ke("exit",process.exitCode,null),ke("afterexit",process.exitCode,null),Fe.call(process,process.exitCode)}var Ke=process.emit;function He(e,t){if("exit"===e){void 0!==t&&(process.exitCode=t);var n=Ke.apply(this,arguments);return ke("exit",process.exitCode,null),ke("afterexit",process.exitCode,null),n}return Ke.apply(this,arguments)}const Xe=f.default,Ve=Ae.exports,We=(e,t,n,r)=>{if(!ze(t,n,r))return;const o=Qe(n),i=setTimeout((()=>{e("SIGKILL")}),o);i.unref&&i.unref()},ze=(e,{forceKillAfterTimeout:t},n)=>Ze(e)&&!1!==t&&n,Ze=e=>e===Xe.constants.signals.SIGTERM||"string"==typeof e&&"SIGTERM"===e.toUpperCase(),Qe=({forceKillAfterTimeout:e=!0})=>{if(!0===e)return 5e3;if(!Number.isFinite(e)||e<0)throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);return e};var Ye={spawnedKill:(e,t="SIGTERM",n={})=>{const r=e(t);return We(e,t,n,r),r},spawnedCancel:(e,t)=>{e.kill()&&(t.isCanceled=!0)},setupTimeout:(e,{timeout:t,killSignal:n="SIGTERM"},r)=>{if(0===t||void 0===t)return r;let o;const i=new Promise(((r,i)=>{o=setTimeout((()=>{((e,t,n)=>{e.kill(t),n(Object.assign(new Error("Timed out"),{timedOut:!0,signal:t}))})(e,n,i)}),t)})),s=r.finally((()=>{clearTimeout(o)}));return Promise.race([i,s])},validateTimeout:({timeout:e})=>{if(void 0!==e&&(!Number.isFinite(e)||e<0))throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`)},setExitHandler:async(e,{cleanup:t,detached:n},r)=>{if(!t||n)return r;const o=Ve((()=>{e.kill()}));return r.finally((()=>{o()}))}};const Je=e=>null!==e&&"object"==typeof e&&"function"==typeof e.pipe;Je.writable=e=>Je(e)&&!1!==e.writable&&"function"==typeof e._write&&"object"==typeof e._writableState,Je.readable=e=>Je(e)&&!1!==e.readable&&"function"==typeof e._read&&"object"==typeof e._readableState,Je.duplex=e=>Je.writable(e)&&Je.readable(e),Je.transform=e=>Je.duplex(e)&&"function"==typeof e._transform&&"object"==typeof e._transformState;var et=Je,tt={exports:{}};const{PassThrough:nt}=b.default;const{constants:rt}=h.default,ot=b.default,{promisify:it}=y.default,st=e=>{e={...e};const{array:t}=e;let{encoding:n}=e;const r="buffer"===n;let o=!1;t?o=!(n||r):n=n||"utf8",r&&(n=null);const i=new nt({objectMode:o});n&&i.setEncoding(n);let s=0;const a=[];return i.on("data",(e=>{a.push(e),o?s=a.length:s+=e.length})),i.getBufferedValue=()=>t?a:r?Buffer.concat(a,s):a.join(""),i.getBufferedLength=()=>s,i},at=it(ot.pipeline);class ct extends Error{constructor(){super("maxBuffer exceeded"),this.name="MaxBufferError"}}async function dt(e,t){if(!e)throw new Error("Expected a stream");t={maxBuffer:1/0,...t};const{maxBuffer:n}=t,r=st(t);return await new Promise(((t,o)=>{const i=e=>{e&&r.getBufferedLength()<=rt.MAX_LENGTH&&(e.bufferedData=r.getBufferedValue()),o(e)};(async()=>{try{await at(e,r),t()}catch(e){i(e)}})(),r.on("data",(()=>{r.getBufferedLength()>n&&i(new ct)}))})),r.getBufferedValue()}tt.exports=dt,tt.exports.buffer=(e,t)=>dt(e,{...t,encoding:"buffer"}),tt.exports.array=(e,t)=>dt(e,{...t,array:!0}),tt.exports.MaxBufferError=ct;const{PassThrough:ut}=b.default;const lt=et,pt=tt.exports,mt=function(){var e=[],t=new ut({objectMode:!0});return t.setMaxListeners(0),t.add=n,t.isEmpty=r,t.on("unpipe",o),Array.prototype.slice.call(arguments).forEach(n),t;function n(r){return Array.isArray(r)?(r.forEach(n),this):(e.push(r),r.once("end",o.bind(null,r)),r.once("error",t.emit.bind(t,"error")),r.pipe(t,{end:!1}),this)}function r(){return 0==e.length}function o(n){!(e=e.filter((function(e){return e!==n}))).length&&t.readable&&t.end()}},ft=async(e,t)=>{if(e){e.destroy();try{return await t}catch(e){return e.bufferedData}}},gt=(e,{encoding:t,buffer:n,maxBuffer:r})=>{if(e&&n)return t?pt(e,{encoding:t,maxBuffer:r}):pt.buffer(e,{maxBuffer:r})};var xt={handleInput:(e,t)=>{void 0!==t&&void 0!==e.stdin&&(lt(t)?t.pipe(e.stdin):e.stdin.end(t))},makeAllStream:(e,{all:t})=>{if(!t||!e.stdout&&!e.stderr)return;const n=mt();return e.stdout&&n.add(e.stdout),e.stderr&&n.add(e.stderr),n},getSpawnedResult:async({stdout:e,stderr:t,all:n},{encoding:r,buffer:o,maxBuffer:i},s)=>{const a=gt(e,{encoding:r,buffer:o,maxBuffer:i}),c=gt(t,{encoding:r,buffer:o,maxBuffer:i}),d=gt(n,{encoding:r,buffer:o,maxBuffer:2*i});try{return await Promise.all([s,a,c,d])}catch(r){return Promise.all([{error:r,signal:r.signal,timedOut:r.timedOut},ft(e,a),ft(t,c),ft(n,d)])}},validateInputSync:({input:e})=>{if(lt(e))throw new TypeError("The `input` option cannot be a stream in sync mode")}};const ht=(async()=>{})().constructor.prototype,bt=["then","catch","finally"].map((e=>[e,Reflect.getOwnPropertyDescriptor(ht,e)]));var yt={mergePromise:(e,t)=>{for(const[n,r]of bt){const o="function"==typeof t?(...e)=>Reflect.apply(r.value,t(),e):r.value.bind(t);Reflect.defineProperty(e,n,{...r,value:o})}return e},getSpawnedPromise:e=>new Promise(((t,n)=>{e.on("exit",((e,n)=>{t({exitCode:e,signal:n})})),e.on("error",(e=>{n(e)})),e.stdin&&e.stdin.on("error",(e=>{n(e)}))}))};const St=(e,t=[])=>Array.isArray(t)?[e,...t]:[e],vt=/^[\w.-]+$/,wt=/"/g,It=/ +/g;var Tt={joinCommand:(e,t)=>St(e,t).join(" "),getEscapedCommand:(e,t)=>St(e,t).map((e=>(e=>"string"!=typeof e||vt.test(e)?e:`"${e.replace(wt,'\\"')}"`)(e))).join(" "),parseCommand:e=>{const t=[];for(const n of e.trim().split(It)){const e=t[t.length-1];e&&e.endsWith("\\")?t[t.length-1]=`${e.slice(0,-1)} ${n}`:t.push(n)}return t}};const Gt=l.default,Ct=p.default,Et=v.exports,Pt=e=>{const t="string"==typeof e?"\n":"\n".charCodeAt(),n="string"==typeof e?"\r":"\r".charCodeAt();return e[e.length-1]===t&&(e=e.slice(0,e.length-1)),e[e.length-1]===n&&(e=e.slice(0,e.length-1)),e},Ot=Y.exports,At=J.exports,$t=Ge,Rt=Ce.exports,{spawnedKill:_t,spawnedCancel:jt,setupTimeout:Bt,validateTimeout:Lt,setExitHandler:Nt}=Ye,{handleInput:kt,getSpawnedResult:Mt,makeAllStream:Ut,validateInputSync:Dt}=xt,{mergePromise:Ft,getSpawnedPromise:qt}=yt,{joinCommand:Kt,parseCommand:Ht,getEscapedCommand:Xt}=Tt,Vt=(e,t,n={})=>{const r=Et._parse(e,t,n);return e=r.command,t=r.args,(n={maxBuffer:1e8,buffer:!0,stripFinalNewline:!0,extendEnv:!0,preferLocal:!1,localDir:(n=r.options).cwd||process.cwd(),execPath:process.execPath,encoding:"utf8",reject:!0,cleanup:!0,all:!1,windowsHide:!0,...n}).env=(({env:e,extendEnv:t,preferLocal:n,localDir:r,execPath:o})=>{const i=t?{...process.env,...e}:e;return n?Ot.env({env:i,cwd:r,execPath:o}):i})(n),n.stdio=Rt(n),"win32"===process.platform&&"cmd"===Gt.basename(e,".exe")&&t.unshift("/q"),{file:e,args:t,options:n,parsed:r}},Wt=(e,t,n)=>"string"==typeof t||Buffer.isBuffer(t)?e.stripFinalNewline?Pt(t):t:void 0===n?void 0:"",zt=(e,t,n)=>{const r=Vt(e,t,n),o=Kt(e,t),i=Xt(e,t);let s;Lt(r.options);try{s=Ct.spawn(r.file,r.args,r.options)}catch(e){const t=new Ct.ChildProcess,n=Promise.reject($t({error:e,stdout:"",stderr:"",all:"",command:o,escapedCommand:i,parsed:r,timedOut:!1,isCanceled:!1,killed:!1}));return Ft(t,n)}const a=qt(s),c=Bt(s,r.options,a),d=Nt(s,r.options,c),u={isCanceled:!1};s.kill=_t.bind(null,s.kill.bind(s)),s.cancel=jt.bind(null,s,u);const l=At((async()=>{const[{error:e,exitCode:t,signal:n,timedOut:a},c,l,p]=await Mt(s,r.options,d),m=Wt(r.options,c),f=Wt(r.options,l),g=Wt(r.options,p);if(e||0!==t||null!==n){const c=$t({error:e,exitCode:t,signal:n,stdout:m,stderr:f,all:g,command:o,escapedCommand:i,parsed:r,timedOut:a,isCanceled:u.isCanceled,killed:s.killed});if(!r.options.reject)return c;throw c}return{command:o,escapedCommand:i,exitCode:0,stdout:m,stderr:f,all:g,failed:!1,timedOut:!1,isCanceled:!1,killed:!1}}));return kt(s,r.options.input),s.all=Ut(s,r.options),Ft(s,l)};S.exports=zt;var Zt=S.exports.sync=(e,t,n)=>{const r=Vt(e,t,n),o=Kt(e,t),i=Xt(e,t);let s;Dt(r.options);try{s=Ct.spawnSync(r.file,r.args,r.options)}catch(e){throw $t({error:e,stdout:"",stderr:"",all:"",command:o,escapedCommand:i,parsed:r,timedOut:!1,isCanceled:!1,killed:!1})}const a=Wt(r.options,s.stdout,s.error),c=Wt(r.options,s.stderr,s.error);if(s.error||0!==s.status||null!==s.signal){const e=$t({stdout:a,stderr:c,error:s.error,signal:s.signal,exitCode:s.status,command:o,escapedCommand:i,parsed:r,timedOut:s.error&&"ETIMEDOUT"===s.error.code,isCanceled:!1,killed:null!==s.signal});if(!r.options.reject)return e;throw e}return{command:o,escapedCommand:i,exitCode:0,stdout:a,stderr:c,failed:!1,timedOut:!1,isCanceled:!1,killed:!1}},Qt=S.exports.command=(e,t)=>{const[n,...r]=Ht(e);return zt(n,r,t)},Yt=S.exports.commandSync=(e,t)=>{const[n,...r]=Ht(e);return zt.sync(n,r,t)},Jt=S.exports.node=(e,t,n={})=>{t&&!Array.isArray(t)&&"object"==typeof t&&(n=t,t=[]);const r=Rt.node(n),o=process.execArgv.filter((e=>!e.startsWith("--inspect"))),{nodePath:i=process.execPath,nodeOptions:s=o}=n;return zt(i,[...s,e,...Array.isArray(t)?t:[]],{...n,stdin:void 0,stdout:void 0,stderr:void 0,stdio:r,shell:!1})},en=S.exports,tn=Object.freeze(Object.assign(Object.create(null),S.exports,{default:en,sync:Zt,command:Qt,commandSync:Yt,node:Jt}));exports.index=tn;
//# sourceMappingURL=index-9346657f.js.map