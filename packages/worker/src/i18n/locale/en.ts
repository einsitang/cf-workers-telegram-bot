export default {
	introduction: (nickname: string) =>
		`Hello,I'm ${nickname} assistant, you can call me Friday,\nIf you need to contact him, please send a message to me and I will relay it for you.`,
	translatedPaging: (translatedText: string) => `
**changed into your language**:
>
> ${translatedText}`,
	remindReplyToSendMessage: '🧠 Just reply to send a message to this user.',
};
