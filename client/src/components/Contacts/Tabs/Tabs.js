import './Tabs.css';
import { useState } from 'react';
import classNames from 'classnames';

const Tabs = ({ defaultIndex = 0, onTabClick, children }) => {
	const [currentIndex, setCurrentIndex] = useState(defaultIndex);
	const changeTab = (newIndex) => {
		if (typeof onTabClick === 'function') {
			onTabClick(currentIndex);
		}
		setCurrentIndex(newIndex);
	};

	const items = children.filter((item) => item.type.name === 'TabItem');

	return (
		<>
			<div className='tabs'>
				{items.map(({ props: { index, label } }) => (
					<button
						key={`tab-btn-${index}`}
						onClick={() => changeTab(index)}
						className={classNames({ active: currentIndex === index })}
					>
						{label}
					</button>
				))}
			</div>
			<div className='tab-view'>
				{items.map(({ props }) => {
					return (
						currentIndex === props.index && (
							<div {...props} key={`tab-content-${props.index}`} />
						)
					);
				})}
			</div>
		</>
	);
};

export default Tabs;
