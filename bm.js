function rpr(l, t) {
	var tz="*", k=0;
	for (var i=0; i<t.length-1;i++) tz+="*";
	tz+=t;
	for (var i=t.length-l; i>=-t.length; i--)
		if ((i > i+l-1 || srav(tz.substring(i-1 + tz.length/2, i+l-1+tz.length/2), t.substring(t.length-l))) && (i<=1 || i>1 && t.charAt(i-2)!=t.charAt(t.length-l-1))) {
			k=i;
			break;
		}
	return k;
}

function srav(tz1, t1) {
	if (tz1.search(new RegExp("[a-z]")) != -1)
		for (var o=0;o<tz1.length;o++)
			if (tz1.charAt(o)=="*") continue;
			else if (tz1.charAt(o)!=t1.charAt(o)) return false;
	return true;
}

var FSO = new ActiveXObject("Scripting.FileSystemObject");
f = FSO.OpenTextFile("bmin.txt");
var t="abcdabc", nfsshift2 = new Array(), nfsshift1=0, N=new Array(), answer="", input = f.ReadAll();
f.close();
for (var l=0;l<t.length+1;l++) {  
			WSH.echo(rpr(l, t));//ОБРАБОТКА Т
	nfsshift2[l]=t.length-rpr(l, t)-l;
	N[t.charAt(l)]=l;
}
for (var i=0;i<input.length-t.length+1;i++)  //ПОИСК
	for (var l=t.length-1;l>=0;l--)
		if (input.charAt(i+l)==t.charAt(l) && l!=0) continue;
		else if (l!=0) {
			if (N[input.charAt(i+l)]==undefined) nfsshift1=l;
			else nfsshift1=l-N[input.charAt(i+l)];
			i+=Math.max(nfsshift2[t.length-l-1], nfsshift1);
			break;
		} else if (input.charAt(i+l)==t.charAt(l)) answer+=i.toString()+" ";
WSH.echo("Answer: " + answer);