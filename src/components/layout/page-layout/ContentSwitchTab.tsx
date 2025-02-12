import { MediaHTMLAttributes, useRef } from 'react';
import { Link } from 'gatsby';
import { AnimatePresence, motion } from 'framer-motion';

import CardVideo from '../../../images/video/card-demo_2.mp4';
import GlowCursorVideo from '../../../images/video/glow-cursor.mp4';
import PipVideo from '../../../images/video/floating-video.mp4';
import ToastVideo from '../../../images/video/toast.mp4';
import { THUMBNAILS } from '../../content/switch-tab/constants';
import { css, styled } from '../../../../stitches.config';
import { ContentBox } from '../content-box/ContentBox';
import { SwitchTab } from '../../content/switch-tab/SwitchTab';
import { If } from '../../utility/If';
import { Squircle } from '../../material/Squircle';
import { HomeIcon } from '../../material/icon/Home';
import { useBooleanState } from '../../../hooks/useBooleanState';

interface Content {
  linkTo: string;
  title: string;
  imgSrc: string;
  videoSrc?: MediaHTMLAttributes<HTMLVideoElement>['src'];
  imgStyle?: React.CSSProperties;
}

const MAIN = 'main';
const CONTENTS: Content[] = [
  {
    linkTo: '/dynamic-card',
    title: 'dynamic-card',
    imgSrc: `data:image/jpeg;base64,${THUMBNAILS.CARD}`,
    videoSrc: CardVideo,
    imgStyle: {
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
    },
  },
  {
    linkTo: '/glow-cursor-list',
    title: 'glow-cursor',
    imgSrc: `data:image/png;base64,${THUMBNAILS.GLOW_CURSOR}`,
    videoSrc: GlowCursorVideo,
    imgStyle: {
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
    },
  },
  {
    linkTo: '/',
    title: MAIN,
    imgSrc: `data:image/jpeg;base64,${THUMBNAILS.MAIN}`,
    imgStyle: {
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
    },
  },
  {
    linkTo: '/floating-video',
    title: 'floating-video',
    imgSrc: `data:image/png;base64,${THUMBNAILS.VIDEO}`,
    videoSrc: PipVideo,
    imgStyle: {
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
    },
  },
  {
    linkTo: '/stacked-toast',
    title: 'toast',
    imgSrc: `data:image/png;base64,${THUMBNAILS.TOAST}`,
    videoSrc: ToastVideo,
    imgStyle: {
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
    },
  },
];

interface Props {
  defaultValue?: string;
  defaultOpen?: boolean;
}
export function ContentSwitchTab({
  defaultOpen,
  defaultValue = CONTENTS[2].title,
}: Props) {
  const [showHomeIcon, setShowHomeIcon, setHideHomeIcon] =
    useBooleanState(false);

  return (
    <SwitchTab defaultOpen={defaultOpen} defaultValue={defaultValue}>
      {CONTENTS.map(content => {
        const isHomeContent = content.title === MAIN;
        const needHomeIcon = isHomeContent && showHomeIcon;

        return (
          <div key={content.title} style={{ position: 'relative' }}>
            <SwitchTabItem
              // ref={item}
              value={content.title}
              to={content.linkTo}
              title={content.title}
              videoSrc={content.videoSrc}
              imgSrc={content.imgSrc}
              onFocus={() => {
                if (isHomeContent) {
                  setShowHomeIcon();
                }
              }}
              onBlur={() => {
                if (isHomeContent) {
                  setHideHomeIcon();
                }
              }}
            />
            <AnimatePresence>
              {needHomeIcon && (
                <motion.div
                  style={{
                    position: 'absolute',
                    right: '-12%',
                    bottom: '-18%',
                  }}
                  initial={{
                    y: 20,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  exit={{
                    y: 20,
                    opacity: 0,
                  }}
                  transition={{
                    ease: 'easeOut',
                    duration: 0.6,
                  }}
                >
                  <motion.div
                    initial={{ y: 0 }}
                    animate={{
                      y: [0, 2.5, 0],
                      opacity: 1,
                    }}
                    transition={{
                      ease: 'easeOut',
                      delay: 0.6,
                      y: {
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: 1.8,
                      },
                    }}
                  >
                    <HomeSquircleIcon />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </SwitchTab>
  );
}

const HomeSquircleIcon = () => {
  const rotate = '4deg';

  return (
    <div
      style={{ position: 'relative', height: '96px', width: '96px', rotate }}
    >
      <Squircle
        size={78}
        borderType="gradient"
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '10%',
          rotate: rotate,
        }}
        className={css({
          '& > div': {
            backgroundColor: 'transparent',
          },
        })()}
      />
      <Squircle
        size={60}
        style={{
          position: 'absolute',
          // warning: Safari >= 14.1
          rotate,
          top: '50%',
          left: '50%',
          transform: 'translate(-54%, -48%)',
        }}
      >
        <HomeIcon color="#979797" size={28} style={{ rotate }} />
      </Squircle>
    </div>
  );
};

interface SwitchTabItemProps {
  videoSrc?: MediaHTMLAttributes<HTMLVideoElement>['src'];
  to: string;
  title: string;
  value: string;
  imgSrc: string;
  onFocus?: () => void;
  onBlur?: () => void;
}
const SwitchTabItem = (props: SwitchTabItemProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { to, title, videoSrc, imgSrc, value, onFocus, onBlur } = props;

  const playRef = useRef<Promise<void> | undefined>(undefined);
  const isLoaded = useRef(false);

  return (
    <StyledItem
      value={value}
      onFocus={() => {
        if (isLoaded.current === true) {
          playRef.current = videoRef.current?.play();
        }

        onFocus?.();
      }}
      onBlur={() => {
        onBlur?.();

        if (playRef.current == null) {
          videoRef.current?.pause();
          return;
        }

        playRef.current?.then(() => {
          if (videoRef.current?.paused === false) {
            videoRef.current?.pause();
          }
        });
      }}
      asChild
    >
      <BlockLink to={to}>
        <SwitchTabContentBox title={title} dots={false}>
          <img
            src={imgSrc}
            style={{
              display: 'flex',
              height: '100%',
              justifyContent: 'center',
            }}
          />
          <If condition={videoSrc != null}>
            <video
              ref={videoRef}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
              }}
              loop
              onLoadedData={() => {
                isLoaded.current = true;
              }}
              src={videoSrc}
            />
          </If>
        </SwitchTabContentBox>
      </BlockLink>
    </StyledItem>
  );
};

const StyledItem = styled(SwitchTab.Item, {
  filter: 'grayscale(1)',

  '&:focus, &:focus-visible': {
    filter: 'grayscale(0)',
  },
});

const SwitchTabContentBox = styled(ContentBox, {
  height: '100%',

  '& div:nth-child(2)': {
    position: 'relative',
  },
});

const BlockLink = styled(Link, {
  display: 'block',
});
