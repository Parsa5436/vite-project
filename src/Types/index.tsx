export type TaskT = {
	id: string;
	title: string;
	description: string;
	priority: string;
	deadline: number;
	image?: string;
	alt?: string;
	tags: { title: string; bg: string; text: string }[];
};

export type Columns = {
	[key: string]: Column;
};
export interface Column {
	name: string;
	items: string[];
  }
  
  export interface Board {
	id: string;
	name: string;
	columns: {
	  [key: string]: Column;
	};
  }
  

