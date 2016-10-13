function check(s, t, i) {
	for (var j=0;j<t.length;j++)
		if (s.charAt(i+j)!=t.charAt(j))
			return false;
	return true;
}

Args = WSH.Arguments;
var t="князь Андрей", res="";
var FSO = new ActiveXObject("Scripting.FileSystemObject");
f = FSO.OpenTextFile(Args(0)+".txt");
var s = f.ReadAll();
f.close();
var cou=0;
var b=new Date();
for (var i=0;i<s.length;i++)
	if (s.charAt(i)==t.charAt(0)) 
		for (var j=1;j<t.length;j++) {
			if (t.charAt(j)!=s.charAt(i+j)) break;
			if (j==t.length-1) {
				if (cou<10) res+=i.toString()+" ";
				cou++;
			}
		}
var a=new Date();
var time=a-b;
WSH.echo("brute force:\n"+res+"\nВхождения: "+cou+"\nВремя выполнения: "+time+"ms");
var k1=0, k=0, gs=0, hs=0, g=0, h=0, res="";
var b=new Date();
for (var i=0;i<t.length;i++) {
	h+=t.charCodeAt(i);
	g+=s.charCodeAt(i);
}
cou=0;
for (var i=0;i<s.length;i++) {
	if (i>0) g+=s.charCodeAt(i+t.length-1)-s.charCodeAt(i-1);
	if (g==h) {
		var ind=check(s, t, i);
		if (!ind) k++;
		else if (cou<10) {
			res+=i.toString()+" ";
			cou++;
		} else cou++;
	}
}
var a=new Date();
var time=a-b;
WSH.echo("\nhash simple:\n"+res+"\nКоллизии: "+k+""+"\nВхождения: "+cou+"\nВремя выполнения: "+time+"ms");
cou=0;
res="";
var b=new Date();
for (var i=0;i<t.length;i++) {
	hs+=t.charCodeAt(i)*t.charCodeAt(i);
	gs+=s.charCodeAt(i)*s.charCodeAt(i);
}
for (var i=0;i<s.length;i++) {
	if (i>0) gs+=s.charCodeAt(i+t.length-1)*s.charCodeAt(i+t.length-1)-s.charCodeAt(i-1)*s.charCodeAt(i-1);
	if (gs==hs) {
		var ind=check(s, t, i);
		if (!ind) k1++;
		else if (cou<10) {
			res+=i.toString()+" ";
			cou++;
		} else cou++;
	}
}
var a=new Date();
var time=a-b;
WSH.echo("\nhash squared:\n"+res+"\nКоллизии: "+k1+"\nВхождения: "+cou+"\nВремя выполнения: "+time+"ms"+"\n\nhash Rabin-Karp:");
var g=0, h=0, k=0, res="", cou=0;
var b=new Date();
var power=Math.pow(2, t.length-1);
for (var i=1;i<t.length+1;i++) {
	h+=t.charCodeAt(i-1)*power;
	g+=s.charCodeAt(i-1)*power;
	power/=2;
}
for (var i=0;i<s.length;i++) {
	if (i>0) g=(g-s.charCodeAt(i-1)*Math.pow(2, t.length-1))*2+s.charCodeAt(i+t.length-1);
	if (g==h) {
		var ind=check(s, t, i);
		if (!ind) k++;
		else if (cou<10) {
			res+=i.toString()+" ";
			cou++;
		} else cou++;
	}
}
var a=new Date();
var time=a-b;
WSH.echo(res+"\nКоллизии: "+k+"\nВхождения: "+cou+"\nВремя выполнения: "+time+"ms");
















