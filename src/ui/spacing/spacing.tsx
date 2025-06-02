type SpacingProps = {
	size: number;
};

export const Spacing = ({ size }: SpacingProps) => {
	return <div style={{ height: size }} />;
};
