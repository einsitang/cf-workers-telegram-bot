// see docuemnt : https://core.telegram.org/bots/api#linkpreviewoptions
interface TelegramLinkPreviewOptions {
	is_disabled?: boolean;
	url?: string;
	prefer_smal_media?: boolean;
	prefer_large_media?: boolean;
	show_above_text?: boolean;
}

export default TelegramLinkPreviewOptions;
