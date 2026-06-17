import { Question, ResultProfile, CommunityPost } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "주말 저녁, 호감 있는 사람(혹은 절친)에게 카톡을 보냈는데 2시간째 읽지 않는다. 내 머릿속은?",
    illustrationUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3m-RMbD41laSMwWMdx5MTlwFDgI_n4R7j_1Fxlqp30WdQZIj4bxKru5urOYhnJB-uBxZE7F1XqGRpYBjUcQyEweBCdeBMKMUwJgkDn6gukHdguCjI4Tz9acpSj8iSTHNFwGsqdn2bgGYtaKVv-8TC2f7Y2b5iMVeNJb-8HiG9sU8JbxxiYeIIw_FMdZNY879i6mVoMY6fHv-zsWwp9LXbnGY8vbR1tVZMvTgPG-Q2gOOiMXO79CQmxVUtJM1sHkL6x22jBK1_E30",
    illustrationAlt: "3D smartphone in purple sky floating hearts",
    options: [
      { text: "'뭐 하느라 바쁘겠지' 신경 끄고 내 할 일(유튜브, 작업 등)을 한다.", type: 'S' },
      { text: "'내가 아까 보낸 말에 문제 있었나?' 대화창을 위로 올려보며 혼자 복기한다.", type: 'A' },
      { text: "폰을 아예 멀리 치워두거나, 나도 다른 친구들과 카톡을 하며 관심을 돌린다.", type: 'V' }
    ]
  },
  {
    id: 2,
    text: "상대방이 평소와 달리 \"응 그래.\" \"ㅇㅇ\" 같은 딱딱한 단답을 보냈다. 나의 즉각적인 반응은?",
    illustrationUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    illustrationAlt: "3D chat messaging illustration",
    options: [
      { text: "'오늘 많이 피곤한가 보다' 하고 적당히 대화를 마무리한다.", type: 'S' },
      { text: "심장이 쿵 내려앉으며 \"무슨 일 있어? 기분 안 좋아?\"라고 바로 물어본다.", type: 'A' },
      { text: "'말투 왜 저래? 기분 나쁘네' 싶어서 나도 똑같이 \"ㅇㅇ\"으로 받아치거나 읽씹한다.", type: 'V' }
    ]
  },
  {
    id: 3,
    text: "상대방과 사소한 오해로 서운한 감정이 생겼을 때, 내가 선호하는 해결 방식은?",
    illustrationUrl: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    illustrationAlt: "3D pastel colors and heart puzzle pieces representing soft emotion",
    options: [
      { text: "감정을 가라앉힌 뒤, 차분하게 텍스트나 통화로 \"아까 그 부분은 조금 섭섭했어\"라고 말한다.", type: 'S' },
      { text: "지금 당장 전화를 걸거나 장문의 카톡을 보내서라도 오해를 풀어야 잠이 온다.", type: 'A' },
      { text: "감정이 격해진 상태로 대화하기 싫어서 \"나중에 얘기해\" 하고 대화방을 나간다.", type: 'V' }
    ]
  },
  {
    id: 4,
    text: "카톡 앱 아이콘에 떠 있는 '빨간색 숫자(안 읽은 메시지 수)'를 대하는 나의 태도는?",
    illustrationUrl: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    illustrationAlt: "3D stylized red heart or notification bubble",
    options: [
      { text: "틈틈이 확인하며 필요한 메시지는 바로 답하고, 급하지 않은 건 나중에 몰아서 처리한다.", type: 'S' },
      { text: "숫자가 쌓여있는 꼴을 못 본다. 단톡방이든 광고든 즉시 들어가서 없애야 속이 편하다.", type: 'A' },
      { text: "'99+'가 되든 말든 내버려 둔다. 내가 답장하고 싶은 사람 것만 골라서 읽는다.", type: 'V' }
    ]
  },
  {
    id: 5,
    text: "누군가와 갈등이 생겼을 때, '멀티프로필'이나 '프로필 뮤직/배경'을 바꾼 적이 있다?",
    illustrationUrl: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    illustrationAlt: "3D abstract design representing multi identities or profile custom",
    options: [
      { text: "상대방과의 관계 때문에 내 프로필 상태를 바꿀 생각은 안 해봤다.", type: 'S' },
      { text: "내 심정(우울, 분노, 저격 등)을 대변하는 가사나 기본 프로필로 바꾸어 상대가 알아채길 바란다.", type: 'A' },
      { text: "그냥 내 프로필을 아예 보이지 않게 차단하거나 숨겨버리는 용도로 멀티프로필을 쓴다.", type: 'V' }
    ]
  },
  {
    id: 6,
    text: "연인이나 절친이 \"이번 주말엔 나 집에서 혼자 좀 쉬고 싶어\"라고 한다면?",
    illustrationUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    illustrationAlt: "Comfortable warm and purple design representing rest time",
    options: [
      { text: "\"그래 고생 많았는데 푹 쉬어!\"라며 상대의 개인 시간을 흔쾌히 존중해 준다.", type: 'S' },
      { text: "'나 만나기 싫은가? 요즘 권태기인가?' 서운하고 불안한 마음이 먼저 든다.", type: 'A' },
      { text: "'오 개이득, 나도 이번 주말엔 혼자 밀린 작업이나 해야지' 하고 편안해한다.", type: 'V' }
    ]
  },
  {
    id: 7,
    text: "내가 보낸 카톡을 상대방이 '읽씹(읽고 답장 안 함)' 했을 때, 내가 다시 선톡을 보내는 타이밍은?",
    illustrationUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    illustrationAlt: "Time ticking in lavender world 3D flow",
    options: [
      { text: "다음 날이나 며칠 뒤, 전혀 다른 새로운 주제로 아무렇지 않게 \"오늘 날씨 좋다\" 하고 보낸다.", type: 'S' },
      { text: "몇 시간 동안 고민하다가 \"바빠?ㅎㅎ\"라며 자연스러운 척 다시 말을 건다.", type: 'A' },
      { text: "절대 먼저 안 보낸다. 자존심 상해서 상대가 보낼 때까지 단어 그대로 '버틴다'.", type: 'V' }
    ]
  },
  {
    id: 8,
    text: "나의 '안읽씹(읽지 않고 방치)' 습관은 보통 어떤 이유 때문인가?",
    illustrationUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    illustrationAlt: "Quiet soft-blue space representing avoidance or concentration",
    options: [
      { text: "지금 다른 중요한 일(일, 작업, 대화 등)을 하고 있어서 집중하느라 나중에 확인한다.", type: 'S' },
      { text: "원래 뭐라고 답장해야 상대방 마음에 들지, 혹은 오해 사지 않을지 고민하느라 늦어진다.", type: 'A' },
      { text: "답장하는 행위 자체가 에너지를 뺏기는 일이라 귀찮고 피곤해서 미룬다.", type: 'V' }
    ]
  },
  {
    id: 9,
    text: "상대방이 \"우린 참 안 맞는 것 같아\"라며 이별이나 관계 단절을 암시하는 말을 던졌을 때 나의 행동은?",
    illustrationUrl: "https://images.unsplash.com/photo-1616400619175-5ebd3659cf96?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    illustrationAlt: "Abstract emotional block broken in two",
    options: [
      { text: "\"왜 그렇게 생각하게 됐는지 얘기해 보자\"며 붙잡되, 일방적인 관계 유지는 요구하지 않는다.", type: 'S' },
      { text: "\"내가 고칠게, 제발 다시 생각해 줘\" 붙잡으며 감정적으로 매달린다.", type: 'A' },
      { text: "\"그래, 네 뜻이 그렇다면 알겠어\" 하고 겉으로는 쿨한 척 바로 수용하고 돌아서서 혼자 앓는다.", type: 'V' }
    ]
  },
  {
    id: 10,
    text: "친구들과의 단톡방에서 내가 던진 농담에 아무도 반응하지 않고 대화가 다른 주제로 넘어갔을 때?",
    illustrationUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    illustrationAlt: "Silent digital space with cold air",
    options: [
      { text: "'다들 딴 얘기 하느라 못 봤나 보네' 하고 나도 자연스럽게 바뀐 주제에 탑승한다.", type: 'S' },
      { text: "'나 방금 분위기 싸하게 만들었나?' 자책하며 단톡방을 나갈까 고민한다.", type: 'A' },
      { text: "'노잼이었나 보네' 시니컬하게 생각하고 단톡방 알림을 꺼버린다.", type: 'V' }
    ]
  },
  {
    id: 11,
    text: "나에게 '인간관계'란 어떤 의미에 가장 가까운가?",
    illustrationUrl: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    illustrationAlt: "Beautiful clear blue cloudscape",
    options: [
      { text: "서로 독립된 개체로서 존중하며, 함께할 때 삶을 풍요롭게 만들어주는 오아시스 같은 것.", type: 'S' },
      { text: "내 존재 가치를 확인받고, 외로움을 채우기 위해 반드시 필요한 단짝 같은 것.", type: 'A' },
      { text: "적당히 거리를 유지해야 안전하고, 너무 깊어지면 내 자유를 침해하는 피곤한 것.", type: 'V' }
    ]
  },
  {
    id: 12,
    text: "대화 중 상대방이 내 의견에 강하게 반박할 때, 폰 화면 너머 내 표정은?",
    illustrationUrl: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    illustrationAlt: "Abstract design of cold vs warm colors clash",
    options: [
      { text: "'저 사람은 그렇게 생각할 수도 있겠네' 하고 차분하게 내 논리를 정리한다.", type: 'S' },
      { text: "나를 부정당한 것 같아 얼굴이 화끈거리고 억울함이나 슬픔이 밀려온다.", type: 'A' },
      { text: "표정이 차갑게 굳어지며 '그래 너 잘났다' 하고 마음의 문을 닫아버린다.", type: 'V' }
    ]
  }
];

export const RESULTS: ResultProfile[] = [
  {
    id: "secure",
    title: "🛡️ [강철 멘탈 오아시스]",
    subtitle: "\"바쁜가 보다~ 내 할 일 해야지!\"",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeT7CSxnxr-RI82XU8aAjfhG8M1Y-2mJ0tXUkRzA2mXw31LV6oM0Vc6jqOeqBMYVmZCDbDzrS-gC8crxSFYrINgc6Ca14SRw45aeI302FksisHElvC1A6UVeDut1dBfdKjC_nOn_2kJIgWLUCV31Urs6Efgd7w0rpswYGJ6XEmbV1VF_bQTnU_ZCShpTM9wmc8ZxZgtkffXTng2t9GfOQISsY6xmawrDLSomxFf8CAh8W2Km8T_HRi46nAAG7UvlIxQEzdAhLJcvU",
    anxietyLevel: 10,
    description: "읽씹과 안읽씹에 초연한 평화주의자. 답장이 늦으면 '바쁜가 보지', 말투가 딱딱하면 '피곤한가 보지' 하고 대수롭지 않게 넘깁니다. 연락 스트레스가 가장 낮은 최강 멘탈 소유자입니다.",
    pushPullStyle: "밀당을 '안' 합니다. 밀고 당길 필요 없이 자신의 마음을 솔직하게 표현하고, 상대방의 개인 공간도 있는 그대로 인정해 주기 때문입니다. 연락 강박이 없어서 상대방에게 가장 편안한 안정감을 주는 유형입니다.",
    prescription: "당신은 이미 건강한 자존감을 지닌 단단한 사람입니다! 다만, 불안형이나 회피형 파트너를 만나면 간혹 \"넌 나한테 관심이 없어?\"라는 오해를 받을 수 있으니, 가끔은 상대방을 향한 애정을 조금 더 다정하게 표현해 주는 것도 좋습니다."
  },
  {
    id: "anxious",
    title: "🚨 [하트 시그널 과몰입러]",
    subtitle: "\"설마 내가 뭐 잘못 말했나?!\"",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeT7CSxnxr-RI82XU8aAjfhG8M1Y-2mJ0tXUkRzA2mXw31LV6oM0Vc6jqOeqBMYVmZCDbDzrS-gC8crxSFYrINgc6Ca14SRw45aeI302FksisHElvC1A6UVeDut1dBfdKjC_nOn_2kJIgWLUCV31Urs6Efgd7w0rpswYGJ6XEmbV1VF_bQTnU_ZCShpTM9wmc8ZxZgtkffXTng2t9GfOQISsY6xmawrDLSomxFf8CAh8W2Km8T_HRi46nAAG7UvlIxQEzdAhLJcvU",
    anxietyLevel: 85,
    description: "상대방의 답장 속도가 곧 나를 사랑하는 척도입니다. \"응.\" 한 글자에 온갖 소설을 집필하며, 대화창을 위로 올려 내가 실수한 게 없는지 무한 복기합니다. 멀티프로필이나 프로필 뮤직으로 내 감정을 은근히 티 내는 편입니다.",
    pushPullStyle: "밀고 싶지만 당겨지기만 하는 '당기기 전문'. 상대가 한 걸음 물러서면 버림받을 것 같은 공포에 두 걸음 다가갑니다. 그러다 지치면 홧김에 이별을 통보하지만, 상대가 붙잡으면 1초 만에 풀립니다.",
    prescription: "당신의 불안은 상대를 너무 많이 아끼고, 관계를 잘 지키고 싶어서 발동하는 '마음의 경보기'일 뿐입니다. 상대의 늦은 답장이 '당신을 싫어해서'가 아님을 기억하세요. 폰을 잠시 내려놓고 나만의 취미나 작업에 몰두하며 내 에너지를 먼저 채우는 연습이 필요합니다."
  },
  {
    id: "avoidant",
    title: "⚓ [방구석 잠수함 사령관]",
    subtitle: "\"귀찮아, 일단 안읽씹하고 숨어야지\"",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeT7CSxnxr-RI82XU8aAjfhG8M1Y-2mJ0tXUkRzA2mXw31LV6oM0Vc6jqOeqBMYVmZCDbDzrS-gC8crxSFYrINgc6Ca14SRw45aeI302FksisHElvC1A6UVeDut1dBfdKjC_nOn_2kJIgWLUCV31Urs6Efgd7w0rpswYGJ6XEmbV1VF_bQTnU_ZCShpTM9wmc8ZxZgtkffXTng2t9GfOQISsY6xmawrDLSomxFf8CAh8W2Km8T_HRi46nAAG7UvlIxQEzdAhLJcvU",
    anxietyLevel: 50,
    description: "갈등 조짐이 보이거나 내 사생활이 침해당한다고 느끼면 번개 같은 속도로 '안읽씹' 모드에 돌입합니다. 멀티프로필로 벽을 치거나 대화방을 나가버리는 방식으로 나를 보호합니다.",
    pushPullStyle: "의도치 않은 '밀어내기 장인'. 상대가 가까이 다가오면 숨이 막혀 뒤로 물러섭니다. 연인이나 친구가 서운함을 토로하면 \"또 시작이네\"라며 마음의 셔터를 내려버려 상대를 가장 애타게 만드는 유형입니다.",
    prescription: "당신이 숨어버리는 이유는 상대를 괴롭히기 위해서가 아니라, 상처받지 않기 위해 스스로를 지키는 '방어기제'가 작동했기 때문입니다. 동굴 속으로 들어가기 전에 딱 한 마디만 매너를 지켜주세요. \"지금 조금 지쳐서 혼자 생각할 시간이 필요해. 나중에 얘기하자.\" 이 한마디가 관계의 파국을 막아줍니다."
  },
  {
    id: "fearful",
    title: "🌪️ [마음속 혼돈의 카오스]",
    subtitle: "\"제발 다가와... 아니, 너무 가까우니까 저리 가!\"",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeT7CSxnxr-RI82XU8aAjfhG8M1Y-2mJ0tXUkRzA2mXw31LV6oM0Vc6jqOeqBMYVmZCDbDzrS-gC8crxSFYrINgc6Ca14SRw45aeI302FksisHElvC1A6UVeDut1dBfdKjC_nOn_2kJIgWLUCV31Urs6Efgd7w0rpswYGJ6XEmbV1VF_bQTnU_ZCShpTM9wmc8ZxZgtkffXTng2t9GfOQISsY6xmawrDLSomxFf8CAh8W2Km8T_HRi46nAAG7UvlIxQEzdAhLJcvU",
    anxietyLevel: 95,
    description: "카톡 알림을 보며 온갖 불안에 떨면서도(불안형), 막상 상대가 장문으로 다정하게 다가오면 부담스러워서 차갑게 읽씹(회피형)해 버립니다. 내 마음을 나도 몰라 프로필을 하루에도 몇 번씩 바꿨다 초기화하곤 합니다.",
    pushPullStyle: "밀면서 당기고, 당기면서 미는 '폭풍 소용돌이'. 마음속으로는 깊은 사랑과 인정을 갈망하지만, 동시에 상대가 나를 떠나 상처 줄까 봐 두려워 먼저 상처를 주거나 밀어내는 모순적인 태도를 보입니다.",
    prescription: "\"내가 왜 이럴까?\"라며 스스로를 절대 자책하지 마세요. 당신의 내면에는 과거의 상처로 인해 생긴 '불안'과 '방어'가 동시에 치열하게 싸우고 있을 뿐입니다. 상대를 신뢰하기 전에, 내가 내 감정을 안전하게 수용하는 법부터 연습해야 합니다. 불안하거나 도망치고 싶을 때 \"내가 지금 상처받을까 봐 무섭구나\" 하고 내 마음을 가만히 알아차려 주는 것부터 시작해 보세요."
  }
];

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "post_1",
    author: "모찌모찌",
    avatarId: "avatar_1",
    text: "카톡 보낼까 말까 30분째 메모장에 적어두고 검토 중인데.. 이거 병인가요? ㅋㅋㅋㅋㅋㅋ 하트 시그널 과몰입러 웁니다.",
    styleTag: "하트 시그널 과몰입러",
    timestamp: "방금 전",
    likes: 31
  },
  {
    id: "post_2",
    author: "고독한아아",
    avatarId: "avatar_2",
    text: "답장 와도 바로 읽으면 지는 기분 들어서 알람 숨겨놓는 1인... 전형적인 방구석 잠수함 사령관이죠 ㅎㅎ 편안합니다.",
    styleTag: "방구석 잠수함 사령관",
    timestamp: "5분 전",
    likes: 18
  },
  {
    id: "post_3",
    author: "안정꿀단지",
    avatarId: "avatar_3",
    text: "상대방 바쁘면 바쁜 거지 어련할까요~ 마음 넉넉하게 먹고 운동하러 갑시다! 흔들리지 않는 멘탈 관리 팁 공유해요.",
    styleTag: "강철 멘탈 오아시스",
    timestamp: "15분 전",
    likes: 42
  },
  {
    id: "post_4",
    author: "카오스맨",
    avatarId: "avatar_4",
    text: "말투 조금 차갑길래 상처받아서 카톡 탈퇴해버림... 근데 또 연락 기다려짐 ㅠㅠㅠ 혼돈의 카오스 살려주세요.",
    styleTag: "마음속 혼돈의 카오스",
    timestamp: "32분 전",
    likes: 27
  },
  {
    id: "post_5",
    author: "밀당어린이",
    avatarId: "avatar_5",
    text: "오늘 점심 뭐 먹었냐고 선톡 보냈더니 3시간 뒤에 밥 사진만 옴 ㅠㅠ 답장 일부러 늦추는 밀당 시작해봅니다!!",
    styleTag: "하트 시그널 과몰입러",
    timestamp: "1시간 전",
    likes: 12
  }
];
