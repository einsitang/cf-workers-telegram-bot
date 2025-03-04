import TelegramChat from './TelegramChat';
import TelegramUser from './TelegramUser';

// see document : https://core.telegram.org/bots/api#messageorigin
interface TelegramMessageOrigin {
	type: string;
	date: number;
}

interface MessageOriginUser extends TelegramMessageOrigin {
	sender_user: TelegramUser;
}
interface MessageOriginHiddenUser extends TelegramMessageOrigin {
	sender_user_name: string;
}
interface MessageOriginChat extends TelegramMessageOrigin {
	sender_chat: TelegramChat;
	author_signature: string;
}
interface MessageOriginChannel extends TelegramMessageOrigin {
	chat: TelegramChat;
	message_id: number;
	author_signature: string;
}

export { TelegramMessageOrigin, MessageOriginUser, MessageOriginHiddenUser, MessageOriginChat, MessageOriginChannel };
