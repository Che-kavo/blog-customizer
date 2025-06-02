import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import {
	defaultArticleState,
	backgroundColors,
	fontSizeOptions,
	fontColors,
	fontFamilyOptions,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { Spacing } from 'src/ui/spacing/spacing';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (state: ArticleStateType) => void;
	isOpen: boolean;
	onToggle: () => void;
	onClose: () => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
	isOpen,
	onToggle,
	onClose,
}: ArticleParamsFormProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [formValues, setFormValues] = useState(articleState);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				isOpen &&
				containerRef.current &&
				!containerRef.current.contains(e.target as Node)
			) {
				onClose();
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onClose]);

	const handleChange = (key: keyof typeof formValues, value: string) => {
		setFormValues((prev) => ({
			...prev,
			[key]: {
				...prev[key],
				value,
			},
		}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleState(formValues);
		localStorage.setItem('articleState', JSON.stringify(formValues));
		onClose();
	};

	const handleReset = () => {
		setFormValues(defaultArticleState);
		setArticleState(defaultArticleState);
		localStorage.setItem('articleState', JSON.stringify(defaultArticleState));
	};

	const getOptionByValue = (options: typeof fontFamilyOptions, value: string) =>
		options.find((opt) => opt.value === value) || options[0];

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			<aside
				ref={containerRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={25} weight={800} align='left' dynamic={false}>
						Задайте параметры
					</Text>

					<Spacing size={50} />

					<div className={styles.section}>
						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={getOptionByValue(
								fontFamilyOptions,
								formValues.fontFamilyOption.value
							)}
							onChange={(option) =>
								handleChange('fontFamilyOption', option.value)
							}
							placeholder='Выберите шрифт'
						/>
					</div>
					<Spacing size={50} />

					<div className={styles.section}>
						<RadioGroup
							name='fontSize'
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={formValues.fontSizeOption}
							onChange={(option) =>
								setFormValues((prev) => ({
									...prev,
									fontSizeOption: option,
								}))
							}
						/>
					</div>
					<Spacing size={50} />

					<div className={styles.section}>
						<Select
							title='Цвет шрифта'
							options={fontColors}
							selected={getOptionByValue(
								fontColors,
								formValues.fontColor.value
							)}
							onChange={(option) => handleChange('fontColor', option.value)}
							placeholder='Выберите цвет шрифта'
						/>
					</div>
					<Spacing size={50} />

					<Separator />
					<Spacing size={50} />

					<div className={styles.section}>
						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={getOptionByValue(
								backgroundColors,
								formValues.backgroundColor.value
							)}
							onChange={(option) =>
								handleChange('backgroundColor', option.value)
							}
							placeholder='Выберите цвет фона'
						/>
					</div>

					<Spacing size={50} />

					<div className={styles.section}>
						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={getOptionByValue(
								contentWidthArr,
								formValues.contentWidth.value
							)}
							onChange={(option) => handleChange('contentWidth', option.value)}
							placeholder='Выберите ширину'
						/>
					</div>

					<Spacing size={207} />

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
