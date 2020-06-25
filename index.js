import $ from 'jquery';
import {getMonster} from './api';
import * as solution from './solution';

const inputs = [];

const addInput = (...params) => inputs.push({params});

const addInputWithDisplay = (display, ...params) => inputs.push({display, params});

const printInput = (input) => {
  if(input.display) return input.display;

  return input.params.map((i) => {
    if(typeof i === 'function') return i.toString();
    return JSON.stringify(i, null, 2);
  }).join(', ')
};

const execAndPrint = async (name, fn, input) => {
  if(name !== 'default'){
    $('#results').append(`<div>${name}</div>`);
  }
  const $result = $(`<pre class="result">...</pre>`);
  $('#results').append($result);

  $result.html(JSON.stringify(await fn.apply(fn, input.params), null, 2));
};

const exec = () => {
  inputs.forEach(async (input, i) => {
    if(input.length > 1) $('#results').append(`<div>${i + 1}.</div>`);
    $('#results').append(`<pre class="input">await promiseAll(${printInput(input)});</pre>`);

    const funcs = Object.keys(solution);
    funcs.forEach((name) => {
      execAndPrint(name, solution[name], input);
    });    
  });
}

addInputWithDisplay(`[
  getMonster('troll'), 
  getMonster('goblin'),
  getMonster('adult-black-dragon')
]`, [
  getMonster('troll'), 
  getMonster('goblin'),
  getMonster('adult-black-dragon')
]);

exec();






