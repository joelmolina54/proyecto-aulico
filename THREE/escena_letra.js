function iniciarAnimacion3D() {
  const container = document.getElementById("three-animation");

  // Escena, cámara y renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Luz
  const light = new THREE.PointLight(0xffffff, 1.2, 100);
  light.position.set(10, 10, 10);
  scene.add(light);

  // Letras flotando (C, S, Z, X)
  const letras = ["C", "S", "Z", "X"];
  const letras3D = [];

  const fontLoader = new THREE.FontLoader();
  fontLoader.load("https://threejs.org/examples/fonts/helvetiker_bold.typeface.json", function (font) {
    letras.forEach((letra, index) => {
      const textGeo = new THREE.TextGeometry(letra, {
        font: font,
        size: 3,
        height: 0.5,
      });

      const material = new THREE.MeshStandardMaterial({ color: 0x7952b3 });
      const mesh = new THREE.Mesh(textGeo, material);
      mesh.position.x = (index - 1.5) * 6; // distribuye horizontalmente
      mesh.position.y = 0;
      letras3D.push(mesh);
      scene.add(mesh);
    });
  });

  camera.position.z = 20;

  function animate() {
    requestAnimationFrame(animate);
    letras3D.forEach((letra) => {
      letra.rotation.x += 0.01;
      letra.rotation.y += 0.01;
    });
    renderer.render(scene, camera);
  }

  animate();
}
