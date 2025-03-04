import TelegramChat from './TelegramChat';
import TelegramLinkPreviewOptions from './TelegramLinkPreviewOptions';
import { TelegramMessageOrigin } from './TelegramMessageOrigin';

// see document : https://core.telegram.org/bots/api#externalreplyinfo
interface TelegramExternalReply {
	origin: TelegramMessageOrigin;
	chat?: TelegramChat;
	message_id?: number;
	link_preview_options: TelegramLinkPreviewOptions;
	//...
}

export default TelegramExternalReply;
