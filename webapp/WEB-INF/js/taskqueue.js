
var augment;

(function() {

    augment = function (obj) {

        // augment the given object (normally the 'acre' object)
        
        obj.tasks = {
           "add" : add
        };

    };
    
    function add(obj,name) {
        if (obj instanceof Array) {
            obj.forEach(function(o) {
                add(o,name);
            });
        } else {
            if (typeof name == "undefined" || name == null) {
                name = "default";
            }
            _taskqueue.add(obj,name);
        }
    }

})();

