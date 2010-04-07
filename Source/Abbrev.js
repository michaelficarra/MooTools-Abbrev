(function(){
	var Abbrev = new Class({
		initialize: function(words,pattern){
			if(!$defined(words) || words.length==0) return $A();
			words = words.flatten().filter(function(element,index,words){
				return words.indexOf(element)==index;
			});
			var table=$H(), seen=$H();
			if($defined(pattern) && $type(pattern)=='string') pattern = new RegExp('^'+pattern);
			$each(words,function(word){
				word = word.toString();
				if(word=='') return;
				var abbrev=word, len=0;
				while((len=abbrev.search(/[\w\W]$/))>0){
					abbrev=word.substr(0,len);
					if($defined(pattern) && !abbrev.test(pattern)) continue;
					if($defined(seen[abbrev])){
						table.erase(abbrev);
					} else {
						seen[abbrev]=true;
						table[abbrev]=word
					}
				}
			});
			words.each(function(word){
				if($defined(pattern) && !word.test(pattern)) return;
				table[word]=word;
			});
			return table;
		}
	});

	Array.implement({
		abbrev: function(pattern){
			return new Abbrev(this,pattern);
		}
	});
})()
