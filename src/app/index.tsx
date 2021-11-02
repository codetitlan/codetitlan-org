import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';
import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { PersonalIncarnation } from './components/PersonalIncarnation';
import { ContactForm } from './pages/ContactForm';

export function App() {
  const { i18n } = useTranslation();
  return (
    <>
      <BrowserRouter>
        <Helmet
          titleTemplate="%s - Codetitlan"
          defaultTitle="Codetitlan"
          htmlAttributes={{ lang: i18n.language }}
        >
          <meta
            name="description"
            content="A fun community to learn, work and earn"
          />
        </Helmet>

        <PersonalIncarnation />

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/contact" component={ContactForm} />
          <Route component={NotFoundPage} />
        </Switch>

        <GlobalStyle />
      </BrowserRouter>
    </>
  );
}
