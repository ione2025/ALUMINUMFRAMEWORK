// Simple OrbitControls implementation for Three.js
THREE.OrbitControls = function (camera, domElement) {
    this.camera = camera;
    this.domElement = domElement;
    
    // Settings
    this.enabled = true;
    this.enableDamping = false;
    this.dampingFactor = 0.05;
    this.enableZoom = true;
    this.enableRotate = true;
    this.enablePan = true;
    this.autoRotate = false;
    this.autoRotateSpeed = 2.0;
    this.minDistance = 0;
    this.maxDistance = Infinity;
    this.screenSpacePanning = true;
    
    // Internal state
    var scope = this;
    var rotateStart = new THREE.Vector2();
    var rotateEnd = new THREE.Vector2();
    var rotateDelta = new THREE.Vector2();
    var panStart = new THREE.Vector2();
    var panEnd = new THREE.Vector2();
    var panDelta = new THREE.Vector2();
    var dollyStart = new THREE.Vector2();
    var dollyEnd = new THREE.Vector2();
    var dollyDelta = new THREE.Vector2();
    
    var STATE = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_PAN: 4, TOUCH_DOLLY_PAN: 5, TOUCH_DOLLY_ROTATE: 6 };
    var state = STATE.NONE;
    
    var spherical = new THREE.Spherical();
    var sphericalDelta = new THREE.Spherical();
    var target = new THREE.Vector3();
    var panOffset = new THREE.Vector3();
    var zoomChanged = false;
    var scale = 1;
    
    // Initialize target
    target.copy(camera.position).add(new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion));
    
    this.update = function () {
        var offset = new THREE.Vector3();
        var quat = new THREE.Quaternion().setFromUnitVectors(camera.up, new THREE.Vector3(0, 1, 0));
        var quatInverse = quat.clone().invert();
        var lastPosition = new THREE.Vector3();
        var lastQuaternion = new THREE.Quaternion();
        
        return function update() {
            // Auto-rotate
            if (scope.autoRotate && state === STATE.NONE) {
                sphericalDelta.theta -= 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;
            }
            
            var position = scope.camera.position;
            offset.copy(position).sub(target);
            offset.applyQuaternion(quat);
            spherical.setFromVector3(offset);
            
            spherical.theta += sphericalDelta.theta;
            spherical.phi += sphericalDelta.phi;
            spherical.phi = Math.max(0.01, Math.min(Math.PI - 0.01, spherical.phi));
            spherical.makeSafe();
            spherical.radius *= scale;
            spherical.radius = Math.max(scope.minDistance, Math.min(scope.maxDistance, spherical.radius));
            
            target.add(panOffset);
            offset.setFromSpherical(spherical);
            offset.applyQuaternion(quatInverse);
            position.copy(target).add(offset);
            scope.camera.lookAt(target);
            
            if (scope.enableDamping === true) {
                sphericalDelta.theta *= (1 - scope.dampingFactor);
                sphericalDelta.phi *= (1 - scope.dampingFactor);
                panOffset.multiplyScalar(1 - scope.dampingFactor);
            } else {
                sphericalDelta.set(0, 0, 0);
                panOffset.set(0, 0, 0);
            }
            
            scale = 1;
            
            if (zoomChanged ||
                lastPosition.distanceToSquared(scope.camera.position) > 0.000001 ||
                8 * (1 - lastQuaternion.dot(scope.camera.quaternion)) > 0.000001) {
                lastPosition.copy(scope.camera.position);
                lastQuaternion.copy(scope.camera.quaternion);
                zoomChanged = false;
                return true;
            }
            return false;
        };
    }();
    
    this.reset = function () {
        state = STATE.NONE;
        target.set(0, 0, 0);
        sphericalDelta.set(0, 0, 0);
        panOffset.set(0, 0, 0);
        scale = 1;
        scope.camera.position.set(0, 0, 5);
        scope.camera.lookAt(target);
    };
    
    function rotateLeft(angle) {
        sphericalDelta.theta -= angle;
    }
    
    function rotateUp(angle) {
        sphericalDelta.phi -= angle;
    }
    
    function panLeft(distance, objectMatrix) {
        var v = new THREE.Vector3();
        v.setFromMatrixColumn(objectMatrix, 0);
        v.multiplyScalar(-distance);
        panOffset.add(v);
    }
    
    function panUp(distance, objectMatrix) {
        var v = new THREE.Vector3();
        v.setFromMatrixColumn(objectMatrix, 1);
        v.multiplyScalar(distance);
        panOffset.add(v);
    }
    
    function dollyIn(dollyScale) {
        scale /= dollyScale;
    }
    
    function dollyOut(dollyScale) {
        scale *= dollyScale;
    }
    
    function handleMouseDownRotate(event) {
        rotateStart.set(event.clientX, event.clientY);
    }
    
    function handleMouseDownDolly(event) {
        dollyStart.set(event.clientX, event.clientY);
    }
    
    function handleMouseDownPan(event) {
        panStart.set(event.clientX, event.clientY);
    }
    
    function handleMouseMoveRotate(event) {
        rotateEnd.set(event.clientX, event.clientY);
        rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(scope.dampingFactor || 0.5);
        var element = scope.domElement;
        rotateLeft(2 * Math.PI * rotateDelta.x / element.clientHeight);
        rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight);
        rotateStart.copy(rotateEnd);
        scope.update();
    }
    
    function handleMouseMoveDolly(event) {
        dollyEnd.set(event.clientX, event.clientY);
        dollyDelta.subVectors(dollyEnd, dollyStart);
        if (dollyDelta.y > 0) {
            dollyIn(1.05);
        } else if (dollyDelta.y < 0) {
            dollyOut(1.05);
        }
        dollyStart.copy(dollyEnd);
        scope.update();
    }
    
    function handleMouseMovePan(event) {
        panEnd.set(event.clientX, event.clientY);
        panDelta.subVectors(panEnd, panStart).multiplyScalar(scope.dampingFactor || 0.5);
        var element = scope.domElement;
        panLeft(2 * panDelta.x * (scope.camera.position.length() / element.clientHeight), scope.camera.matrix);
        panUp(2 * panDelta.y * (scope.camera.position.length() / element.clientHeight), scope.camera.matrix);
        panStart.copy(panEnd);
        scope.update();
    }
    
    function handleMouseWheel(event) {
        if (event.deltaY < 0) {
            dollyOut(1.05);
        } else if (event.deltaY > 0) {
            dollyIn(1.05);
        }
        scope.update();
    }
    
    function onMouseDown(event) {
        if (scope.enabled === false) return;
        event.preventDefault();
        if (event.button === 0) {
            state = STATE.ROTATE;
            handleMouseDownRotate(event);
        } else if (event.button === 1) {
            state = STATE.DOLLY;
            handleMouseDownDolly(event);
        } else if (event.button === 2) {
            state = STATE.PAN;
            handleMouseDownPan(event);
        }
        document.addEventListener('mousemove', onMouseMove, false);
        document.addEventListener('mouseup', onMouseUp, false);
    }
    
    function onMouseMove(event) {
        if (scope.enabled === false) return;
        event.preventDefault();
        if (state === STATE.ROTATE) {
            handleMouseMoveRotate(event);
        } else if (state === STATE.DOLLY) {
            handleMouseMoveDolly(event);
        } else if (state === STATE.PAN) {
            handleMouseMovePan(event);
        }
    }
    
    function onMouseUp(event) {
        if (scope.enabled === false) return;
        event.preventDefault();
        state = STATE.NONE;
        document.removeEventListener('mousemove', onMouseMove, false);
        document.removeEventListener('mouseup', onMouseUp, false);
    }
    
    function onMouseWheel(event) {
        if (scope.enabled === false || scope.enableZoom === false) return;
        event.preventDefault();
        event.stopPropagation();
        handleMouseWheel(event);
    }
    
    function onContextMenu(event) {
        if (scope.enabled === false) return;
        event.preventDefault();
    }
    
    this.dispose = function () {
        scope.domElement.removeEventListener('contextmenu', onContextMenu, false);
        scope.domElement.removeEventListener('mousedown', onMouseDown, false);
        scope.domElement.removeEventListener('wheel', onMouseWheel, false);
        document.removeEventListener('mousemove', onMouseMove, false);
        document.removeEventListener('mouseup', onMouseUp, false);
    };
    
    this.domElement.addEventListener('contextmenu', onContextMenu, false);
    this.domElement.addEventListener('mousedown', onMouseDown, false);
    this.domElement.addEventListener('wheel', onMouseWheel, false);
    
    this.update();
};
