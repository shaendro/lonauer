import { v4 as uuid } from 'uuid';

import { softAssign } from '../Utility.js';
import { translate } from '../Translations.js';

export default (data = {}) => {
	return softAssign(
		{
			id: uuid(),
			name: translate('newNode'),
			txFee: 0,
			bunfeeCap: 0,
			balance: 0,
			balanceUrl: '',

			sshHost: '',
			sshPort: '22',
			sshUsername: '',
			sshPassword: undefined,
			sshPrivateKey: undefined,
			txFeeLocation: '',
			bunfeeCapLocation: '',
		},
		data
	);
};
