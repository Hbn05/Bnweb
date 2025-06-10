// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Enables shadow rendering
document.getElementById('three-container').appendChild(renderer.domElement);

// Add lighting for shading
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(5, 10, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x226622, 0.4); // Soft dark green glow
scene.add(ambientLight);

// Load font and create shaded 3D text with bigger movement space
const loader = new THREE.FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function(font) {
    const textMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x114411,  // Dark green base
        roughness: 0.6,  
        metalness: 0.1,  
        emissive: 0x339933, // Soft green glow
    });

    const letters = ['H', 'B', 'N'];
    let startX = -15; // Wider spacing for more movement
    const textObjects = [];

    letters.forEach(letter => {
        const textGeometry = new THREE.TextGeometry(letter, {
            font: font,
            size: 4,  
            height: 1.5, 
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.5,
            bevelSize: 0.4
        });

        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        scene.add(textMesh);
        textMesh.position.set(startX, 0, -20); // Moved further back for depth
        textMesh.castShadow = true;
        textObjects.push(textMesh);

        startX += 10; // Increased spacing
    });

    // **Bounce movement variables (Extended Boundaries)**
    let speedX = 0.12, speedY = 0.07;

    function animate() {
        requestAnimationFrame(animate);

        textObjects.forEach(textMesh => {
            textMesh.position.x += speedX;
            textMesh.position.y += speedY;

            // Extended bounce area
            if (textMesh.position.x > 25 || textMesh.position.x < -25) speedX *= -1;
            if (textMesh.position.y > 15 || textMesh.position.y < -15) speedY *= -1;
        });

        renderer.render(scene, camera);
    }
    animate();
});

// Camera positioned further for wider movement visibility
camera.position.z = 30;

// Adjust responsiveness
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});