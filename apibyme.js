const axios=require("axios")
const fs=require("fs")
async function my_func(){
  var getdata = await axios.get("http://saral.navgurukul.org/api/courses ")
  const Data = getdata.data
  // console.log(Data);
  var w=JSON.stringify(Data)//put in json file
  fs.writeFileSync('apibyme.JSON',w)//write in json file
  var num=0
  let course_list = Data['availableCourses']
  for (i of course_list){
    console.log(num,i.name,i.id);
    var num=num+1
  }
  var user=require("readline-sync").question("**select the serial number:")
  var id = course_list[user]["id"]
  var ex= await axios.get("http://saral.navgurukul.org/api/courses/"+id+"/exercises")
  var b=JSON.stringify(ex.data)
  var slug=[]
  for (j in ex.data["data"]){
    console.log(j,ex.data["data"][j]["name"]);
    slug.push(ex.data["data"][j]["slug"])
  }    
  var slugname=require("readline-sync").questionInt("**Enter your slug number:")
  var sluglist=await axios.get(`http://saral.navgurukul.org/api/courses/${user}/exercise/getBySlug?slug=${slug[slugname]}`)
  
console.log(sluglist.data.content);

}
my_func()  
