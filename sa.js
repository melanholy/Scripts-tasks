var fso = new ActiveXObject("Scripting.FileSystemObject")
var ts = fso.OpenTextFile("pin.txt")
var S=ts.ReadAll()
var n=S.length
var list="()+-*/"
var order= new Array()
var stack= new Array()
var result=new Array()
for (var i=0; i<list.length; i++)
{
order[list.charAt(i)]=WScript.StdIn.ReadLine()
}
for (var i=0;i<n;i++)
{
if (order[S.charAt(i)]==undefined)
result.push(S.charAt(i))
else
{
if (S.charAt(i)=='(')
stack.push(S.charAt(i))
else if (S.charAt(i)==')')
{
while ((stack[stack.length-1]!='(')&&(stack.length!=0))
{
var swap=stack[stack.length-1]
stack.pop()
result.push(swap)
}
if (stack.length==0)
throw("Wrong operand")
stack.pop()
}
else 
{
while ((order[S.charAt(i)]<=order[stack[stack.length-1]])&&(stack.length!=0))
{
var swap=stack[stack.length-1]
stack.pop()
result.push(swap)
}
stack.push(S.charAt(i))
}
}
}
while (stack.length!=0)
{
var swap=stack[stack.length-1]
stack.pop()
result.push(swap)
}
var res= result.join("")
WScript.echo(res)