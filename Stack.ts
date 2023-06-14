export default class  Stack{
	protected A : number[];
	protected tos : number;

	constructor(){
		this.A = [];
		this.tos = 0;
	}

	isEmpty = () : boolean => !this.tos;

	empty = () : void => {
		for(let i : number =0; i<this.tos; i++){
			delete this.A[i]; 
		}
		this.tos = 0;
	}

	push = (item : number) : void => {
		this.A[this.tos++] = item;
	}

	// pop = (): number => this.A[--this.tos];

	pop = (): number  => {
		if (this.isEmpty()) {
			return 0; // Return null when the stack is empty
		}
		return this.A[--this.tos]!;
	};

	peek = (): number | undefined => {
		if (this.isEmpty()) {
			return undefined; // Return null when the stack is empty
		}
		return this.A[this.tos - 1];
	}

	length = (): number => this.tos

	print = () : string => {
		let str:string = "";
		for(let i : number = this.tos-1; i>=0; i--){
			str += this.A[i] + "\n"; 
		}
		return str;
	}
}