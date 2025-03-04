import TelegramBot, { TelegramExecutionContext } from '../../main/src/main.js';
import { MessageOriginUser } from '../../main/src/types/TelegramMessageOrigin.js';
import { i18n } from './i18n/i18n.js';
import { markdownToHtml } from './utils.js';
export interface Environment {
	SECRET_TELEGRAM_API_TOKEN: string;
	// language
	LOCAL: string;
	// bot owner nickname , not bot name
	NICK_NAME?: string;
	// bot creator user id
	CREATOR_USER_ID?: number;

	AI: Ai;
	DB: D1Database;
	R2: R2Bucket;
}

// AI model constants
const TRANSLATION_AI_MODEL = '@cf/meta/m2m100-1.2b';

export default {
	fetch: async (request: Request, env: Environment) => {
		const introduction = i18n(env.LOCAL).introduction(env.NICK_NAME ?? 'Bin');
		const asistantBot = new TelegramBot(env.SECRET_TELEGRAM_API_TOKEN, {
			creatorId: env.CREATOR_USER_ID,
		});

		const results = await Promise.all([
			asistantBot
				.on('start', async (bot: TelegramExecutionContext) => {
					if (bot.update_type === 'message') {
						await bot.reply(introduction);
					}
					return new Response('ok');
				})
				.on(':message', async (bot: TelegramExecutionContext) => {
					if (bot.update_type === 'message') {
						const msg = bot.update.message;
						const fromChat = msg?.from;

						const originMsgText = msg?.text ?? '';

						if (!bot.isFromCreator()) {
							// forward message
							await bot.sendTyping();
							const aiResp = await env.AI.run(TRANSLATION_AI_MODEL, {
								text: originMsgText,
								target_lang: 'chinese',
							});
							const translatedText = aiResp.translated_text ?? '';

							// reply user sender
							await bot.reply('got it!');

							// forward message to admin
							await bot.forwardMessage(bot.getCreatorId());
							// paging admin
							const pagingMsg = i18n(env.LOCAL).translatedPaging(translatedText);
							const sendPagingResult = await bot.sendMessage(bot.getCreatorId(), await markdownToHtml(pagingMsg), {
								reply_parameters: {
									chat_id: fromChat?.id,
									message_id: msg?.message_id,
								},
							});
							const sendPagingResultJson: {
								ok: boolean;
								[key: string]: unknown;
							} = await sendPagingResult.json();
							if (!sendPagingResultJson.ok) {
								console.debug(JSON.stringify(sendPagingResultJson));
							}
						} else {
							const origin = msg?.reply_to_message?.external_reply?.origin;
							if (origin != null) {
								// reply origin sender
								const senderUid = (origin as MessageOriginUser).sender_user.id;
								console.log('origin sender id', senderUid, 'msg:', msg?.text ?? '');
								const r = await bot.sendMessage(senderUid, msg?.text ?? '');
								console.log(await r.text());
							} else {
								console.debug(msg?.reply_to_message);
								// remind admin how to do for reply user message
								await bot.reply(i18n(env.LOCAL).remindReplyToSendMessage);
							}
						}
					}
					return new Response('ok');
				})
				.handle(request.clone()),
		]);

		for (const r of results) {
			if (r.status !== 200) {
				return r;
			}
		}
		return new Response('ok');
	},
};
