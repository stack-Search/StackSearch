function jsonapi (search){
	var stackexchange = require('stackexchange-node');
	var options = { version: 2.2 };
	var context = new stackexchange(options);
	var re=/<code>([\s\S]*?)<\/code>/gm;
	var re2=/<(.*?)>/g;
	var m;
	var complete = {
		concept: [],
		code: [],
		title: '',
		is_code: false
	};
	var filter = {
  		pagesize: 1,
  		sort: 'relevance',
  		order: 'desc',
  		intitle: search,
  		filter: '!)R7_Ydm-Q.9X4okybbXBoVz5'
	};
	context.search.search(filter, function(err, results){
  	if (err) throw err;
  	var s=results.items[0].answers[0].body;
  	complete.title=results.items[0].title;
  	//var s='<p>Okay, I have seen this:\n<a href="https://stackoverflow.com/questions/1129216/sorting-objects-in-an-array-by-a-field-value-in-javascript">Sort array of objects by string property value in JavaScript</a><br>\nNow, my problem is that I want sort the array by a field value in dependence of an external int value.</p>\n\n<p>The Int value represents a number of persons for a reservation, the objects in the array are the tables with the seats.<br></p>\n\n<p>Now, when I got a Reservation with 4 persons the array should beginn with the object where Seats are equal to my Int (the 4 persons) or the nearest higher one. The next ones should be i.e. 6 and 8. Objects with Seats are smaller then my Int should listed at the end (when 4 persons want a reservation, I dont need tables with 2 Seats). I hop its a bit cleare now.</p>\n\n<pre><code>{\n    Area: "Bar",\n    Seats: 2,\n    Id : 1\n},{\n    Area: "Outside",\n    Seats: 8,\n    Id : 2\n},{\n    Area: "Room",\n    Seats: 4,\n    Id : 3\n},{\n    Area: "Floor",\n    Seats: 2,\n    Id : 4\n},{\n    Area: "Room",\n    Seats: 6,\n    Id : 5\n}\n</code></pre>\n\n<p>Okay, here is my solution:<br></p>\n\n<pre><code>        res.sort(function (a, b) {\n            if ((a.Seats &lt; goal)  &amp;&amp;  (b.Seats &lt; goal)) {\n                return b.Seats - a.Seats;\n            }\n            if (a.Seats &lt; goal) {\n                return 1;\n            }\n            if (b.Seats &lt; goal) {\n                return -1;\n            }\n            return a.Seats - b.Seats;\n        });\n</code></pre>\n';
  	m=s.split(re);
  	for(var i=0; i<m.length; i++){
  		if(i%2==0){
  			complete.concept.push(m[i]);
  		}else{
  			complete.code.push(m[i]);
  		}
  	}
  	complete.is_code=complete.code.length>0;
  	for(var i=0; i<complete.concept.length;i++){
  		while(re2.test(complete.concept[i])){
  			complete.concept[i]=complete.concept[i].replace(re2,"");
  		}
  	}
  	return complete;
});
}
jsonapi('sort array in javascript');