acre.require('/test/lib').enable(this);

// not all acre instances might have this API present so check to make sure
if (typeof appengine != "undefined" && appengine.tasks) {

    test('appengine.tasks exists and has all the pieces', function() {
        ok(typeof appengine.tasks != "undefined", "task queue exists");
        ok(typeof appengine.tasks.add == "function", "tasks.add exists");
    });
    
    test('appengine.tasks add works with no parameters', function() {
        try {
            appengine.tasks.add({});
            ok(true,"exception wasn't triggered");
        } catch (e) {
            console.log(e);
            ok(false,"exception was triggered");
        }
    });

    test('appengine.tasks add works with countdown and GET method', function() {
        try {
            appengine.tasks.add({
                "name" : "test-task-1-" + (new Date()).getTime(),
                "countdown" : 1000,
                "url" : "/acre/status",
                "method" : "GET",
                "headers" : {
                   "x-something" : "somewhat",
                   "foo" : "bar"
                },
                "params" : {
                    "this" : "that",
                    "foo" : "bar"
                }
            });
            ok(true,"task was added");
        } catch (e) {
            console.log(e);
            ok(false,"exception was triggered");
        }
    });

    test('appengine.tasks add works with eta and POST method', function() {
        try {
            appengine.tasks.add({
                "name" : "test-task-2-" + (new Date()).getTime(),
                "eta" : (new Date()).getTime() + 2000,
                "url" : "/acre/status",
                "method" : "POST",
                "headers" : {
                   "x-something" : "somewhat",
                   "foo" : "bar"
                },
                "payload" : "whatever",
                "payload_encoding" : "ISO-8859-1"
            });
            ok(true,"task was added");
        } catch (e) {
            console.log(e);
            ok(false,"exception was triggered");
        }
    });
    
    test('appengine.tasks add works with countdown and GET method on a special queue', function() {
        try {
            appengine.tasks.add({
                "name" : "test-task-1-" + (new Date()).getTime(),
                "countdown" : 1000,
                "url" : "/acre/status",
                "method" : "GET",
                "headers" : {
                   "x-something" : "somewhat",
                   "foo" : "bar"
                },
                "params" : {
                    "this" : "that",
                    "foo" : "bar"
                }
            },"test");
            ok(true,"task was added");
        } catch (e) {
            console.log(e);
            ok(false,"exception was triggered");
        }
    });

    test('appengine.tasks add to an unknown queue throws', function() {
        try {
            appengine.tasks.add({
                "name" : "test-task-1-" + (new Date()).getTime(),
                "countdown" : 1000,
                "url" : "/acre/status",
                "method" : "GET",
                "headers" : {
                   "x-something" : "somewhat",
                   "foo" : "bar"
                },
                "params" : {
                    "this" : "that",
                    "foo" : "bar"
                }
            },"blah");
            ok(false,"task was added");
        } catch (e) {
            ok(true,"exception was triggered");
        }
    });

    test('appengine.tasks add to an unknown queue throws', function() {
        try {
            appengine.tasks.add({
                "name" : "test-task-1-" + (new Date()).getTime(),
                "countdown" : 1000,
                "url" : "/acre/status",
                "method" : "GET",
                "headers" : {
                   "x-something" : "somewhat",
                   "foo" : "bar"
                },
                "params" : {
                    "this" : "that",
                    "foo" : "bar"
                }
            },"blah");
            ok(false,"task was added");
        } catch (e) {
            ok(true,"exception was triggered");
        }
    });

    test('appengine.tasks add with undefined headers throws', function() {
        try {
            appengine.tasks.add({
                "name" : "test-task-1-" + (new Date()).getTime(),
                "countdown" : 1000,
                "url" : "/acre/status",
                "method" : "GET",
                "headers" : {
                   "x-something" : "somewhat",
                   "foo" : "bar",
                   "whatever" : undefined
                },
                "params" : {
                    "this" : "that",
                    "foo" : "bar"
                }
            },"blah");
            ok(false,"task was added");
        } catch (e) {
            ok(true,"exception was triggered");
        }
    });

    test('appengine.tasks add with undefined params throws', function() {
        try {
            appengine.tasks.add({
                "name" : "test-task-1-" + (new Date()).getTime(),
                "countdown" : 1000,
                "url" : "/acre/status",
                "method" : "GET",
                "headers" : {
                   "x-something" : "somewhat",
                   "foo" : "bar"
                },
                "params" : {
                    "this" : "that",
                    "foo" : "bar",
                    "whatever" : undefined
                }
            },"blah");
            ok(false,"task was added");
        } catch (e) {
            ok(true,"exception was triggered");
        }
    });
    
}

acre.test.report();
