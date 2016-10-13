var FSO = new ActiveXObject("Scripting.FileSystemObject");
Args = WSH.Arguments;
f = FSO.OpenTextFile(Args(0)+".txt");
var input = f.ReadAll()
f.close();


if (Args(0)=="EncodeEsc") { 
	var lastSymbol=input.charAt(0), result="", escSymbol="#", counter=1;
	for (var i=1; i<=input.length-1; i++) {
		if (lastSymbol==input.charAt(i)) counter++; else {
			if (escSymbol!=lastSymbol) {
				if (counter>3) {
					if (counter>255) {
						for (var t=0;t<Math.floor((counter)/255);t++)
							result+=escSymbol+String.fromCharCode(255)+lastSymbol;
						result+=escSymbol+String.fromCharCode(counter%255)+lastSymbol;
					} else result+=escSymbol+String.fromCharCode(counter)+lastSymbol;
				} 
				else for (var j=0; j<counter; j++) result+=lastSymbol;
			} else result+=escSymbol+String.fromCharCode(counter)+escSymbol;
			lastSymbol=input.charAt(i);
			counter=1;
		}
	if (i==input.length-1) {
		if (escSymbol==lastSymbol) result+=escSymbol+String.fromCharCode(counter)+escSymbol;
		else {
			if (counter>3) result+=escSymbol+String.fromCharCode(counter)+lastSymbol;
		else for (var j=1; j<=counter; j++) result+=lastSymbol;
		}
	}
}
var k = FSO.OpenTextFile("output.txt", 2, true);
k.WriteLine(result);
k.Close();
}


if (Args(0)=="DecodeEsc") {
	var result="", escSymbol="#", mem="";
	for (var i=0; i<input.length; i++) {
		if (input.charAt(i)==escSymbol) {
			for (var j=0; j<input.charCodeAt(i+1); j++)
				result+=input.charAt(i+2);
			mem+=input.charCodeAt(i+1)+" ";
			i+=2;
		} else result+=input.charAt(i);
	}
	var k = FSO.OpenTextFile("output.txt", 2, true);
	k.WriteLine(result);
	k.write(mem);
	k.Close();
}

if (Args(0)=="EncodeJump") {
	var result="", counter=0, mem="", k=0;
	for (var i=0; i<=input.length-1; i++) {
		if (input.charAt(i)==input.charAt(i+1)) counter++;
		else if (counter!=0) {
				if (counter+1>127) {
					for (var t=0;t<Math.floor((counter+1)/127);t++)
						result+=String.fromCharCode(127)+input.charAt(i-1);
					result+=String.fromCharCode((counter+1)%127)+input.charAt(i-1);
				} else result+=String.fromCharCode(counter+1)+input.charAt(i-1);
				counter=0;
			} else if (input.charAt(i)!=input.charAt(i-1)) mem+=input.charAt(i);
		if (counter==1&&mem.length!=0) {
			if (mem.length+127>254) {
			for (var t=0;t<Math.floor((mem.length+127)/254);t++) {
				result+=String.fromCharCode(253);
				for (var n=t*254;n<254+t*254;n++) {
					result+=mem.charAt(n);
					k=n;
				}	
			}
			result+=String.fromCharCode((mem.length)%254+90);
			for (var n=k+1;n<mem.length;n++)
				result+=mem.charAt(n);
		} else result+=String.fromCharCode(mem.length+90)+mem;
			mem="";
		}
	}
	if (mem!="") 
		if (mem.length+127>254) {
			for (var t=0;t<Math.floor((mem.length+127)/254);t++) {
				result+=254;
				for (var n=t*254;n<254+t*254;n++) {
					result+=mem.charAt(n);
					k=n;
				}	
			}
			result+=String.fromCharCode((mem.length)%254+127);
			for (var n=k+1;n<mem.length;n++)
				result+=mem.charAt(n);
		} else result+=String.fromCharCode(mem.length+127)+mem;
	var k = FSO.OpenTextFile("output.txt", 2, true);
	k.WriteLine(result);
	k.Close();
}

if (Args(0)=="DecodeJump") {
	var result="", counter=0,number="";
	for (var i=0; i<=input.length; i++) {
		if (input.charAt(i)>=0&&input.charAt(i)<10) 
			if (input.charAt(i-1)>="a"&&input.charAt(i-1)<="z"&&i!=1) {
				number="";
				number+=input.charAt(i);
			} else number+=input.charAt(i);
		else {
			if (number<128) for (var j=0; j<number;j++) {
				result+=input.charAt(i);
				if (j==number-1) number="";
			} else result+=input.charAt(i);
		}
	}
	var k = FSO.OpenTextFile("output.txt", 2, true);
	k.WriteLine(result);
	k.Close();
}