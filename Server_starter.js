let immediateApi = new Server();
immediateApi.start();


baseBackend.activateWaypoints();
baseBackend.startBackendTicks();
new ShadowRealm(map);
let draw = new Draw(drawingAllowed);


let magicConstant1 = -5;