export function secondsToHms(d:any) {
	d = Number(d);
	// var h = Math.floor(d / 3600);
	var m = Math.floor(d % 3600 / 60);
	var s = Math.floor(d % 3600 % 60);
  
	// var hDisplay = h > 9 ? h   : "0"+h;
	var mDisplay = m > 9 ? m  : "0"+m;
	var sDisplay = s > 9 ? s  : "0"+s;
	return  mDisplay +": "+ sDisplay ; 
  }