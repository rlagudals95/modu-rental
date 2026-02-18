export type Destination = {
  id: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  description: string;
};

export const destinations: Destination[] = [
  { id: 'seoul-gyeongbokgung', name: '경복궁', region: '서울', lat: 37.5796, lng: 126.977, description: '조선의 법궁으로 한국 전통미를 느낄 수 있어요.' },
  { id: 'seoul-namsan', name: '남산서울타워', region: '서울', lat: 37.5512, lng: 126.9882, description: '서울 야경 명소로 커플 여행에 좋아요.' },
  { id: 'seoul-bukchon', name: '북촌한옥마을', region: '서울', lat: 37.5826, lng: 126.983, description: '전통 한옥 골목 산책 코스예요.' },
  { id: 'seoul-hanriver', name: '여의도한강공원', region: '서울', lat: 37.5289, lng: 126.9326, description: '피크닉과 자전거를 즐기기 좋아요.' },
  { id: 'seoul-ddp', name: '동대문디자인플라자', region: '서울', lat: 37.5665, lng: 127.0092, description: '야간 조명과 전시가 매력적이에요.' },

  { id: 'busan-haeundae', name: '해운대해수욕장', region: '부산', lat: 35.1587, lng: 129.1604, description: '사계절 인기 있는 대표 해변이에요.' },
  { id: 'busan-gwangalli', name: '광안리해수욕장', region: '부산', lat: 35.1532, lng: 129.1187, description: '광안대교 야경이 아름다워요.' },
  { id: 'busan-gamcheon', name: '감천문화마을', region: '부산', lat: 35.0975, lng: 129.0104, description: '알록달록한 골목 포토 스팟이에요.' },
  { id: 'busan-taejongdae', name: '태종대', region: '부산', lat: 35.0516, lng: 129.0872, description: '절벽과 바다 전망이 시원해요.' },
  { id: 'busan-jagalchi', name: '자갈치시장', region: '부산', lat: 35.0967, lng: 129.0306, description: '신선한 해산물 먹거리가 풍부해요.' },

  { id: 'incheon-songdo', name: '송도센트럴파크', region: '인천', lat: 37.3925, lng: 126.639, description: '도심 속 수로와 산책이 좋아요.' },
  { id: 'incheon-chinatown', name: '인천차이나타운', region: '인천', lat: 37.4741, lng: 126.6169, description: '짜장면 거리와 근대 건축을 볼 수 있어요.' },
  { id: 'incheon-eurwangni', name: '을왕리해수욕장', region: '인천', lat: 37.4472, lng: 126.3728, description: '서해 낙조로 유명한 해변이에요.' },
  { id: 'incheon-ganghwa', name: '강화도 전등사', region: '인천', lat: 37.6321, lng: 126.4848, description: '고즈넉한 사찰과 역사 탐방 코스예요.' },
  { id: 'incheon-wolmido', name: '월미도', region: '인천', lat: 37.4756, lng: 126.5987, description: '바다와 놀이시설을 함께 즐길 수 있어요.' },

  { id: 'daegu-apsan', name: '앞산전망대', region: '대구', lat: 35.8228, lng: 128.5656, description: '대구 시내를 한눈에 볼 수 있어요.' },
  { id: 'daegu-seomun', name: '서문시장', region: '대구', lat: 35.8683, lng: 128.5802, description: '야시장 먹거리로 유명해요.' },
  { id: 'daegu-duryu', name: '두류공원', region: '대구', lat: 35.8535, lng: 128.5564, description: '도심 휴식과 산책 코스로 좋아요.' },
  { id: 'daegu-palgong', name: '팔공산 케이블카', region: '대구', lat: 35.9851, lng: 128.6884, description: '계절별 풍경 감상이 멋져요.' },
  { id: 'daegu-modern', name: '근대골목', region: '대구', lat: 35.8716, lng: 128.5947, description: '근대 건축과 카페 투어에 좋아요.' },

  { id: 'daejeon-eksci', name: '엑스포과학공원', region: '대전', lat: 36.3765, lng: 127.3877, description: '과학 체험과 전시를 즐겨보세요.' },
  { id: 'daejeon-jangtae', name: '장태산자연휴양림', region: '대전', lat: 36.2208, lng: 127.3348, description: '메타세쿼이아 숲 산책이 힐링돼요.' },
  { id: 'daejeon-hanbat', name: '한밭수목원', region: '대전', lat: 36.3678, lng: 127.3859, description: '도심 속 푸른 정원이에요.' },
  { id: 'daejeon-bomunsan', name: '보문산전망대', region: '대전', lat: 36.3066, lng: 127.4236, description: '야경과 가벼운 등산 코스로 좋아요.' },
  { id: 'daejeon-seongsimdang', name: '성심당 본점', region: '대전', lat: 36.3285, lng: 127.4277, description: '빵지순례 필수 코스예요.' },

  { id: 'gwangju-mudeung', name: '무등산 국립공원', region: '광주', lat: 35.1342, lng: 126.9903, description: '광주 대표 자연 명소예요.' },
  { id: 'gwangju-asia', name: '국립아시아문화전당', region: '광주', lat: 35.1463, lng: 126.9228, description: '전시·공연을 즐길 수 있어요.' },
  { id: 'gwangju-yangnim', name: '양림동 펭귄마을', region: '광주', lat: 35.1368, lng: 126.9127, description: '레트로 감성 골목 여행지예요.' },
  { id: 'gwangju-songjeong', name: '1913송정역시장', region: '광주', lat: 35.1376, lng: 126.7914, description: '트렌디한 먹거리 시장이에요.' },
  { id: 'gwangju-uncheon', name: '운천저수지', region: '광주', lat: 35.1515, lng: 126.8492, description: '산책하기 좋은 호수 공원이에요.' },

  { id: 'ulsan-daewangam', name: '대왕암공원', region: '울산', lat: 35.491, lng: 129.4339, description: '해안 절경이 멋진 산책 코스예요.' },
  { id: 'ulsan-taehwa', name: '태화강 국가정원', region: '울산', lat: 35.5476, lng: 129.3172, description: '사계절 꽃과 대숲길이 아름다워요.' },
  { id: 'ulsan-ganjeolgot', name: '간절곶', region: '울산', lat: 35.3599, lng: 129.3458, description: '일출 명소로 유명해요.' },
  { id: 'ulsan-jangsaengpo', name: '장생포 고래문화마을', region: '울산', lat: 35.5039, lng: 129.3831, description: '고래 테마 체험 여행지예요.' },
  { id: 'ulsan-yeongnamalps', name: '영남알프스', region: '울산', lat: 35.6007, lng: 129.0221, description: '등산과 억새 풍경이 멋져요.' },

  { id: 'sejong-hobansu', name: '세종호수공원', region: '세종', lat: 36.4935, lng: 127.2578, description: '넓은 호수와 산책로가 좋아요.' },
  { id: 'sejong-arboretum', name: '국립세종수목원', region: '세종', lat: 36.5226, lng: 127.2571, description: '실내외 식물 전시를 즐길 수 있어요.' },
  { id: 'sejong-jochiwon', name: '조치원 문화정원', region: '세종', lat: 36.6027, lng: 127.2996, description: '도시재생 감성의 산책 코스예요.' },
  { id: 'sejong-bitol', name: '비암사', region: '세종', lat: 36.674, lng: 127.1961, description: '한적한 사찰 여행지예요.' },

  { id: 'gyeonggi-everland', name: '에버랜드', region: '경기', lat: 37.2944, lng: 127.2022, description: '가족·친구와 즐기는 테마파크예요.' },
  { id: 'gyeonggi-suwonhwaseong', name: '수원화성', region: '경기', lat: 37.285, lng: 127.0195, description: '세계문화유산 성곽길 산책이 좋아요.' },
  { id: 'gyeonggi-namiseom', name: '남이섬', region: '경기', lat: 37.7917, lng: 127.525, description: '사계절 사진 명소예요.' },
  { id: 'gyeonggi-koreafolk', name: '한국민속촌', region: '경기', lat: 37.2582, lng: 127.1176, description: '전통문화 체험에 좋아요.' },
  { id: 'gyeonggi-pocheon', name: '포천 아트밸리', region: '경기', lat: 37.9337, lng: 127.2007, description: '채석장 호수 풍경이 독특해요.' },
  { id: 'gyeonggi-gwangmyeong', name: '광명동굴', region: '경기', lat: 37.425, lng: 126.8682, description: '이색 동굴 여행지예요.' },

  { id: 'gangwon-sokcho', name: '속초해변', region: '강원', lat: 38.1904, lng: 128.6017, description: '동해 바다를 즐기기 좋은 곳이에요.' },
  { id: 'gangwon-seoraksan', name: '설악산 국립공원', region: '강원', lat: 38.1197, lng: 128.4656, description: '사계절 트레킹 명소예요.' },
  { id: 'gangwon-gangneung', name: '안목해변', region: '강원', lat: 37.7722, lng: 128.9482, description: '카페거리와 바다 뷰가 좋아요.' },
  { id: 'gangwon-pyeongchang', name: '대관령 양떼목장', region: '강원', lat: 37.6825, lng: 128.7368, description: '초원 풍경이 이국적이에요.' },
  { id: 'gangwon-jeongdongjin', name: '정동진', region: '강원', lat: 37.6891, lng: 129.0335, description: '일출 명소로 유명해요.' },
  { id: 'gangwon-chuncheon', name: '춘천 소양강스카이워크', region: '강원', lat: 37.8894, lng: 127.7288, description: '강 위를 걷는 짜릿한 체험이에요.' },

  { id: 'chungbuk-cheongnamdae', name: '청남대', region: '충북', lat: 36.4635, lng: 127.4934, description: '대청호 전망이 아름다워요.' },
  { id: 'chungbuk-danyang', name: '도담삼봉', region: '충북', lat: 36.9839, lng: 128.3657, description: '남한강 절경 명소예요.' },
  { id: 'chungbuk-goesan', name: '괴산 산막이옛길', region: '충북', lat: 36.8206, lng: 127.8844, description: '호수 따라 걷기 좋은 길이에요.' },
  { id: 'chungbuk-jecheon', name: '의림지', region: '충북', lat: 37.1631, lng: 128.1827, description: '고즈넉한 저수지 산책 명소예요.' },
  { id: 'chungbuk-chungju', name: '충주호 유람선', region: '충북', lat: 37.0247, lng: 128.0154, description: '호수 풍경을 여유롭게 즐겨요.' },

  { id: 'chungnam-anseong', name: '독립기념관', region: '충남', lat: 36.7813, lng: 127.2261, description: '역사 교육 여행지로 추천해요.' },
  { id: 'chungnam-taean', name: '태안 안면도', region: '충남', lat: 36.5355, lng: 126.3333, description: '해변과 노을이 아름다워요.' },
  { id: 'chungnam-boryeong', name: '대천해수욕장', region: '충남', lat: 36.3056, lng: 126.5117, description: '머드축제로 유명한 해변이에요.' },
  { id: 'chungnam-gongju', name: '공주 공산성', region: '충남', lat: 36.4641, lng: 127.1194, description: '백제 역사 유적지예요.' },
  { id: 'chungnam-buyeo', name: '부여 궁남지', region: '충남', lat: 36.2812, lng: 126.9101, description: '연꽃 시즌이 특히 아름다워요.' },
  { id: 'chungnam-seocheon', name: '국립생태원', region: '충남', lat: 36.0122, lng: 126.6944, description: '아이와 함께 가기 좋은 생태 체험지예요.' },

  { id: 'jeonbuk-jeonju', name: '전주한옥마을', region: '전북', lat: 35.8151, lng: 127.1538, description: '한복 체험과 먹거리가 풍부해요.' },
  { id: 'jeonbuk-naejangsan', name: '내장산 국립공원', region: '전북', lat: 35.4861, lng: 126.8968, description: '가을 단풍 명소로 유명해요.' },
  { id: 'jeonbuk-buan', name: '변산반도 국립공원', region: '전북', lat: 35.6612, lng: 126.5487, description: '바다와 산을 함께 즐길 수 있어요.' },
  { id: 'jeonbuk-gunsan', name: '군산 근대역사거리', region: '전북', lat: 35.9868, lng: 126.7126, description: '레트로 감성 여행 코스예요.' },
  { id: 'jeonbuk-iksan', name: '익산 미륵사지', region: '전북', lat: 36.0137, lng: 127.0316, description: '백제 문화유산 탐방지예요.' },

  { id: 'jeonnam-yeosu', name: '여수 해상케이블카', region: '전남', lat: 34.7394, lng: 127.7429, description: '바다 위 케이블카 풍경이 환상적이에요.' },
  { id: 'jeonnam-suncheon', name: '순천만습지', region: '전남', lat: 34.8844, lng: 127.5098, description: '갈대밭과 철새를 만날 수 있어요.' },
  { id: 'jeonnam-mokpo', name: '목포 해상케이블카', region: '전남', lat: 34.7909, lng: 126.3707, description: '유달산과 다도해 전망을 즐겨요.' },
  { id: 'jeonnam-damyang', name: '담양 죽녹원', region: '전남', lat: 35.3219, lng: 126.9878, description: '대나무숲 힐링 산책 코스예요.' },
  { id: 'jeonnam-boseong', name: '보성 녹차밭', region: '전남', lat: 34.7634, lng: 127.0833, description: '초록 풍경 사진 명소예요.' },
  { id: 'jeonnam-jindo', name: '진도대교', region: '전남', lat: 34.3778, lng: 126.3087, description: '남해의 바다 풍경이 시원해요.' },

  { id: 'gyeongbuk-gyeongju', name: '불국사', region: '경북', lat: 35.7903, lng: 129.332, description: '신라 역사 여행의 대표 코스예요.' },
  { id: 'gyeongbuk-andong', name: '안동 하회마을', region: '경북', lat: 36.5382, lng: 128.5186, description: '전통문화와 고택을 만날 수 있어요.' },
  { id: 'gyeongbuk-pohang', name: '호미곶', region: '경북', lat: 36.0749, lng: 129.5667, description: '상생의 손 조형물과 일출 명소예요.' },
  { id: 'gyeongbuk-yeongdeok', name: '영덕 블루로드', region: '경북', lat: 36.4158, lng: 129.3658, description: '해안 드라이브 코스로 좋아요.' },
  { id: 'gyeongbuk-mungyeong', name: '문경새재', region: '경북', lat: 36.7694, lng: 128.0846, description: '옛길 트레킹이 매력적이에요.' },
  { id: 'gyeongbuk-cheongsong', name: '주왕산 국립공원', region: '경북', lat: 36.4344, lng: 129.1609, description: '기암절벽과 계곡이 아름다워요.' },

  { id: 'gyeongnam-tongyeong', name: '통영 동피랑마을', region: '경남', lat: 34.8419, lng: 128.4256, description: '벽화 골목과 바다 풍경이 예뻐요.' },
  { id: 'gyeongnam-geoje', name: '거제 바람의언덕', region: '경남', lat: 34.7445, lng: 128.6634, description: '초록 언덕과 남해 바다가 멋져요.' },
  { id: 'gyeongnam-jinju', name: '진주성', region: '경남', lat: 35.1903, lng: 128.0812, description: '남강 야경과 역사 탐방 코스예요.' },
  { id: 'gyeongnam-namhae', name: '남해 독일마을', region: '경남', lat: 34.7996, lng: 128.0398, description: '이국적인 건축과 바다 전망이 좋아요.' },
  { id: 'gyeongnam-hadong', name: '하동 십리벚꽃길', region: '경남', lat: 35.2353, lng: 127.8294, description: '봄 드라이브 명소예요.' },
  { id: 'gyeongnam-changwon', name: '창원 주남저수지', region: '경남', lat: 35.3148, lng: 128.6869, description: '철새 관찰과 산책에 좋아요.' },

  { id: 'jeju-seongsan', name: '성산일출봉', region: '제주', lat: 33.4593, lng: 126.9412, description: '제주 대표 일출 명소예요.' },
  { id: 'jeju-hallasan', name: '한라산', region: '제주', lat: 33.3617, lng: 126.5292, description: '제주의 상징인 명산이에요.' },
  { id: 'jeju-aewol', name: '애월 해안도로', region: '제주', lat: 33.4667, lng: 126.3167, description: '드라이브와 카페 투어에 좋아요.' },
  { id: 'jeju-seopjikoji', name: '섭지코지', region: '제주', lat: 33.4234, lng: 126.9291, description: '푸른 바다와 초원이 어우러진 풍경이에요.' },
  { id: 'jeju-hyeopjae', name: '협재해수욕장', region: '제주', lat: 33.3944, lng: 126.2396, description: '에메랄드빛 바다가 아름다워요.' },
  { id: 'jeju-udo', name: '우도', region: '제주', lat: 33.5071, lng: 126.9559, description: '섬 속의 섬, 하루 코스로 좋아요.' },
];
