/*
---
description: An Array extension that calculates the unique abbreviations for the set of strings contained in the array
license: LGPL
authors: ['Michael Ficarra']
requires: [Core,Array,Hash,Class]
provides: [Array.abbrev]
... */

(function(){
	var Abbrev = new Class(function(words,pattern){
		if(!$defined(words) || words.length==0) return $A();
		words = words.flatten().filter(function(element,index,words){
			return words.indexOf(element)==index;
		});
		var table = new Hash(),
			seen  = new Hash();
		if(pattern!==undefined && pattern.constructor!==RegExp) pattern = new RegExp('^'+pattern.toString());
		Array.each(words,function(word){
			word = word.toString();
			if(word=='') return;
			var abbrev = word,
				len    = 0;
			while((len=abbrev.search(/[\w\W]$/))>0){
				abbrev = word.substr(0,len);
				if(pattern!==undefined && !abbrev.test(pattern)) continue;
				if(seen[abbrev]!==undefined){
					table.erase(abbrev);
				} else {
					seen[abbrev]  = true;
					table[abbrev] = word
				}
			}
		});
		words.each(function(word){
			if(pattern!==undefined && !word.test(pattern)) return;
			table[word] = word;
		});
		return table;
	});

	Array.implement('abbrev',function(pattern){
		return new Abbrev(this,pattern);
	});
})()

/* Copyright 2010 Michael Ficarra
This program is distributed under the (very open)
terms of the GNU Lesser General Public License */
