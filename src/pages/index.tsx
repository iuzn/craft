import type { HeadFC } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';

import '../styles/global.css';
import { ContentBox } from '../components/layout/content-box/ContentBox';
import PageLayout from '../components/layout/PageLayout';
import ContentList from '../components/layout/ContentList';

const IndexPage = () => {
  return (
    <PageLayout theme="gradient">
      <PageLayout.Title>uing</PageLayout.Title>
      <ContentList>
        <ContentList.Item>
          <Link to="/dynamic-card">
            <ContentBox title="dynamic card">
              <StaticImage
                src="../images/thumbnails/dynamic-card.png"
                alt="dynamic card content preview"
                height={250}
                objectFit="contain"
                style={{ display: 'flex', justifyContent: 'center' }}
                quality={100}
              />
            </ContentBox>
          </Link>
        </ContentList.Item>

        <ContentList.Item>
          <Link to="/border-animation">
            <ContentBox title="border-animation">
              <StaticImage
                src="../images/thumbnails/border-animation.jpg"
                alt="Button Border Animation Preview Image"
                objectFit="contain"
                height={250}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
                quality={100}
              />
            </ContentBox>
          </Link>
        </ContentList.Item>

        <ContentList.Item>
          <Link to="/genie-window">
            <ContentBox title="genie-window">
              <StaticImage
                src="../images/thumbnails/genie-effect.png"
                alt="Modal Interaction with Genie Effect Preview"
                objectFit="contain"
                height={250}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
                quality={100}
              />
            </ContentBox>
          </Link>
        </ContentList.Item>

        <ContentList.Item>
          <Link to="/particle-text">
            <ContentBox title="particle-text">
              <StaticImage
                src="../images/thumbnails/particle-text.png"
                alt="particle text content preview"
                objectFit="contain"
                height={250}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
                quality={100}
              />
            </ContentBox>
          </Link>
        </ContentList.Item>

        <ContentList.Item>
          <Link to="/blurred-logo">
            <ContentBox title="blurred-logo">
              <StaticImage
                src="../images/thumbnails/blurred-logo.png"
                alt="blurred logo content preview"
                objectFit="contain"
                height={250}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
                quality={100}
              />
            </ContentBox>
          </Link>
        </ContentList.Item>

        <ContentList.Item>
          <Link to="/light-bulb">
            <ContentBox title="light-bulb">
              <StaticImage
                src="../images/thumbnails/light-bulb.png"
                alt="light bulb content preview"
                objectFit="contain"
                height={250}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  backgroundColor: '#181612',
                }}
                quality={100}
              />
            </ContentBox>
          </Link>
        </ContentList.Item>
      </ContentList>
    </PageLayout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
