const request = require('request-promise');
const { RichEmbed } = require('discord.js');


exports.run = async (client, msg, args) => {
	if (args.length < 1) {
		return msg.reply('Bitte gib an, nach was du suchen möchtest');
	}
	const config = require('../settings.json').googleKey;
	const config2 = require('../settings.json').googlekey;
	const response = await request({
		headers: { 'User-Agent': 'Mozilla/5.0' },
		uri: 'https://www.googleapis.com/customsearch/v1',
		json: true,
		qs: {
			cx: config,
			key: config2,
			num: 1,
			q: args.join(' ')
		}
	}).catch(error => console.error(error.response.body.error, msg.channel));

	if (!response) return false;

	if (response.searchInformation.totalResults !== '0') {
		const result = response.items[0];
		const link = decodeURIComponent(result.link);

		const embed = new RichEmbed()
		    .setColor('#0066CC')
			.setAuthor(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL)
			.setURL(link)
			.setTitle(result.title)
			.setDescription(result.snippet)
			.setFooter(result.link, result.link);

		if (result.pagemap && result.pagemap.cse_thumbnail) embed.setThumbnail(result.pagemap.cse_thumbnail[0].src);

		await msg.channel.send({ embed });
	}

	return false;
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['g'],
	permLevel: 0
};
exports.help = {
	name: 'google',
	description: 'Sucht etwas in Google nach',
	usage: 'google {X}',
	example: 'google Minecraft StoryMode',
	category: 'searches'
};
