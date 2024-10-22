import { usePageContext } from 'vike-react/usePageContext';
import { redirect } from 'vike/abort';

export default function Page() {
	const { is404 } = usePageContext();
	if (is404) {
		throw redirect('/focus-hours-goal');
	}

	return (
		<>
			<h1>500 Internal Server Error</h1>
			<p>Something went wrong.</p>
		</>
	);
}
