class Stack{
	constructor(){
		this.A = [];
		this.tos = 0;
	}

	isEmpty(){
		return !this.tos;
	}
	empty(){
		for(let i=0; i<this.tos; i++){
			delete this.A[i]; 
		}
		this.tos = 0;
	}

	push(item){
		this.A[this.tos++] = item; 
	}
	pop(){
		return this.A[--this.tos];
	}
	peek(){
		return this.A[this.tos-1];
	}
	length(){
		return this.tos;
	}
	print(){
		var str = "";
		for(let i=this.tos-1; i>=0; i--){
			str += this.A[i] + "\n"; 
		}
		return str;
	}
}