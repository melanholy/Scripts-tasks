function Contains(text, ch) {
	for (var i=0;i<text.length;i++)
		if (text.charAt(i)==ch) return true;
	return false;
}

var FSO = new ActiveXObject("Scripting.FileSystemObject");
f = FSO.OpenTextFile("hin.txt");
var input = f.ReadAll();
f.close();
var dic = new ActiveXObject("Scripting.Dictionary");
Text = new Array();
Count = new Array();
Left = new Array();
Right = new Array();
Parent = new Array();
for (var i=0; i<input.length; i++) {
	if (!dic.Exists(input.charAt(i))) dic.Add(input.charAt(i), 1);
	else dic(input.charAt(i))++;
}
WSH.echo("Таблица частот:");
var sum = 0, a = (new VBArray(dic.Keys())).toArray();
for (var i=0;i<a.length;i++) {
	Text[i]=a[i];
	Count[i]=dic(a[i]);
	Parent[i]="";
	Left[i]="";
	Right[i]="";
	sum+=dic(a[i]);
	var k=i+1;
}
for (var i=0; i<dic.Count;i++)
	WSH.echo(a[i] + " - " + dic(a[i]));
while (true) {
	var o=sum+1, res1="";
	for (var i=0;i<Text.length;i++)
		for (var j=i+1;j<Text.length;j++)
			if (Count[i]+Count[j]<o && Parent[i]=="" && Parent[j]=="") {
				res1=i.toString() + " " + j.toString();
				o=Count[i]+Count[j];
			}
	if (res1!="") {
		Count[k]=Count[res1.split(" ")[0]] + Count[res1.split(" ")[1]];
		Text[k]=(Text[res1.split(" ")[0]]).toString() + (Text[res1.split(" ")[1]]).toString();
		Left[k]=res1.split(" ")[0];
		Right[k]=res1.split(" ")[1];
		Parent[res1.split(" ")[0]]=k;
		Parent[res1.split(" ")[1]]=k;
		Parent[k]="";
		k++;
	} else break;
}
var dic1 = new ActiveXObject("Scripting.Dictionary"), dic2 = new ActiveXObject("Scripting.Dictionary"), l=k-1;
for (var i=0; i<a.length;i++) {
	var d="";
	k=l;
	while (true) {
		if (Text[k].length==1) break;
		if (Contains(Text[Left[k]], a[i])) {
			d+="0";
			k=Left[k];
		} else {
			d+="1";
			k=Right[k];
		}
	}
	dic1.Add(a[i], d);
	dic2.Add(d, a[i]);
}
WSH.echo("Коды символов:");
var a = (new VBArray(dic1.Keys())).toArray();
for (var i=0; i<dic.Count;i++)
	WSH.echo(a[i] + " - " + dic1(a[i]));
WSH.echo("Закодированный текст:");
res1="";
for (var i=0;i<input.length;i++)
	res1+=dic1(input.charAt(i));
WSH.echo(res1);
WSH.echo("Декодированный текст:");
var mem="", res2="";
for (var i=0;i<res1.length;i++) {
	mem+=res1.charAt(i);
	var love=mem.toString();
	if (dic2.Exists(love)) {
		res2+=dic2(love);
		mem="";
	}
}
WSH.echo(res2);