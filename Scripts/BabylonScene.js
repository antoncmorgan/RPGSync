/*********************************************************************
 BabylonScene.js
   Functions for the core scene elements, loading, setup,
   and the manipulation of the scene, including the logicLoop().
*********************************************************************/

//Helpful Info
// X Z are analogous to x and y cartesian coor. 
//The Map gets drawn in the lower right quadrant, that is x > 0 and z < 0

var bjsHelper =  {
	tileType: [
		{name: "Wall", material: 0, scale: new BABYLON.Vector3(10, 20, 10), yOffset: 10.1},
		{name: "Floor", material: 0, scale: new BABYLON.Vector3(10, 0.2, 10), yOffset: 0},
		{name: "Pillar", material: 0, scale: new BABYLON.Vector3(10, 20, 10), yOffset: 10.1},
		{name: "Fire",material: 0, scale: new BABYLON.Vector3(10, 0.2, 10), yOffset: 0},
		{name: "Door", material: 0, scale: new BABYLON.Vector3(10, 0.2, 10), yOffset: 0}
	]
};

Game.CreateStartScene = function() {
    //Creation of the scene 
    var scene = new BABYLON.Scene(Game.engine);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
	scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
	scene.collisionsEnabled = true;
	scene.isErrthingReady = false;
    
    //Adding an Arc Rotate Camera
    //var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 1, -15), scene);
    var Alpha = 3*Math.PI/2;
    var Beta = 0.00000001;
    scene.camera = new BABYLON.ArcRotateCamera("Camera", Alpha, Beta, 40, new BABYLON.Vector3.Zero(), scene);
	scene.camera.attachControl(Game.canvas, true);
    // //set camera to not move
    scene.camera.lowerAlphaLimit = Alpha;
    scene.camera.upperAlphaLimit = Alpha;
    scene.camera.lowerBetaLimit = Beta;
    scene.camera.upperBetaLimit = Beta;
	
	scene.ambientLight = new BABYLON.HemisphericLight("ambientLight", new BABYLON.Vector3(0, 1, 0), scene);
	scene.ambientLight.diffuse = new BABYLON.Color3(.98, .95, .9);
	scene.ambientLight.specular = new BABYLON.Color3(.1, .1, .1);
	scene.ambientLight.groundColor = new BABYLON.Color3(.1, .1, .1);
	scene.ambientLight.intensity = .1;
	
	scene.light= new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 20, 0), scene);
	scene.light.diffuse = new BABYLON.Color3(.18, .15, .1);
	scene.light.specular = new BABYLON.Color3(0, 0, 0);
	
	scene.isLoaded=false;
	
	/******************************************************/
	/*START - STUB CODE*/
	
	//create Asset Manager
	scene.assetsManager = new BABYLON.AssetsManager(scene);
	scene.assetsManager.useDefaultLoadingScreen=false;
	
	//create Asset Tasks
	scene.playerTask = scene.assetsManager.addMeshTask("playerTask", "", "./Models3D/", "PlayerBody-1.b.js");
		
	//Set functions to assign loaded meshes
	scene.playerTask.onSuccess = function (task) {
		//stub function
	}
	
	//Set up Scene after all Tasks are complete
	scene.assetsManager.onFinish = function (tasks) {
		//stub function
		
		// Allow Game to be started
		$('#startGame').click(function () {
			$('#modal').fadeOut(50, function () {
				$('#modalDiv').html('');
				Game.activeScene=Game.sceneType.Game;
				Game.runRenderLoop();
				//prepareHealthBars();
				$('#topMenu').fadeIn(200, function () {	});
				$('#hotKeys').fadeIn(200, function () {	});
				if (Game.debug) {
					$('#debugMenu').fadeIn(200, function () {	});
				}
			});
		});
		$('#startGame').css({"cursor": "pointer", "color": "#DDDDDD"});
		$('#startGame').html("Start Game");
		scene.isLoaded=true;
	};
	
	//Load all tasks
	scene.assetsManager.load();

	scene.logicLoop = function () {
		var self = scene;
		switch (Game.engine.loopCounter) {   
			case 500:
				Game.engine.loopCounter=0;
				break;
			default:
				Game.engine.loopCounter++;
				break;
		}
		$('#lps').text('LPS: ' + timedLoop.getLoopTime().toFixed());
		$('#fps').text('FPS: ' + Game.engine.getFps().toFixed());
		//Game.processEnemies(self);
		//processInput(self.player, self.player.speed);
	};
	
	scene.moveMeshes = function () {
		//stub function
	}
	
    scene.registerBeforeRender(function(){
		scene.moveMeshes();
	});
	
	/******************************************************/
	/*END - STUB CODE*/

    return scene;

}

Game.CreateGameScene = function() {
    //Creation of the scene 
    var scene = new BABYLON.Scene(Game.engine);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
	scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
	scene.collisionsEnabled = true;
	scene.isErrthingReady = false;
    
    //Adding an Arc Rotate Camera
    //var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 1, -15), scene);
    var Alpha = 0;
    var Beta = 0.00000001;
    scene.camera = new BABYLON.ArcRotateCamera("Camera", Alpha, Math.PI/2, 20, new BABYLON.Vector3(0,0,0), scene);
	scene.camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
	scene.camera.aspectRatio = $( window ).width()/$( window ).height();
	scene.camera.magnification = 30;
    scene.camera.orthoTop = Math.abs(1 - 1/scene.camera.aspectRatio)*scene.camera.magnification;
    scene.camera.orthoBottom = -Math.abs(1 - 1/scene.camera.aspectRatio)*scene.camera.magnification;
    scene.camera.orthoLeft = -Math.abs(1 - scene.camera.aspectRatio)*scene.camera.magnification;
    scene.camera.orthoRight = Math.abs(1 - scene.camera.aspectRatio)*scene.camera.magnification;
	scene.camera.attachControl(Game.canvas, true);
	scene.camera.target = new BABYLON.Vector3(0,0,0);
    // //set camera to not move
    // scene.camera.lowerAlphaLimit = Alpha;
    // scene.camera.upperAlphaLimit = Alpha;
    // scene.camera.lowerBetaLimit = Beta;
    // scene.camera.upperBetaLimit = Beta;
	
	scene.ambientLight = new BABYLON.HemisphericLight("ambientLight", new BABYLON.Vector3(0, 1, 0), scene);
	scene.ambientLight.diffuse = new BABYLON.Color3(.98, .95, .9);
	scene.ambientLight.specular = new BABYLON.Color3(.1, .1, .1);
	scene.ambientLight.groundColor = new BABYLON.Color3(.1, .1, .1);
	scene.ambientLight.intensity = 1;
	
	// scene.light= new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 20, 0), scene);
	// scene.light.diffuse = new BABYLON.Color3(.18, .15, .1);
	// scene.light.specular = new BABYLON.Color3(0, 0, 0);
	
	scene.isLoaded=false;
	
	/******************************************************/
	/*START - STUB CODE*/
	
	//create Asset Manager
	scene.assetsManager = new BABYLON.AssetsManager(scene);
	scene.assetsManager.useDefaultLoadingScreen=false;
	
	//create Asset Tasks
	scene.playerTask = scene.assetsManager.addMeshTask("playerTask", "", "./Models3D/", "PlayerBody-1.b.js");
		
	//Set functions to assign loaded meshes
	scene.playerTask.onSuccess = function (task) {
		var bodyMesh = task.loadedMeshes[0];
		var weaponMesh = task.loadedMeshes[1];
		var playerSkeletons = task.loadedSkeletons[0];
		//bodyMesh.isVisible = true;
		//bodyMesh.scaling = new BABYLON.Vector3(2, 2, 2);
		//bodyMesh.rotation = new BABYLON.Vector3(0, 0, 0);
		//bodyMesh.position = new BABYLON.Vector3(0, 0, 0);
		
		scene.player = new Entity(bodyMesh,{weaponMesh: weaponMesh, type: EntityType.Player, health: 4, damage: 1, speed: .2});
		scene.player.skeletons = playerSkeletons;
		scene.player.weaponCollisionMesh = task.loadedMeshes[2];
	}
	
	//Set up Scene after all Tasks are complete
	scene.assetsManager.onFinish = function (tasks) {
		
		scene.ground = BABYLON.Mesh.CreateGround("ground1", 10, 100, 2, scene);
		scene.rotation = new BABYLON.Vector3(0,Math.PI/2,0);
		scene.position = new BABYLON.Vector3(0,-1,0);

		scene.ground.checkCollisions = true;
		
		// Set up Collisions
		scene.player.mesh.checkCollisions = true;
		scene.player.mesh.isVisible = true;
		scene.player.mesh.ellipsoid = new BABYLON.Vector3(3, .1, 3);
		scene.player.mesh.ellipsoidOffset = new BABYLON.Vector3(0, .2, 0);
		
		//Set the ellipsoid around the camera (e.g. your player's size)
		scene.player.weaponMesh.parent = scene.player.mesh;
		// Assign Rotation Offset
		scene.player.mesh.rotationOffset = new BABYLON.Vector3(0,0,0);
		scene.player.mesh.previousRotation = scene.player.mesh.rotation.y;
		
		scene.player.weaponCollisionMesh.parent = scene.player.mesh;
		scene.player.weaponCollisionMesh.position.y=2;
		scene.player.weaponCollisionMesh.rotation.y=-.4;
		scene.player.weaponCollisionMesh.isVisible = false;
		//scene.player.weaponCollisionMesh.showBoundingBox = true;
		
		scene.player.mesh.playerAnimations = new Game.importedAnimations(scene.player);
		scene.player.mesh.playerAnimations.init(scene);
		
		// Allow Game to be started
		$('#startGame').click(function () {
			$('#modal').fadeOut(50, function () {
				$('#modalDiv').html('');
				Game.activeScene=Game.sceneType.Game;
				Game.runRenderLoop();
				//prepareHealthBars();
				$('#topMenu').fadeIn(200, function () {	});
				$('#hotKeys').fadeIn(200, function () {	});
				if (Game.debug) {
					$('#debugMenu').fadeIn(200, function () {	});
				}
			});
		});
		$('#startGame').toggleClass("startGame");
		$('#startGame').html("Start Game");
		scene.isLoaded=true;
	};
	
	//Load all tasks
	scene.assetsManager.load();
	
	if (Game.debug) {
		scene.joystick = {};
		scene.joystickAction = {};
		scene.joystick.deltaJoystickVector = new BABYLON.Vector2(0,0);
		scene.joystickAction._isPressed = false;
	}
	else {
		scene.joystick = new BABYLON.GameFX.VirtualJoystick(true,"white");
		scene.joystickAction = new BABYLON.GameFX.VirtualJoystick(false,"yellow");
	}

	scene.logicLoop = function () {
		var self = scene;
		switch (Game.engine.loopCounter) {   
			case 500:
				Game.engine.loopCounter=0;
				break;
			default:
				Game.engine.loopCounter++;
				break;
		}
		$('#lps').text('LPS: ' + timedLoop.getLoopTime().toFixed());
		$('#fps').text('FPS: ' + Game.engine.getFps().toFixed());
		//Game.processEnemies(self);
		processInput(self.player, self.player.speed);
	};
	
	scene.moveMeshes = function () {
		var self = scene;
		var i=0;
		var tempVal;
		var animationRatio = self.getAnimationRatio();
		
		//Need to update self every loop, I guess
		// for (i=0; i < self.activeRoom.enemy.length;i++) {
			// if (self.activeRoom.enemy[i].action == 1 && self.activeRoom.enemy[i].isDead == false) {
				// self.activeRoom.enemy[i].mesh.previousPosition = new BABYLON.Vector3(self.activeRoom.enemy[i].mesh.position.x,self.activeRoom.enemy[i].mesh.position.y,self.activeRoom.enemy[i].mesh.position.z);
				// tempVal = self.activeRoom.enemy[i].velocity.direction.multiply(new BABYLON.Vector3(animationRatio,animationRatio,animationRatio));
				// self.activeRoom.enemy[i].mesh.moveWithCollisions(tempVal);
			// }
		// }
		//tempVal = new BABYLON.Vector3(self.player.velocity.magnitude.x*animationRatio,self.player.velocity.magnitude.y*animationRatio,self.player.velocity.magnitude.z*animationRatio);
		tempVal = self.player.velocity.magnitude.multiply(new BABYLON.Vector3(animationRatio,animationRatio,animationRatio));
		self.player.mesh.moveWithCollisions(tempVal);
	}
	
    scene.registerBeforeRender(function(){
		scene.moveMeshes();
	});
	
	/******************************************************/
	/*END - STUB CODE*/

    return scene;

}

// Game.CreateGameSceneOriginal = function() {
    // //Creation of the scene 
    // var scene = new BABYLON.Scene(Game.engine);
    // scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
	// scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
	// scene.collisionsEnabled = true;
	// scene.isErrthingReady = false;
    
    // //Adding an Arc Rotate Camera
    // //var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 1, -15), scene);
    // var Alpha = 3*Math.PI/2;
    // var Beta = Math.PI/16;
    // scene.camera = new BABYLON.ArcRotateCamera("Camera", Alpha, Beta, Game.RoomHeight*13.2, new BABYLON.Vector3.Zero(), scene);
	// scene.camera.attachControl(Game.canvas, true);
    // //set camera to not move
	// if (!Game.debug) {
		// scene.camera.lowerAlphaLimit = Alpha;
		// scene.camera.upperAlphaLimit = Alpha;
		// scene.camera.lowerBetaLimit = Beta;
		// scene.camera.upperBetaLimit = Beta;
	// }
	
	// scene.ambientLight = new BABYLON.HemisphericLight("ambientLight", new BABYLON.Vector3(0, 1, 0), scene);
	// scene.ambientLight.diffuse = new BABYLON.Color3(.98, .95, .9);
	// scene.ambientLight.specular = new BABYLON.Color3(.1, .1, .1);
	// scene.ambientLight.groundColor = new BABYLON.Color3(.1, .1, .1);
	// scene.ambientLight.intensity = 1;
	
	// createMaterials(scene);
    // scene.rooms = Game.map.rooms;
    // scene.door = 0;
	// scene.isLoaded=false;

	// //create Asset Manager
	// scene.assetsManager = new BABYLON.AssetsManager(scene);
	// scene.assetsManager.useDefaultLoadingScreen=false;
	
	// //create Asset Tasks
	// scene.playerTask = scene.assetsManager.addMeshTask("playerTask", "", "./Models3D/", "PlayerBody-1.b.js");
	// scene.doorFrameTask = scene.assetsManager.addMeshTask("doorFrameTask", "", "./Models3D/", "DoorFrame.b.js");
	// scene.torchTopTask = scene.assetsManager.addMeshTask("doorFrameTask", "", "./Models3D/", "TorchTopFrame.b.js");
	// scene.doorTask = scene.assetsManager.addMeshTask("doorTask", "", "./Models3D/", "Door.b.js");
	
	// // enemy tasks
	// scene.bossTask = [];
	// scene.enemyTask = [];
	// scene.bossTask.push(scene.assetsManager.addMeshTask("bossTask0", "", "./Models3D/", "Book_Golem2.b.js"));
	// scene.enemyTask.push(scene.assetsManager.addMeshTask("enemyTask0", "", "./Models3D/", "FlyingBook.b.js"));
	
	// //Set functions to assign loaded meshes
	// scene.playerTask.onSuccess = function (task) {
		// var bodyMesh = task.loadedMeshes[0];
		// var weaponMesh = task.loadedMeshes[1];
		// var playerSkeletons = task.loadedSkeletons[0];
		// //bodyMesh.isVisible = true;
		// bodyMesh.scaling = new BABYLON.Vector3(2, 2, 2);
		// bodyMesh.rotation = new BABYLON.Vector3(0, Math.PI, 0);
		
		// scene.player = new Entity(bodyMesh,{weaponMesh: weaponMesh, type: EntityType.Player, health: 4, damage: 1, speed: .6});
		// scene.player.skeletons = playerSkeletons;
		// scene.player.weaponCollisionMesh = task.loadedMeshes[2];
		// prepareHealthBars();
	// }
	// scene.doorFrameTask.onSuccess = function (task) {
		// scene.doorFrame = task.loadedMeshes;
	// }
	// scene.torchTopTask.onSuccess = function (task) {
		// scene.torchTop = task.loadedMeshes[0];
	// }
	// scene.doorTask.onSuccess = function (task) {
		// scene.doorMesh = task.loadedMeshes[2];
		// scene.doorMesh.isVisible = false;
		// scene.doorMesh.scaling = new BABYLON.Vector3(4.8, 4.8, 4.8);
	// }
	
	// scene.enemies = [];
	// for (var i_loop = 0; i_loop < scene.enemyTask.length; i_loop++) {
		// var Index = i_loop;
		// scene.enemyTask[i_loop].onSuccess = function (task) {
			// var j_loop=0;
			// // Load Meshes
			// scene.enemies.push({ meshes: [] });
			// for (j_loop = 0; j_loop < task.loadedMeshes.length; j_loop++) {
				// scene.enemies[Index].meshes[j_loop] = task.loadedMeshes[j_loop];
				// // set all other meshes as children to first mesh
				// if (j_loop > 0) {
					// scene.enemies[Index].meshes[j_loop].parent = scene.enemies[Index].meshes[0];
				// }
			// }
			// // Always set the new mesh to not visible
			// scene.enemies[Index].meshes[0].isVisible = false;
			// // Load Skeletons/Animations
			// scene.enemies[Index].skeletons = [];
			// for (j_loop = 0; j_loop < task.loadedSkeletons.length; j_loop++) {
				// scene.enemies[Index].skeletons[j_loop] = task.loadedSkeletons[j_loop];
			// }
		// }
	// }
	
	// scene.bosses = [];
	// for (var i_loop = 0; i_loop < scene.bossTask.length; i_loop++) {
		// var Index = i_loop;
		// scene.bossTask[i_loop].onSuccess = function (task) {
			// var j_loop=0;
			// // Load Meshes
			// scene.bosses.push({ meshes: [] });
			// for (j_loop = 0; j_loop < task.loadedMeshes.length; j_loop++) {
				// scene.bosses[Index].meshes[j_loop] = task.loadedMeshes[j_loop];
				// // set all other meshes as children to first mesh
				// if (j_loop > 0) {
					// //scene.bosses[Index].meshes[j_loop].parent = scene.bosses[Index].meshes[0];
				// }
			// }
			// // Always set the new mesh to not visible
			// scene.bosses[Index].meshes[0].isVisible = false;
			// // Load Skeletons/Animations
			// scene.bosses[Index].skeletons = [];
			// for (j_loop = 0; j_loop < task.loadedSkeletons.length; j_loop++) {
				// scene.bosses[Index].skeletons[j_loop] = task.loadedSkeletons[j_loop];
			// }
		// }
	// }
	
	// scene.doorFrameTask.onSuccess = function (task) {
		// scene.doorFrame = task.loadedMeshes;
	// }
	
	// //Set up Scene after all Tasks are complete
	// scene.assetsManager.onFinish = function (tasks) {
	
		// Game.createNativeEnemies(scene);
		// // Create Player shadow, which will be the parent mesh
		// scene.player.mesh.checkCollisions = true;
		// scene.player.mesh.isVisible = true;
		// scene.player.mesh.ellipsoid = new BABYLON.Vector3(3, .2, 3);
		
		// //Set the ellipsoid around the camera (e.g. your player's size)
		// scene.player.weaponMesh.parent = scene.player.mesh;
		// // Assign Rotation Offset
		// scene.player.mesh.rotationOffset = new BABYLON.Vector3(0,-Math.PI/2,0);
		// scene.player.mesh.previousRotation = scene.player.mesh.rotation.y;
		
		// scene.player.weaponCollisionMesh.parent = scene.player.mesh;
		// scene.player.weaponCollisionMesh.position.y=2;
		// scene.player.weaponCollisionMesh.rotation.y=-.4;
		// scene.player.weaponCollisionMesh.isVisible = false;
		// //scene.player.weaponCollisionMesh.showBoundingBox = true;
		
		// scene.player.mesh.playerAnimations = new Game.playerAnimations();
		// scene.player.mesh.playerAnimations.init(scene);
		// //set up the action manager for attacks
		// scene.actionManager = new BABYLON.ActionManager(scene);
		// // Detect player input, then play attack animation
		// scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
		// BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
				// if (evt.sourceEvent.keyCode == KEYS.SPACE) {
					// if (scene.player.action != scene.player.Attack) {
						// scene.player.mesh.playerAnimations.attack.start(scene,scene.player);
						// // Loop through meshes and see if an attack landed
						// for (var i_enemy = 0; i_enemy < scene.activeRoom.enemy.length; i_enemy++) {
							// if (!scene.activeRoom.enemy[i_enemy].isDead) {
								// if (Game.detectCollision(scene.player,scene.activeRoom.enemy[i_enemy])) {
									// scene.activeRoom.enemy[i_enemy].health--;
									// if (scene.activeRoom.enemy[i_enemy].health <=0) {
										// scene.activeRoom.enemy[i_enemy].isDead=true;
										// scene.activeRoom.enemy[i_enemy].mesh.enemyAnimations.die.start(scene,scene.activeRoom.enemy[i_enemy]);
										// if (scene.activeRoom.enemy[i_enemy].type == EntityType.Boss) {
											// Game.transportRing.enableIntersect();
										// }
									// }
									// else if (scene.activeRoom.enemy[i_enemy].type != EntityType.Boss) {
										// scene.activeRoom.enemy[i_enemy].mesh.enemyAnimations.takeDmg.start(scene,scene.activeRoom.enemy[i_enemy]);
									// }
								// }
							// }
						// }
					// }
				// }
		// }));
		
		// //Set up initial door and torches
		// scene.torchTop.isVisible = false;
		// scene.doorFrame[0].isVisible = false;
		// scene.doorFrame[0].addLODLevel(Game.performance.viewDistance, null);
		// scene.doorFrame.push(scene.torchTop.clone());
		// scene.doorFrame.push(scene.torchTop.clone());
		// var arrayLength = scene.doorFrame.length;
		// for (var j=1;j < arrayLength;j++){
			// scene.doorFrame[j].parent = scene.doorFrame[0];
			// scene.doorFrame[j].isVisible = false;
		// }
		
		// //create left and right torch tops
		// scene.doorFrame[arrayLength-1].position = new BABYLON.Vector3(1.5,3.2,-1.7);
		// scene.doorFrame[arrayLength-2].position = new BABYLON.Vector3(-1.5,3.2,-1.7);
		// scene.doorFrame[0].scaling = new BABYLON.Vector3(4.8, 4.8, 4.8);
		
		// //create parent tiles for the room
		// scene.parentTile = {'mesh': []};
		// for (var iParent=0; iParent < bjsHelper.tileType.length; iParent++) {
			// Game.createParentTiles(scene, iParent);
		// }
		
		// //Draw Rooms
		// for (var i_room=0; i_room < Game.map.rooms.length; i_room++) {
			// if (Game.map.rooms[i_room].type != Game.RoomType.Empty) {
				// Game.activeRooms++;
				// //set room properties
				// scene.rooms[i_room].originOffset = new BABYLON.Vector3(Game.map.rooms[i_room].col*Game.map.rooms[i_room].width*Game.map.rooms[i_room].tiles[0].width,0,-Game.map.rooms[i_room].row*Game.map.rooms[i_room].height*Game.map.rooms[i_room].tiles[0].width);
				// scene.rooms[i_room].centerPosition = new BABYLON.Vector3((Game.map.rooms[i_room].width-1)/2*Game.map.rooms[i_room].tiles[0].width,0,(Game.map.rooms[i_room].height-1)/2*Game.map.rooms[i_room].tiles[0].width);
				// scene.rooms[i_room].index=i_room;
				// scene.rooms[i_room].enemy=[];
				// scene.rooms[i_room].enemiesDead=false;
				
				// //scene.rooms[i_room].door=[];
				// for (var i = 0; i < Game.map.rooms[i_room].tiles.length ; i++) {
					// scene.rooms[i_room].tiles[i].mesh = Game.drawTile(scene, Game.map.rooms[i_room].tiles[i],i);
					// // scene.rooms[i_room].tiles[i].mesh.useOctreeForRenderingSelection = true;
					// //reposition to room location
					// scene.rooms[i_room].tiles[i].mesh.position.x=scene.rooms[i_room].tiles[i].mesh.position.x+scene.rooms[i_room].originOffset.x;
					// scene.rooms[i_room].tiles[i].mesh.position.z=scene.rooms[i_room].tiles[i].mesh.position.z+scene.rooms[i_room].originOffset.z;
					
					// scene.rooms[i_room].tiles[i].mesh.checkCollisions = true;
					// scene.rooms[i_room].tiles[i].mesh.tileId = i;
					// //create and position doors, adding the torch flame and light
					// if (scene.rooms[i_room].tiles[i].type == Game.TileType.Door) {
						// var doorIndex = scene.rooms[i_room].tiles[i].doorIndex;
						// scene.rooms[i_room].doors[doorIndex].frame.push(scene.doorFrame[0].clone());
						// scene.rooms[i_room].doors[doorIndex].frame[0].isVisible = true;
						// for (var j=1;j < scene.doorFrame.length;j++) {
							// scene.rooms[i_room].doors[doorIndex].frame.push(scene.doorFrame[j].clone());
							// scene.rooms[i_room].doors[doorIndex].frame[j].parent = scene.rooms[i_room].doors[doorIndex].frame[0];
							// scene.rooms[i_room].doors[doorIndex].frame[j].isVisible = true;
						// }
						// scene.rooms[i_room].doors[doorIndex].frame[0].position = new BABYLON.Vector3(scene.rooms[i_room].tiles[i].mesh.position.x, -2,scene.rooms[i_room].tiles[i].mesh.position.z);
						// var doorRotation = ((scene.rooms[i_room].tiles[i].col==scene.rooms[i_room].width-1)*1 + (scene.rooms[i_room].tiles[i].row==scene.rooms[i_room].height-1)*2 + (scene.rooms[i_room].tiles[i].col==0)*3)*Math.PI/2;
						// scene.rooms[i_room].doors[doorIndex].frame[0].rotation = new BABYLON.Vector3(0, doorRotation, 0);
						
						// //set up door and matching door
						// scene.rooms[i_room].doors[doorIndex].mesh=scene.doorMesh.clone();
						// scene.rooms[i_room].doors[doorIndex].mesh.position = new BABYLON.Vector3(scene.rooms[i_room].tiles[i].mesh.position.x, -2,scene.rooms[i_room].tiles[i].mesh.position.z);
						// scene.rooms[i_room].doors[doorIndex].mesh.rotation = new BABYLON.Vector3(0, doorRotation, 0);
						// if (scene.rooms[i_room].tiles[i].col==scene.rooms[i_room].width-1) { // right
							// scene.rooms[i_room].doors[doorIndex].mesh.position.x-=5;
							// scene.rooms[i_room].doors[doorIndex].mesh.position.z+=5;
						// }
						// else if (scene.rooms[i_room].tiles[i].row==scene.rooms[i_room].height-1) { // bottom
							// scene.rooms[i_room].doors[doorIndex].mesh.position.x+=5;
							// scene.rooms[i_room].doors[doorIndex].mesh.position.z+=5;
						// }
						// else if (scene.rooms[i_room].tiles[i].col==0) { // left
							// scene.rooms[i_room].doors[doorIndex].mesh.position.x+=5;
							// scene.rooms[i_room].doors[doorIndex].mesh.position.z-=5;
						// }
						// else { // top
							// scene.rooms[i_room].doors[doorIndex].mesh.position.x-=5;
							// scene.rooms[i_room].doors[doorIndex].mesh.position.z-=5;
						// }
						// scene.rooms[i_room].doors[doorIndex].mesh.isVisible=true;
						// scene.rooms[i_room].doors[doorIndex].mesh.checkCollisions = true;
						
						// //attach fire to TorchTop
						// arrayLength = scene.doorFrame.length-1;
						// scene.rooms[i_room].doors[doorIndex].frame[arrayLength].torchFire = [];
						// scene.rooms[i_room].doors[doorIndex].frame[arrayLength-1].torchFire = [];
						// createTorchFire(scene, scene.rooms[i_room].doors[doorIndex].frame[arrayLength]);
						// createTorchFire(scene, scene.rooms[i_room].doors[doorIndex].frame[arrayLength-1]);
						// scene.rooms[i_room].doors[doorIndex].frame[arrayLength].torchFire[0].light.intensity = 3;
						// scene.rooms[i_room].doors[doorIndex].frame[arrayLength-1].torchFire[0].light.intensity = 3;
						// scene.rooms[i_room].doors[doorIndex].frame[arrayLength].torchFire[0].light.range = 40;
						// scene.rooms[i_room].doors[doorIndex].frame[arrayLength-1].torchFire[0].light.range = 40;
						// scene.rooms[i_room].doors[doorIndex].frame[arrayLength].torchFire[0].emitter = scene.rooms[i_room].doors[doorIndex].frame[arrayLength];
						// scene.rooms[i_room].doors[doorIndex].frame[arrayLength-1].torchFire[0].emitter = scene.rooms[i_room].doors[doorIndex].frame[arrayLength-1];
						// scene.rooms[i_room].doors[doorIndex].frame[arrayLength].torchFire[0].light.setEnabled(false);
						// scene.rooms[i_room].doors[doorIndex].frame[arrayLength-1].torchFire[0].light.setEnabled(false);
					// }
				// }
				// //Game.activateRoom(scene.rooms[i_room],scene.rooms[i_room]);
				
				// if (Game.map.rooms[i_room].type == Game.RoomType.Boss) {
					// Game.spawnBoss(scene, scene.rooms[i_room]);
					// Game.transportRing = new Game.createTransportRing(scene, scene.rooms[i_room]);
				// }
				// else {
					// //Spawn an enemy on some random tile
					// var maxEmenies = Game.getRandomInt(1,3);
					// for (var iSpawn = 0; iSpawn < maxEmenies; iSpawn++) {
						// Game.spawnEnemy(scene, scene.rooms[i_room]);
					// }
				// }
				
				// //Game.activateRoom(scene.rooms[i_room],scene.rooms[i_room]);
				
				// if (Game.map.rooms[i_room].type == Game.RoomType.Entrance) {
					// //Game.activateRoom(scene.rooms[i_room]);
					// scene.camera.target = new BABYLON.Vector3(scene.rooms[i_room].originOffset.x+scene.rooms[i_room].centerPosition.x, 0, scene.rooms[i_room].originOffset.z-scene.rooms[i_room].centerPosition.z);
					// //set active room to entrance
					// scene.activeRoom=Game.map.rooms[i_room];
					// scene.indexOfEntrance=i_room;
					// //activate torch lights
					// for (doorIndex = 0; doorIndex < scene.activeRoom.doors.length; doorIndex++) {
						// arrayLength = scene.activeRoom.doors[doorIndex].frame.length-1;
						// scene.activeRoom.doors[doorIndex].frame[arrayLength].torchFire[0].start();
						// scene.activeRoom.doors[doorIndex].frame[arrayLength-1].torchFire[0].start();
						// scene.activeRoom.doors[doorIndex].frame[arrayLength].torchFire[0].light.setEnabled(true);
						// scene.activeRoom.doors[doorIndex].frame[arrayLength-1].torchFire[0].light.setEnabled(true);
					// }
					// //Game.activateRoom(scene.activeRoom);
				// }
				
			// }
		// }
		// var entranceIndex=scene.activeRoom.index;
		// x0=Game.map.rooms[entranceIndex].col*Game.map.rooms[entranceIndex].width*Game.map.rooms[entranceIndex].tiles[0].width+(Math.floor(Game.map.rooms[entranceIndex].width/2)*Game.map.rooms[entranceIndex].tiles[0].width);
		// z0=-Game.map.rooms[entranceIndex].row*Game.map.rooms[entranceIndex].height*Game.map.rooms[entranceIndex].tiles[0].width-((Game.map.rooms[entranceIndex].height-1)*Game.map.rooms[entranceIndex].tiles[0].width);
		
		// scene.player.mesh.position = new BABYLON.Vector3(x0, 50, z0+10);
		// scene.player.mesh.applyGravity=true;
		// scene.isLoaded=true;
		
		// if (Game.debug) {
			// $('#debugMenu').html('Rooms: ' + parseInt(Game.activeRooms));
		// }
	// };
	
	// //Load all tasks
	// scene.assetsManager.load();
	
	// if (Game.debug) {
		// scene.joystick = {};
		// scene.joystickAction = {};
		// scene.joystick.deltaJoystickVector = new BABYLON.Vector2(0,0);
		// scene.joystickAction._isPressed = false;
	// }
	// else {
		// scene.joystick = new BABYLON.GameFX.VirtualJoystick(true,"white");
		// scene.joystickAction = new BABYLON.GameFX.VirtualJoystick(false,"yellow");
	// }

	// scene.logicLoop = function () {
		// var self = scene;
		// switch (Game.engine.loopCounter) {   
			// case 500:
				// Game.engine.loopCounter=0;
				// break;
			// default:
				// Game.engine.loopCounter++;
				// break;
		// }
		// $('#lps').text('LPS: ' + timedLoop.getLoopTime().toFixed());
		// $('#fps').text('FPS: ' + Game.engine.getFps().toFixed());
		// Game.processEnemies(self);
		// processInput(self.player, self.player.speed);
		// //check what room the player is in
		// self.checkActiveRoom();
	// };
	
	// scene.moveMeshes = function () {
		// var self = scene;
		// var i=0;
		// var tempVal;
		// var animationRatio = self.getAnimationRatio();
		
		// //Need to update self every loop, I guess
		// for (i=0; i < self.activeRoom.enemy.length;i++) {
			// if (self.activeRoom.enemy[i].action == 1 && self.activeRoom.enemy[i].isDead == false) {
				// self.activeRoom.enemy[i].mesh.previousPosition = new BABYLON.Vector3(self.activeRoom.enemy[i].mesh.position.x,self.activeRoom.enemy[i].mesh.position.y,self.activeRoom.enemy[i].mesh.position.z);
				// tempVal = self.activeRoom.enemy[i].velocity.direction.multiply(new BABYLON.Vector3(animationRatio,animationRatio,animationRatio));
				// self.activeRoom.enemy[i].mesh.moveWithCollisions(tempVal);
			// }
		// }
		// //tempVal = new BABYLON.Vector3(self.player.velocity.direction.x*animationRatio,self.player.velocity.direction.y*animationRatio,self.player.velocity.direction.z*animationRatio);
		// tempVal = self.player.velocity.direction.multiply(new BABYLON.Vector3(animationRatio,animationRatio,animationRatio));
		// self.player.mesh.moveWithCollisions(tempVal);
	// }
	
    // scene.registerBeforeRender(function(){
		// scene.moveMeshes();
	// });

    // //When click event is raised
    // // $('#renderCanvas').on("click", function (evt) {

        // // var scale = getScale();
        // // if (scale == null) {
            // // scale = 1;
        // // }
        // // // We try to pick an object
        // // var pickResult = scene.pick(evt.offsetX, evt.offsetY);

        // // // if the click hits the ground object, we change the impact position
        // // if (pickResult.hit) {
            // // //some function
        // // }
    // // });
	
    // return scene;

// }


this.getScale = function () {
    this.viewportScale = undefined;
    // Calculate viewport scale 
    this.viewportScale = screen.width / window.innerWidth;
    return this.viewportScale;
}

Game.createParentTiles = function (activeScene, type) {
	// create box for the specific tile and scale it
	activeScene.parentTile.mesh[type] = new BABYLON.Mesh.CreateBox(bjsHelper.tileType[type].name + '-' + parseInt(type), 1.0, activeScene);
    activeScene.parentTile.mesh[type].scaling = bjsHelper.tileType[type].scale;
    activeScene.parentTile.mesh[type].material = bjsHelper.tileType[type].material;
    activeScene.parentTile.mesh[type].isVisible = false;
	
	activeScene.parentTile.mesh[type].addLODLevel(Game.performance.viewDistance, null);
}

Game.drawTile = function(activeScene, tile, index) {
	// create instance based off of type
	var newInstance = activeScene.parentTile.mesh[tile.type].createInstance("mesh_" + parseInt(tile.type) + "-" + parseInt(index));
    newInstance.position = new BABYLON.Vector3(tile.col*tile.width, bjsHelper.tileType[tile.type].yOffset, -tile.row*tile.width);
	newInstance.isVisible = true;

    return newInstance;
}


function createMaterials(activeScene) {
	//var activeScene = Game.scene[Game.activeScene];
	//Create me some textures
	//Tile Type detailed materials
	var randomColor = new BABYLON.Color3(Game.getRandomInt(0,10)/10, Game.getRandomInt(0,10)/10, Game.getRandomInt(0,10)/10);
	// randomColor =  new BABYLON.Color3(0,0,0); // awesome black tiles
	//Wall
	bjsHelper.tileType[0].material = new BABYLON.StandardMaterial("texture-" + bjsHelper.tileType[0].name, activeScene);
	bjsHelper.tileType[0].material.diffuseTexture = new BABYLON.Texture('./Textures/Wall_Texture-2.png', activeScene);
	bjsHelper.tileType[0].material.diffuseTexture.wAng=0;
	bjsHelper.tileType[0].material.diffuseTexture.uScale=1;
	// bjsHelper.tileType[0].material.diffuseTexture.vOffset=-1;
	bjsHelper.tileType[0].material.bumpTexture = new BABYLON.Texture('./Textures/Wall_BumpTexture-2.png', activeScene);
	bjsHelper.tileType[0].material.bumpTexture.uScale=1;
	bjsHelper.tileType[0].material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
	//Floor
	bjsHelper.tileType[1].material = new BABYLON.StandardMaterial("texture-" + bjsHelper.tileType[1].name, activeScene);
	bjsHelper.tileType[1].material.diffuseTexture = new BABYLON.Texture('./Textures/Floor_Tile-2.png', activeScene);
	bjsHelper.tileType[1].material.bumpTexture = new BABYLON.Texture('./Textures/Floor_Tile-bump.png', activeScene);
	bjsHelper.tileType[1].material.diffuseColor = randomColor;
	//Pillar
	bjsHelper.tileType[2].material = new BABYLON.StandardMaterial("texture-" + bjsHelper.tileType[2].name, activeScene);
	bjsHelper.tileType[2].material.bumpTexture = new BABYLON.Texture('./Textures/Wall_BumpTexture-2.png', activeScene);
	bjsHelper.tileType[2].material.diffuseTexture = new BABYLON.Texture('./Textures/Wall_Texture-2.png', activeScene);
	bjsHelper.tileType[2].material.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
	//Fire
	bjsHelper.tileType[3].material = new BABYLON.StandardMaterial("texture-" + bjsHelper.tileType[3].name, activeScene);
	bjsHelper.tileType[3].material.diffuseTexture = new BABYLON.Texture('./Textures/Floor_Tile-2.png', activeScene);
	bjsHelper.tileType[3].material.bumpTexture = new BABYLON.Texture('./Textures/Floor_Tile-bump.png', activeScene);
	bjsHelper.tileType[3].material.diffuseColor = randomColor;
	//Door
	bjsHelper.tileType[4].material = new BABYLON.StandardMaterial("texture-" + bjsHelper.tileType[4].name, activeScene);
	bjsHelper.tileType[4].material.diffuseTexture = new BABYLON.Texture('./Textures/Floor_Tile-2.png', activeScene);
	bjsHelper.tileType[4].material.bumpTexture = new BABYLON.Texture('./Textures/Floor_Tile-bump.png', activeScene);
	bjsHelper.tileType[4].material.diffuseColor = randomColor;
	
    activeScene.tileMaterialSword = new BABYLON.StandardMaterial("tile-texture-Sword", activeScene);
    activeScene.tileMaterialSword.diffuseColor = new BABYLON.Color3(0.3, 0.3, 0.7);
	// activeScene.tileMaterialSword.specularColor = new BABYLON.Color3(0, 0, 0);
	
	activeScene.enemyMaterial = function () {
		var marbleTexture = new BABYLON.MarbleProceduralTexture("marble",  128, activeScene);
		marbleTexture.numberOfBricksHeight = Game.getRandomInt(1,5);
		marbleTexture.numberOfBricksWidth = Game.getRandomInt(1,5);
		
		$.extend(this,new BABYLON.StandardMaterial("enemyMaterial", activeScene));
		this.ambientTexture = marbleTexture;
	}
	activeScene.playerShadow = function () {
		var playerShadowMaterial = new BABYLON.StandardMaterial("playerShadow", activeScene);
		playerShadowMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
		playerShadowMaterial.alpha = 0.8;
		return playerShadowMaterial;
	}
	activeScene.transportRingMaterial = function () {
		var fireTexture = new BABYLON.FireProceduralTexture("fire", 128, activeScene);
		fireTexture.fireColors = BABYLON.FireProceduralTexture.PurpleFireColors;
		
		$.extend(this,new BABYLON.StandardMaterial("transportRingMaterial", activeScene));
		this.diffuseTexture = fireTexture;
		this.opacityTexture = fireTexture;
	}
}
