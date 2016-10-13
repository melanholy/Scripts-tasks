var FSO = new ActiveXObject("Scripting.FileSystemObject");
f = FSO.OpenTextFile("bmin.txt");
var t="There", input = f.ReadAll();;
f.close();
var t="There", alph=new Array(), del=new Array(), z=0, answer="";
for(i=0; i<t.length; i++) alph[t.charAt(i)]=0;
for (j=0; j<=t.length; j++) del[j]=new Array();
for (i in alph) del[0][i]=0;
for (j=0; j<t.length; j++) {
	prev=del[j][t.charAt(j)];
	del[j][t.charAt(j)]=j+1;
	for(i in alph) del[j+1][i]=del[prev][i];
}
for (j=0; j<=t.length; j++) {
	out="";
	for (i in alph) out+=del[j][i]+" ";
	WSH.echo(out);
}
for (var i=0;i<input.length;i++) {
	if (del[z][input.charAt(i)]==undefined) z=0;
	else z=del[z][input.charAt(i)];
	if (z==t.length) answer+=(i-t.length+1).toString()+" ";
}
WSH.echo("\nAnswer: "+answer);