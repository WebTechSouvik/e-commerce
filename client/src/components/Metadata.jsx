import React from 'react'
import {Helmet} from "react-helmet";

const Metadata = ({tittle}) => {
	return (
		
			<Helmet>
             
                <title>{tittle}</title>
             
            </Helmet>
		
	)
}

export default Metadata