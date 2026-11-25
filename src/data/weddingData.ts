export interface AccountInfo {
  side: 'groom' | 'bride';
  roleLabel: string;
  holder: string;
  bank: string;
  accountNumber: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

export interface TransitGroup {
  label?: string;
  items: string[];
}

export interface TransitSection {
  title: string;
  groups: TransitGroup[];
  footerNote?: string[];
}

export const WEDDING_DATA = {
  groom: {
    fullName: '박서진',
    firstName: '서진',
    father: '박민수',
    mother: '이정희',
    order: '장남',
  },
  bride: {
    fullName: '김지은',
    firstName: '지은',
    father: '김도현',
    mother: '최은영',
    order: '장녀',
  },
  date: {
    iso: '2027-04-24T13:00:00+09:00',
    year: 2027,
    month: 4,
    day: 24,
    weekday: '토요일',
    timeLabel: '오후 1시',
    shortDate: '2027. 04. 24',
    displayFull: '2027년 4월 24일 토요일 오후 1시',
  },
  venue: {
    name: '밀리토피아호텔 웨딩센터',
    hall: '2층 아이리스홀',
    fullName: '밀리토피아호텔 웨딩센터 2층 아이리스홀',
    address: '경기도 성남시 수정구 위례대로 83',
    mapImage: '/assets/aistudio/____________-2_10852b9f.jpg',
    naverMapUrl:
      'https://map.naver.com/p/search/' +
      encodeURIComponent('경기도 성남시 수정구 위례대로 83 밀리토피아호텔 웨딩센터'),
    kakaoMapUrl:
      'https://map.kakao.com/link/search/' +
      encodeURIComponent('밀리토피아호텔 웨딩센터'),
  },
  photos: [
    {
      id: 'cover',
      src: '/src/assets/images/hero_bw_couple_1795611964775.jpg',
      alt: '창가 앞에 나란히 선 박서진과 김지은',
      caption: '2027. 04. 24',
    },
    {
      id: 'walk',
      src: '/src/assets/images/gallery_bw_walk_1795611964110.jpg',
      alt: '돌담길을 함께 걷는 박서진과 김지은',
      caption: '박서진 · 김지은',
    },
    {
      id: 'hands',
      src: '/src/assets/images/gallery_bw_hands_1795611964457.jpg',
      alt: '손을 맞잡은 두 사람과 부케',
      caption: '2027년 4월 24일',
    },
    {
      id: 'rings',
      src: '/src/assets/images/gallery_bw_rings_1795611964872.jpg',
      alt: '두 사람의 결혼반지와 흰 꽃',
      caption: '밀리토피아호텔 웨딩센터 2층 아이리스홀',
    },
  ] as GalleryPhoto[],
  greeting: [
    '서로 다른 시간을 살아온 두 사람이',
    '이제 같은 마음으로 한 길을 걸어가려 합니다.',
    '',
    '바쁘신 걸음이겠지만',
    '오셔서 두 사람의 새로운 시작을',
    '함께 축복해 주시면 큰 기쁨이겠습니다.',
  ],
  transitSections: [
    {
      title: '도보 이용 시',
      groups: [
        {
          items: ['남위례역(8호선) 3·4번 출구에서 도보 약 8분'],
        },
      ],
    },
    {
      title: '버스 이용 시',
      groups: [
        {
          label: '밀리토피아시티·위례역푸르지오 정류장',
          items: [
            '서울 간선버스 343번, 345번',
            '서울 지선버스 3420번',
            '공항버스 5500번',
          ],
        },
        {
          label: '국방전직교육원·밀리토피아시티 및 위례힐스테이트 인근 정류장',
          items: ['성남버스 50번, 231번', '광역버스 9200번, 9202번'],
        },
      ],
    },
    {
      title: '지하철 이용 시',
      groups: [
        {
          items: [
            '장지역(8호선, 4번 출구) → 345번 버스',
            '복정역(8호선·수인분당선, 환승센터 1번 승강장) → 50번 버스',
            '산성역(8호선, 2번 출구) → 50번 버스',
            '거여역(5호선, 7번 출구) → 231번 버스',
            '남위례역(8호선, 3·4번 출구) → 도보 약 8분',
          ],
        },
      ],
    },
    {
      title: '자가용 이용 시',
      groups: [
        {
          label: '주차 약 600대 가능',
          items: [
            '복정역 교차로(남한산성 방면) → 창곡교차로(위례동 방면) → 밀리토피아호텔',
            '산성역 사거리(서울 방면) → 창곡교차로(위례동 방면) → 밀리토피아호텔',
          ],
        },
      ],
      footerNote: [
        '내비게이션 검색: 밀리토피아호텔 바이마린',
        '경기도 성남시 수정구 위례대로 83',
      ],
    },
    {
      title: '밀리토피아호텔 바이마린 셔틀버스 안내',
      groups: [
        {
          items: [
            '운행 구간: 남위례역 5번 출구 ↔ 호텔',
            '운행 요일: 주말(토·일), 예식 진행 시',
            '운행 시간: 예식 1시간 전부터 예식 후 2시간까지',
            '운행 간격: 약 15분',
          ],
        },
      ],
    },
  ] as TransitSection[],
  accounts: [
    {
      side: 'groom',
      roleLabel: '신랑',
      holder: '박서진',
      bank: '카카오뱅크',
      accountNumber: '3333-04-8291042',
    },
    {
      side: 'groom',
      roleLabel: '신랑 아버지',
      holder: '박민수',
      bank: '신한은행',
      accountNumber: '110-412-908312',
    },
    {
      side: 'bride',
      roleLabel: '신부',
      holder: '김지은',
      bank: '토스뱅크',
      accountNumber: '1000-2910-4481',
    },
    {
      side: 'bride',
      roleLabel: '신부 어머니',
      holder: '최은영',
      bank: 'KB국민은행',
      accountNumber: '482102-01-394021',
    },
  ] as AccountInfo[],
};

export function downloadWeddingIcs(): void {
  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//SeojinJieunWedding//MobileInvitation//KO',
    'BEGIN:VEVENT',
    'UID:seojin-jieun-20270424@wedding.local',
    'DTSTAMP:20261125T000000Z',
    'DTSTART;TZID=Asia/Seoul:20270424T130000',
    'DTEND;TZID=Asia/Seoul:20270424T150000',
    'SUMMARY:박서진 · 김지은 결혼식',
    'LOCATION:경기도 성남시 수정구 위례대로 83 밀리토피아호텔 웨딩센터 2층 아이리스홀',
    'DESCRIPTION:2027년 4월 24일 토요일 오후 1시, 박서진과 김지은의 결혼식입니다.',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsLines], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = '박서진_김지은_결혼식.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
