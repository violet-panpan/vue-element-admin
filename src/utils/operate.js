
/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
function add0(m){
	return m<10?'0'+m:m 
}
export default function formatTime(time) {
	console.log("zjesodd");
	console.log(typeof time);
	var date =  new Date(time);
    var y = 1900+date.getYear();
    var m = "0"+(date.getMonth()+1);
    var d = "0"+date.getDate();
    var h=date.getHours();
    var mi=date.getMinutes();
    var s=date.getSeconds();
    return y+"-"+m.substring(m.length-2,m.length)+"-"+
    d.substring(d.length-2,d.length)+' '+add0(h)+':'+add0(mi)+':'+add0(s);
}



