const fs=require('node:fs'),vm=require('node:vm'),ts=require('typescript'),assert=require('node:assert/strict');
const code=ts.transpileModule(fs.readFileSync('lib/site-config.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
for(const mode of ['production','preview']){
 const exports={};vm.runInNewContext(code,{exports,process:{env:{NODE_ENV:'production',VERCEL_ENV:mode}}});
 for(const name of ['__proto__','constructor','toString','unknown'])assert.equal(exports.resolveSite('arpai.co',name).key,'arpai');
 assert.equal(exports.resolveSite('arpai.co','nissantrades').key,mode==='preview'?'nissantrades':'arpai');
 assert.equal(exports.resolveSite('nissanreviews.com').key,'nissanreviews');
 assert.equal(exports.resolveSite('unknown.invalid').key,'arpai');
}
console.log('PASS production override denial, preview selection and prototype-property rejection');
