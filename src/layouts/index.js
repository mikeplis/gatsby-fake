import React from 'react';
import Helmet from 'react-helmet';

import './index.css';

import Navigation from '../components/Navigation';

const IndexTemplate = ({ children }) =>
    <div>
        <Helmet
            title="Gatsby Default Starter"
            meta={[{ name: 'description', content: 'Sample' }, { name: 'keywords', content: 'sample, something' }]}
        />
        <Navigation />
        <div>
            {children()}
        </div>
    </div>;

export default IndexTemplate;
