export default {
	introduction: (nickname: string) => `您好，我是 ${nickname} 助手，您可以称呼我为星期五。如果您需要联系他，请给我发送消息，我会转达给您。`,
	translatedPaging: (translatedText: string) => `
**为你翻译**:
>
> ${translatedText}`,
	remindReplyToSendMessage: '🧠 回复对应的消息可回复该用户',
};
