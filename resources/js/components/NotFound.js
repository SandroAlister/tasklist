import React from 'react';

export default function NotFound() {
	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		fontSize: '200px'
	}
    return (
        <div style={style}>404</div>
    );
}