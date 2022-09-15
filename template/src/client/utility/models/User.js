import { v4 as uuid } from 'uuid';

import { softAssign } from '../Utility.js';

export default (data = {}) => {
	return softAssign(
		{
			id: uuid(),
			username: '',
			password: '',
			role: 'user',
			token: null,
		},
		data
	);
};
