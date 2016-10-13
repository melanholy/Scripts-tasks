function lalala() {
	
}
var FSO = new ActiveXObject("Scripting.FileSystemObject");
f = FSO.OpenTextFile("pin.txt");
var inp = f.ReadAll(), result="", stack = new Array(), a=0;
f.close();
WSH.echo(inp);
for (var i=0; i<inp.length; i++) {
	if (inp.charAt(i)/1==inp.charAt(i)) result+=inp.charAt(i);
	else {
		if (inp.charAt(i)=="+" || inp.charAt(i)=="-") 
			if (stack.length==0 || stack[stack.length-1]=="(") 
				stack.push(inp.charAt(i));
			else {
				result+=stack.pop();
				stack.push(inp.charAt(i));
			}
		if (inp.charAt(i) == "(") stack.push(inp.charAt(i));
		if (inp.charAt(i) == "*" || inp.charAt(i) == "/") 
			if (stack[stack.length-1] == "/" || stack[stack.length-1] == "*") {
				result+=stack.pop();
				stack.push(inp.charAt(i));
			}
			else stack.push(inp.charAt(i));
		if (inp.charAt(i) == ")") 
			if (stack.length==0) {
				a=1;
				break;
			} 
			else if (stack[stack.length-1] == "(") 
				stack.pop();
		else {
			while (stack[stack.length-1] != "(")
				if (stack.length == 0) {
					a=1;
					break;
				} 
				else result+=stack.pop();
			stack.pop();
		}
		if (a==1) break;
	}
}
while (stack.length!=0)
	if (stack[stack.length-1] != "(") result+=stack.pop();
	else {
		a=1;
		break;
	}
if (a==1) WSH.echo("invalid expression");
else {
	WSH.echo(result);
	for (var i=0; i<result.length; i++)
		if (result.charAt(i)/1==result.charAt(i)) stack.push(result.charAt(i));
		else {
			var a=stack.pop().toString();
			stack.push(eval(stack.pop().toString()+result.charAt(i).toString()+a));
		}
	WSH.echo("Result: " + stack);
}