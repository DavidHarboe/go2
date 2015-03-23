#! /usr/bin/env node

/* @start Globals */

// List of reserved keywords
var RESERVED_KEYWORDS = [
  'list', 'ls',
  'add',
  'remove', 'rm',
  'help'
];

var ARGV = process.argv.slice(2);
var ARGC = ARGV.length;
var CWD = process.cwd();
var DATA = {
  "home" : "~"
};

/* @end Globals */

/* @start Main */

if(ARGC == 0){
	print_banner();
} else {
	run_command();
}	

/* @end Main */

/* @start Banner */

function print_banner(){
  var banner = 'BANNER';
  console.log(banner);
}

/* @end Banner */

/* @start Command interpreter */

function run_command(){
  switch(ARGV[0]){
    case 'add':
      command_add();
      break;
    case 'remove':
    case 'rm':
      command_rm();
      break;
    case 'list':
    case 'ls':
      command_ls();
      break;
    case 'help':
    default:
      print_banner();
      break;
  }
}

/* @end Command interpreter */

/* @start Command functions */

function command_add(){
  if(ARGC < 2) {
    print_banner();
    return;
  }
  var alias = '';
  if(ARGC == 2){
    alias = ARGV[1];
  } else {
    print_banner();
  }
  if(RESERVED_KEYWORDS.indexOf(alias) != -1){
    console.log('ERROR: Pick a different name for this location, "%s" is reserved.', alias);
  } else {
    console.log('New bind: %s ---> go2 %s', CWD, alias);
    console.log('You can now use "go2 %s" to cd into this directory.', alias);
  }
}

function command_rm(){
  if(ARGC < 2) {
    print_banner();
    return;
  }
  var alias = '';
  if(ARGC == 2){
    alias = ARGV[1];
  } else {
    print_banner();
  }
  if(!DATA.hasOwnProperty(alias)){
    console.log('ERROR: Specified alias "%s" does not exist.', alias);
  } else {
    console.log('Removed alias "%s".', alias);
  }
}

function command_ls(){
  for(var alias in DATA){
    console.log('%s ---> %s', alias, DATA[alias]);
  }
}

/* @end Command functions */


