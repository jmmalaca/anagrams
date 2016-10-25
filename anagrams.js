var fs = require('fs');

const WORDSFILE = "english-words.txt";
//const WORDSFILE = "test-words.txt";
const TIMERNAME = "timer";

var anagramsWords = {};
//var anagramsWords = []

var readWords = function() {
	try {
		var contents = fs.readFileSync(WORDSFILE, 'utf8').split('\n');
		return contents.map(function(word, index, array){return word.replace(/[\\']/g,'')})
	} catch(err) {
		console.log("Error, something went wrong reading words.")
	}
}

var checkChars = function(word, chars, charIndex) {
	if (word.length === 0) { return true; }
	if (word.indexOf(chars[charIndex]) > -1){
		return checkChars(word.replace(chars[charIndex],''),chars,charIndex + 1);
	}
	return false;
}

var anagrams = function(wordsAvailable, searchWord) {
	return wordsAvailable.filter(function(word, index, array) {
		if (word.length === searchWord.length) {
			return checkChars(word, searchWord.split(''), 0);
		}
		return false;
	});
}

var anagrams_v2 = function(wordsAvailable, searchWord) {
	if (wordsAvailable[searchWord].length !== 0) return wordsAvailable[searchWord]
	Object.keys(wordsAvailable).forEach(function(key_word) {
		if (checkChars(key_word, searchWord.split(''),0)) {
			if (wordsAvailable[searchWord].indexOf(key_word) < 0) {
				wordsAvailable[searchWord].push(key_word)
			}
			if (wordsAvailable[key_word].indexOf(searchWord) < 0) {
				wordsAvailable[key_word].push(searchWord)
			}
		}
	})
}

// Lets get started
var args = process.argv.slice(2, 4);
var searchOrTest = args[0];
var searchWord = args[1];

var wordsAvailable = readWords();

if (searchOrTest === "test"){//search anagrams for all words
	console.time(TIMERNAME);
	wordsAvailable.map(function(word, index, array){
		//anagramsWords.push(word);
		//var result = anagrams(anagramsWords, word);
		//console.log('Anagrams of ' + word + ' are ' + result);
		anagramsWords[word] = []
		anagrams_v2(anagramsWords, word)
		console.log('Anagrams of ' + word + ' are ' + anagramsWords[word])
	});
	console.timeEnd(TIMERNAME);
} else if(searchOrTest === "search" && searchWord.length > 0) {//search anagram for an given word
	console.time(TIMERNAME);
	console.log('Anagrams of ' + searchWord + " are " + anagrams(wordsAvailable, searchWord, 0, []));
	console.timeEnd(TIMERNAME);
}