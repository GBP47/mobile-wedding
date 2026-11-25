import { WEDDING_DATA } from '../data/weddingData';

declare global {
  interface Window {
    Kakao?: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share?: {
        sendDefault: (settings: {
          objectType: 'feed';
          content: {
            title: string;
            description: string;
            imageUrl: string;
            link: {
              mobileWebUrl: string;
              webUrl: string;
            };
          };
          buttons: Array<{
            title: string;
            link: {
              mobileWebUrl: string;
              webUrl: string;
            };
          }>;
        }) => void;
      };
    };
  }
}

export type KakaoShareOutcome = 'kakao-sdk' | 'web-share' | 'copied' | 'failed';

export async function shareWeddingToKakao(): Promise<KakaoShareOutcome> {
  const pageUrl = window.location.href;
  const kakaoKey = import.meta.env.VITE_KAKAO_JS_KEY as string | undefined;
  const imageUrl = new URL(WEDDING_DATA.photos[0].src, pageUrl).href;

  if (kakaoKey && window.Kakao) {
    try {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(kakaoKey);
      }
      if (window.Kakao.Share) {
        window.Kakao.Share.sendDefault({
          objectType: 'feed',
          content: {
            title: `${WEDDING_DATA.groom.fullName} · ${WEDDING_DATA.bride.fullName} 결혼합니다`,
            description: `${WEDDING_DATA.date.displayFull}\n${WEDDING_DATA.venue.fullName}`,
            imageUrl,
            link: {
              mobileWebUrl: pageUrl,
              webUrl: pageUrl,
            },
          },
          buttons: [
            {
              title: '청첩장 보기',
              link: {
                mobileWebUrl: pageUrl,
                webUrl: pageUrl,
              },
            },
          ],
        });
        return 'kakao-sdk';
      }
    } catch {
      // Fall back smoothly if Kakao SDK is blocked or domain unverified
    }
  }

  const shareText = `${WEDDING_DATA.groom.fullName} · ${WEDDING_DATA.bride.fullName} 결혼합니다\n${WEDDING_DATA.date.displayFull}\n${WEDDING_DATA.venue.fullName}`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: `${WEDDING_DATA.groom.fullName} · ${WEDDING_DATA.bride.fullName} 모바일 청첩장`,
        text: shareText,
        url: pageUrl,
      });
      return 'web-share';
    } catch {
      // Fall back to copying KakaoTalk-ready message if share sheet is dismissed
    }
  }

  try {
    await navigator.clipboard.writeText(`${shareText}\n${pageUrl}`);
    return 'copied';
  } catch {
    return 'failed';
  }
}
