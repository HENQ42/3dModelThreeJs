var init = function() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Define a extensão do seu ambiente.
    var extent = 10;

    // Cria quatro luzes direcionais e as posiciona nos quatro cantos, apontando para o centro.
    var directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight1.position.set(-extent, extent, -extent);
    directionalLight1.target.position.set(0, 0, 0);
    scene.add(directionalLight1);

    var directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight2.position.set(extent, extent, -extent);
    directionalLight2.target.position.set(0, 0, 0);
    scene.add(directionalLight2);

    var directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight3.position.set(-extent, extent, extent);
    directionalLight3.target.position.set(0, 0, 0);
    scene.add(directionalLight3);

    var directionalLight4 = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight4.position.set(extent, extent, extent);
    directionalLight4.target.position.set(0, 0, 0);
    scene.add(directionalLight4);

    // Uma luz ambiente.
    var ambientLight = new THREE.AmbientLight(0x404040, 0.7);
    scene.add(ambientLight);

    // Cria um novo STLLoader
    loaderStl = new THREE.STLLoader();
    loaderPly = new THREE.PLYLoader();
    loaderObj = new THREE.OBJLoader();


    // Controles de câmera
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    camera.position.set( 0, 20, 100 );
    controls.update();

    // Substitua as URLs pelos caminhos dos seus arquivos STL
    loadAndRenderStlFile('/modelos3d/Teste LowerJawScan.stl', '/modelos3d/Teste UpperJawScan.stl'); // Carrega os modelos STL

    animate();
};

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
}

function render() {
    renderer.render(scene, camera);
}

var meshes = []; // Armazena as malhas dos modelos

var loadAndRenderStlFile = function(url1, url2) {
    // Carrega o primeiro arquivo STL
    if(url1.endsWith('.stl') && url1) {
    loaderStl.load(url1, function(geometry1) {
        var material = new THREE.MeshStandardMaterial({
            color: 0x808080,
            side: THREE.DoubleSide,
            metalness: 0,
            roughness: 1,
        });
        var mesh1 = new THREE.Mesh(geometry1, material);
        meshes.push(mesh1);
        scene.add(mesh1);
        });
    };

    // Carrega o segundo arquivo STL
    if(url2.endsWith('.stl') && url2) {
    loaderStl.load(url2, function(geometry2) {
        var material = new THREE.MeshStandardMaterial({
            color: 0x808080,
            side: THREE.DoubleSide,
            metalness: 0,
            roughness: 1,
        });
        var mesh2 = new THREE.Mesh(geometry2, material);

        // Supondo que os modelos STL estejam alinhados para se sobrepor corretamente
        //mesh2.position.y = -10; // Supondo que os modelos STL estejam alinhados para se sobrepor corretamente
        // e que você queira deslocar o segundo modelo para baixo ao longo do eixo y
        meshes.push(mesh2);
        scene.add(mesh2);
        });
    };

    // Carrega o primeiro arquivo PLY
    if(url1.endsWith('.ply') && url1) {
        loaderPly.load(url1, function(geometry1) {
            var material = new THREE.MeshStandardMaterial({
                color: 0x808080,
                side: THREE.DoubleSide,
                metalness: 0,
                roughness: 1,
            });
            var mesh1 = new THREE.Mesh(geometry1, material);
            meshes.push(mesh1);
            scene.add(mesh1);
        });
    }

    // Carrega o segundo arquivo PLY
    if(url2.endsWith('.ply') && url2) {
        loaderPly.load(url2, function(geometry2) {
            var material = new THREE.MeshStandardMaterial({
                color: 0x808080,
                side: THREE.DoubleSide,
                metalness: 0,
                roughness: 1,
            });
            var mesh2 = new THREE.Mesh(geometry2, material);

            // Supondo que os modelos PLY estejam alinhados para se sobrepor corretamente
            // e que você queira deslocar o segundo modelo para baixo ao longo do eixo y
            meshes.push(mesh2);
            scene.add(mesh2);
        });
    }

    // Carrega o primeiro arquivo OBJ
    if(url1.endsWith('.obj') && url1) {
        loaderObj.load(url1, function(object1) {
            var material = new THREE.MeshStandardMaterial({
                color: 0x808080,
                side: THREE.DoubleSide,
                metalness: 0,
                roughness: 1,
            });

            object1.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = material;
                }
            });

            meshes.push(object1);
            scene.add(object1);
        });
    }

    // Carrega o segundo arquivo OBJ
    if(url2.endsWith('.obj') && url2) {
        loaderObj.load(url2, function(object2) {
            var material = new THREE.MeshStandardMaterial({
                color: 0x808080,
                side: THREE.DoubleSide,
                metalness: 0,
                roughness: 1,
            });

            object2.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = material;
                }
            });

            meshes.push(object2);
            scene.add(object2);
        });
    }
};

window.onload = init;