var fs = require('fs');

const WORDSFILE = "english-words.txt";
const WORDSFILETEST = "test-words.txt";
const TIMERNAME = "timer";

var readWords = function(filePath) {
	try {
		var contents = fs.readFileSync(filePath, 'utf8').split('\n');
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

var anagrams_v3 = function(wordsAvailable, searchWord) {
	var ordered_word_chars = searchWord.split('').sort();
	if (wordsAvailable[ordered_word_chars] === undefined){
			wordsAvailable[ordered_word_chars] = [searchWord];
	}else{
		wordsAvailable[ordered_word_chars].push(searchWord);
	}
}

// Lets get started
var args = process.argv.slice(2, 4);
var searchOrTest = args[0];
var searchWord = args[1];

var anagramsWords_v1 = [];
var anagramsWords_v2 = {};
var anagramsWords_v3 = [];
var wordsAvailable = [];

if (searchOrTest === "test"){
	wordsAvailable = readWords(WORDSFILETEST);
} else if(searchOrTest === "search" && searchWord.length > 0) {
	wordsAvailable = readWords(WORDSFILE);
}

console.time(TIMERNAME);
wordsAvailable.map(function(word, index, array){
	//anagramsWords_v1.push(word);
	//var result = anagrams(anagramsWords_v1, word);
	//console.log('First try: Anagrams of ' + word + ' are ' + result);

	//anagramsWords_v2[word] = []
	//anagrams_v2(anagramsWords_v2, word)
	//console.log('Second try: Anagrams of ' + word + ' are ' + anagramsWords_v2[word])

	anagrams_v3(anagramsWords_v3, word);
	console.log('Third try: Anagrams of ' + word + ' are ' + anagramsWords_v3[word.split('').sort()])
});
if (searchOrTest !== "test"){
	console.log('Anagrams of ' + searchWord + ' are ' + anagramsWords_v3[searchWord.split('').sort()]);
}
console.timeEnd(TIMERNAME);
