var AI = function(list){
    this.list = list;
    this.dominant = null;
    
    return this;
}
AI.prototype.addAIComponent = function(component){
    this.list.push(component);
}
AI.prototype.makeDominant = function(component){
    this.dominant = component;
}
AI.prototype.removeDominant = function(){
    this.dominant = null;
}
AI.prototype.update = function(gameObject){
    if(this.dominant){
        this.dominant.update(gameObject, this);
    }
    else{
        for(i = 0; i < this.list.length; i++) {
            this.list[i].update(gameObject, this);   
        }
    }
}
    
module.exports = AI;