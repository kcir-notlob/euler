//File cycle.js
//version 0.0.0.1
//simple function to solve 
//Eulerian circuits
//version 0.0.0.1
//assumes console.log is available 

function graph(g){
  var adj=[];
  var path="";


  function dump( message){
    console.log(message);

    for(var i=0; i<adj.length;i++){
      var s= i + "->";
      for(var j=0;j<adj[i].length; j++){
        s+="[";
        s+=adj[i][j];
        s+="] ";
      }
      console.log(s);
    }
  }


  function DFSCount(u,visited){

   visited[v]=true;
   var c=1;

   for(var i=0;i<adj[v];i++){
     if(adj[v][i]!=-1  && visited[adj[v][i]]){
       c+=DFSCount(adj[v][i],visited);
     }
   }
   return c;

  }

  function add(u,v){
    adj[u].push(v);
    adj[v].push(u);
    dump("after add:" + u + ":" + v);
  }


 
  function isValid(u,v){

    var count=0;

    for(var i=0;i<adj[u].length;i++){
      if(adj[u][i]!==-1){
        count++;
      }
    }
    if(count===1){
      return true;
    }


    var visited=[];
    var count1=DFSCount(u,visited);


    rmv(u,v);
    visited=[];
    var count2=DFSCount(u,visited);

    add(u,v);


    
    //addAdj(u,v);
    
   if(count1>count2){
     return false;
   }

   return true;
  }

  function rmv(u,v){
    for(var i=0;i<adj[u].length;i++){
      if(adj[u][i]===v){
        adj[u][i]=-1;
      }
    }

    for(var i=0;i<adj[v].length;i++){
      if(adj[v][i]===u){
        adj[v][i]=-1;
      }
    }
    dump("after remove:" + u + ":" + v);


  }

   //walk the path
   function walk(u){
     for(var i=0;i<adj[u].length;i++){
       var v=adj[u][i];
       if(v!=-1 && isValid(u,v)){
         path+= "[" + u + ']->[' + v + '] ';
         rmv(u,v);
         walk(v);
       }

     }

   }

  // check the array exits or create it and chain it
  function check(a,i){
    if(a[i]===undefined){
      a[i]=[];
    }
    return(a[i]);
  }

  console.log("building");
  for(var i=0;i<g.length;i+=2){
    var u=g[i];
    var v=g[i+1];

    console.log("building:[" + u + "]<->[" + v + "]");

   check(adj,u).push(v);
   check(adj,v).push(u);

  }
  console.log("finished building");
  dump("inital state");





  //find any odd degree node or use the first
  var u=0;
  for(var i=0;i<adj.length;i++){
    if(adj[i].length & 1){
      u=i;
      break;
    }
  }
  walk(u);
  console.log("final path is:" + path);
  return path;

}


//testing
//construct a graph
//start and end node pairs

//var g1=[
//  0,1,
//  1,2,
//  2,3,
//  1,3,
//  1,4,
//  4,0,
//  4,5,
//  5,3,
//  4,3
//]
//

var g1=[
  0,1,
  0,3,
  0,2,
  0,6,
  1,5,
  1,3,
  1,4,
  2,3,
  2,5,
  2,6,
  3,4,
  3,6,
  3,7,
  4,7,
  4,8,
  5,6,
  6,7,
  7,8

]

graph(g1);









