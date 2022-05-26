import { FC } from 'react';
import { Route } from 'react-router-dom';
import { RouteProps } from 'react-router';
import PrivateRoute from './pravateRoute';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

export interface WrapperRouteProps extends RouteProps {
  /** document title locale id */
  titleId: string;
  description: string;
  /** authorization？ */
  auth?: boolean;
}

const WrapperRouteComponent: FC<WrapperRouteProps> = ({ titleId, description, auth, ...props }) => {
  const { formatMessage } = useIntl();
  const WitchRoute = auth ? PrivateRoute : Route;
  // if (titleId) {
  //   document.title = formatMessage({
  //     id: titleId
  //   });
  // }
  return (
    <>
      {/* <Helmet>
        <meta charSet="utf-8" />
        <title>{!!titleId ? formatMessage({ id: titleId }) : ''}</title>
        <meta name="title" content={!!titleId ? formatMessage({ id: titleId }) : ''} />
        <meta name="description" content={!!description ? formatMessage({ id: description }) : ''} />
        <link rel="canonical" href={window.location.href} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'Recipe',
            name: 'Radiantgalaxy',
            author: {
              '@type': 'Organization',
              name: 'Radiantgalaxy'
            },
            datePublished: '2021-09-01',
            description:
              'Radiant Galaxy unlock a new monumental Galaxyverse with amazing high quality 3D game play for mobile. Radiant Galaxy is the first tactical blockchain game that utilizes NFTs for an epic Play To Earn experience.',
            prepTime: 'PT10M',
            cookTime: 'PT20M',
            totalTime: 'PT30M',
            keywords: 'radiantgalaxy, Play-to-Earn platforms, free mobile games, Radiantgalaxy platform',
            recipeYield: '5',
            recipeIngredient: [
              'radiantgalaxy',
              'Play-to-Earn platforms',
              'free mobile games',
              'radiantgalaxy platform',
              'platform',
              'game'
            ],
            recipeInstructions: [
              {
                '@type': 'HowToStep',
                name: 'Radiantgalaxy',
                text: 'Radiant Galaxy unlock a new monumental Galaxyverse with amazing high quality 3D game play for mobile. Radiant Galaxy is the first tactical blockchain game that utilizes NFTs for an epic Play To Earn experience.',
                url: 'https://recipesexample.com/fried-chicken-recipe#step1'
              },
              {
                '@type': 'HowToStep',
                name: 'Radiantgalaxy Login',
                text: 'Radiant Galaxy unlock a new monumental Galaxyverse with amazing high quality 3D game play for mobile. Radiant Galaxy is the first tactical blockchain game that utilizes NFTs for an epic Play To Earn experience.',
                url: 'https://recipesexample.com/fried-chicken-recipe#step2'
              },
              {
                '@type': 'HowToStep',
                name: 'Radiantgalaxy Signup',
                text: 'Radiant Galaxy unlock a new monumental Galaxyverse with amazing high quality 3D game play for mobile. Radiant Galaxy is the first tactical blockchain game that utilizes NFTs for an epic Play To Earn experience.',
                url: 'https://recipesexample.com/fried-chicken-recipe#step3'
              },
              {
                '@type': 'HowToStep',
                name: 'Radiantgalaxy Lightpaper',
                text: 'Radiant Galaxy unlock a new monumental Galaxyverse with amazing high quality 3D game play for mobile. Radiant Galaxy is the first tactical blockchain game that utilizes NFTs for an epic Play To Earn experience.',
                url: 'https://recipesexample.com/fried-chicken-recipe#step4'
              }
            ],
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5',
              ratingCount: '99'
            }
          })}
        </script>
      </Helmet> */}
      <WitchRoute {...props} />
    </>
  );
};

export default WrapperRouteComponent;
