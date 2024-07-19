var createScene = function () {
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3.Black(); 

    var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    // var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);

    var textureURLs = [
        "https://example.come/texture1", // blank texture (on purpose)
    ];

    
    var textures = textureURLs.map(function(url) {
        return new BABYLON.Texture(url, scene);
    });

    // main Cube
    var cube = BABYLON.MeshBuilder.CreateBox("cube", { size: 4 }, scene);
    cube.position = new BABYLON.Vector3(0, 1, 0); 

    //second Cube
    var cube2 = BABYLON.MeshBuilder.CreateBox("cube", { size: 4 }, scene);
    cube2.position = new BABYLON.Vector3(0, 1, -20);
    var texture2 = new BABYLON.Texture("https://i1.sndcdn.com/artworks-z1uZrU59JAqSMbRY-2MOcwQ-t1080x1080.jpg", scene);
    var material2 = new BABYLON.StandardMaterial("material2", scene);
    material2.diffuseTexture = texture2;
    cube2.material = material2;

    cube2.rotation.y = Math.PI;
    cube2.rotation.x= Math.PI/9;

    
    function applyRandomTexture() {
        var randomIndex = Math.floor(Math.random() * textures.length);
        var material = new BABYLON.StandardMaterial("texture", scene);
        material.diffuseTexture = textures[randomIndex];
        cube.material = material;
    }

    
    applyRandomTexture();

    
    setInterval(function() {
        applyRandomTexture();
    }, 2000); 

    
    scene.registerBeforeRender(function () {
        cube.rotation.y += 0.01; 
    });

    return scene;
};
