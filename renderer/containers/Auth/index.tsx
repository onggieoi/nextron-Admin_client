import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NotificationContainer } from 'react-notifications';

import { AuthContext } from 'contexts/Auth';

const Auth: React.FC<any> = ({ children }) => {
	const { isAuth } = useContext(AuthContext);

	const router = useRouter();

	useEffect(() => {
		if (!isAuth) {
			router.push('/login');
		}
	}, [isAuth]);

	return (
		<>
			<NotificationContainer />
			{children}
		</>
	)
};

export default Auth;
