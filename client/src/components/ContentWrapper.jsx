import React from 'react'

const ContentWrapper = ({children}) => {
	return (
		<div className="max-w-[85vw] m-auto">
			{children}
		</div>
	)
}

export default ContentWrapper