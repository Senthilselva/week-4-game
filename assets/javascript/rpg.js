//Gobal Variable
var isRoleSelect=false;
var isEnemySelect = false;
var userRole;
var enemyRole;

//audio
var audioElement = document.createElement('audio');
audioElement.setAttribute('src', 'assets/sounds/punch1.mp3');

//Class for starwars Characters
$( document ).ready(function() {
function swCharacter(name, healthPoint, attackPower, counterPower, AttackIncrease,fileSource){
	this.name = name;
	this.healthPoint = healthPoint;
	this.attackPower = attackPower;
	this.counterPower = counterPower;
	this.AttackIncrease = AttackIncrease;
	this.isUsed = false;
	this.fileSource = fileSource;
	this.pic = "";
	this.cap ="";
	this.makeImgTag=function(){
		this.pic= $('<img>');
		this.pic.addClass('characterPic');
		this.pic.attr('src',this.fileSource);
	}//makeImage

	//Creating caption do display info
	this.makeCaptionTag = function() {
		this.cap= $('<div>');
		this.cap.addClass('caption');
		this.cap.text(this.name + "  Health Point:  "+ this.healthPoint );
	}//makeCaptionTag
}

//damageDetails
function writeToDamageDetails(){

		var yourdetail =userRole.name + " will cause "+userRole.attackPower+" points damage."+'<br>';
		$('.damageDetails').html(yourdetail);

		var enemydetail = enemyRole.name + " will cause "+enemyRole.attackPower+" points damage."+'<br>';
		$('.damageDetails').append(enemydetail);
}

//Arry to store the char on list
var arrSwCharacter = [];


function startGame()
{

isRoleSelect=false;
isEnemySelect = false;
userRole=[];
enemyRole=[];


arrSwCharacter = [];
arrSwCharacter.push(new swCharacter("Obi-Wan Kenobi",120, 6, 10, 6, "assets/images/obi-wan-kenobi.jpg"));
arrSwCharacter.push(new swCharacter("Luke Skywalker",180, 7, 14, 6, "assets/images/luke-skywalker.jpg" ));
arrSwCharacter.push(new swCharacter("Darth Sidious", 400, 8, 12, 6, "assets/images/dart_sidious.jpe" ));
arrSwCharacter.push(new swCharacter("Darth Maul", 150, 5, 8, 6, "assets/images/darth_maul.jpg" ));

//alert("aha aha ah");
$('#intDisplay').empty();
$('.userCharacter').empty();
$('.enemyCharcter').empty();
$('.damageDetails').empty();
$('#EnemyDisplay').empty();
$('.userCharacter').removeClass('img-thumbnail');
$('.enemyCharcter').removeClass('img-thumbnail');
$('.enemyInstruction').hide();
$('.attack').hide();


//loop through the array and display the on the screen initiall
for(var i=0; i < arrSwCharacter.length ; i++){

// console.log(arrSwCharacter[i].name +"   " +arrSwCharacter[i].fileSource);

	//div to hold the image and caption
	var picHolder = $('<div>');
	picHolder.addClass('col-md-3 notSelected img-thumbnail');
	picHolder.attr('id','picHolder'+i);
	picHolder.attr('data-num', i);
	var a='#picHolder'+ i;
	$('#intDisplay').append(picHolder);

	arrSwCharacter[i].makeImgTag();
	arrSwCharacter[i].makeCaptionTag();

	//adding it to the pic 
	$(a).append(arrSwCharacter[i].pic, arrSwCharacter[i].cap);
}

}

startGame();

//$(staticAncestors).on(eventName, dynamicChild, function() {
//for selecting a the userRole 
$('#intDisplay').on("click", '.notSelected', function(){
	isRoleSelect = true;

	//move the selected character to the specific area
	var ind = parseInt($(this).data('num'));
	arrSwCharacter[ind].isUsed = true;
	userRole=arrSwCharacter[ind];
	//console.log(userRole);
	$('.userCharacter').addClass('img-thumbnail');
	$('.userCharacter').append(userRole.pic, userRole.cap);

	for(var i=0; i < arrSwCharacter.length; i++){
		//Check to see if it is already selected
		if(!arrSwCharacter[i].isUsed){

			var picHolder = $('<div>');
			picHolder.addClass('col-md-4 enemyList img-thumbnail');
			picHolder.attr('id','ePicHolder'+i);
			picHolder.attr('data-num', i);
			var a='#ePicHolder'+ i;
			$('#EnemyDisplay').append(picHolder);

			//console.log(arrSwCharacter[i]);
			//console.log(i);
			$(a).append(arrSwCharacter[i].pic,arrSwCharacter[i].cap);
		}
	}
	//empty the not selected section
	$('#intDisplay').empty();
	$('.enemyInstruction').show();

});//Closing clicked initial selection


//Selecting enemy to fight with 

//$(staticAncestors).on(eventName, dynamicChild, function() {});
$('#EnemyDisplay').on("click", '.enemyList', function() {
//if enemy is not selected it is moved to the fightinarea and it is removed from the list below
	if(!isEnemySelect){	
		//copy the details from the array to enemy
		isEnemySelect=true;
		enemyRole="";
		var ind = parseInt($(this).data('num'));
		arrSwCharacter[ind].isUsed = true;
		enemyRole=arrSwCharacter[ind];
		//console.log(enemyRole);
		$(this).removeClass('img-thumbnail enemyList');
		//move the picture to enemy fighting area
		$(".enemyCharcter").empty();
		$('.enemyCharcter').addClass('img-thumbnail');
		$('.enemyCharcter').append(enemyRole.pic, enemyRole.cap);
		//console.log(enemyRole);
		writeToDamageDetails();	
		$('.attack').show()
	}
}); //closing enemy selection

$('button').on("click", function() {

	//Selecting attack button
	if(isEnemySelect && $(this).hasClass("attack")){

		audioElement.play();
		$(".userCharacter").animate({top:"-=30px"}, "fast");
		$(".userCharacter").animate({left:"+=30px"}, "normal");
		$(".userCharacter").animate({top:"+=30px"}, "fast");
		$(".userCharacter").animate({left:"-=30px"}, "normal");
		audioElement.play();

		$(".enemyCharcter").animate({top:"-=30px"}, "fast");
		$(".enemyCharcter").animate({left:"-=30px"}, "normal");
		$(".enemyCharcter").animate({top:"+=30px"}, "fast");
		$(".enemyCharcter").animate({left:"+=30px"}, "normal");
		audioElement.play();

		



		//update heathPoints
		userRole.healthPoint -= enemyRole.counterPower;
		enemyRole.healthPoint -= userRole.attackPower;  

		//increase attackPower
		userRole.attackPower += userRole.AttackIncrease;
		//console.log(userRole.attackPower +"  "+enemyRole.attackPower);
			
		writeToDamageDetails();
		//alert("after writeToDamageDetails");

		//Check to see if healthpoints < 0
		if(userRole.healthPoint >= 0 && enemyRole.healthPoint >= 0){
			//update the captions
			userRole.makeCaptionTag();
			$('.userCharacter div').last().remove(); 
			$('.userCharacter').append(userRole.cap);

			//update the enemy Caption
			enemyRole.makeCaptionTag();
			$('.enemyCharcter div').last().remove(); 
			$('.enemyCharcter').append(enemyRole.cap);

		}else if(enemyRole.healthPoint < 0){
			//if enemy lost
			isEnemySelect=false;	
			$(".enemyCharcter").empty();
			$(".enemyCharcter").html(enemyRole.name + " has "+ enemyRole.healthPoint + " point. So he died so Select aother Enemy");
		}else if(userRole.healthPoint < 0){
			//if you lost
			$('.userCharacter').empty();
			$('.userCharacter').html(" You Lost ");		
		}

	}//if is selected and attack button is pressed

	if($(this).hasClass("start")){
		//alert("start over");
		startGame();
	}
	
});//closing attack button

});//Closing on document ready
