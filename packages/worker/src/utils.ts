import { marked } from 'marked';

type promiseFunc<T> = (resolve: (result: T) => void, reject: (e?: Error) => void) => Promise<T>;
/**
 * Wrap setTimeout in a Promise
 * @param func - function to call after setTimeout
 * @param time - delay in milliseconds (default: 1000)
 */
function wrapPromise<T>(func: promiseFunc<T>, time = 1000) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			func(resolve, reject).catch((e: unknown) => {
				console.error('Error in wrapPromise:', e);
			});
		}, time);
	});
}

/**
 * Convert markdown to html that Telegram can parse
 * @param s - the string containing markdown
 * @returns HTML formatted string compatible with Telegram
 */
async function markdownToHtml(s: string) {
	marked.setOptions(marked.getDefaults());
	const parsed = await marked.parse(s);
	const tagsToRemove = ['p', 'ol', 'ul', 'li', 'h1', 'h2', 'h3'];
	const tagPattern = new RegExp(tagsToRemove.map((tag) => `<${tag}>|</${tag}>`).join('|'), 'g');
	return parsed.replace(tagPattern, '');
}

export { wrapPromise, markdownToHtml, promiseFunc };
