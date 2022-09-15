import { capitalCase } from 'change-case';

export let language = 'en';

const translations = {
	en: {
		textDescription: 'Text Description',
		username: 'Username',
		password: 'Password',
		login: 'Login',
		logout: 'Logout',
		loading: 'Loading',
		balance: 'Balance',
		txFee: 'Tx Fee',
		bunfeeCap: 'Bunfee Cap',
		save: 'Save',
		newNode: 'New Node',
	},
};

const missingTranslations = {};

/**
 * Returns the translation for the given identifier string
 */
export const translate = (string) => {
	if (translations[language] === undefined || translations[language][string] === undefined) {
		missingTranslations[string] = capitalCase(string);
		console.info('Missing translations:', missingTranslations);
		return capitalCase(string);
	} else {
		return translations[language][string];
	}
};
