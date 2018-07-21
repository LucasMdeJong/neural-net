sigm=function(arr){
	let out=[];
	for(let i=0;i<arr.length;i++){
		out.push(1/(1+Math.E**(-arr[i])));
	};
	return out;
}


class neuralNet{
	constructor(inpNodes,hidNodes,outNodes,learnRate){
		this.inpn=inpNodes;
		this.hidn=hidNodes;
		this.outn=outNodes;
		this.lr=learnRate;
		
		let weightsarr=[];
		let nodes=[inpNodes].concat(hidNodes,outNodes);
		let u=0;
		for(let k=0;k<nodes.length-1;k++){
			weightsarr[k]=[];
			for(let i=0;i<nodes[k+1];i++){
				for(let j=0;j<hidNodes[k];j++){
					u=0;
					while(u===0) u=Math.random()*2-1;
					weightsarr[k].push(u);
				};
			};
			this.weights[k]=new matrix(nodes[k+1],nodes[k],weightsarr[k]);
		};
	}
	
	train(input,output){
		if(input.length!==this.inpn) throw "Number of inputs must agree."
		if(output.length!==this.outn) throw "Number of outputs must agree."
		
		let inputM=new matrix(input.length,1,input);
		let outputM=new matrix(output.length,1,output);
		let inp=[];
		let out=[];
		for(let k=0;k<this.hidn.length+2;k++){
			if(k=0){
				inp[0]=inputM;
				out[0]=inputM;
				continue;
			};
			inp[k]=matrix.dot(this.weights[k-1],out[k-1]);
			out[k]=new matrix(inp[k].size[0],inp[k].size[1],sigm(inp[k].cells));
		};
		let err=[];
		for(let k=this.hidn.length+1;k>=0;k--){
			if(k=this.hidn.length+1) {
				err[k]=matrix.substract(outputM,out[k]);
				continue;
			};
			err[k]=matrix.dot(weights[k].transpose(),err[k+1]);
		};
		let update=0;
		let lr=new matrix(1,1,[this.lr]);
		for(let k=0;k<this.hidn.length+1;k++){
			this.weights[k]=sum(this.weights[k],matrix.multiply(lr,matrix.dot(matrix.multiply(err[k+1],matrix.substract(out[k+1],matrix.multiply(out[k+1],out[k+1]))),out[k].transpose())));
			//                   weight   +                      lr      *                    err*                              (Ok-Ok^2)                            *Oj^t       
		};
		
		
	}
	
	think(input){
		if(input.length!==this.inpn) throw "Number of inputs must agree."
		
		let inputM=new matrix(input.length,1,input);
		let inp=[];
		let out=[];
		for(let k=0;k<this.hidn.length+2;k++){
			if(k=0){
				inp[0]=inputM;
				out[0]=inputM;
				continue;
			};
			inp[k]=matrix.dot(this.weights[k-1],out[k-1]);
			out[k]=new matrix(inp[k].size[0],inp[k].size[1],sigm(inp[k].cells));
		};
		return out[this.hidn.length+1].cells;
		
	}
	
}
