import { useState, CSSProperties } from 'react';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { Article } from './components/article/Article';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

export const App = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
	const closeSidebar = () => setIsSidebarOpen(false);

	return (
		<main
			className={styles.main}
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
