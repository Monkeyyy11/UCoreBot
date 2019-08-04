const Discord = require('discord.js');

exports.run = (client, msg, args) => {
    const ucoreleader = client.guilds.get('328529653088124931').roles.find('name', 'UCore-Leader');
	const ucoremoderator = client.guilds.get('328529653088124931').roles.find('name', 'UCore-Moderator');
    const ucoresupporter = client.guilds.get('328529653088124931').roles.find('name', 'UCore-Supporter');
    const ucoremember = client.guilds.get('328529653088124931').roles.find('name', 'UCore-Member');
    const freund = client.guilds.get('328529653088124931').roles.find('name', 'Freund');
    
    if (!msg.member.roles.get(freund.id) && !msg.member.roles.get(ucoreleader.id) && !msg.member.roles.get(ucoremoderator.id) && !msg.member.roles.get(ucoresupporter.id) && !msg.member.roles.get(ucoremember.id)) return msg.channel.send('Du musst im UCore Clan sein um diese Rolle zu bekommen!');
    
    if(msg.member.roles.find('name', 'Overwatch')) {
        const role = client.guilds.get('328529653088124931').roles.find('name', 'Overwatch');
        msg.member.removeRole(role);
        msg.channel.send(`${msg.author}, dir wurde erfolgreich die Rolle entfernt!`);
        return undefined;
    }

    const role = client.guilds.get('328529653088124931').roles.find('name', 'Overwatch');
    msg.member.addRole(role);
    msg.channel.send(`${msg.author}, du hast erfolgreich die Rolle bekommen!`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: []
};

  exports.help = {
    name: 'ow',
    description: 'Fügt dich zu der Overwatch Gruppe hinzu wenn du im UCore Clan bist!',
    usage: 'ow ',
    example: 'ow',
	category: 'utility'
};

