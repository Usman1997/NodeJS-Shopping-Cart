module.exports  =function Cart(OldCart) {
    this.items = OldCart.items || {};
    this.TotalPrice = OldCart.TotalPrice || 0;
    this.TotalQty  = OldCart.TotalQty || 0;

    this.add = function(item,id){

        var StoredItem  = this.items[id];
        if(!StoredItem){
            StoredItem = this.items[id] = {item:item,qty:0,price:0};
        }

        StoredItem.qty++;
        StoredItem.price = StoredItem.item.price * StoredItem.qty;
        this.TotalQty++;
        this.TotalPrice += StoredItem.item.price;

    };
    this.generateArray = function(){
        var arr = [];
        for(var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    }

    this.reduceByOne = function(id){
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.price;
        this.TotalQty--;
        this.TotalPrice -= this.items[id].item.price;

        if(this.items[id].qty <=0){
            delete this.items[id];
        }
    }

    this.removeItem = function(id){
        this.TotalQty -= this.items[id].qty;
        this.TotalPrice -=this.items.price;
        delete this.items[id];
    }
};