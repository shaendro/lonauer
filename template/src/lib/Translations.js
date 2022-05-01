/**
 * A module for managing internationalization within the application
 */
export let language = 'en';

const translations = {
	en: {
		description: `A template website built by developer Paul Lonauer`,
	},
};

const missingTranslations = {};

/**
 * Returns the translation for the given identifier string
 */
export const translate = (string) => {
	if (translations[language] === undefined || translations[language][string] === undefined) {
		missingTranslations[string] = string.replaceAll(' ', '_').toLocaleUpperCase();
		console.info('Missing translations:', JSON.stringify(missingTranslations).slice(1, -1));
		return string;
	} else {
		return translations[language][string];
	}
};
