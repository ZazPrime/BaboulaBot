const Discord = require("discord.js");
const bot = new Discord.Client();
const prefix = "!";
var fs = require('fs');
const fsExtra = require('fs-extra')
var path = require('path');
const config = require("./config.json");

bot.on("ready", () => {
	console.log(`Logged in as ${bot.user.tag}!`);
	bot.user.setActivity('Baboula things', { type: 'playing' });

	if (!fs.existsSync('./users')) {
		fs.mkdirSync('./users');
	}
});

bot.on("message", message => {

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(' ');
	const command = args.shift().toLowerCase();

	if (command === 'baboula') {
		//if (message.member.id !== "121919842382118914") return;
		if (!message.member.roles.has(config.roleidforcomamnds)) return;

		const membersWithRole = message.guild.members.filter(member =>
			member.roles.find(x => x.name === "Baboula")
		).map(member => member.user.id)
		
		//This has been updated to #Collection.find(x => x.name === "name").

		var randomMemberWithRole = Math.floor(Math.random() * membersWithRole.length);

		var randomMember = membersWithRole[randomMemberWithRole];

		var files = fs.readdirSync(`users/`);
		let savedusers = JSON.stringify(files);

		if (savedusers.includes(randomMember)) {
			var userpoints = fs.readFileSync(`users/${randomMember}`, 'utf-8');
			var userpointss = JSON.parse(userpoints);
		}

		if (randomMember === undefined) {
			message.channel.send(`No users in specified role.`);
		}

		if (savedusers.includes(randomMember)) {
			
			userpointss++;
			var userpoint = userpointss;
			
			//message.channel.send(`Hey <@${randomMember}> has ${userpoint} baboula points.`);
			fs.writeFileSync(`users/${randomMember}`, `${userpoint}`, null, 2, 'utf-8');

			let embedMSG22={
				'color': 0x0793F5,
				'description': `Hey <@${randomMember}> has ${userpoint} baboula points.`,
			};
			message.channel.send({embed: embedMSG22}).catch(console.error);

		}

		if (!savedusers.includes(randomMember)) {
			//message.channel.send(`<@${randomMember}> just got 1 Baboula point.`);
			fs.writeFileSync(`users/${randomMember}`, JSON.stringify(1, null, 2), 'utf-8');
			
			let embedMSG22={
				'color': 0x0793F5,
				'description': `<@${randomMember}> just got 1 Baboula point.`,
			};
			message.channel.send({embed: embedMSG22}).catch(console.error);
		}


	}

	if (command === 'baboulaboard') {
		//if (message.member.id !== "121919842382118914") return;
		if (!message.member.roles.has(config.roleidforcomamnds)) return;
		
		/* Returns filename of file containing the largest integer within a specified directory */
		const getFileWithLargestInteger = (pathToFolder) => {
		  const files = fs.readdirSync(pathToFolder);
		  const content = files.map(f => +fs.readFileSync(`${pathToFolder}/${f}`, 'UTF-8'));
		  const largestInteger = Math.max(...content);
		  const fileWithLargestInteger = files[content.indexOf(largestInteger)];
		  
		  return fileWithLargestInteger;		  
		}
		
		const getSecondFileName = (pathToFolder) => {
			let secondFileWithLargestInteger
			const files = fs.readdirSync(pathToFolder);
			const arrLength = files.length;
			const content = files.map(f => +fs.readFileSync(`${pathToFolder}/${f}`, 'UTF-8'));
			const arrayCopy = [...content];
			const sortedArray = arrayCopy.sort(function(a, b){
				return a - b;
			});;
			  const firstLargestNum = sortedArray[arrLength- 1];
			  const secondLargestNum = sortedArray[arrLength- 2];
			  if (firstLargestNum === secondLargestNum) {
				const indexofFirst = content.indexOf(secondLargestNum);
				// const indexofFirst = content.indexOf(firstLargestNum); same 
				secondFileWithLargestInteger = files[content.indexOf(secondLargestNum, (indexofFirst + 1))]
			  } else {
				secondFileWithLargestInteger = files[content.indexOf(secondLargestNum)];
			  }
			  return secondFileWithLargestInteger;        
		}

		const getThirdFileName = (pathToFolder) => {
			let secondFileWithLargestInteger;
			const files = fs.readdirSync(pathToFolder);
			const arrLength = files.length;
			const content = files.map(f => +fs.readFileSync(`${pathToFolder}/${f}`, 'UTF-8'));
			const arrayCopy = [...content];
			const sortedArray = arrayCopy.sort(function(a, b){
				return a - b;
			});;
			  const secondLargestNum = sortedArray[arrLength- 2];
			  const thirdLargestNum = sortedArray[arrLength- 3];
			  if (secondLargestNum === thirdLargestNum) {
				const indexofFirst = content.indexOf(thirdLargestNum);
				// const indexofFirst = content.indexOf(firstLargestNum); same 
				secondFileWithLargestInteger = files[content.indexOf(thirdLargestNum, (indexofFirst + 2))]
			  } else {
				secondFileWithLargestInteger = files[content.indexOf(thirdLargestNum)];
			  }
			  return secondFileWithLargestInteger;        
		}
		
		const getFileWhichHasLargestInteger = (pathToFolder) => {
		  const files = fs.readdirSync(pathToFolder);
		  const content = files.map(f => +fs.readFileSync(`${pathToFolder}/${f}`, 'UTF-8'));
		  const largestInteger = Math.max(...content);
		
		  return largestInteger;		  
		}
	
		const getFileWithSecondHighestIntegrer = (pathToFolder) => {
		  const files = fs.readdirSync(pathToFolder);
		  const content = files.map(f => +fs.readFileSync(`${pathToFolder}/${f}`, 'UTF-8'));
		  const arrayCopy = [...content];
		  const sortedArray = arrayCopy.sort(function(a, b){
				return a - b;
			});;
		  const secondLargestNum = sortedArray[sortedArray.length - 2]
		  
		  return secondLargestNum;		  
		}
		
		const getFileWithThirdHighestIntegrer = (pathToFolder) => {
		  const files = fs.readdirSync(pathToFolder);
		  const content = files.map(f => +fs.readFileSync(`${pathToFolder}/${f}`, 'UTF-8'));
		  const arrayCopy = [...content];
		  const sortedArray = arrayCopy.sort(function(a, b){
				return a - b;
			});;
	
		  const thirdLargestNum = sortedArray[sortedArray.length - 3]
		
		  return thirdLargestNum;		  
		}
		
			let embedMSG1={
				'color': 0x45b6fe,
				'title': 'Baboula Leaderboard',
			};
			message.channel.send({embed: embedMSG1}).catch(console.error);
			
			let embedMSG={
				'color': 0xFFD700,
				'title': 'First place:',
				'thumbnail': {'url': 'https://imgur.com/54A7CpJ.png'},
				'description': `1st Place Baboula is <@${getFileWithLargestInteger(`users/`)}> with ${getFileWhichHasLargestInteger(`users/`)} points.`
			};
			message.channel.send({embed: embedMSG}).catch(console.error);

			let embedMS={
				'color': 0xC0C0C0,
				'title': 'Second place:',
				'thumbnail': {'url': 'https://imgur.com/mU8Jxp2.png'},
				'description': `2nd Place Baboula is <@${getSecondFileName(`users/`)}> with ${getFileWithSecondHighestIntegrer(`users/`)} points.`
			};
			message.channel.send({embed: embedMS}).catch(console.error);
			
			let embedM={
				'color': 0xcd7f32,
				'title': 'Third place:',
				'thumbnail': {'url': 'https://imgur.com/1i6xFkU.png'},
				'description': `3rd Place Baboula is <@${getThirdFileName(`users/`)}> with ${getFileWithThirdHighestIntegrer(`users/`)} points.`
			};
			message.channel.send({embed: embedM}).catch(console.error);

	}

	if (command === 'baboulaking') {
		//if (message.member.id !== "121919842382118914") return;
		if (!message.member.roles.has(config.roleidforcomamnds)) return;

		const getFileWithLargestInteger = (pathToFolder) => {
		  const files = fs.readdirSync(pathToFolder);
		  const content = files.map(f => +fs.readFileSync(`${pathToFolder}/${f}`, 'UTF-8'));
		  const largestInteger = Math.max(...content);
		  const fileWithLargestInteger = files[content.indexOf(largestInteger)];
		  
		  return fileWithLargestInteger;		  
		}
		
		const getFileWhichHasLargestInteger = (pathToFolder) => {
		  const files = fs.readdirSync(pathToFolder);
		  const content = files.map(f => +fs.readFileSync(`${pathToFolder}/${f}`, 'UTF-8'));
		  const largestInteger = Math.max(...content);
		  
		  return largestInteger;		  
		}
	
		
		let embedMSG2={
				'color': 0x0793F5,
				'title': 'The Baboula King is:',
				'thumbnail': {'url': 'https://imgur.com/4cB00xr.png'},
				'description': `<@${getFileWithLargestInteger(`users/`)}> with ${getFileWhichHasLargestInteger(`users/`)} points`
			};
			message.channel.send({embed: embedMSG2}).catch(console.error);

		let baboulaking = message.guild.members.get(`${getFileWithLargestInteger(`users/`)}`);
		if(baboulaking.roles.has(config.kingidrole)) return;
		baboulaking.addRole(config.kingidrole);

	}

	if (command === 'baboulaclear') {
		//if (message.member.id !== "121919842382118914") return;
		if (!message.member.roles.has(config.roleidforcomamnds)) return;
		
		//Find everyone who has Baboula king role
		const membersWithRole = message.guild.members.filter(member =>
			member.roles.find(x => x.name === "Baboula King")
		).map(member => member.user.id)
	
		//every member with Baboula King role looses a king role
		membersWithRole.forEach(element => { 
		  let baboulaking = message.guild.members.get(element); 
		  baboulaking.removeRole(config.kingidrole);
		}); 
		
		let embedMSG11={
				'color': 0x0793F5,
				'description': 'All of the Baboula Points were cleared.\nKing lost their role.',
			};
			message.channel.send({embed: embedMSG11}).catch(console.error);
			
		fsExtra.emptyDirSync(`users/`)
	}

});

bot.login(config.token);
