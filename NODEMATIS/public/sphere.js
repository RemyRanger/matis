
var sphereDivisions = 18;
var rotY = 0;
var rotX = 0;
var vertexBuffer = null;
var indexBuffer = null;
var colorBuffer = null;
var indices = [];
var vertices = [];
var colors = [];
var mvMatrix = mat4.create();
var pMatrix = mat4.create();
var perspective = true;

function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

function initShaderParameters(prg) {
    prg.vertexPositionAttribute = glContext.getAttribLocation(prg, "aVertexPosition");
    glContext.enableVertexAttribArray(prg.vertexPositionAttribute);
    prg.colorAttribute = glContext.getAttribLocation(prg, "aColor");
    glContext.enableVertexAttribArray(prg.colorAttribute);
    prg.pMatrixUniform = glContext.getUniformLocation(prg, 'uPMatrix');
    prg.mvMatrixUniform = glContext.getUniformLocation(prg, 'uMVMatrix');
}

function initBuffers() {
    indices = [];
    vertices = [];
    colors = [];
    var latitudeBands = sphereDivisions;
    var longitudeBands = sphereDivisions;
    var radius = 0.8;
    var x = 0.0;
    var y = 0.0;
    var z = 0.0;
    var theta = 0.0;
    var sinTheta = 0.0;
    var cosTheta = 0.0;
    var phi = 0.0;
    var sinPhi = 0.0;
    var cosPhi = 0.0;
    for (var latNumber = 0; latNumber <= latitudeBands; ++latNumber) {
        theta = latNumber * Math.PI / latitudeBands;
        sinTheta = Math.sin(theta);
        cosTheta = Math.cos(theta);
        for (var longNumber = 0; longNumber <= longitudeBands; ++longNumber) {
            phi = longNumber * 2.0 * Math.PI / longitudeBands;
            sinPhi = Math.sin(phi);
            cosPhi = Math.cos(phi);
            x = sinTheta * sinPhi;
            y = cosTheta;
            z = sinTheta * cosPhi;
            vertices.push(radius * x);
            vertices.push(radius * y);
            vertices.push(radius * z);
            colors.push(longNumber / longitudeBands, latNumber / latitudeBands, 0.5, 1.0);
        }
    }
    for (var latNumber = 0; latNumber <= latitudeBands; ++latNumber) {
        for (var longNumber = 0; longNumber <= longitudeBands; ++longNumber) {
            indices.push((latNumber * longitudeBands) + longNumber);
        }
    }
    console.log("indices: " + indices.length + " vertices: " + vertices.length / 3);
    vertexBuffer = getVertexBufferWithVertices(vertices);
    indexBuffer = getIndexBufferWithIndices(indices);
    colorBuffer = getVertexBufferWithVertices(colors);
}

function drawControlPoints() {
    glContext.bindBuffer(glContext.ARRAY_BUFFER, colorBuffer);
    glContext.vertexAttribPointer(prg.colorAttribute, 4, glContext.FLOAT, false, 0, 0);
    glContext.bindBuffer(glContext.ARRAY_BUFFER, vertexBuffer);
    glContext.vertexAttribPointer(prg.vertexPositionAttribute, 3, glContext.FLOAT, false, 0, 0);
    glContext.bindBuffer(glContext.ELEMENT_ARRAY_BUFFER, indexBuffer);
    glContext.drawElements(glContext.POINTS, indices.length, glContext.UNSIGNED_SHORT, 0);
}

function cameraFct(perspective) {
    translationMat = mat4.create();
    mat4.identity(translationMat);
    if (perspective) {
        mat4.perspective(pMatrix, degToRad(30.0), c_width / c_height, 0.1, 1000.0);
        var tx = 0.0;
        var ty = 0.0;
        var tz = -4.0;
        mat4.translate(translationMat, translationMat, [tx, ty, tz]);
    } else {
        mat4.identity(pMatrix);
        mat4.ortho(-1.0, 1.0, -1.0, 1.0, 1.0, -1.0, pMatrix);
    }
    rotateModelViewMatrixUsingQuaternion(true);
    glContext.uniformMatrix4fv(prg.pMatrixUniform, false, pMatrix);
    glContext.uniformMatrix4fv(prg.mvMatrixUniform, false, mat4.multiply(mat4.create(), translationMat, mvMatrix));
}

function drawScene() {
    glContext.clearColor(0.9, 0.9, 1.0, 1.0);
    glContext.enable(glContext.DEPTH_TEST);
    glContext.clear(glContext.COLOR_BUFFER_BIT | glContext.DEPTH_BUFFER_BIT);
    glContext.viewport(0, 0, c_width, c_height);
    cameraFct(perspective);
    drawControlPoints();
}

function initWebGL() {
    glContext = getGLContext('webgl-canvas');
    initProgram();
    initBuffers();
    renderLoop();
}
