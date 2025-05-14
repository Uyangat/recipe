import uniqid from "uniqid"

export default class List{
    constructor(){
        this.items = [];
    }

    deleteItem(id){
        //Id gedeg ID-tai ortsiin index-iig massiv-aas haij olno
        const index = this.items.findIndex(el => el.id === id);
        //Ug index deerji elementiig massiv-aas ustgana
        this.items.splice(index, 1);
    }

    addItem(item){
        let newItem ={
              id : uniqid(),
            item 
        };
        this.items.push(newItem);

        return newItem;
    }
};