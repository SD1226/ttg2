var	pno = Number(localStorage.getItem("pno"));
var pname = localStorage.getItem("pname")
var boxes = document.getElementsByClassName("box");
var record = document.getElementById("record");
var preResult = 2;
var state = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var turns = 0;
function reset()
{
	document.getElementById("play").innerHTML = "Restart";
	for( var i = 0; i < 9; i++)
	{
		boxes[i].style.backgroundImage = "none";
		state[i] = 0;
	}
	preResult = 2;
	turns = 0;
}
function check(n)
{
	if((state[0] === n)&&(state[1] === n)&&(state[2] === n))
		return true;
	else if((state[3] === n)&&(state[4] === n)&&(state[5] === n))
		return true;
	else if((state[6] === n)&&(state[7] === n)&&(state[8] === n))
		return true;
	else if((state[0] === n)&&(state[3] === n)&&(state[6] === n))
		return true;
	else if((state[1] === n)&&(state[4] === n)&&(state[7] === n))
		return true;
	else if((state[2] === n)&&(state[5] === n)&&(state[8] === n))
		return true;
	else if((state[0] === n)&&(state[4] === n)&&(state[8] === n))
		return true;
	else if((state[2] === n)&&(state[4] === n)&&(state[6] === n))
		return true;
	else
		return false;
}
function cMark()
{
	var i = 0;
	while(i < 3)
	{
		if(state[i]+state[i+3]+state[i+6] === -2)
		{
			if(state[i]===0)
				return i;
			if(state[i+3]===0)
				return i+3;
			if(state[i+6]===0)
				return i+6;
		}
		if(state[3*i]+state[3*i+1]+state[3*i+2]===-2)
		{			
			if(state[3*i]===0)
				return 3*i;
			if(state[3*i+1]===0)
				return 3*i+1;
			if(state[3*i+2]===0)
				return 3*i+2;	
		}	
  		i++;
	}
	if(state[0]+state[4]+state[8] === -2)
	{
		if(state[0] === 0)
			return 0;
		if(state[4] === 0)
			return 4;	
		if(state[8] === 0)
			return 8;
	}		
	if(state[2]+state[4]+state[6] === -2)
	{
		if(state[2] === 0)
			return 2;
		if(state[4] === 0)
			return 4;	
		if(state[6] === 0)
			return 6;
	}		
	i = 0;
	while(i < 3)
	{
		if(state[i]+state[i+3]+state[i+6] === 2)
		{
			if(state[i]===0)
				return i;
			if(state[i+3]===0)
				return i+3;
			if(state[i+6]===0)
				return i+6;
		}
		if(state[3*i]+state[3*i+1]+state[3*i+2]===2)
		{			
			if(state[3*i]===0)
				return 3*i;
			if(state[3*i+1]===0)
				return 3*i+1;
			if(state[3*i+2]===0)
				return 3*i+2;	
		}	
  		i++;
	}
	if(state[0]+state[4]+state[8] === 2)
	{
		if(state[0] === 0)
			return 0;
		if(state[4] === 0)
			return 4;	
		if(state[8] === 0)
			return 8;
	}		
	if(state[2]+state[4]+state[6] === 2)
	{
		if(state[2] === 0)
			return 2;
		if(state[4] === 0)
			return 4;	
		if(state[6] === 0)
			return 6;
	}
	i=0;
	while(i<9)
	{
		if(state[i]===0)
			return i;
		i++;
	}
	return 0;
}
function oMark()
{
	var o = Number(this.id);
	if(state[o] === 0)
	{
	   boxes[o].style.backgroundImage = "url(o.png)";
	   state[o] = 1;
	   turns++;
	   if(check(1))
	   {
		   stop(1);
		   return;
	   }
	   if(turns < 9)
	   {
		   var c = cMark();
		   boxes[c].style.backgroundImage = "url(x.png)";
		   state[c] = -1; 
		   turns++;
		   if(check(-1))
		   {
			   stop(-1);
			   return;
		   }
	   }
	   if(turns === 9)
	   {
		   stop(0);
		   return;
	   }
	}
}
function start()
{	
    reset();
	if(pno === 2)
	{
		var c = Math.floor(Math.random()*6);
		boxes[c].style.backgroundImage = "url(x.png)";
	    state[c] = -1;
		turns++;
	}	
	for( var i = 0; i < 9; i++)
	{
		boxes[i].addEventListener("click", oMark);
	}
}
function stop(r)
{
	for( var i = 0; i < 9; i++)
	{
		boxes[i].removeEventListener("click", oMark);
	}
	var time = new Date();
	var message;
	var cla;
	if(r === 1)
	{
		message = "You Won!!";
		cla = "w";
	}
	else if(r === -1)
	{
		message = "You Lose.";
		cla = "l";
	}
	else
	{
		message = "Round Draw.";
		cla = "d";
	}
	record.innerHTML += "<tr><td class=\""+cla+"\">"+message+"</td><td class=\""+cla+"\">"+time.getHours()+":"+time.getMinutes()+"</td></tr>";
}
document.getElementById("gname").innerHTML = pname;
document.getElementById("play").onclick = start;