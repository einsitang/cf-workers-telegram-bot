import l from './locale';

const i18n = (local = 'en') => {
	if (Object.keys(l).includes(local)) {
		return l[local as keyof typeof l];
	} else {
		console.log('no,give default : en');
		return l.en;
	}
};
export { i18n };
