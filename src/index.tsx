import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const savedState = localStorage.getItem('articleState');
	const [articleState, setArticleState] = useState(
		savedState ? JSON.parse(savedState) : defaultArticleState
	);

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
	const closeSidebar = () => setIsSidebarOpen(false);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				articleState={articleState}
				setArticleState={setArticleState}
				isOpen={isSidebarOpen}
				onToggle={toggleSidebar}
				onClose={closeSidebar}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
