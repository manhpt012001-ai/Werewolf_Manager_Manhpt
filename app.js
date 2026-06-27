// --- Cấu hình các Chức năng (Roles) ---
const ROLES_DEFINITION = {
    // Phe cơ bản (isBasic: true)
    thief: {
        id: 'thief',
        name: 'Ăn Trộm',
        team: 'ambiguous',
        icon: 'scissors',
        color: '#a16207',
        desc: 'Đêm đầu xem 2 lá dư, có thể đổi lấy 1 trong 2.',
        max: 1,
        isBasic: true,
        gameplayDetail: `Nhiệm vụ: Đêm đầu tiên xem 2 lá bài dư và quyết định có đổi không.
Cách chơi của Quản trò:
- Đêm 1: Chuẩn bị 2 lá dư (thường là 2 Dân Làng).
- Gọi Ăn Trộm dậy, cho xem 2 lá, hỏi có muốn đổi không.
- Nếu cả 2 lá đều là Sói, BUỘC phải đổi thành Sói.
- Ăn Trộm sẽ nhận vai mới và chơi với vai đó đến cuối game.`
    },
    cupid: {
        id: 'cupid',
        name: 'Cupid (Thần Tình Yêu)',
        team: 'villager',
        icon: 'heart',
        color: '#ec4899',
        desc: 'Ghép đôi 2 người chơi ở đêm đầu tiên.',
        max: 1,
        isBasic: true,
        gameplayDetail: `Nhiệm vụ: Ghép đôi 2 người chơi bất kỳ vào đêm đầu tiên.
Cách chơi của Quản trò:
- Đêm 1: Gọi Cupid thức dậy, yêu cầu chọn 2 người chơi. Quản trò đi gõ vai 2 người đó để họ mở mắt nhận diện nhau.
- Luật đặc biệt: Nếu 1 trong 2 người chết, người kia lập tức chết theo vì đau lòng. Nếu họ khác phe (Dân + Sói), họ trở thành phe thứ ba (phe Cặp đôi) và chỉ thắng khi tiêu diệt toàn bộ người chơi khác.`
    },
    guard: {
        id: 'guard',
        name: 'Bảo Vệ',
        team: 'villager',
        icon: 'shield',
        color: '#10b981',
        desc: 'Bảo vệ 1 người khỏi bị Sói cắn mỗi đêm.',
        max: 1,
        isBasic: true,
        gameplayDetail: `Nhiệm vụ: Mỗi đêm chọn bảo vệ 1 người khỏi sự tấn công của Ma Sói.
Cách chơi của Quản trò:
- Đêm: Gọi Bảo Vệ dậy và hỏi muốn bảo vệ ai. 
- Luật đặc biệt: Bảo Vệ không thể tự bảo vệ chính mình 2 đêm liên tiếp (hoặc không được bảo vệ cùng 1 mục tiêu 2 đêm liên tiếp). Mục tiêu được bảo vệ sẽ sống sót nếu bị Ma Sói cắn trúng đêm đó.`
    },
    wolf: {
        id: 'wolf',
        name: 'Ma Sói',
        team: 'wolf',
        icon: 'wolf',
        color: '#ef4444',
        desc: 'Thức dậy mỗi đêm để chọn cắn một người.',
        max: 4,
        isBasic: true,
        gameplayDetail: `Nhiệm vụ: Tiêu diệt toàn bộ người dân trong làng.
Cách chơi của Quản trò:
- Đêm: Gọi toàn bộ Ma Sói thức dậy cùng lúc. Sói thống nhất chọn cắn chết 1 người bằng cách chỉ tay.
- Điều kiện thắng: Số lượng Sói còn sống bằng hoặc nhiều hơn số người dân.`
    },
    witch: {
        id: 'witch',
        name: 'Phù Thủy',
        team: 'villager',
        icon: 'flask',
        color: '#8b5cf6',
        desc: 'Sở hữu 1 bình cứu sinh và 1 bình độc dược.',
        max: 1,
        isBasic: true,
        gameplayDetail: `Nhiệm vụ: Sử dụng 2 bình thuốc ma thuật hỗ trợ phe dân.
Cách chơi của Quản trò:
- Đêm: Gọi Phù Thủy thức dậy, chỉ cho Phù Thủy biết ai là nạn nhân bị Sói cắn đêm nay.
- Lựa chọn: Hỏi Phù Thủy có muốn dùng bình Cứu sinh để cứu người đó hay không (chỉ dùng 1 lần/game), và có muốn dùng bình Độc dược để đầu độc ai đó hay không (chỉ dùng 1 lần/game).`
    },
    seer: {
        id: 'seer',
        name: 'Tiên Tri',
        team: 'villager',
        icon: 'eye',
        color: '#3b82f6',
        desc: 'Soi bài 1 người mỗi đêm để tìm Ma Sói.',
        max: 1,
        isBasic: true,
        gameplayDetail: `Nhiệm vụ: Soi tìm thân phận người chơi hỗ trợ dân làng.
Cách chơi của Quản trò:
- Đêm: Gọi Tiên Tri thức dậy, Tiên Tri chỉ tay vào 1 người.
- Phản hồi: Quản trò ký hiệu ngón tay cái hướng lên (Người tốt/Dân) hoặc hướng xuống (Ma Sói) để Tiên Tri biết.`
    },
    hunter: {
        id: 'hunter',
        name: 'Thợ Săn',
        team: 'villager',
        icon: 'crosshair',
        color: '#f59e0b',
        desc: 'Khi chết có quyền bắn chết thêm 1 người khác.',
        max: 1,
        isBasic: true,
        gameplayDetail: `Nhiệm vụ: Kéo theo 1 kẻ tình nghi khi chết.
Cách chơi của Quản trò:
- Đêm/Ngày: Khi Thợ Săn chết (bị cắn, bị treo cổ, bị đầu độc), Quản trò tuyên bố Thợ Săn chết và yêu cầu họ lập tức chỉ tay bắn chết 1 người khác. Người bị bắn chết ngay lập tức mà không có quyền bào chữa.`
    },
    villager: {
        id: 'villager',
        name: 'Dân Làng',
        team: 'villager',
        icon: 'user',
        color: '#9ca3af',
        desc: 'Tìm kiếm Ma Sói vào ban ngày và bỏ phiếu treo cổ.',
        max: 10,
        isBasic: true,
        gameplayDetail: `Nhiệm vụ: Biện luận và treo cổ Ma Sói vào ban ngày.
Cách chơi của Quản trò:
- Ban ngày: Dân Làng tham gia thảo luận cùng mọi người và bỏ phiếu biểu quyết để treo cổ người bị tình nghi nhất.`
    },

    // Phe mở rộng (isBasic: false)
    idiot: {
        id: 'idiot',
        name: 'Chàng Ngốc',
        team: 'villager',
        icon: 'smile',
        color: '#22c55e',
        desc: 'Bị biểu quyết treo cổ sẽ lộ vai trò và miễn tử.',
        max: 1,
        isBasic: false,
        gameplayDetail: `Nhiệm vụ: Phe dân làng.
Cách chơi của Quản trò:
- Ngày: Nếu Chàng Ngốc bị dân làng bỏ phiếu treo cổ nhiều nhất, Quản trò lật bài của họ. Chàng Ngốc được tiếp tục sống sót nhưng từ nay bị tước quyền bỏ phiếu biểu quyết ban ngày (vẫn được thảo luận).`
    },
    elder: {
        id: 'elder',
        name: 'Trưởng Lão',
        team: 'villager',
        icon: 'award',
        color: '#facc15',
        desc: 'Có 2 mạng chống sói cắn. Nếu chết do dân làng, cả làng mất chức năng.',
        max: 1,
        isBasic: false,
        gameplayDetail: `Nhiệm vụ: Phe dân làng.
Cách chơi của Quản trò:
- Đêm: Sói cắn lần 1 Trưởng Lão không chết (Quản trò ghi nhận mất mạng đầu). Phù thủy đầu độc hoặc treo cổ sẽ chết ngay lập tức.
- Luật phạt: Nếu Trưởng Lão bị dân làng treo cổ hoặc bị Phù Thủy độc chết, tất cả các dân làng có chức năng đặc biệt khác (Bảo Vệ, Tiên Tri, Phù Thủy, Thợ Săn) lập tức bị mất hết năng lực đặc biệt.`
    },
    lycan: {
        id: 'lycan',
        name: 'Lycan (Người Sói Bị Nguyền)',
        team: 'villager',
        icon: 'sparkles',
        color: '#38bdf8',
        desc: 'Phe người tốt nhưng Tiên Tri soi ra kết quả là Ma Sói.',
        max: 1,
        isBasic: false,
        gameplayDetail: `Nhiệm vụ: Phe dân làng.
Cách chơi của Quản trò:
- Đêm: Khi Tiên Tri soi bài Lycan, Quản trò ký hiệu "Ma Sói" (ngón tay hướng xuống). Tuy nhiên, Lycan thực chất là người tốt, không thức dậy đi cắn người ban đêm và thắng cùng phe Dân Làng.`
    },
    fox: {
        id: 'fox',
        name: 'Hồ Ly',
        team: 'villager',
        icon: 'help-circle',
        color: '#fb923c',
        desc: 'Đêm soi 3 người, nếu có Sói thì biết, nếu không sẽ mất chức năng.',
        max: 1,
        isBasic: false,
        gameplayDetail: `Nhiệm vụ: Phe dân làng, tìm sói theo cụm.
Cách chơi của Quản trò:
- Đêm: Gọi Hồ Ly dậy. Hồ Ly chọn 3 người ngồi cạnh nhau.
- Phản hồi: Quản trò gật đầu nếu trong 3 người có ít nhất 1 Sói. Nếu không có con sói nào, Quản trò lắc đầu, và từ đêm sau Hồ Ly bị mất năng lực soi bài.`
    },
    bear_tamer: {
        id: 'bear_tamer',
        name: 'Quản Thú',
        team: 'villager',
        icon: 'frown',
        color: '#fbbf24',
        desc: 'Gấu sẽ gầm lên vào buổi sáng nếu có Ma Sói ngồi cạnh Quản Thú.',
        max: 1,
        isBasic: false,
        gameplayDetail: `Nhiệm vụ: Phát hiện Sói ngồi cận kề.
Cách chơi của Quản trò:
- Ban ngày: Buổi sáng khi công bố kết quả đêm, nếu có Ma Sói còn sống ngồi cạnh Quản Thú (bên trái hoặc bên phải), Quản trò tuyên bố "Gấu gầm lên!". Nếu không có hoặc sói ngồi xa hơn, gấu không gầm.`
    },
    big_bad_wolf: {
        id: 'big_bad_wolf',
        name: 'Sói Đầu Đàn',
        team: 'wolf',
        icon: 'activity',
        color: '#b91c1c',
        desc: 'Cắn thêm một người mỗi đêm chừng nào chưa có người sói nào chết.',
        max: 1,
        isBasic: false,
        gameplayDetail: `Nhiệm vụ: Phe Ma Sói.
Cách chơi của Quản trò:
- Đêm: Sói Đầu Đàn thức dậy cùng đàn sói cắn người như thường lệ. Sau đó, gọi riêng Sói Đầu Đàn dậy cắn thêm một nạn nhân thứ 2.
- Điều kiện đặc biệt: Sói Đầu Đàn chỉ được cắn riêng khi chưa có bất kỳ thành viên nào thuộc phe Ma Sói bị tiêu diệt.`
    },
    white_wolf: {
        id: 'white_wolf',
        name: 'Sói Trắng',
        team: 'third_party',
        icon: 'users',
        color: '#e2e8f0',
        desc: 'Phe thứ ba. 2 đêm cắn thêm 1 Ma Sói khác.',
        max: 1,
        isBasic: false,
        gameplayDetail: `Nhiệm vụ: Phe thứ ba, sống sót cô độc.
Cách chơi của Quản trò:
- Đêm: Thức dậy cùng đàn sói cắn người như thường. 2 đêm 1 lần (các đêm lẻ 1, 3, 5...), Quản trò gọi riêng Sói Trắng dậy. Sói Trắng được quyền chọn cắn chết thêm 1 Ma Sói khác.`
    },
    wild_child: {
        id: 'wild_child',
        name: 'Đứa Trẻ Hoang Dã',
        team: 'villager',
        icon: 'git-commit',
        color: '#818cf8',
        desc: 'Chọn 1 thần tượng đầu game. Nếu thần tượng chết, biến thành Ma Sói.',
        max: 1,
        isBasic: false,
        gameplayDetail: `Nhiệm vụ: Lựa chọn thần tượng và chuyển hóa.
Cách chơi của Quản trò:
- Đêm 1: Gọi Đứa Trẻ Hoang Dã dậy chọn 1 người chơi làm Thần tượng.
- Luật chơi: Khi Thần tượng chết, Đứa Trẻ Hoang Dã biến đổi thành Ma Sói, thức dậy đi cắn người ban đêm cùng phe Sói từ đêm tiếp theo.`
    },
    cursed: {
        id: 'cursed',
        name: 'Kẻ Bị Nguyền',
        team: 'villager',
        icon: 'alert-triangle',
        color: '#a78bfa',
        desc: 'Bị Sói cắn sẽ không chết mà biến thành Ma Sói.',
        max: 1,
        isBasic: false,
        gameplayDetail: `Nhiệm vụ: Ban đầu phe người tốt, sau đó có thể hóa Sói.
Cách chơi của Quản trò:
- Đêm: Nếu Kẻ Bị Nguyền bị Ma Sói chọn cắn, Quản trò ghi nhận không chết mà lập tức chuyển vai trò của họ thành Ma Sói. Từ đêm sau họ dậy cắn người cùng bầy Sói.`
    },
    jester: {
        id: 'jester',
        name: 'Chú Hề',
        team: 'third_party',
        icon: 'gift',
        color: '#f472b6',
        desc: 'Thắng cuộc duy nhất nếu dụ được dân làng treo cổ mình ban ngày.',
        max: 1,
        isBasic: false,
        gameplayDetail: `Nhiệm vụ: Phe thứ ba.
Cách chơi của Quản trò:
- Ban ngày: Chú Hề dùng mọi lập luận giả tạo để bị dân làng bỏ phiếu treo cổ. Nếu Chú Hề bị treo cổ, game kết thúc ngay và Chú Hề thắng đơn độc.`
    },
    piper: {
        id: 'piper',
        name: 'Người Thổi Sáo',
        team: 'third_party',
        icon: 'music',
        color: '#fb7185',
        desc: 'Mỗi đêm thôi miên 2 người. Thắng khi tất cả người còn sống bị thôi miên.',
        max: 1,
        isBasic: false,
        gameplayDetail: `Nhiệm vụ: Thôi miên cả thế giới.
Cách chơi của Quản trò:
- Đêm: Gọi Người Thổi Sáo thức dậy chọn thôi miên 2 người mới. Quản trò gõ vai 2 người đó dậy để họ mở mắt nhận diện nhau và biết mình bị thôi miên.
- Điều kiện thắng: Tất cả những người còn sống đều đã bị thôi miên (không tính Người Thổi Sáo).`
    },
    wolf_cub: {
        id: 'wolf_cub',
        name: 'Sói Con',
        team: 'wolf',
        icon: 'smile',
        color: '#f87171',
        desc: 'Khi Sói Con chết, đêm tiếp theo đàn sói được cắn 2 người.',
        max: 1,
        isBasic: false,
        gameplayDetail: `Nhiệm vụ: Phẫn nộ cho đàn sói.
Cách chơi của Quản trò:
- Đêm/Ngày: Nếu Sói Con chết, Quản trò ghi nhận trạng thái phẫn nộ của đàn sói. Đêm tiếp theo, đàn Ma Sói được gọi dậy và chọn cắn 2 người chơi khác nhau thay vì 1 người.`
    },
    rusty_knight: {
        id: 'rusty_knight',
        name: 'Hiệp Sĩ Kiếm Rỉ',
        team: 'villager',
        icon: 'scissors',
        color: '#94a3b8',
        desc: 'Nếu bị Sói cắn chết, con Sói bên trái Hiệp Sĩ sẽ chết vào đêm sau.',
        max: 1,
        isBasic: false,
        gameplayDetail: `Nhiệm vụ: Trừng phạt con sói cắn mình.
Cách chơi của Quản trò:
- Luật chơi: Nếu Hiệp Sĩ Kiếm Rỉ bị Sói cắn chết ban đêm, con Sói đầu tiên bên trái Hiệp Sĩ trong vòng tròn chơi sẽ bị nhiễm độc thanh kiếm rỉ và lăn ra chết vào cuối đêm tiếp theo.`
    },
    apprentice_seer: {
        id: 'apprentice_seer',
        name: 'Tiên Tri Tập Sự',
        team: 'villager',
        icon: 'eye-off',
        color: '#06b6d4',
        desc: 'Nếu Tiên Tri thật chết, Tập Sự sẽ kế thừa và trở thành Tiên Tri mới.',
        max: 1,
        isBasic: false,
        gameplayDetail: `Nhiệm vụ: Kế thừa di sản Tiên Tri.
Cách chơi của Quản trò:
- Đêm: Ban đầu không thức dậy. Nếu Tiên Tri thật chết, từ đêm tiếp theo Quản trò gọi Tiên Tri Tập Sự thức dậy đi soi bài giống hệt như Tiên Tri.`
    },
    angel: {
        id: 'angel',
        name: 'Thiên Thần',
        team: 'third_party',
        icon: 'star',
        color: '#60a5fa',
        desc: 'Thắng ngay nếu bị treo cổ ngày đầu hoặc bị cắn đêm đầu.',
        max: 1,
        isBasic: false,
        gameplayDetail: `Nhiệm vụ: Phe thứ ba.
Cách chơi của Quản trò:
- Luật chơi: Nếu Thiên Thần bị cắn chết ngay đêm 1, hoặc bị biểu quyết treo cổ ngay ngày 1, Thiên Thần lập tức thắng ván đấu.`
    }
};

// Trình tự thức dậy ban đêm chuẩn
const NIGHT_ORDER_INTERNATIONAL = [
    'thief', 'cupid', 'wild_child', 'guard', 'seer', 'wolf', 'big_bad_wolf', 'white_wolf', 'witch', 'fox', 'piper',
    'hunter', 'lycan', 'bear_tamer', 'cursed', 'jester', 'wolf_cub', 'rusty_knight', 'angel'
];

const NIGHT_ORDER_VIETNAM = [
    'thief', 'cupid', 'wild_child', 'guard', 'wolf', 'big_bad_wolf', 'white_wolf', 'seer', 'apprentice_seer', 'witch', 'fox', 'piper', 'elder_confirm',
    'hunter', 'lycan', 'bear_tamer', 'cursed', 'jester', 'wolf_cub', 'rusty_knight', 'angel'
];

function getNightOrder() {
    return gameState.ruleMode === 'international' ? NIGHT_ORDER_INTERNATIONAL : NIGHT_ORDER_VIETNAM;
}

const MODERATOR_SCRIPTS = {
    international: {
        thief: {
            night: `"Ăn Trộm dậy. Đây là 2 lá còn dư — bạn có muốn đổi lá của mình lấy 1 trong 2 lá này không? Đi ngủ lại."`,
            note: `Chỉ gọi đêm đầu tiên. Nếu 2 lá dư đều là Sói, Ăn Trộm BẮT BUỘC phải đổi lấy Sói.`
        },
        cupid: {
            night: `"Cupid dậy. Hãy chỉ ra 2 người bạn muốn ghép thành cặp đôi yêu nhau. Cupid đi ngủ lại. Hai người được Cupid chọn, hãy mở mắt và nhận mặt nhau. Cặp đôi đi ngủ lại."`,
            note: `Chỉ gọi đêm đầu tiên.`
        },
        wild_child: {
            night: `"Đứa trẻ hoang dã dậy. Hãy chọn 1 người làm thần tượng. Đứa trẻ hoang dã đi ngủ lại."`,
            note: `Chỉ gọi đêm đầu tiên.`
        },
        guard: {
            night: `"Bảo Vệ dậy. Đêm nay bạn muốn bảo vệ ai? Bảo Vệ đi ngủ lại."`,
            note: `Không được bảo vệ cùng 1 mục tiêu ở 2 đêm liên tiếp.`
        },
        seer: {
            night: `"Tiên Tri dậy. Bạn muốn soi ai đêm nay? (Quản trò ra dấu). Tiên Tri đi ngủ lại."`,
            note: `Ngón cái lên = Dân, ngón cái xuống = Sói.`
        },
        apprentice_seer: {
            night: `"Tiên Tri Tập Sự dậy. Bạn muốn soi ai đêm nay? (Quản trò ra dấu). Tiên Tri Tập Sự đi ngủ lại."`,
            note: `Chỉ gọi khi Tiên Tri đã chết.`
        },
        wolf: {
            night: `"Ma Sói dậy. Đêm nay bầy sói thống nhất cắn ai? Ma Sói đi ngủ lại."`,
            note: `Cô Bé (nếu có) có thể hé mắt.`
        },
        big_bad_wolf: {
            night: `"Sói Đầu Đàn dậy. Bạn muốn cắn thêm ai? Sói Đầu Đàn đi ngủ lại."`,
            note: `Chỉ được cắn khi chưa có con Sói nào bị loại.`
        },
        white_wolf: {
            night: `"Sói Trắng dậy. Bạn có muốn cắn con Sói nào không? Sói Trắng đi ngủ lại."`,
            note: `Chỉ gọi vào đêm chẵn (2, 4, 6...). Cắn 1 Sói khác.`
        },
        witch: {
            night: `"Phù Thủy dậy. Nạn nhân đêm nay là [x]. Bạn có muốn dùng bình cứu không? Bạn có muốn dùng bình độc không? Phù Thủy đi ngủ lại."`,
            note: `Mỗi bình chỉ dùng 1 lần trong cả ván.`
        },
        fox: {
            night: `"Hồ Ly dậy. Chọn 3 người ngồi cạnh nhau. (Quản trò gật/lắc). Hồ Ly đi ngủ lại."`,
            note: `Gật = Có sói, Lắc = Không có sói và Hồ Ly mất năng lực.`
        },
        piper: {
            night: `"Người Thổi Sáo dậy. Chọn 2 người để thôi miên. Người Thổi Sáo đi ngủ. Những người bị thôi miên mở mắt nhận diện nhau. Đi ngủ lại."`,
            note: `Thắng khi tất cả người còn sống đều bị thôi miên.`
        },
        elder_confirm: {
            night: `"Già Làng mở mắt để Quản trò xác nhận. Già Làng đi ngủ lại."`,
            note: `Chỉ gọi đêm đầu tiên.`
        }
    },
    vietnam: {
        thief: {
            night: `"Ăn Trộm dậy. Đây là 2 lá còn dư — bạn có muốn đổi lá của mình lấy 1 trong 2 lá này không? Đi ngủ lại."`,
            note: `Chỉ gọi đêm đầu tiên. Nếu 2 lá dư đều là Sói, Ăn Trộm BẮT BUỘC phải đổi lấy Sói.`
        },
        cupid: {
            night: `"Cupid dậy. Hãy chỉ ra 2 người bạn muốn ghép thành cặp đôi yêu nhau. Cupid đi ngủ lại. Hai người được Cupid chọn, hãy mở mắt và nhận mặt nhau. Cặp đôi đi ngủ lại."`,
            note: `Chỉ gọi đêm đầu tiên.`
        },
        wild_child: {
            night: `"Đứa trẻ hoang dã dậy. Hãy chọn 1 người làm thần tượng. Đứa trẻ hoang dã đi ngủ lại."`,
            note: `Chỉ gọi đêm đầu tiên.`
        },
        guard: {
            night: `"Bảo Vệ dậy. Đêm nay bạn muốn bảo vệ ai? Bảo Vệ đi ngủ lại."`,
            note: `Không được bảo vệ cùng 1 mục tiêu ở 2 đêm liên tiếp.`
        },
        wolf: {
            night: `"Ma Sói dậy. Đêm nay bầy sói thống nhất cắn ai? Ma Sói đi ngủ lại."`,
            note: `Cô Bé (nếu có) có thể hé mắt.`
        },
        big_bad_wolf: {
            night: `"Sói Đầu Đàn dậy. Bạn muốn cắn thêm ai? Sói Đầu Đàn đi ngủ lại."`,
            note: `Chỉ được cắn khi chưa có con Sói nào bị loại.`
        },
        white_wolf: {
            night: `"Sói Trắng dậy. Bạn có muốn cắn con Sói nào không? Sói Trắng đi ngủ lại."`,
            note: `Chỉ gọi vào đêm chẵn (2, 4, 6...). Cắn 1 Sói khác.`
        },
        seer: {
            night: `"Tiên Tri dậy. Bạn muốn soi ai đêm nay? (Quản trò ra dấu). Tiên Tri đi ngủ lại."`,
            note: `Ngón cái lên = Dân, ngón cái xuống = Sói.`
        },
        apprentice_seer: {
            night: `"Tiên Tri Tập Sự dậy. Bạn muốn soi ai đêm nay? (Quản trò ra dấu). Tiên Tri Tập Sự đi ngủ lại."`,
            note: `Chỉ gọi khi Tiên Tri đã chết.`
        },
        witch: {
            night: `"Phù Thủy dậy. Nạn nhân đêm nay là [x]. Bạn có muốn dùng bình cứu không? Bạn có muốn dùng bình độc không? Phù Thủy đi ngủ lại."`,
            note: `Mỗi bình chỉ dùng 1 lần trong cả ván.`
        },
        fox: {
            night: `"Hồ Ly dậy. Chọn 3 người ngồi cạnh nhau. (Quản trò gật/lắc). Hồ Ly đi ngủ lại."`,
            note: `Gật = Có sói, Lắc = Không có sói và Hồ Ly mất năng lực.`
        },
        piper: {
            night: `"Người Thổi Sáo dậy. Chọn 2 người để thôi miên. Người Thổi Sáo đi ngủ. Những người bị thôi miên mở mắt nhận diện nhau. Đi ngủ lại."`,
            note: `Thắng khi tất cả người còn sống đều bị thôi miên.`
        },
        elder_confirm: {
            night: `"Già Làng mở mắt để Quản trò xác nhận. Già Làng đi ngủ lại."`,
            note: `Chỉ gọi đêm đầu tiên.`
        }
    }
};

const ROLE_SUGGESTIONS = {
    8: { wolf: 2, seer: 1, guard: 1 },
    9: { wolf: 2, seer: 1, guard: 1 },
    10: { wolf: 3, seer: 1, guard: 1, hunter: 1 },
    11: { wolf: 3, seer: 1, guard: 1, hunter: 1 },
    12: { wolf: 3, seer: 1, guard: 1, hunter: 1, cupid: 1 },
    13: { wolf: 3, seer: 1, guard: 1, hunter: 1, cupid: 1 },
    14: { wolf: 3, seer: 1, guard: 1, hunter: 1, cupid: 1, witch: 1 },
    15: { wolf: 4, seer: 1, guard: 1, hunter: 1, cupid: 1, witch: 1 },
};

// --- Trạng thái Game (Game State) ---
let gameStateHistory = [];
let gameState = {
    ruleMode: null, // 'international' | 'vietnam'
    players: [],
    currentPhase: 'setup',
    nightNumber: 0,
    dayNumber: 0,
    showExtended: false,

    nightActions: {
        cupidTargets: [],
        guardTarget: null,
        wolfTarget: null,
        bigBadWolfTarget: null,
        whiteWolfTarget: null,
        witchSaveUsed: false,
        witchPoisonTarget: null,
        seerTarget: null,
        apprenticeSeerTarget: null,
        foxTargets: [],
        piperTargets: []
    },

    witchHasSave: true,
    witchHasPoison: true,
    cupidActionDone: false,
    logs: [],

    selectedRoles: {
        thief: 0,
        cupid: 0,
        guard: 1,
        wolf: 2,
        witch: 1,
        seer: 1,
        hunter: 1,
        villager: 2,

        idiot: 0,
        elder: 0,
        lycan: 0,
        fox: 0,
        bear_tamer: 0,
        big_bad_wolf: 0,
        white_wolf: 0,
        wild_child: 0,
        cursed: 0,
        jester: 0,
        piper: 0,
        wolf_cub: 0,
        rusty_knight: 0,
        apprentice_seer: 0,
        angel: 0
    }
};

// --- Bộ đếm thời gian (Timer) ---
let timerInterval = null;
let timerSecondsRemaining = 300;

window.persistCurrentState = function () {
    localStorage.setItem('werewolf_game_state', JSON.stringify(gameState));
    localStorage.setItem('werewolf_game_state_history', JSON.stringify(gameStateHistory));
};

function saveGameState() {
    gameStateHistory.push(JSON.stringify(gameState));
    if (gameStateHistory.length > 20) {
        gameStateHistory.shift();
    }
    persistCurrentState();
}

function restoreGameState(state) {
    gameState = state;
    // Khôi phục giao diện dựa trên phase hiện tại
    document.getElementById('victory-modal').classList.remove('active');

    if (gameState.ruleMode) {
        const badge = document.getElementById('current-mode-badge');
        if (badge) {
            badge.innerText = `Mode: ${gameState.ruleMode === 'international' ? 'Quốc Tế' : 'Việt Nam'}`;
            badge.style.display = 'block';
        }
    }

    if (gameState.currentPhase === 'mode-select' || !gameState.ruleMode) {
        showPhase('phase-mode-select');
    } else if (gameState.currentPhase === 'setup') {
        showPhase('phase-setup');
        renderSetupRoles();
        renderSetupPlayers();
    } else if (gameState.currentPhase === 'assign') {
        showPhase('phase-assign');
        renderAssignTable();
    } else if (gameState.currentPhase === 'night') {
        showPhase('phase-night');
        document.getElementById('night-number').innerText = gameState.nightNumber;
        buildNightChecklist();
    } else if (gameState.currentPhase === 'day') {
        showPhase('phase-day');
        document.getElementById('day-number').innerText = gameState.dayNumber;
        renderHangedSelector();
    }

    renderPlayerSidebarList();

    // Cập nhật lại logs
    const logsContainer = document.getElementById('game-logs');
    if (logsContainer) {
        logsContainer.innerHTML = '';
        gameState.logs.forEach(log => {
            const logItem = document.createElement('div');
            logItem.className = `log-item ${log.type}-log`;
            logItem.innerHTML = `<span class="log-time">[${log.time}]</span> ${log.message}`;
            logsContainer.appendChild(logItem);
        });
        logsContainer.scrollTop = logsContainer.scrollHeight;
    }

    lucide.createIcons();
}

function undoLastAction() {
    if (gameStateHistory.length === 0) {
        alert("Không có bước nào để quay lại!");
        return;
    }

    const previousStateStr = gameStateHistory.pop();
    restoreGameState(JSON.parse(previousStateStr));

    // Lưu lại trạng thái mới sau khi undo vào localStorage
    localStorage.setItem('werewolf_game_state', JSON.stringify(gameState));
    localStorage.setItem('werewolf_game_state_history', JSON.stringify(gameStateHistory));

    addLog("Đã quay lại bước trước đó.", "warning");
}

function softResetGame() {
    saveGameState();
    document.getElementById('victory-modal').classList.remove('active');
    pauseTimer();

    gameState.currentPhase = 'setup';
    gameState.nightNumber = 0;
    gameState.dayNumber = 0;

    gameState.nightActions = {
        cupidTargets: [], guardTarget: null, wolfTarget: null, bigBadWolfTarget: null,
        whiteWolfTarget: null, witchSaveUsed: false, witchPoisonTarget: null,
        seerTarget: null, apprenticeSeerTarget: null, foxTargets: [], piperTargets: []
    };

    gameState.witchHasSave = true;
    gameState.witchHasPoison = true;
    gameState.cupidActionDone = false;
    gameState.elderKilledByVillagers = false;

    gameState.players.forEach(p => {
        p.isAlive = true;
        p.isProtected = false;
        p.lastProtectedTargetId = null;
        p.isCouple = false;
        p.notes = '';
        p.idolId = null;
    });

    addLog("Đã khởi động lại ván chơi với người chơi hiện tại.", "info");

    gameState.ruleMode = null;
    showPhase('phase-mode-select'); // Bắt đầu ở màn hình chọn luật
}

window.selectRuleMode = function (mode) {
    gameState.ruleMode = mode;

    // Cập nhật giao diện để ẩn phase 0 và hiện phase 1
    showPhase('phase-setup');

    const badge = document.getElementById('current-mode-badge');
    if (badge) {
        badge.style.display = 'block';
        badge.innerText = 'Mode: ' + (mode === 'international' ? 'Quốc Tế' : 'Việt Nam');
        badge.style.color = mode === 'international' ? 'var(--color-accent)' : 'var(--color-danger)';
        badge.style.borderColor = badge.style.color;
    }

    addLog(`Đã chọn bộ luật: ${mode === 'international' ? 'Quốc Tế' : 'Việt Nam'}`, 'info');

    renderSetupRoles();
    renderSetupPlayers();
    renderPlayerSidebarList();
};

document.addEventListener('DOMContentLoaded', () => {
    // Thử khôi phục game từ localStorage
    const savedState = localStorage.getItem('werewolf_game_state');
    const savedHistory = localStorage.getItem('werewolf_game_state_history');

    if (savedState) {
        try {
            const parsedState = JSON.parse(savedState);
            if (savedHistory) {
                gameStateHistory = JSON.parse(savedHistory);
            }
            restoreGameState(parsedState);
        } catch (e) {
            console.error("Lỗi khi khôi phục game state:", e);
            localStorage.removeItem('werewolf_game_state');
            localStorage.removeItem('werewolf_game_state_history');
            showPhase('phase-mode-select');
        }
    } else {
        showPhase('phase-mode-select');
    }

    renderSetupRoles();
    renderSetupPlayers();

    const searchInput = document.getElementById('input-search-roles');
    if (searchInput) {
        searchInput.addEventListener('input', renderSetupRoles);
    }

    const toggleRolesBtn = document.getElementById('btn-toggle-extended-roles');
    if (toggleRolesBtn) {
        toggleRolesBtn.addEventListener('click', () => {
            gameState.showExtended = !gameState.showExtended;
            toggleRolesBtn.innerText = gameState.showExtended ? 'Thu gọn' : 'Hiển thị thêm';
            renderSetupRoles();
        });
    }

    const setTimerBtn = document.getElementById('btn-set-custom-timer');
    if (setTimerBtn) {
        setTimerBtn.addEventListener('click', () => {
            const minutesInput = document.getElementById('input-timer-minutes');
            const secondsInput = document.getElementById('input-timer-seconds');
            
            let minutes = parseInt(minutesInput.value) || 0;
            let seconds = parseInt(secondsInput.value) || 0;
            
            if (minutes < 0 || seconds < 0 || seconds > 59 || (minutes === 0 && seconds === 0)) {
                alert('Vui lòng nhập thời gian hợp lệ (Phút >= 0, Giây từ 0 đến 59, tổng thời gian > 0).');
                return;
            }
            
            const totalSeconds = (minutes * 60) + seconds;
            setTimerDuration(totalSeconds);
            
            const formattedSec = seconds.toString().padStart(2, '0');
            addLog(`Đồng hồ thảo luận được đặt thành ${minutes}:${formattedSec}.`, 'info');
        });
    }

    // Đăng ký đóng modal giải thích
    const closeDetailBtn = document.getElementById('btn-close-role-detail');
    if (closeDetailBtn) {
        closeDetailBtn.addEventListener('click', () => {
            document.getElementById('role-detail-modal').classList.remove('active');
        });
    }

    // Đăng ký mở modal Luật chơi
    const showRulesBtn = document.getElementById('btn-show-rules');
    if (showRulesBtn) {
        showRulesBtn.addEventListener('click', () => {
            renderRulesModal();
            document.getElementById('rules-modal').classList.add('active');
        });
    }

    // Đăng ký đóng modal Luật chơi
    const closeRulesBtn = document.getElementById('btn-close-rules');
    if (closeRulesBtn) {
        closeRulesBtn.addEventListener('click', () => {
            document.getElementById('rules-modal').classList.remove('active');
        });
    }

    function renderRulesModal() {
        const list = document.getElementById('rules-order-list');
        const title = document.getElementById('rules-order-title');
        if (!list || !title) return;

        if (gameState.ruleMode === 'vietnam') {
            title.innerText = 'Trình tự gọi đêm (Luật Việt Nam Mở rộng):';
            list.innerHTML = `
            <li><strong>Ăn Trộm:</strong> Đổi bài dư (Chỉ đêm 1).</li>
            <li><strong>Cupid (Thần tình yêu):</strong> Ghép đôi 2 người (Chỉ đêm 1).</li>
            <li><strong>Đứa trẻ hoang dã:</strong> Chọn thần tượng (Chỉ đêm 1).</li>
            <li><strong>Bảo vệ:</strong> Chọn 1 người để bảo vệ. Không bảo vệ trùng 2 đêm liên tiếp.</li>
            <li><strong>Ma Sói & Sói Đầu Đàn:</strong> Cắn người. Sói Đầu Đàn cắn thêm nếu chưa có sói chết.</li>
            <li><strong>Sói Trắng:</strong> Cắn 1 con sói khác (Chỉ thức đêm chẵn).</li>
            <li><strong>Tiên Tri:</strong> Soi 1 người.</li>
            <li><strong>Tiên Tri Tập Sự:</strong> Soi 1 người (Chỉ thức khi Tiên Tri thật đã chết).</li>
            <li><strong>Phù Thủy:</strong> Dùng bình cứu / độc.</li>
            <li><strong>Hồ Ly:</strong> Soi 3 người ngồi cạnh nhau.</li>
            <li><strong>Người Thổi Sáo:</strong> Thôi miên 2 người.</li>
            <li><strong>Già Làng:</strong> Xác nhận thân phận (Chỉ đêm 1).</li>
        `;
        } else {
            title.innerText = 'Trình tự gọi đêm (Luật Quốc Tế Chuẩn gốc):';
            list.innerHTML = `
            <li><strong>Ăn Trộm:</strong> Đổi bài dư (Chỉ đêm 1).</li>
            <li><strong>Cupid (Thần tình yêu):</strong> Ghép đôi 2 người (Chỉ đêm 1).</li>
            <li><strong>Đứa trẻ hoang dã:</strong> Chọn thần tượng (Chỉ đêm 1).</li>
            <li><strong>Bảo vệ:</strong> Chọn 1 người để bảo vệ. Không bảo vệ trùng 2 đêm liên tiếp.</li>
            <li><strong>Tiên Tri:</strong> Soi 1 người.</li>
            <li><strong>Ma Sói & Sói Đầu Đàn:</strong> Cắn người. Sói Đầu Đàn cắn thêm nếu chưa có sói chết.</li>
            <li><strong>Sói Trắng:</strong> Cắn 1 con sói khác (Chỉ thức đêm chẵn).</li>
            <li><strong>Phù Thủy:</strong> Dùng bình cứu / độc.</li>
            <li><strong>Hồ Ly:</strong> Soi 3 người ngồi cạnh nhau.</li>
            <li><strong>Người Thổi Sáo:</strong> Thôi miên 2 người.</li>
        `;
        }

        // Hiển thị phần giải thích vai trò đang có trong ván
        const rolesExplainContainer = document.getElementById('rules-roles-explain-container');
        const rolesExplainList = document.getElementById('rules-roles-explain-list');

        if (rolesExplainContainer && rolesExplainList) {
            if (!gameState.players || gameState.players.length === 0) {
                rolesExplainContainer.style.display = 'none';
            } else {
                rolesExplainContainer.style.display = 'block';

                // Lọc ra các vai trò unique có trong ván
                const activeRoles = [...new Set(gameState.players.map(p => p.role))];

                rolesExplainList.innerHTML = '';
                activeRoles.forEach(roleKey => {
                    const roleDef = ROLES_DEFINITION[roleKey];
                    if (roleDef) {
                        const item = document.createElement('div');
                        item.style.padding = '8px 12px';
                        item.style.background = 'rgba(0, 0, 0, 0.15)';
                        item.style.borderRadius = '4px';
                        item.style.borderLeft = `3px solid ${roleDef.color || '#ccc'}`;

                        // Sử dụng gameplayDetail nếu có để hiển thị đầy đủ chi tiết như khi click vai trò, fallback về desc
                        const detailText = roleDef.gameplayDetail || roleDef.desc;

                        item.innerHTML = `
                        <div style="font-weight: bold; color: ${roleDef.color || 'var(--text-primary)'}; display: flex; align-items: center; gap: 6px; font-size: 0.9rem;">
                            <i data-lucide="${roleDef.icon || 'user'}" style="width: 14px; height: 14px;"></i>
                            ${roleDef.name}
                        </div>
                        <div style="color: var(--text-muted); font-size: 0.8rem; margin-top: 6px; white-space: pre-line; line-height: 1.5;">
                            ${detailText}
                        </div>
                    `;
                        rolesExplainList.appendChild(item);
                    }
                });
                lucide.createIcons();
            }
        }
    }

    const btnAddPlayer = document.getElementById('btn-add-player');
    if (btnAddPlayer) btnAddPlayer.addEventListener('click', handleAddPlayer);

    const inputPlayerName = document.getElementById('input-player-name');
    if (inputPlayerName) {
        inputPlayerName.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleAddPlayer();
        });
    }

    const btnStartAssign = document.getElementById('btn-start-assign');
    if (btnStartAssign) btnStartAssign.addEventListener('click', startAssignPhase);

    const btnBackToSetup = document.getElementById('btn-back-to-setup');
    if (btnBackToSetup) btnBackToSetup.addEventListener('click', backToSetupPhase);

    const btnAutoAssign = document.getElementById('btn-auto-assign');
    if (btnAutoAssign) btnAutoAssign.addEventListener('click', () => { saveGameState(); autoAssignRoles(); renderAssignTable(); renderPlayerSidebarList(); });

    const btnClearAssign = document.getElementById('btn-clear-assign');
    if (btnClearAssign) btnClearAssign.addEventListener('click', () => {
        saveGameState();
        gameState.players.forEach(p => p.role = 'unassigned');
        renderAssignTable();
        renderPlayerSidebarList();
    });

    const btnConfirmGame = document.getElementById('btn-confirm-game');
    if (btnConfirmGame) btnConfirmGame.addEventListener('click', startGame);

    const btnSkipNight = document.getElementById('btn-skip-night');
    if (btnSkipNight) btnSkipNight.addEventListener('click', handleEndNight);

    const btnEndNight = document.getElementById('btn-end-night');
    if (btnEndNight) btnEndNight.addEventListener('click', handleEndNight);

    const btnTimerStart = document.getElementById('btn-timer-start');
    if (btnTimerStart) btnTimerStart.addEventListener('click', startTimer);

    const btnTimerPause = document.getElementById('btn-timer-pause');
    if (btnTimerPause) btnTimerPause.addEventListener('click', pauseTimer);

    const btnTimerReset = document.getElementById('btn-timer-reset');
    if (btnTimerReset) btnTimerReset.addEventListener('click', resetTimer);

    const btnHangPlayer = document.getElementById('btn-hang-player');
    if (btnHangPlayer) btnHangPlayer.addEventListener('click', handleHangPlayer);

    const btnNextNight = document.getElementById('btn-next-night');
    if (btnNextNight) btnNextNight.addEventListener('click', startNightPhase);

    const btnModalRestart = document.getElementById('btn-modal-restart');
    if (btnModalRestart) btnModalRestart.addEventListener('click', softResetGame);

    const btnResetGame = document.getElementById('btn-reset-game');
    if (btnResetGame) btnResetGame.addEventListener('click', resetAllGame);

    const btnSoftReset = document.getElementById('btn-soft-reset');
    if (btnSoftReset) btnSoftReset.addEventListener('click', softResetGame);

    const btnUndoPhase = document.getElementById('btn-undo-phase');
    if (btnUndoPhase) btnUndoPhase.addEventListener('click', undoLastAction);
});

function addLog(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    gameState.logs.push({ time: timestamp, type, message });

    const logsContainer = document.getElementById('game-logs');
    const logItem = document.createElement('div');
    logItem.className = `log-item ${type}-log`;
    logItem.innerHTML = `<span class="log-time">[${timestamp}]</span> ${message}`;
    logsContainer.appendChild(logItem);
    logsContainer.scrollTop = logsContainer.scrollHeight;
}

function renderSetupRoles() {
    const container = document.getElementById('roles-selector-container');
    container.innerHTML = '';

    const queryInput = document.getElementById('input-search-roles');
    const query = queryInput ? queryInput.value.toLowerCase().trim() : '';
    const showExtended = gameState.showExtended;

    Object.keys(ROLES_DEFINITION).forEach(roleKey => {
        if (roleKey === 'villager') return;

        const role = ROLES_DEFINITION[roleKey];
        const isBasic = role.isBasic;

        if (query && !role.name.toLowerCase().includes(query) && !role.desc.toLowerCase().includes(query)) {
            return;
        }

        if (!query && !isBasic && !showExtended && (gameState.selectedRoles[roleKey] || 0) === 0) {
            return;
        }

        const count = gameState.selectedRoles[roleKey] || 0;

        const card = document.createElement('div');
        card.className = `role-checkbox-card ${count > 0 ? 'selected' : ''}`;
        card.innerHTML = `
            <div class="role-icon-box" style="background: rgba(${hexToRgb(role.color)}, 0.15); color: ${role.color}">
                <i data-lucide="${role.icon}"></i>
            </div>
            <div class="role-details" style="flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span class="role-name">${role.name}</span>
                    <i data-lucide="help-circle" onclick="showRoleDetail('${roleKey}', event)" style="width: 16px; height: 16px; cursor: pointer; color: var(--color-accent);" title="Xem cách chơi"></i>
                </div>
                <p style="font-size: 0.7rem; color: var(--text-muted); line-height: 1.2; margin-top: 2px; max-height: 2.4em; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;" title="${role.desc}">${role.desc}</p>
                <div class="role-count-control" style="margin-top: 4px;">
                    <button type="button" onclick="changeRoleCount('${roleKey}', -1)">-</button>
                    <span id="role-count-${roleKey}" style="font-weight: 700; width: 14px; text-align: center;">${count}</span>
                    <button type="button" onclick="changeRoleCount('${roleKey}', 1)">+</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    updateRoleCountsAndSummary();
    lucide.createIcons();
}

window.showRoleDetail = function (roleKey, event) {
    if (event) event.stopPropagation();
    const role = ROLES_DEFINITION[roleKey];
    if (role) {
        document.getElementById('role-detail-title').innerText = role.name;
        document.getElementById('role-detail-desc').innerText = role.gameplayDetail || role.desc;
        document.getElementById('role-detail-modal').classList.add('active');
    }
};

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255, 255, 255';
}

window.changeRoleCount = function (roleKey, delta) {
    const roleDef = ROLES_DEFINITION[roleKey];
    let newCount = (gameState.selectedRoles[roleKey] || 0) + delta;
    if (newCount < 0) newCount = 0;
    if (newCount > roleDef.max) newCount = roleDef.max;

    gameState.selectedRoles[roleKey] = newCount;
    const countEl = document.getElementById(`role-count-${roleKey}`);
    if (countEl) {
        countEl.innerText = newCount;
        const card = countEl.closest('.role-checkbox-card');
        if (card) {
            if (newCount > 0) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
        }
    }

    updateRoleCountsAndSummary();
};

function updateRoleCountsAndSummary() {
    let specialRolesCount = 0;
    Object.keys(gameState.selectedRoles).forEach(key => {
        if (key !== 'villager') {
            specialRolesCount += gameState.selectedRoles[key] || 0;
        }
    });

    const totalPlayers = gameState.players.length;
    let villagerCount = totalPlayers - specialRolesCount;
    if (villagerCount < 0) villagerCount = 0;
    gameState.selectedRoles.villager = villagerCount;

    document.getElementById('selected-role-count').innerText = specialRolesCount + villagerCount;
    persistCurrentState();
}

function handleAddPlayer() {
    const input = document.getElementById('input-player-name');
    const name = input.value.trim();
    if (!name) return;

    if (gameState.players.some(p => p.name.toLowerCase() === name.toLowerCase())) {
        alert('Tên người chơi này đã tồn tại!');
        return;
    }

    const newPlayer = {
        id: 'p_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        name: name,
        role: null,
        isAlive: true,
        isProtected: false,
        lastProtectedTargetId: null,
        isCouple: false,
        notes: '',
        idolId: null
    };

    gameState.players.push(newPlayer);
    input.value = '';
    input.focus();

    addLog(`Đã thêm người chơi: ${name}`);
    renderSetupPlayers();
    updateRoleCountsAndSummary();
    renderPlayerSidebarList();
}

window.removePlayer = function (playerId) {
    const player = gameState.players.find(p => p.id === playerId);
    if (!player) return;

    gameState.players = gameState.players.filter(p => p.id !== playerId);
    addLog(`Đã xóa người chơi: ${player.name}`);

    renderSetupPlayers();
    updateRoleCountsAndSummary();
    renderPlayerSidebarList();
};

function renderSetupPlayers() {
    const container = document.getElementById('setup-player-list');
    container.innerHTML = '';

    if (gameState.players.length === 0) {
        container.innerHTML = `<span class="text-muted" style="font-size: 0.85rem; padding: 10px;">Chưa có người chơi nào. Nhập tên và bấm "Thêm".</span>`;
        return;
    }

    gameState.players.forEach(p => {
        const chip = document.createElement('div');
        chip.className = 'player-chip';
        chip.title = 'Bấm để xóa';
        chip.innerHTML = `${p.name} <i data-lucide="x"></i>`;
        chip.addEventListener('click', () => removePlayer(p.id));
        container.appendChild(chip);
    });

    lucide.createIcons();
}

window.quickAddPlayers = function (count) {
    const sampleNames = [
        "Mạnh", "Xuyên", "Tuấn", "Hường", "Thắng", "Đoàn", "Duyên", "Lương",
        "Hà", "Giang", "Hà Nam", "Hà Nữ",
    ];

    gameState.players = [];

    const numToAdd = Math.min(count, sampleNames.length);
    for (let i = 0; i < numToAdd; i++) {
        gameState.players.push({
            id: 'p_sample_' + i,
            name: sampleNames[i],
            role: null,
            isAlive: true,
            isProtected: false,
            lastProtectedTargetId: null,
            isCouple: false,
            notes: ''
        });
    }

    addLog(`Đã thêm nhanh ${numToAdd} người chơi mẫu`);

    // Auto fill suggest roles based on total players
    if (ROLE_SUGGESTIONS[gameState.players.length]) {
        const suggestion = ROLE_SUGGESTIONS[gameState.players.length];
        // Reset old special roles
        Object.keys(gameState.selectedRoles).forEach(k => {
            if (k !== 'villager') gameState.selectedRoles[k] = 0;
        });

        // Apply suggestion
        Object.keys(suggestion).forEach(role => {
            if (gameState.selectedRoles[role] !== undefined) {
                gameState.selectedRoles[role] = suggestion[role];
            }
        });
        addLog(`Đã tự động áp dụng cấu hình chức năng gợi ý cho ${gameState.players.length} người.`, 'info');
    }

    renderSetupPlayers();
    updateRoleCountsAndSummary();
    renderSetupRoles();
    renderPlayerSidebarList();
};

function startAssignPhase() {
    saveGameState();
    const totalPlayers = gameState.players.length;
    if (totalPlayers < 5) {
        alert('Cần ít nhất 5 người chơi để bắt đầu game!');
        return;
    }

    let specialRolesCount = 0;
    Object.keys(gameState.selectedRoles).forEach(key => {
        if (key !== 'villager') specialRolesCount += gameState.selectedRoles[key] || 0;
    });

    if (specialRolesCount > totalPlayers) {
        alert(`Số lượng chức năng đặc biệt (${specialRolesCount}) vượt quá số lượng người chơi (${totalPlayers})!`);
        return;
    }

    gameState.players.forEach(p => {
        if (!p.role) p.role = 'unassigned';
    });

    showPhase('phase-assign');
    renderAssignTable();
}

function backToSetupPhase() {
    showPhase('phase-setup');
}

function autoAssignRoles() {
    const rolePool = [];
    Object.keys(gameState.selectedRoles).forEach(roleKey => {
        const count = gameState.selectedRoles[roleKey] || 0;
        for (let i = 0; i < count; i++) {
            rolePool.push(roleKey);
        }
    });

    for (let i = rolePool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [rolePool[i], rolePool[j]] = [rolePool[j], rolePool[i]];
    }

    gameState.players.forEach((player, idx) => {
        player.role = rolePool[idx] || 'villager';
    });

    addLog("Đã xáo trộn và tự động phân phát chức năng ngẫu nhiên.");
}

function renderAssignTable() {
    const tbody = document.getElementById('assign-table-body');
    tbody.innerHTML = '';

    gameState.players.forEach(player => {
        const tr = document.createElement('tr');

        let roleName = 'Chưa gán';
        let badgeStyle = 'background: #333; color: #fff';
        if (player.role && player.role !== 'unassigned') {
            const roleDef = ROLES_DEFINITION[player.role] || ROLES_DEFINITION.villager;
            roleName = roleDef.name;
            badgeStyle = `background: rgba(${hexToRgb(roleDef.color)}, 0.15); color: ${roleDef.color}`;
        }

        let selectHtml = `
            <div class="custom-select-wrapper" id="wrapper-${player.id}">
                <input type="text" 
                       class="custom-select-input" 
                       id="input-${player.id}"
                       value="${player.role === 'unassigned' ? '' : roleName}" 
                       placeholder="-- Chọn chức năng --"
                       onfocus="window.showRoleDropdown('${player.id}')"
                       oninput="window.filterRoleDropdown('${player.id}', this.value)"
                       autocomplete="off">
                <i data-lucide="chevron-down" class="custom-select-icon"></i>
                <div class="custom-select-dropdown" id="dropdown-${player.id}">
                    <div class="custom-select-item" data-role="unassigned" onclick="window.selectPlayerRole('${player.id}', 'unassigned')">-- Chưa gán --</div>
        `;
        Object.keys(ROLES_DEFINITION).forEach(roleKey => {
            const role = ROLES_DEFINITION[roleKey];
            const count = gameState.selectedRoles[roleKey] || 0;
            if (count > 0 || roleKey === 'villager') {
                selectHtml += `<div class="custom-select-item" data-role="${roleKey}" data-name="${role.name.toLowerCase()}" onclick="window.selectPlayerRole('${player.id}', '${roleKey}')">${role.name}</div>`;
            }
        });
        selectHtml += `</div></div>`;


        tr.innerHTML = `
            <td><strong>${player.name}</strong></td>
            <td>
                <span class="badge badge-role" style="${badgeStyle}">
                    ${roleName}
                </span>
            </td>
            <td>${selectHtml}</td>
        `;

        tbody.appendChild(tr);
    });

    lucide.createIcons();
}

window.showRoleDropdown = function (playerId) {
    document.querySelectorAll('.custom-select-dropdown').forEach(el => el.style.display = 'none');
    document.getElementById(`dropdown-${playerId}`).style.display = 'block';

    const input = document.getElementById(`input-${playerId}`);
    window.filterRoleDropdown(playerId, input.value);
    input.select();
}

window.filterRoleDropdown = function (playerId, query) {
    const q = query.toLowerCase().trim();
    const dropdown = document.getElementById(`dropdown-${playerId}`);
    const items = dropdown.querySelectorAll('.custom-select-item');
    items.forEach(item => {
        const name = item.getAttribute('data-name');
        if (item.getAttribute('data-role') === 'unassigned') {
            item.style.display = q === '' ? 'block' : 'none';
        } else {
            if (name && name.includes(q)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        }
    });
}

window.selectPlayerRole = function (playerId, roleKey) {
    document.getElementById(`dropdown-${playerId}`).style.display = 'none';
    updatePlayerRole(playerId, roleKey);
}

document.addEventListener('click', function (e) {
    if (!e.target.closest('.custom-select-wrapper')) {
        document.querySelectorAll('.custom-select-dropdown').forEach(el => el.style.display = 'none');
        gameState.players.forEach(p => {
            const input = document.getElementById(`input-${p.id}`);
            if (input) {
                if (p.role === 'unassigned' || !p.role) {
                    input.value = '';
                } else {
                    const roleDef = ROLES_DEFINITION[p.role];
                    if (roleDef) input.value = roleDef.name;
                }
            }
        });
    }
});

window.updatePlayerRole = function (playerId, newRole) {
    const player = gameState.players.find(p => p.id === playerId);
    if (!player) return;

    player.role = newRole;

    addLog(`Đã chuyển chức năng của ${player.name} thành ${ROLES_DEFINITION[newRole].name}`);
    renderAssignTable();
    renderPlayerSidebarList();
};

function renderPlayerSidebarList() {
    const listContainer = document.getElementById('player-list');
    listContainer.innerHTML = '';

    document.getElementById('player-count').innerText = gameState.players.length;

    if (gameState.players.length === 0) {
        listContainer.innerHTML = `
            <div class="empty-state">
                <i data-lucide="user-plus"></i>
                <p>Chưa có người chơi nào. Hãy nhập tên ở phần cấu hình.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    let wolvesAlive = 0;
    let villagersAlive = 0;

    gameState.players.forEach(p => {
        let roleDef = null;
        if (p.role) {
            roleDef = ROLES_DEFINITION[p.role];
        }

        if (p.isAlive) {
            if (roleDef && roleDef.team === 'wolf') {
                wolvesAlive++;
            } else {
                villagersAlive++;
            }
        }

        const card = document.createElement('div');
        card.className = `player-card ${p.isAlive ? '' : 'dead'}`;

        let badgesHtml = '';
        if (gameState.currentPhase !== 'setup' && roleDef) {
            badgesHtml += `<span class="badge badge-role" style="background: rgba(${hexToRgb(roleDef.color)}, 0.15); color: ${roleDef.color}">${roleDef.name}</span>`;
        }

        if (p.isAlive) {
            badgesHtml += `<span class="badge badge-status">Sống</span>`;
        } else {
            badgesHtml += `<span class="badge badge-status dead">Chết</span>`;
        }

        if (p.isCouple) {
            badgesHtml += `<span class="badge badge-effect" style="background: rgba(236,72,153,0.15); color: #ec4899; border-color: rgba(236,72,153,0.3)">❤️ Couple</span>`;
        }
        if (p.isProtected) {
            badgesHtml += `<span class="badge badge-effect" style="background: rgba(16,185,129,0.15); color: #10b981; border-color: rgba(16,185,129,0.3)">🛡️ Bảo Vệ</span>`;
        }

        card.innerHTML = `
            <div class="player-info">
                <span class="player-name">${p.name}</span>
                <div class="player-badges">
                    ${badgesHtml}
                </div>
            </div>
            ${p.isAlive ? `
                <div class="player-actions">
                    <button class="btn btn-secondary btn-sm" onclick="togglePlayerNotes('${p.id}')" title="Ghi chú nhanh">
                        <i data-lucide="edit-3" style="width:12px; height:12px"></i>
                    </button>
                </div>
            ` : ''}
        `;

        if (p.notes) {
            const notesDiv = document.createElement('div');
            notesDiv.className = 'text-muted mt-1';
            notesDiv.style.fontSize = '0.75rem';
            notesDiv.style.paddingLeft = '12px';
            notesDiv.style.borderLeft = '2px dashed var(--panel-border)';
            notesDiv.innerText = `Note: ${p.notes}`;
            card.appendChild(notesDiv);
        }

        listContainer.appendChild(card);
    });

    document.getElementById('wolf-alive-count').innerText = wolvesAlive;
    document.getElementById('villager-alive-count').innerText = villagersAlive;

    lucide.createIcons();
}

window.togglePlayerNotes = function (playerId) {
    const player = gameState.players.find(p => p.id === playerId);
    if (!player) return;

    const newNote = prompt(`Nhập ghi chú cho ${player.name}:`, player.notes || '');
    if (newNote !== null) {
        player.notes = newNote.trim();
        renderPlayerSidebarList();
    }
};

function showPhase(phaseId) {
    document.querySelectorAll('.game-phase').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(phaseId).classList.add('active');

    if (phaseId === 'phase-setup') gameState.currentPhase = 'setup';
    if (phaseId === 'phase-assign') gameState.currentPhase = 'assign';
    if (phaseId === 'phase-night') gameState.currentPhase = 'night';
    if (phaseId === 'phase-day') gameState.currentPhase = 'day';

    const appContainer = document.querySelector('.app-container');
    if (appContainer) {
        // Chỉ khi thực sự vào ván chơi (Đêm hoặc Ngày) mới bật class game-active
        if (phaseId === 'phase-night' || phaseId === 'phase-day') {
            appContainer.classList.add('game-active');
        } else {
            appContainer.classList.remove('game-active');
        }
    }

    renderPlayerSidebarList();
    persistCurrentState();
}

function startGame() {
    if (gameState.players.some(p => p.role === 'unassigned' || !p.role)) {
        alert("Vui lòng gán chức năng cho tất cả người chơi trước khi bắt đầu!");
        return;
    }

    gameState.nightNumber = 0;
    gameState.dayNumber = 0;
    gameState.witchHasSave = true;
    gameState.witchHasPoison = true;
    gameState.cupidActionDone = false;
    gameState.elderKilledByVillagers = false;

    gameState.players.forEach(p => {
        p.isAlive = true;
        p.isProtected = false;
        p.lastProtectedTargetId = null;
        p.isCouple = false;
        p.notes = '';
        p.idolId = null;
    });

    addLog("=== TRÒ CHƠI CHÍNH THỨC BẮT ĐẦU ===");
    startNightPhase();
}

let activeNightStepRole = null;

function startNightPhase() {
    saveGameState();
    gameState.nightNumber++;
    gameState.currentPhase = 'night';
    showPhase('phase-night');
    document.getElementById('night-number').innerText = gameState.nightNumber;

    addLog(`--- Bắt đầu Đêm thứ ${gameState.nightNumber} ---`, 'night');

    gameState.nightActions = {
        cupidTargets: [],
        guardTarget: null,
        wolfTarget: null,
        bigBadWolfTarget: null,
        whiteWolfTarget: null,
        witchSaveUsed: false,
        witchPoisonTarget: null,
        seerTarget: null,
        apprenticeSeerTarget: null,
        foxTargets: [],
        piperTargets: []
    };

    gameState.players.forEach(p => {
        p.isProtected = false;
    });

    buildNightChecklist();
}

function buildNightChecklist() {
    const listContainer = document.getElementById('night-steps-list');
    listContainer.innerHTML = '';

    let isFirstStep = true;
    activeNightStepRole = null;

    const currentOrder = getNightOrder();

    currentOrder.forEach(roleKey => {
        if (roleKey === 'cupid' && gameState.nightNumber > 1) return;
        if (roleKey === 'wild_child' && gameState.nightNumber > 1) return;
        if (roleKey === 'white_wolf' && gameState.nightNumber % 2 !== 0) return;
        if (roleKey === 'elder_confirm' && gameState.nightNumber > 1) return;

        if (roleKey === 'apprentice_seer') {
            const seerDead = !gameState.players.some(p => p.role === 'seer' && p.isAlive);
            if (!seerDead) return;
        }

        let isRoleInGame = false;
        let isRoleAlive = false;

        if (roleKey === 'wolf') {
            const wolfRoles = ['wolf', 'wolf_cub', 'big_bad_wolf', 'white_wolf'];
            isRoleInGame = gameState.players.some(p => wolfRoles.includes(p.role));
            isRoleAlive = gameState.players.some(p => wolfRoles.includes(p.role) && p.isAlive);
        } else if (roleKey === 'elder_confirm') {
            isRoleInGame = gameState.players.some(p => p.role === 'elder');
            isRoleAlive = gameState.players.some(p => p.role === 'elder' && p.isAlive);
        } else {
            isRoleInGame = gameState.players.some(p => p.role === roleKey);
            isRoleAlive = gameState.players.some(p => p.role === roleKey && p.isAlive);
        }

        if (!isRoleInGame) return;

        const stepBtn = document.createElement('button');
        stepBtn.className = 'night-step-btn';
        stepBtn.id = `step-btn-${roleKey}`;

        let roleDef = ROLES_DEFINITION[roleKey];
        if (roleKey === 'elder_confirm') {
            roleDef = ROLES_DEFINITION['elder'];
        }

        let statusIcon = '<i data-lucide="circle" class="text-muted"></i>';
        if (!isRoleAlive) {
            statusIcon = '<i data-lucide="skull" class="text-danger"></i> (Đã chết)';
        }

        stepBtn.innerHTML = `
            <div class="night-step-info">
                <i data-lucide="${roleDef.icon}" style="color: ${roleDef.color}"></i>
                <span>Gặp ${roleDef.name}</span>
            </div>
            <div class="step-status">${statusIcon}</div>
        `;

        stepBtn.addEventListener('click', () => selectNightStep(roleKey));
        if (isFirstStep) {
            isFirstStep = false;
            setTimeout(() => selectNightStep(roleKey), 50);
        }

        listContainer.appendChild(stepBtn);
    });

    if (isFirstStep) {
        document.getElementById('night-action-workspace').innerHTML = `
            <div class="empty-action-state text-center">
                <i data-lucide="moon" class="text-indigo"></i>
                <p>Không có chức năng đặc biệt nào hoạt động đêm nay.<br>Hãy bấm "Bình Minh Thức Giấc" để qua ngày.</p>
            </div>
        `;
        lucide.createIcons();
    }

    lucide.createIcons();
}

function selectNightStep(roleKey) {
    activeNightStepRole = roleKey;

    document.querySelectorAll('.night-step-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`step-btn-${roleKey}`);
    if (activeBtn) activeBtn.classList.add('active');

    const workspace = document.getElementById('night-action-workspace');

    let roleDef = ROLES_DEFINITION[roleKey];
    if (roleKey === 'elder_confirm') {
        roleDef = ROLES_DEFINITION['elder'];
    }

    // Hiển thị script (ngay cả khi chức năng đã chết)
    const scriptQuote = document.getElementById('script-main-quote');
    const scriptNote = document.getElementById('script-note');
    if (scriptQuote && MODERATOR_SCRIPTS[gameState.ruleMode]) {
        const scripts = MODERATOR_SCRIPTS[gameState.ruleMode][roleKey];
        if (scripts) {
            scriptQuote.innerText = scripts.night;
            scriptNote.innerHTML = scripts.note ? `<i data-lucide="info" style="width:14px; height:14px; display:inline-block; vertical-align:middle; margin-right:4px;"></i> ${scripts.note}` : '';
        } else {
            scriptQuote.innerText = `Lượt của ${roleDef.name}`;
            scriptNote.innerHTML = '';
        }
        lucide.createIcons();
    }

    let isRoleAlive = false;
    if (roleKey === 'wolf') {
        const wolfRoles = ['wolf', 'wolf_cub', 'big_bad_wolf', 'white_wolf'];
        isRoleAlive = gameState.players.some(p => wolfRoles.includes(p.role) && p.isAlive);
    } else if (roleKey === 'elder_confirm') {
        isRoleAlive = gameState.players.some(p => p.role === 'elder' && p.isAlive);
    } else {
        isRoleAlive = gameState.players.some(p => p.role === roleKey && p.isAlive);
    }

    if (!isRoleAlive) {
        workspace.innerHTML = `
            <div class="action-form-title">
                <i data-lucide="${roleDef.icon}" style="color: ${roleDef.color}"></i>
                <span>Lượt của ${roleDef.name}</span>
            </div>
            <p class="action-description">${roleDef.desc}</p>
            <div class="glass-panel-nested p-3 mt-3 text-center border-warning">
                <i data-lucide="ghost" class="text-warning mb-2" style="width:32px; height:32px;"></i>
                <p class="text-warning font-weight-bold">Chức năng này đã chết!</p>
                <p class="text-muted" style="font-size: 0.9rem;">(Hãy đọc lời Quản trò giả vờ thao tác vài giây để người chơi khác không nghi ngờ, sau đó bấm Bỏ qua)</p>
            </div>
            <div class="mt-4">
                <button class="btn btn-secondary w-100" onclick="confirmGenericAction('${roleKey}')">Tiếp tục (Bỏ qua)</button>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    const disabledByElder = gameState.elderKilledByVillagers && ['guard', 'seer', 'witch', 'apprentice_seer', 'fox'].includes(roleKey);
    const anyWolfDied = gameState.players.some(p => ['wolf', 'wolf_cub', 'big_bad_wolf', 'white_wolf'].includes(p.role) && !p.isAlive);
    const bigBadWolfDisabled = roleKey === 'big_bad_wolf' && anyWolfDied;

    if (disabledByElder || bigBadWolfDisabled) {
        let msg = disabledByElder ? 'Chức năng đã bị vô hiệu hóa do Già Làng bị giết bởi dân làng!' : 'Sói Đầu Đàn không được cắn thêm vì đã có Sói chết.';
        workspace.innerHTML = `
            <div class="action-form-title">
                <i data-lucide="${roleDef.icon}" style="color: ${roleDef.color}"></i>
                <span>Lượt của ${roleDef.name}</span>
            </div>
            <p class="action-description">${roleDef.desc}</p>
            <div class="glass-panel-nested p-3 mt-3 text-center border-danger">
                <i data-lucide="alert-triangle" class="text-danger mb-2" style="width:32px; height:32px;"></i>
                <p class="text-danger font-weight-bold">${msg}</p>
            </div>
            <div class="mt-4">
                <button class="btn btn-secondary w-100" onclick="confirmGenericAction('${roleKey}')">Tiếp tục (Bỏ qua)</button>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    workspace.innerHTML = `
        <div class="action-form-title">
            <i data-lucide="${roleDef.icon}" style="color: ${roleDef.color}"></i>
            <span>Lượt của ${roleDef.name}</span>
        </div>
        <p class="action-description">${roleDef.desc}</p>
        <div id="night-action-inputs" class="mt-3">
            <!-- Nội dung nhập liệu chi tiết sẽ do từng hàm quyết định -->
        </div>
    `;

    if (roleKey === 'thief') renderThiefWorkspace();
    else if (roleKey === 'cupid') renderCupidWorkspace();
    else if (roleKey === 'guard') renderGuardWorkspace();
    else if (roleKey === 'wolf') renderWolfWorkspace();
    else if (roleKey === 'big_bad_wolf') renderBigBadWolfWorkspace();
    else if (roleKey === 'white_wolf') renderWhiteWolfWorkspace();
    else if (roleKey === 'witch') renderWitchWorkspace();
    else if (roleKey === 'seer') renderSeerWorkspace();
    else if (roleKey === 'apprentice_seer') renderApprenticeSeerWorkspace();
    else if (roleKey === 'fox') renderFoxWorkspace();
    else if (roleKey === 'piper') renderPiperWorkspace();
    else if (roleKey === 'wild_child') renderWildChildWorkspace();
    else renderGenericWorkspace(roleKey);

    lucide.createIcons();
}

function markStepCompleted(roleKey) {
    const btn = document.getElementById(`step-btn-${roleKey}`);
    if (btn) {
        btn.classList.add('completed');
        const statusEl = btn.querySelector('.step-status');
        if (statusEl) {
            statusEl.innerHTML = '<i data-lucide="check-circle-2" class="text-success"></i>';
            lucide.createIcons();
        }
    }
}

// 0. Ăn Trộm Workspace
function renderThiefWorkspace() {
    const container = document.getElementById('night-action-inputs');
    container.innerHTML = `
        <p class="subtitle mb-2">Đêm đầu tiên: Ăn Trộm thức dậy và quyết định đổi thẻ bài (nếu có 2 lá dư).</p>
        <div class="glass-panel-nested p-3 mb-3 text-center">
            <i data-lucide="eye" class="text-warning mb-2" style="width:32px; height:32px;"></i>
            <p>Quản trò: <strong>"Bạn có muốn đổi lấy 1 trong 2 lá dư không?"</strong><br>
            Nếu có 2 lá Ma Sói, Ăn Trộm BẮT BUỘC phải đổi.</p>
        </div>
        <button class="btn btn-success w-100 mt-2" onclick="confirmThiefAction()">
            <i data-lucide="check"></i> Đã nhận diện / Đổi xong
        </button>
    `;
    lucide.createIcons();
}

window.confirmThiefAction = function () {
    addLog(`Ăn Trộm đã hoàn tất lượt đêm đầu tiên.`, 'success');
    markStepCompleted('thief');
    goToNextActiveStep('thief');
};

// 1. Cupid Workspace
function renderCupidWorkspace() {
    const container = document.getElementById('night-action-inputs');

    let optionsHtml = '<div class="action-options-grid">';
    gameState.players.forEach(p => {
        const isSelected = gameState.nightActions.cupidTargets.includes(p.id);
        optionsHtml += `
            <div class="target-select-card ${isSelected ? 'selected-positive' : ''}" onclick="toggleCupidTarget('${p.id}')">
                <span class="target-name">${p.name}</span>
                <span class="target-subtext">${isSelected ? 'Được chọn' : 'Ghép đôi'}</span>
            </div>
        `;
    });
    optionsHtml += '</div>';

    container.innerHTML = `
        <p class="subtitle mb-2">Hãy chọn 2 người chơi để ghép đôi:</p>
        ${optionsHtml}
        <button class="btn btn-success mt-2" onclick="confirmCupidAction()" ${gameState.nightActions.cupidTargets.length !== 2 ? 'disabled' : ''}>
            <i data-lucide="heart"></i> Xác nhận ghép đôi
        </button>
    `;
}

window.toggleCupidTarget = function (playerId) {
    const targets = gameState.nightActions.cupidTargets;
    const idx = targets.indexOf(playerId);

    if (idx > -1) {
        targets.splice(idx, 1);
    } else {
        if (targets.length < 2) {
            targets.push(playerId);
        } else {
            targets[1] = playerId;
        }
    }
    renderCupidWorkspace();
    lucide.createIcons();
};

window.confirmCupidAction = function () {
    const targets = gameState.nightActions.cupidTargets;
    if (targets.length === 2) {
        const p1 = gameState.players.find(p => p.id === targets[0]);
        const p2 = gameState.players.find(p => p.id === targets[1]);

        p1.isCouple = true;
        p2.isCouple = true;

        addLog(`Cupid đã ghép đôi thành công [${p1.name}] và [${p2.name}]`, 'success');
        markStepCompleted('cupid');
        goToNextActiveStep('cupid');
    }
};

// 2. Bảo Vệ Workspace
function renderGuardWorkspace() {
    const container = document.getElementById('night-action-inputs');
    const guardPlayer = gameState.players.find(p => p.role === 'guard');
    const lastProtectedId = guardPlayer ? guardPlayer.lastProtectedTargetId : null;

    let optionsHtml = '<div class="action-options-grid">';
    gameState.players.forEach(p => {
        if (!p.isAlive) return;

        const isLastProtected = p.id === lastProtectedId;
        const isSelected = gameState.nightActions.guardTarget === p.id;

        optionsHtml += `
            <div class="target-select-card ${isSelected ? 'selected-positive' : ''} ${isLastProtected ? 'disabled' : ''}" 
                 onclick="selectGuardTarget('${p.id}')">
                <span class="target-name">${p.name}</span>
                <span class="target-subtext">${isLastProtected ? 'Lượt trước đã bảo vệ' : (isSelected ? 'Bảo vệ' : 'Chọn')}</span>
            </div>
        `;
    });
    optionsHtml += '</div>';

    container.innerHTML = `
        <p class="subtitle mb-2">Chọn 1 người chơi để bảo vệ đêm nay (Không thể trùng người của đêm trước):</p>
        ${optionsHtml}
        <div class="mt-2">
            <button class="btn btn-success" onclick="confirmGuardAction()" ${!gameState.nightActions.guardTarget ? 'disabled' : ''}>
                <i data-lucide="shield"></i> Xác nhận bảo vệ
            </button>
            <button class="btn btn-secondary" onclick="skipGuardAction()">Không bảo vệ ai</button>
        </div>
    `;
}

window.selectGuardTarget = function (playerId) {
    gameState.nightActions.guardTarget = playerId;
    renderGuardWorkspace();
    lucide.createIcons();
};

window.confirmGuardAction = function () {
    const targetId = gameState.nightActions.guardTarget;
    const target = gameState.players.find(p => p.id === targetId);
    const guardPlayer = gameState.players.find(p => p.role === 'guard');

    if (target && guardPlayer) {
        guardPlayer.lastProtectedTargetId = targetId;
        target.isProtected = true;

        addLog(`Bảo vệ đã chọn bảo vệ [${target.name}]`, 'success');
        markStepCompleted('guard');
        goToNextActiveStep('guard');
    }
};

window.skipGuardAction = function () {
    const guardPlayer = gameState.players.find(p => p.role === 'guard');
    if (guardPlayer) {
        guardPlayer.lastProtectedTargetId = null;
    }
    gameState.nightActions.guardTarget = null;
    addLog(`Bảo vệ không chọn mục tiêu nào đêm nay.`, 'info');
    markStepCompleted('guard');
    goToNextActiveStep('guard');
};

// 3. Ma Sói Workspace
function renderWolfWorkspace() {
    const container = document.getElementById('night-action-inputs');

    let optionsHtml = '<div class="action-options-grid">';
    gameState.players.forEach(p => {
        if (!p.isAlive) return;

        const isSelected = gameState.nightActions.wolfTarget === p.id;

        optionsHtml += `
            <div class="target-select-card ${isSelected ? 'selected' : ''}" onclick="selectWolfTarget('${p.id}')">
                <span class="target-name">${p.name}</span>
                <span class="target-subtext">${isSelected ? 'Bị cắn 🩸' : 'Chọn cắn'}</span>
            </div>
        `;
    });
    optionsHtml += '</div>';

    container.innerHTML = `
        <p class="subtitle mb-2">Thống nhất và chọn 1 người bị Ma Sói cắn:</p>
        ${optionsHtml}
        <button class="btn btn-danger mt-2" onclick="confirmWolfAction()" ${!gameState.nightActions.wolfTarget ? 'disabled' : ''}>
            <i data-lucide="skull"></i> Xác nhận cắn
        </button>
    `;
}

window.selectWolfTarget = function (playerId) {
    gameState.nightActions.wolfTarget = playerId;
    renderWolfWorkspace();
    lucide.createIcons();
};

window.confirmWolfAction = function () {
    const targetId = gameState.nightActions.wolfTarget;
    const target = gameState.players.find(p => p.id === targetId);
    if (target) {
        addLog(`Ma Sói thống nhất cắn [${target.name}]`, 'kill');
        markStepCompleted('wolf');
        goToNextActiveStep('wolf');
    }
};

// 3b. Sói Điên Workspace
function renderBigBadWolfWorkspace() {
    const container = document.getElementById('night-action-inputs');

    let optionsHtml = '<div class="action-options-grid">';
    gameState.players.forEach(p => {
        if (!p.isAlive) return;
        const isSelected = gameState.nightActions.bigBadWolfTarget === p.id;
        optionsHtml += `
            <div class="target-select-card ${isSelected ? 'selected' : ''}" onclick="selectBigBadWolfTarget('${p.id}')">
                <span class="target-name">${p.name}</span>
                <span class="target-subtext">${isSelected ? 'Cắn thêm 🩸' : 'Chọn cắn'}</span>
            </div>
        `;
    });
    optionsHtml += '</div>';

    container.innerHTML = `
        <p class="subtitle mb-2">Sói Điên chọn cắn thêm 1 mục tiêu khác (Lưu ý: Chỉ được cắn nếu chưa có Sói nào chết):</p>
        ${optionsHtml}
        <div class="mt-2">
            <button class="btn btn-danger" onclick="confirmBigBadWolfAction()" ${!gameState.nightActions.bigBadWolfTarget ? 'disabled' : ''}>
                Xác nhận cắn thêm
            </button>
            <button class="btn btn-secondary" onclick="skipBigBadWolfAction()">Không cắn thêm ai</button>
        </div>
    `;
}

window.selectBigBadWolfTarget = function (playerId) {
    gameState.nightActions.bigBadWolfTarget = playerId;
    renderBigBadWolfWorkspace();
    lucide.createIcons();
};

window.confirmBigBadWolfAction = function () {
    const target = gameState.players.find(p => p.id === gameState.nightActions.bigBadWolfTarget);
    if (target) {
        addLog(`Sói Điên cắn [${target.name}]`, 'kill');
        markStepCompleted('big_bad_wolf');
        goToNextActiveStep('big_bad_wolf');
    }
};

window.skipBigBadWolfAction = function () {
    gameState.nightActions.bigBadWolfTarget = null;
    addLog(`Sói Điên không cắn thêm ai đêm nay.`, 'info');
    markStepCompleted('big_bad_wolf');
    goToNextActiveStep('big_bad_wolf');
};

// 3c. Sói Trắng Workspace
function renderWhiteWolfWorkspace() {
    const container = document.getElementById('night-action-inputs');

    let optionsHtml = '<div class="action-options-grid">';
    gameState.players.forEach(p => {
        if (!p.isAlive) return;
        const isSelected = gameState.nightActions.whiteWolfTarget === p.id;
        const isWolf = ROLES_DEFINITION[p.role]?.team === 'wolf';

        optionsHtml += `
            <div class="target-select-card ${isSelected ? 'selected' : ''} ${!isWolf ? 'disabled' : ''}" onclick="selectWhiteWolfTarget('${p.id}')">
                <span class="target-name">${p.name}</span>
                <span class="target-subtext">${isWolf ? (isSelected ? 'Cắn Sói 🩸' : 'Là Sói') : 'Không phải Sói'}</span>
            </div>
        `;
    });
    optionsHtml += '</div>';

    container.innerHTML = `
        <p class="subtitle mb-2">Sói Trắng chọn cắn 1 Ma Sói khác để độc chiếm quyền lực:</p>
        ${optionsHtml}
        <div class="mt-2">
            <button class="btn btn-danger" onclick="confirmWhiteWolfAction()" ${!gameState.nightActions.whiteWolfTarget ? 'disabled' : ''}>
                Xác nhận cắn Ma Sói
            </button>
            <button class="btn btn-secondary" onclick="skipWhiteWolfAction()">Không cắn Sói nào</button>
        </div>
    `;
}

window.selectWhiteWolfTarget = function (playerId) {
    gameState.nightActions.whiteWolfTarget = playerId;
    renderWhiteWolfWorkspace();
    lucide.createIcons();
};

window.confirmWhiteWolfAction = function () {
    const target = gameState.players.find(p => p.id === gameState.nightActions.whiteWolfTarget);
    if (target) {
        addLog(`Sói Trắng cắn Ma Sói [${target.name}]`, 'kill');
        markStepCompleted('white_wolf');
        goToNextActiveStep('white_wolf');
    }
};

window.skipWhiteWolfAction = function () {
    gameState.nightActions.whiteWolfTarget = null;
    addLog(`Sói Trắng không cắn Sói nào đêm nay.`, 'info');
    markStepCompleted('white_wolf');
    goToNextActiveStep('white_wolf');
};

// 4. Phù Thủy Workspace
function renderWitchWorkspace() {
    const container = document.getElementById('night-action-inputs');
    const victimId = gameState.nightActions.wolfTarget;
    const victim = gameState.players.find(p => p.id === victimId);

    const victimText = victim ? `<span class="text-danger font-weight-bold">[${victim.name}]</span>` : '<span class="text-muted">Không có ai</span>';
    const savePotionStatus = gameState.witchHasSave ? '<span class="text-success">CÒN</span>' : '<span class="text-danger">ĐÃ DÙNG</span>';
    const poisonPotionStatus = gameState.witchHasPoison ? '<span class="text-success">CÒN</span>' : '<span class="text-danger">ĐÃ DÙNG</span>';

    let optionsHtml = '<div class="action-options-grid">';
    gameState.players.forEach(p => {
        if (!p.isAlive) return;

        const isSelected = gameState.nightActions.witchPoisonTarget === p.id;
        const isDisabled = !gameState.witchHasPoison;

        optionsHtml += `
            <div class="target-select-card ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}" 
                 onclick="selectWitchPoisonTarget('${p.id}')">
                <span class="target-name">${p.name}</span>
                <span class="target-subtext">${isSelected ? 'Độc dược 🧪' : 'Đầu độc'}</span>
            </div>
        `;
    });
    optionsHtml += '</div>';

    container.innerHTML = `
        <div class="glass-panel-nested mb-3">
            <h4 class="text-indigo">Thông tin ban đêm dành riêng cho Phù Thủy:</h4>
            <p class="mt-2">Nạn nhân của Ma Sói đêm nay: ${victimText}</p>
            <div class="flex-between mt-2" style="font-size: 0.85rem">
                <span>Bình cứu sinh: ${savePotionStatus}</span>
                <span>Bình độc dược: ${poisonPotionStatus}</span>
            </div>
        </div>
        
        <div class="mb-3">
            <label class="form-label" style="font-weight:600; display:block; margin-bottom: 6px;">1. Sử dụng Bình Cứu sinh?</label>
            <div class="quick-btn-group">
                <button class="btn ${gameState.nightActions.witchSaveUsed ? 'btn-success' : 'btn-secondary'} btn-sm" 
                        onclick="toggleWitchSave(true)" ${!gameState.witchHasSave || !victim ? 'disabled' : ''}>
                    Cứu nạn nhân
                </button>
                <button class="btn ${!gameState.nightActions.witchSaveUsed ? 'btn-danger' : 'btn-secondary'} btn-sm" 
                        onclick="toggleWitchSave(false)">
                    Không cứu
                </button>
            </div>
        </div>
        
        <div class="mb-3">
            <label class="form-label" style="font-weight:600; display:block; margin-bottom: 6px;">2. Sử dụng Bình Độc dược lên ai?</label>
            ${optionsHtml}
            ${gameState.nightActions.witchPoisonTarget ? `
                <button class="btn btn-secondary btn-sm mt-1" onclick="selectWitchPoisonTarget(null)">Hủy chọn độc dược</button>
            ` : ''}
        </div>
        
        <button class="btn btn-success mt-2" onclick="confirmWitchAction()">
            <i data-lucide="check"></i> Xác nhận lượt Phù Thủy
        </button>
    `;

    lucide.createIcons();
}

window.toggleWitchSave = function (shouldSave) {
    gameState.nightActions.witchSaveUsed = shouldSave;
    renderWitchWorkspace();
};

window.selectWitchPoisonTarget = function (playerId) {
    if (!gameState.witchHasPoison) return;

    if (gameState.nightActions.witchPoisonTarget === playerId) {
        gameState.nightActions.witchPoisonTarget = null;
    } else {
        gameState.nightActions.witchPoisonTarget = playerId;
    }
    renderWitchWorkspace();
};

window.confirmWitchAction = function () {
    if (gameState.nightActions.witchSaveUsed) {
        gameState.witchHasSave = false;
        addLog(`Phù Thủy đã dùng bình Cứu sinh để hồi sinh nạn nhân.`, 'success');
    }

    if (gameState.nightActions.witchPoisonTarget) {
        gameState.witchHasPoison = false;
        const target = gameState.players.find(p => p.id === gameState.nightActions.witchPoisonTarget);
        addLog(`Phù Thủy đã dùng bình Độc dược lên [${target ? target.name : 'không rõ'}]`, 'kill');
    }

    markStepCompleted('witch');
    goToNextActiveStep('witch');
};

// 5. Tiên Tri Workspace
function renderSeerWorkspace() {
    const container = document.getElementById('night-action-inputs');

    let optionsHtml = '<div class="action-options-grid">';
    gameState.players.forEach(p => {
        if (!p.isAlive) return;

        const isSelected = gameState.nightActions.seerTarget === p.id;

        optionsHtml += `
            <div class="target-select-card ${isSelected ? 'selected-neutral' : ''}" onclick="selectSeerTarget('${p.id}')">
                <span class="target-name">${p.name}</span>
                <span class="target-subtext">${isSelected ? 'Chọn soi 🔮' : 'Soi bài'}</span>
            </div>
        `;
    });
    optionsHtml += '</div>';

    let resultBoxHtml = '';
    if (gameState.nightActions.seerTarget) {
        const target = gameState.players.find(p => p.id === gameState.nightActions.seerTarget);
        if (target) {
            const isLycan = target.role === 'lycan';
            const isWolf = ROLES_DEFINITION[target.role]?.team === 'wolf' || isLycan;
            const resultText = isWolf ? 'LÀ MA SÓI! 🩸' : 'LÀ NGƯỜI TỐT! 🛡️';
            const resultClass = isWolf ? 'text-danger' : 'text-success';

            resultBoxHtml = `
                <div class="glass-panel-nested mt-3 text-center" style="border-color: ${isWolf ? 'var(--color-danger)' : 'var(--color-success)'}">
                    <span style="font-size: 0.9rem">Kết quả soi [${target.name}] ${isLycan ? '(Người Sói Bị Nguyền)' : ''}:</span>
                    <h4 class="${resultClass} mt-1" style="font-size: 1.2rem; font-weight:700">${resultText}</h4>
                </div>
            `;
        }
    }

    container.innerHTML = `
        <p class="subtitle mb-2">Chọn 1 người chơi để Tiên Tri soi bài:</p>
        ${optionsHtml}
        ${resultBoxHtml}
        <button class="btn btn-success mt-3" onclick="confirmSeerAction()" ${!gameState.nightActions.seerTarget ? 'disabled' : ''}>
            <i data-lucide="eye"></i> Hoàn tất soi bài
        </button>
    `;

    lucide.createIcons();
}

window.selectSeerTarget = function (playerId) {
    gameState.nightActions.seerTarget = playerId;
    renderSeerWorkspace();
    lucide.createIcons();
};

window.confirmSeerAction = function () {
    const target = gameState.players.find(p => p.id === gameState.nightActions.seerTarget);
    if (target) {
        const isWolf = ROLES_DEFINITION[target.role]?.team === 'wolf' || target.role === 'lycan';
        addLog(`Tiên Tri đã soi bài [${target.name}] (Kết quả: ${isWolf ? 'Sói' : 'Dân Làng'})`, 'success');
        markStepCompleted('seer');
        goToNextActiveStep('seer');
    }
};

// 6. Hồ Ly Workspace
function renderFoxWorkspace() {
    const container = document.getElementById('night-action-inputs');

    let optionsHtml = '<div class="action-options-grid">';
    gameState.players.forEach(p => {
        if (!p.isAlive) return;
        const isSelected = gameState.nightActions.foxTargets.includes(p.id);

        optionsHtml += `
            <div class="target-select-card ${isSelected ? 'selected-neutral' : ''}" onclick="toggleFoxTarget('${p.id}')">
                <span class="target-name">${p.name}</span>
                <span class="target-subtext">${isSelected ? 'Được soi 🔮' : 'Chọn soi'}</span>
            </div>
        `;
    });
    optionsHtml += '</div>';

    let resultBoxHtml = '';
    if (gameState.nightActions.foxTargets.length === 3) {
        const hasWolf = gameState.nightActions.foxTargets.some(id => {
            const p = gameState.players.find(x => x.id === id);
            return p && ROLES_DEFINITION[p.role]?.team === 'wolf';
        });

        const resultText = hasWolf ? 'CÓ ÍT NHẤT 1 SÓI! 🩸' : 'KHÔNG CÓ CON SÓI NÀO! 🛡️ (Hồ ly mất chức năng)';
        const resultClass = hasWolf ? 'text-danger' : 'text-success';

        resultBoxHtml = `
            <div class="glass-panel-nested mt-3 text-center" style="border-color: ${hasWolf ? 'var(--color-danger)' : 'var(--color-success)'}">
                <span style="font-size: 0.9rem">Kết quả soi của Hồ Ly:</span>
                <h4 class="${resultClass} mt-1" style="font-size: 1.1rem; font-weight:700">${resultText}</h4>
            </div>
        `;
    }

    container.innerHTML = `
        <p class="subtitle mb-2">Hồ Ly chọn soi 3 người chơi cùng lúc:</p>
        ${optionsHtml}
        ${resultBoxHtml}
        <button class="btn btn-success mt-3" onclick="confirmFoxAction()" ${gameState.nightActions.foxTargets.length !== 3 ? 'disabled' : ''}>
            Xác nhận soi Hồ Ly
        </button>
    `;
}

window.toggleFoxTarget = function (playerId) {
    const targets = gameState.nightActions.foxTargets;
    const idx = targets.indexOf(playerId);

    if (idx > -1) {
        targets.splice(idx, 1);
    } else {
        if (targets.length < 3) {
            targets.push(playerId);
        } else {
            targets[2] = playerId;
        }
    }
    renderFoxWorkspace();
    lucide.createIcons();
};

window.confirmFoxAction = function () {
    const targets = gameState.nightActions.foxTargets;
    if (targets.length === 3) {
        const names = targets.map(id => gameState.players.find(x => x.id === id)?.name).join(', ');
        addLog(`Hồ Ly đã soi nhóm: [${names}]`, 'success');
        markStepCompleted('fox');
        goToNextActiveStep('fox');
    }
};

// 7. Người Thổi Sáo Workspace
function renderPiperWorkspace() {
    const container = document.getElementById('night-action-inputs');

    let optionsHtml = '<div class="action-options-grid">';
    gameState.players.forEach(p => {
        if (!p.isAlive) return;
        const isSelected = gameState.nightActions.piperTargets.includes(p.id);
        optionsHtml += `
            <div class="target-select-card ${isSelected ? 'selected-positive' : ''}" onclick="togglePiperTarget('${p.id}')">
                <span class="target-name">${p.name}</span>
                <span class="target-subtext">${isSelected ? 'Thôi miên ✨' : 'Chọn'}</span>
            </div>
        `;
    });
    optionsHtml += '</div>';

    container.innerHTML = `
        <p class="subtitle mb-2">Người Thổi Sáo chọn thôi miên 2 người chơi mới đêm nay:</p>
        ${optionsHtml}
        <button class="btn btn-success mt-2" onclick="confirmPiperAction()" ${gameState.nightActions.piperTargets.length !== 2 ? 'disabled' : ''}>
            Xác nhận thôi miên
        </button>
    `;
}

window.togglePiperTarget = function (playerId) {
    const targets = gameState.nightActions.piperTargets;
    const idx = targets.indexOf(playerId);
    if (idx > -1) {
        targets.splice(idx, 1);
    } else {
        if (targets.length < 2) {
            targets.push(playerId);
        } else {
            targets[1] = playerId;
        }
    }
    renderPiperWorkspace();
    lucide.createIcons();
};

window.confirmPiperAction = function () {
    const targets = gameState.nightActions.piperTargets;
    if (targets.length === 2) {
        const p1 = gameState.players.find(x => x.id === targets[0]);
        const p2 = gameState.players.find(x => x.id === targets[1]);
        if (p1 && p2) {
            p1.isCharm = true;
            p2.isCharm = true;
            addLog(`Người Thổi Sáo đã thôi miên thành công [${p1.name}] và [${p2.name}]`, 'success');
        }
        markStepCompleted('piper');
        goToNextActiveStep('piper');
    }
};

function goToNextActiveStep(currentRole) {
    const currentOrder = getNightOrder();
    const currentIndex = currentOrder.indexOf(currentRole);
    for (let i = currentIndex + 1; i < currentOrder.length; i++) {
        const nextRole = currentOrder[i];

        let isRoleInGame = false;
        if (nextRole === 'wolf') {
            const wolfRoles = ['wolf', 'wolf_cub', 'big_bad_wolf', 'white_wolf'];
            isRoleInGame = gameState.players.some(p => wolfRoles.includes(p.role));
        } else if (nextRole === 'elder_confirm') {
            isRoleInGame = gameState.players.some(p => p.role === 'elder');
        } else {
            isRoleInGame = gameState.players.some(p => p.role === nextRole);
        }

        if (isRoleInGame) {
            setTimeout(() => selectNightStep(nextRole), 300);
            return;
        }
    }
}

function checkWildChildIdolDeath(deadPlayerId) {
    const wcPlayer = gameState.players.find(p => p.role === 'wild_child');
    if (wcPlayer && wcPlayer.idolId === deadPlayerId && wcPlayer.isAlive) {
        wcPlayer.role = 'wolf';
        addLog(`Thần Tượng đã chết! Đứa Trẻ Hoang Dã [${wcPlayer.name}] hóa điên và biến thành Ma Sói.`, 'warning');
    }
}

// --- XỬ LÝ KẾT THÚC ĐÊM & TÍNH TOÁN LOGIC CHẾT ---
function handleEndNight() {
    saveGameState();
    const deathsTonight = [];
    const logsDetails = [];

    const wolfTargetId = gameState.nightActions.wolfTarget;
    const bigBadWolfTargetId = gameState.nightActions.bigBadWolfTarget;
    const whiteWolfTargetId = gameState.nightActions.whiteWolfTarget;
    const isWitchSaved = gameState.nightActions.witchSaveUsed;
    const poisonTargetId = gameState.nightActions.witchPoisonTarget;

    // 1. Sói cắn thường
    if (wolfTargetId) {
        const victim = gameState.players.find(p => p.id === wolfTargetId);
        if (victim) {
            const isElder = victim.role === 'elder';

            if (victim.isProtected) {
                logsDetails.push(`[${victim.name}] bị Sói cắn nhưng được Bảo Vệ bảo vệ thành công.`);
            } else if (isWitchSaved) {
                logsDetails.push(`[${victim.name}] bị Sói cắn nhưng được Phù Thủy hồi sinh.`);
            } else if (isElder && !victim.elderShieldBroken) {
                victim.elderShieldBroken = true;
                logsDetails.push(`Trưởng Lão [${victim.name}] bị Sói cắn nhưng không chết do còn khiên Trưởng Lão mạng đầu.`);
            } else {
                if (victim.role === 'cursed') {
                    victim.role = 'wolf';
                    logsDetails.push(`Kẻ Bị Nguyền [${victim.name}] bị Sói cắn và đã hóa thành Ma Sói!`);
                } else {
                    deathsTonight.push(victim.id);
                    logsDetails.push(`[${victim.name}] đã bị Ma Sói cắn tử vong.`);
                }
            }
        }
    }

    // 2. Sói Điên cắn thêm
    if (bigBadWolfTargetId) {
        const victim = gameState.players.find(p => p.id === bigBadWolfTargetId);
        if (victim && !victim.isProtected && !(isWitchSaved && wolfTargetId === bigBadWolfTargetId)) {
            deathsTonight.push(victim.id);
            logsDetails.push(`[${victim.name}] bị Sói Điên cắn chết.`);
        }
    }

    // 3. Sói Trắng cắn Sói khác
    if (whiteWolfTargetId) {
        const victim = gameState.players.find(p => p.id === whiteWolfTargetId);
        if (victim && !victim.isProtected) {
            deathsTonight.push(victim.id);
            logsDetails.push(`Ma Sói [${victim.name}] bị Sói Trắng cắn nuốt.`);
        }
    }

    // 4. Phù Thủy cắn độc
    if (poisonTargetId) {
        const poisonVictim = gameState.players.find(p => p.id === poisonTargetId);
        if (poisonVictim) {
            deathsTonight.push(poisonVictim.id);
            logsDetails.push(`[${poisonVictim.name}] bị Phù Thủy đầu độc chết.`);

            if (poisonVictim.role === 'elder') {
                gameState.elderKilledByVillagers = true;
                logsDetails.push(`CẢNH BÁO: Trưởng Lão bị giết hại bởi dân làng (Phù Thủy độc), tất cả các vai trò mất chức năng đặc biệt!`);
            }
        }
    }

    // Áp dụng tử vong lần 1
    deathsTonight.forEach(id => {
        const player = gameState.players.find(p => p.id === id);
        if (player) {
            if (player.role === 'angel' && gameState.nightNumber === 1) {
                showVictoryModal('THIÊN THẦN THẮNG CUỘC! 🌟', `Thiên Thần [${player.name}] đã bị cắn ngay đêm đầu tiên và giành chiến thắng!`, 'star', '#60a5fa');
            }
            player.isAlive = false;
            checkWildChildIdolDeath(id);
        }
    });

    // 5. Cupid chết dây chuyền
    const couplePlayers = gameState.players.filter(p => p.isCouple);
    if (couplePlayers.length === 2) {
        const p1 = couplePlayers[0];
        const p2 = couplePlayers[1];

        if (!p1.isAlive && p2.isAlive) {
            p2.isAlive = false;
            deathsTonight.push(p2.id);
            logsDetails.push(`[${p2.name}] tự sát vì tình yêu (người yêu [${p1.name}] đã chết).`);
        } else if (!p2.isAlive && p1.isAlive) {
            p1.isAlive = false;
            deathsTonight.push(p1.id);
            logsDetails.push(`[${p1.name}] tự sát vì tình yêu (người yêu [${p2.name}] đã chết).`);
        }
    }

    logsDetails.forEach(msg => addLog(msg, 'kill'));
    startDayPhase(deathsTonight);
}

// --- VÒNG BAN NGÀY (DAY PHASE) ---
function startDayPhase(deathsTonight) {
    gameState.dayNumber++;
    gameState.currentPhase = 'day';
    showPhase('phase-day');
    document.getElementById('day-number').innerText = gameState.dayNumber;

    addLog(`--- Bắt đầu Ngày thứ ${gameState.dayNumber} ---`, 'day');

    const bearTamer = gameState.players.find(p => p.role === 'bear_tamer' && p.isAlive);
    if (bearTamer) {
        const idx = gameState.players.indexOf(bearTamer);
        const len = gameState.players.length;

        const leftPlayer = gameState.players[(idx - 1 + len) % len];
        const rightPlayer = gameState.players[(idx + 1) % len];

        const isLeftWolf = leftPlayer.isAlive && ROLES_DEFINITION[leftPlayer.role]?.team === 'wolf';
        const isRightWolf = rightPlayer.isAlive && ROLES_DEFINITION[rightPlayer.role]?.team === 'wolf';

        if (isLeftWolf || isRightWolf) {
            addLog(`🐾 Gấu gầm lên! Có một con sói đang ngồi kế bên Quản Thú [${bearTamer.name}].`, 'warning');
        }
    }

    const dayScriptQuote = document.getElementById('day-script-quote');
    const announcementContainer = document.getElementById('night-results-announcement');
    announcementContainer.innerHTML = '';

    if (deathsTonight.length === 0) {
        announcementContainer.innerHTML = `
            <div class="announcement-item no-death">
                <strong>Đêm qua bình yên vô sự!</strong> Không ai bị chết đêm qua.
            </div>
        `;
        if (dayScriptQuote) {
            dayScriptQuote.innerText = `"Chào buổi sáng cả làng! Đêm qua là một đêm bình yên vô sự, không có ai chết cả. Mọi người hãy bắt đầu thảo luận!"`;
        }
    } else {
        const deadNames = deathsTonight.map(id => {
            const p = gameState.players.find(x => x.id === id);
            return p ? p.name : '';
        }).join(', ');

        if (dayScriptQuote) {
            dayScriptQuote.innerText = `"Chào buổi sáng! Rất tiếc, đêm qua ${deadNames} đã bị giết. Mời những người đã chết để lại di ngôn, sau đó cả làng bắt đầu thảo luận!"`;
        }

        deathsTonight.forEach(id => {
            const player = gameState.players.find(p => p.id === id);
            if (player) {
                const roleDef = ROLES_DEFINITION[player.role] || ROLES_DEFINITION.villager;
                let extraNotice = '';
                if (player.role === 'hunter') {
                    extraNotice = ' <span class="text-warning">(Hãy gọi Thợ Săn bắn 1 người!)</span>';
                }

                announcementContainer.innerHTML += `
                    <div class="announcement-item">
                        Người chơi <strong>[${player.name}]</strong> (${roleDef.name}) đã chết đêm qua.${extraNotice}
                    </div>
                `;
            }
        });
    }

    renderHangedSelector();
    pauseTimer();
    updateTimerDisplay();

    // Check nếu có thợ săn chết đêm qua
    const deadHunter = deathsTonight.map(id => gameState.players.find(p => p.id === id)).find(p => p && p.role === 'hunter');
    if (deadHunter) {
        triggerHunterShoot(deadHunter);
    } else {
        checkWinConditions();
    }
}

function renderHangedSelector() {
    const select = document.getElementById('select-hanged-player');
    select.innerHTML = '<option value="">-- Không ai bị treo cổ --</option>';

    gameState.players.forEach(p => {
        if (p.isAlive) {
            const isIdiot = p.role === 'idiot';
            const suffix = isIdiot && p.idiotRevealed ? ' (Chàng Ngốc - Đã lộ vai)' : '';

            const option = document.createElement('option');
            option.value = p.id;
            option.innerText = p.name + suffix;
            select.appendChild(option);
        }
    });
}

function handleHangPlayer() {
    saveGameState();
    const select = document.getElementById('select-hanged-player');
    const playerId = select.value;

    if (!playerId) {
        addLog("Tòa án kết thúc: Dân làng biểu quyết không treo cổ ai.", 'info');
        return;
    }

    const target = gameState.players.find(p => p.id === playerId);
    if (target && target.isAlive) {
        if (target.role === 'jester') {
            showVictoryModal('CHÚ HỀ THẮNG CUỘC! 🎭', `Chú Hề [${target.name}] đã đánh lừa thành công cả làng treo cổ mình! Chú Hề là người duy nhất chiến thắng!`, 'gift', '#f472b6');
            return;
        }
        if (target.role === 'angel' && gameState.dayNumber === 1) {
            showVictoryModal('THIÊN THẦN THẮNG CUỘC! 🌟', `Thiên Thần [${target.name}] đã bị treo cổ vào ngày đầu tiên và giành chiến thắng!`, 'star', '#60a5fa');
            return;
        }

        if (target.role === 'idiot' && !target.idiotRevealed) {
            target.idiotRevealed = true;
            target.lostVotingRight = true;
            addLog(`Tòa án: Treo cổ [${target.name}] thất bại! Họ là Chàng Ngốc. Họ được tha bổng nhưng từ nay mất quyền biểu quyết.`, 'success');
            renderPlayerSidebarList();
            renderHangedSelector();
            return;
        }

        target.isAlive = false;
        checkWildChildIdolDeath(target.id);
        const roleDef = ROLES_DEFINITION[target.role] || ROLES_DEFINITION.villager;
        addLog(`Dân làng đã bỏ phiếu treo cổ [${target.name}] (${roleDef.name}).`, 'kill');

        if (target.role === 'elder') {
            gameState.elderKilledByVillagers = true;
            addLog(`CẢNH BÁO: Dân làng đã treo cổ Trưởng Lão [${target.name}], toàn bộ vai trò đặc biệt mất chức năng!`, 'warning');
        }

        const couplePlayers = gameState.players.filter(p => p.isCouple);
        if (couplePlayers.length === 2) {
            const p1 = couplePlayers[0];
            const p2 = couplePlayers[1];

            if (p1.id === target.id && p2.isAlive) {
                p2.isAlive = false;
                addLog(`[${p2.name}] tự sát vì tình yêu (người yêu [${p1.name}] bị treo cổ).`, 'kill');
            } else if (p2.id === target.id && p1.isAlive) {
                p1.isAlive = false;
                addLog(`[${p1.name}] tự sát vì tình yêu (người yêu [${p2.name}] bị treo cổ).`, 'kill');
            }
        }

        renderPlayerSidebarList();
        renderHangedSelector();

        if (target.role === 'hunter') {
            triggerHunterShoot(target);
        } else {
            checkWinConditions();
        }
    }
}

// --- SCRIPT PANEL TOGGLE ---
window.toggleScriptPanel = function (phase) {
    const body = document.getElementById(`script-panel-body-${phase}`);
    const chevron = document.getElementById(`script-panel-chevron-${phase}`);
    if (body) {
        body.classList.toggle('open');
        if (chevron) {
            chevron.style.transform = body.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
        }
    }
};

// --- THỢ SĂN TRẢ THÙ ---
let currentHunterId = null;

function triggerHunterShoot(hunterPlayer) {
    currentHunterId = hunterPlayer.id;
    const modal = document.getElementById('hunter-modal');
    const select = document.getElementById('select-hunter-target');

    select.innerHTML = '<option value="">-- Chọn người bị bắn --</option>';
    gameState.players.forEach(p => {
        if (p.isAlive && p.id !== hunterPlayer.id) {
            const option = document.createElement('option');
            option.value = p.id;
            option.innerText = p.name;
            select.appendChild(option);
        }
    });

    modal.classList.add('active');
}

window.confirmHunterShoot = function () {
    const select = document.getElementById('select-hunter-target');
    const targetId = select.value;

    if (!targetId) {
        alert('Vui lòng chọn người bị bắn hoặc nhấn Bỏ qua!');
        return;
    }

    const target = gameState.players.find(p => p.id === targetId);
    if (target) {
        target.isAlive = false;
        addLog(`Thợ Săn đã bắn chết [${target.name}] trước khi gục ngã!`, 'kill');

        // Nếu người bị bắn là Già Làng
        if (target.role === 'elder') {
            gameState.elderKilledByVillagers = true;
            addLog(`CẢNH BÁO: Thợ Săn đã bắn chết Trưởng Lão, toàn bộ chức năng phe dân bị vô hiệu hóa!`, 'warning');
        }

        // Couple suicide
        const couplePlayers = gameState.players.filter(p => p.isCouple);
        if (couplePlayers.length === 2) {
            const p1 = couplePlayers[0];
            const p2 = couplePlayers[1];

            if (p1.id === target.id && p2.isAlive) {
                p2.isAlive = false;
                addLog(`[${p2.name}] tự sát vì tình yêu.`, 'kill');
            } else if (p2.id === target.id && p1.isAlive) {
                p1.isAlive = false;
                addLog(`[${p1.name}] tự sát vì tình yêu.`, 'kill');
            }
        }
    }

    closeHunterModal();
    renderPlayerSidebarList();
    renderHangedSelector();
    checkWinConditions();
};

window.skipHunterShoot = function () {
    addLog(`Thợ Săn chọn không bắn ai.`, 'info');
    closeHunterModal();
    checkWinConditions();
};

function closeHunterModal() {
    currentHunterId = null;
    document.getElementById('hunter-modal').classList.remove('active');
}

// --- ĐỒNG HỒ HẸN GIỜ ---
window.setTimerDuration = function (seconds) {
    pauseTimer();
    timerSecondsRemaining = seconds;
    updateTimerDisplay();
};

function updateTimerDisplay() {
    const minutes = Math.floor(timerSecondsRemaining / 60);
    const seconds = timerSecondsRemaining % 60;
    document.getElementById('timer-display').innerText =
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (timerInterval) return;

    timerInterval = setInterval(() => {
        if (timerSecondsRemaining > 0) {
            timerSecondsRemaining--;
            updateTimerDisplay();
        } else {
            pauseTimer();
            alert("Hết giờ thảo luận! Hãy tiến hành bỏ phiếu ngay.");
            addLog("Hệ thống: Hết giờ thảo luận ban ngày.", 'warning');
        }
    }, 1000);

    document.getElementById('btn-timer-start').disabled = true;
    document.getElementById('btn-timer-pause').disabled = false;
}

function pauseTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    document.getElementById('btn-timer-start').disabled = false;
    document.getElementById('btn-timer-pause').disabled = true;
}

function resetTimer() {
    setTimerDuration(300);
}

// --- KIỂM TRA ĐIỀU KIỆN CHIẾN THẮNG ---
function checkWinConditions() {
    let wolvesAlive = 0;
    let villagersAlive = 0;
    let totalAlive = 0;
    let whiteWolvesAlive = 0;

    gameState.players.forEach(p => {
        if (p.isAlive) {
            totalAlive++;
            const roleDef = ROLES_DEFINITION[p.role] || ROLES_DEFINITION.villager;

            if (roleDef.id === 'white_wolf') {
                whiteWolvesAlive++;
            } else if (roleDef.team === 'wolf') {
                wolvesAlive++;
            } else {
                villagersAlive++;
            }
        }
    });

    const couplePlayers = gameState.players.filter(p => p.isCouple);
    let coupleIsThirdParty = false;
    if (couplePlayers.length === 2) {
        const team1 = (ROLES_DEFINITION[couplePlayers[0].role] || ROLES_DEFINITION.villager).team;
        const team2 = (ROLES_DEFINITION[couplePlayers[1].role] || ROLES_DEFINITION.villager).team;
        if (team1 !== team2) {
            coupleIsThirdParty = true;
        }
    }

    if (coupleIsThirdParty && couplePlayers.every(p => p.isAlive) && totalAlive === 2) {
        showVictoryModal('PHE CẶP ĐÔI THẮNG CUỘC! ❤️', 'Hai người yêu nhau khác phe đã xuất sắc sống sót đến cuối cùng!', 'heart', '#ec4899');
        return;
    }

    if (whiteWolvesAlive > 0 && wolvesAlive === 0 && villagersAlive === 0) {
        showVictoryModal('SÓI TRẮNG THẮNG CUỘC! 🐺', 'Sói Trắng đã tiêu diệt tất cả sói khác và dân làng để thắng cô độc!', 'trophy', '#e2e8f0');
        return;
    }

    if (wolvesAlive === 0 && whiteWolvesAlive === 0) {
        showVictoryModal('PHE DÂN LÀNG THẮNG CUỘC! 🛡️', 'Toàn bộ Ma Sói đã bị dân làng tiêu diệt.', 'trophy', '#10b981');
        return;
    }

    if (wolvesAlive >= (villagersAlive + whiteWolvesAlive)) {
        showVictoryModal('PHE MA SÓI THẮNG CUỘC! 🩸', 'Sói đã áp đảo dân làng. Đêm nay cả làng sẽ chìm trong máu.', 'skull', '#ef4444');
        return;
    }
}

function showVictoryModal(title, message, icon, color) {
    const modal = document.getElementById('victory-modal');
    const titleEl = document.getElementById('victory-title');
    const msgEl = document.getElementById('victory-message');
    const iconEl = document.getElementById('victory-icon');

    titleEl.innerText = title;
    titleEl.style.color = color;
    msgEl.innerText = message;

    iconEl.setAttribute('data-lucide', icon);
    iconEl.style.color = color;
    lucide.createIcons();

    modal.classList.add('active');
    addLog(`TRÒ CHƠI KẾT THÚC: ${title}`, 'warning');
}

function resetAllGame() {
    pauseTimer();
    gameState.ruleMode = null;

    // Xóa cache localStorage khi reset toàn bộ game
    localStorage.removeItem('werewolf_game_state');
    localStorage.removeItem('werewolf_game_state_history');

    showPhase('phase-mode-select');

    gameState.players = [];
    gameState.logs = [];
    document.getElementById('game-logs').innerHTML = `
        <div class="log-item info">
            <span class="log-time">[Hệ thống]</span> Hãy thiết lập game và thêm người chơi để bắt đầu.
        </div>
    `;

    gameState.selectedRoles = {
        cupid: 0, guard: 1, wolf: 2, witch: 1, seer: 1, hunter: 1, villager: 2,
        idiot: 0, elder: 0, lycan: 0, fox: 0, bear_tamer: 0, big_bad_wolf: 0,
        white_wolf: 0, wild_child: 0, cursed: 0, jester: 0, piper: 0, wolf_cub: 0,
        rusty_knight: 0, apprentice_seer: 0, angel: 0
    };

    const searchInput = document.getElementById('input-search-roles');
    if (searchInput) searchInput.value = '';

    gameState.showExtended = false;
    const toggleRolesBtn = document.getElementById('btn-toggle-extended-roles');
    if (toggleRolesBtn) toggleRolesBtn.innerText = 'Hiển thị thêm';

    renderSetupRoles();
    renderSetupPlayers();
    renderPlayerSidebarList();
}

function renderWildChildWorkspace() {
    const workspace = document.getElementById('night-action-workspace');
    const wcPlayer = gameState.players.find(p => p.role === 'wild_child');
    if (!wcPlayer) return;

    let html = `
        <div class="action-form-title">
            <i data-lucide="git-commit" style="color: #818cf8"></i>
            <span>Đứa Trẻ Hoang Dã chọn Thần Tượng</span>
        </div>
        <p class="mb-3 text-muted" style="font-size: 0.9rem;">Yêu cầu Đứa Trẻ Hoang Dã mở mắt và chỉ định 1 người chơi làm Thần Tượng.</p>
        <div class="target-grid">
    `;

    gameState.players.forEach(p => {
        if (!p.isAlive || p.id === wcPlayer.id) return;
        const isSelected = wcPlayer.idolId === p.id;
        html += `
            <div class="target-card ${isSelected ? 'selected' : ''}" onclick="selectWildChildIdol('${p.id}')">
                <span class="target-name">${p.name}</span>
                ${isSelected ? '<i data-lucide="check-circle" class="text-success"></i>' : ''}
            </div>
        `;
    });

    html += `
        </div>
        <div class="mt-4 flex gap-2">
            <button class="btn btn-accent flex-1" onclick="confirmWildChildAction()">Xác nhận</button>
        </div>
    `;
    workspace.innerHTML = html;
    lucide.createIcons();
}

window.selectWildChildIdol = function (playerId) {
    const wcPlayer = gameState.players.find(p => p.role === 'wild_child');
    if (wcPlayer) {
        wcPlayer.idolId = playerId;
        renderWildChildWorkspace();
    }
}

window.confirmWildChildAction = function () {
    const wcPlayer = gameState.players.find(p => p.role === 'wild_child');
    if (wcPlayer && wcPlayer.idolId) {
        const idol = gameState.players.find(p => p.id === wcPlayer.idolId);
        addLog(`[Ban Đêm] Đứa Trẻ Hoang Dã [${wcPlayer.name}] đã chọn [${idol.name}] làm Thần Tượng.`);
    } else {
        addLog(`[Ban Đêm] Đứa Trẻ Hoang Dã không chọn Thần Tượng.`);
    }
    markStepCompleted('wild_child');
    goToNextActiveStep('wild_child');
}

function renderApprenticeSeerWorkspace() {
    const workspace = document.getElementById('night-action-workspace');
    let html = `
        <div class="action-form-title">
            <i data-lucide="eye-off" style="color: #06b6d4"></i>
            <span>Tiên Tri Tập Sự soi bài</span>
        </div>
        <p class="mb-3 text-muted" style="font-size: 0.9rem;">Tiên Tri thật đã chết. Tập Sự thức dậy và chỉ 1 người để soi thân phận.</p>
        <div class="target-grid">
    `;

    gameState.players.forEach(p => {
        if (!p.isAlive) return;
        const isSelected = gameState.nightActions.apprenticeSeerTarget === p.id;
        html += `
            <div class="target-card ${isSelected ? 'selected' : ''}" onclick="selectApprenticeSeerTarget('${p.id}')">
                <span class="target-name">${p.name}</span>
                ${isSelected ? '<i data-lucide="check-circle" class="text-success"></i>' : ''}
            </div>
        `;
    });

    html += `
        </div>
        <div class="mt-4 flex gap-2">
            <button class="btn btn-secondary flex-1" onclick="skipApprenticeSeerAction()">Bỏ qua</button>
            <button class="btn btn-accent flex-1" onclick="confirmApprenticeSeerAction()">Xác nhận</button>
        </div>
    `;
    workspace.innerHTML = html;
    lucide.createIcons();
}

window.selectApprenticeSeerTarget = function (playerId) {
    gameState.nightActions.apprenticeSeerTarget = playerId;
    renderApprenticeSeerWorkspace();
}

window.skipApprenticeSeerAction = function () {
    addLog(`[Ban Đêm] Tiên Tri Tập Sự không soi ai.`);
    markStepCompleted('apprentice_seer');
    goToNextActiveStep('apprentice_seer');
}

window.confirmApprenticeSeerAction = function () {
    const targetId = gameState.nightActions.apprenticeSeerTarget;
    if (!targetId) {
        alert('Vui lòng chọn 1 mục tiêu!');
        return;
    }
    const target = gameState.players.find(p => p.id === targetId);
    let team = ROLES_DEFINITION[target.role]?.team;
    if (target.role === 'lycan') team = 'wolf';

    let resultMsg = team === 'wolf' ? 'MA SÓI (Ngón tay xuống)' : 'DÂN LÀNG (Ngón tay lên)';

    addLog(`[Ban Đêm] Tiên Tri Tập Sự soi [${target.name}]. Quản trò ra dấu: ${resultMsg}`, 'info');
    alert(`Kết quả soi của Tiên Tri Tập Sự: ${target.name} là phe ${resultMsg}`);

    markStepCompleted('apprentice_seer');
    goToNextActiveStep('apprentice_seer');
}

function renderGenericWorkspace(roleKey) {
    const workspace = document.getElementById('night-action-workspace');
    const roleDef = ROLES_DEFINITION[roleKey];

    let html = `
        <div class="action-form-title">
            <i data-lucide="${roleDef.icon}" style="color: ${roleDef.color}"></i>
            <span>Lượt của ${roleDef.name}</span>
        </div>
        <p class="action-description">${roleDef.desc}</p>
        
        <div class="glass-panel-nested p-3 mt-3">
            <p class="text-muted text-center" style="font-size: 0.9rem;">
                <i data-lucide="info" class="mb-2"></i><br>
                Chức năng này tự động kích hoạt theo tình huống (bị động) hoặc chỉ dùng ban ngày.<br>
                <strong>Không có hành động đặc biệt ban đêm.</strong><br>
                Quản trò có thể gọi giả để đánh lạc hướng Sói, sau đó bấm Xác nhận để qua bước.
            </p>
        </div>
        
        <div class="mt-4">
            <button class="btn btn-accent w-100" onclick="confirmGenericAction('${roleKey}')">Xác nhận Hoàn thành</button>
        </div>
    `;

    workspace.innerHTML = html;
    lucide.createIcons();
}

window.confirmGenericAction = function (roleKey) {
    markStepCompleted(roleKey);
    goToNextActiveStep(roleKey);
}
