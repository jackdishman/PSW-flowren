//import $ from "jquery";
const data = require('./users.json');

var LIST_iLINK = ["facebook","twitter","instagram","snapchat","soundcloud"];

/*
JSON FUNCTIONS
-	getNumUsers()					Returns number of users
-	getUserFullNames()		returns array of all full names
-	getUserLinks(DNA)			returns [link type, link href]
-	getUserName(DNA)			returns the full name of a user
-	getuserDNA(name)			returns the DNA of a user
-	getBio(DNA)						returns the bio of a user
-	fetchJSON()						returns the json object
--getAvatarLink(DNA)		returns
*/

export function selectUserAction(user) {
    console.log(user);
    return {
        type: 'USER_SELECTED',
        payload: user
    }
}

export function addUser(input){

}

export function createNewDNA(lastDNA){
	var count = getNumUsers();
	count++;
	return count;
}

	export function getAvatarLink(DNA){
		return require('../images/avatar-' + DNA + '.jpg');
	}

//returns the number of users in users.json
export function getNumUsers(){
	return Object.keys(data.users).length;
}

//returns array of all users first and last names
export function getUserFullNames(){
	var i = 0;
	var nameList = [];
	while(i < getNumUsers()){
		var fullName = data.users[i].userName;
		nameList.push(fullName);
		i++;
	}
	return nameList
}

//returns [link type, link href]
export function getUserLinks(DNA){
	var userData = [];
	var i = 0;
	while(i < getNumUsers()){
		if(DNA === data.users[i].DNA){
			for(var j = 0; j < Object.keys(LIST_iLINK).length; j++){
				var target = data.users[i].iLink[LIST_iLINK[j]];
				if(target !== undefined)
					userData.push([LIST_iLINK[j], target]);
			}
			return userData;
		}
		i++;
	}
}

//returns the full name of the desired DNA
export function getUserName(DNA){
	var i = 0;
	while(i < getNumUsers()){
		if(DNA === data.users[i].DNA){
			var fullName = data.users[i].userName;
			return fullName;
		}
		i++;
	}
}

//returns DNA of name
export function getUserDNA(name){
	var i = 0;
	while(i < getNumUsers()){
		var fullName = data.users[i].userName;
		if(name === fullName){
			return data.users[i].DNA;
		}
		i++;
	}
}

export function getBio(DNA){
	var i = 0;
	while(i < getNumUsers()){
		if(DNA === data.users[i].DNA){
			return data.users[i].bio;
		}
		i++;
	}}

export function fetchJSON(){
	return data;
}
