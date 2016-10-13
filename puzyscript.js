var FSO = new ActiveXObject('Scripting.FileSystemObject')
Args = WSH.Arguments;
var s='', ip=0, mem = new Array(), prog = FSO.OpenTextFile(Args(0)+".txt")
while (!prog.AtEndOfStream)
	s+=prog.ReadLine()+' '
s+='Byebye'
mem=s.split(' ')
var a=0
while(mem[ip]!='Byebye')
	switch(mem[ip]) {
		case 'TinkyWinky':
			if (a==1) WScript.Echo("Don't mess with me! Type goddamn number or I will hug you to death")
			else WScript.Echo('Type your number')
			mem[mem[ip+1]]=parseInt(WScript.StdIn.ReadLine())
			ip=parseInt(ip)+2
			break
	    case 'PuppetMan':
	        WScript.Echo(mem[mem[ip + 1]])
		    if (mem[mem[ip + 1]] < mem[ip + 2] || mem[mem[ip + 1]] / 1 != mem[mem[ip + 1]] || Args(0) == 'puzyfac' && mem[mem[ip + 1]] > 170) {
				WScript.Echo("You've typed wrong shit")
				a=1
				ip=parseInt(mem[ip+3])
				break
			}
			else ip=parseInt(ip)+4
			break
		case 'Dipsy':
			if (mem[ip+2]==0) mem[mem[ip+1]]=mem[ip+3]
			else mem[mem[ip+1]]=mem[mem[ip+3]]
			ip=parseInt(ip)+4
			break
		case 'TalkingFlower':
			mem[mem[ip+3]]=mem[mem[ip+1]]-mem[mem[ip+2]]
			ip=parseInt(ip)+4
			break			
		case 'LittleBoPeep':
			ip=parseInt(ip)+1
			break
		case 'BabySun':
			mem[mem[ip+1]]=parseInt(mem[mem[ip+1]])+1
			ip=parseInt(ip)+2
			break
		case 'LaaLaa':
			switch (mem[ip+3]) {
				case '0':
					if (parseInt(mem[mem[ip+1]])<=mem[mem[ip+2]]) ip=parseInt(ip)+5
					else ip=parseInt(mem[ip+4])
					break
				case '!1':
					if (mem[mem[ip+1]]==mem[mem[ip+2]]) ip=parseInt(mem[ip+4])
					else ip=parseInt(ip)+5
					break
				case '!0':
					if (parseInt(mem[mem[ip+1]])>mem[mem[ip+2]]) ip=parseInt(ip)+5
					else ip=parseInt(mem[ip+4])
					break
			}
			break
		case 'Noonoo':
			mem[mem[ip+3]]=mem[mem[ip+1]]*mem[mem[ip+2]]
			ip=parseInt(ip)+4
			break
		case 'LittleLamb':
			ip=parseInt(mem[ip+1])
			break
		case 'Po':
			if (a!=1) WScript.Echo("Here's your answer:",mem[mem[ip+1]]) 
			else WScript.Echo("Here's your stupid answer:",mem[mem[ip+1]]) 
			ip=parseInt(ip)+2
			break
		case 'Byebye':
			WScript.Echo('Bye-bye!')
			WScript.Quit() 
	}