var init = (...filePaths) => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    var container = document.getElementById('container');
    container.appendChild(renderer.domElement);

    // Defina a extensão do seu ambiente.
    var extent = 10;

    // Adicione uma luz ambiente para iluminar todos os lados do objeto.
    var ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Cria quatro luzes direcionais e as posiciona nos quatro cantos, apontando para o centro.
    var directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.45);
    directionalLight1.position.set(-extent, extent, -extent);
    directionalLight1.target.position.set(0, 0, 0);
    scene.add(directionalLight1);

    var directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.45);
    directionalLight2.position.set(extent, extent, -extent);
    directionalLight2.target.position.set(0, 0, 0);
    scene.add(directionalLight2);

    var directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.45);
    directionalLight3.position.set(-extent, extent, extent);
    directionalLight3.target.position.set(0, 0, 0);
    scene.add(directionalLight3);

    var directionalLight4 = new THREE.DirectionalLight(0xffffff, 0.45);
    directionalLight4.position.set(extent, extent, extent);
    directionalLight4.target.position.set(0, 0, 0);
    scene.add(directionalLight4);


    // Cria carregadores para os formatos STL, PLY e OBJ
    loaderStl = new THREE.STLLoader();
    loaderPly = new THREE.PLYLoader();
    loaderObj = new THREE.OBJLoader();


    // Controles de câmera
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    camera.position.set( 0, 20, 100 );
    controls.update();

    // Substitua as URLs pelos caminhos dos seus arquivos STL
    loadAndRenderFile(...filePaths);
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


function loadAndRenderFile(...args) {
    try {
        var material = new THREE.MeshStandardMaterial(
            {
                color: 0xffffff, //0x808080
                side: THREE.DoubleSide,
                metalness: 0.6,
                roughness: 0.55,
            }
        );
        args.forEach(element => {
            if (element.endsWith('.stl')) {
                loaderStl.load(element, (geometry) => {
                    var mesh = new THREE.Mesh(geometry, material);
                    meshes.push(mesh);
                    scene.add(mesh);
                });
            } else if (element.endsWith('.ply')) {
                loaderPly.load(element, (geometry) => {
                    var mesh = new THREE.Mesh(geometry, material);
                    meshes.push(mesh);
                    scene.add(mesh);
                });
            } else if (element.endsWith('.obj')) {
                loaderObj.load(element, (object) => {
                    object.traverse(function (child) {
                        if (child instanceof THREE.Mesh) {
                            child.material = material;
                        }
                    });
                    meshes.push(object);
                    scene.add(object);
                });
            } else {
                throw new Error('Formato de arquivo não suportado');
            }
        });
    } catch (error) {
        console.log(error);
    }
}


window.onload = () => { // é permitido arquivos de extensão .stl, .ply e .obj
    init('/3dModelThreeJs/modelos3d/TesteLowerJawScan.stl', '/3dModelThreeJs/modelos3d/TesteUpperJawScan.stl');
};