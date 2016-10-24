##Anagrams Challenge

### Details

**[Source](https://github.com/pawel-krysiak/Anagrams-Algorithms-And-Data-Structures---Ruby)**


**Anagram** > another english word with the same word length, same word letters with different order.

Node.js is an interesting technology. Being built on top of Google’s V8 engine allows for a lot benefits 
when it comes to JavaScript interpretation. The most obvious being the efficient running of server-side logic. 
However, one aspect that is often overlooked is the very basic fact that (at its core) Node.js simply 
interprets and runs JavaScript code. No one said we had to use Node.js to run a server. We can easily use the 
Node.js core modules to create this anagrams project.

This one uses the english-words txt file containing **355k** English words.

To search for anagrams for an given word just do:
````bash
node anagrams.js search <word>
````
To find anagrams for every english word available do:
````bash
node anagrams.js test
````

### Example outputs
````bash
$ node anagrams.js search read
Anagrams of read are ared,daer,dare,dear,read
timer: 50ms
````

````bash
$ node anagrams.js search open
Anagrams of open are nope,open,peon,pone
timer: 37ms
````

````bash
$ node anagrams.js test
...
nagrams of zythem are zythem
Anagrams of zythum are zythum
Anagrams of zyzzyva are zyzzyva
Anagrams of zyzzyvas are zyzzyvas
timer: 3955925ms
````

**Results**
To search for an anagram, 50 ms is accpetable (well why not, its fast) and there is no probem with this however, scanning for
anagrams for **355k** words is took 3955925ms = 3955s = 65m and this is very slooowww
