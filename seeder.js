const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.json');

// Reallikka yaqin bo'lgan ma'lumotlar
const items = [
    {
        title: "Sayt dizaynini yangilash",
        description: "Bosh sahifa va biz haqimizda bo'limi uchun yangi zamonaviy dizayn chizish va tasdiqlatish.",
        status: "active"
    },
    {
        title: "API integratsiyasi",
        description: "To'lov tizimi (Payme va Click) uchun API ulanishlarni yakunlash va sinovdan o'tkazish.",
        status: "pending"
    },
    {
        title: "Mobil ilova xatoliklarini to'g'rilash",
        description: "Foydalanuvchilar tomonidan bildirilgan login va ro'yxatdan o'tish qismidagi xatoliklarni bartaraf etish.",
        status: "active"
    },
    {
        title: "Ma'lumotlar bazasini optimallashtirish",
        description: "Katta so'rovlarda yuzaga kelayotgan kechikishlarni kamaytirish maqsadida indeksatsiya qilish.",
        status: "inactive"
    },
    {
        title: "Xodimlar uchun yo'riqnoma yozish",
        description: "Yangi kelgan ishchilar uchun tizimdan qanday foydalanish haqida qo'llanma tayyorlash.",
        status: "active"
    },
    {
        title: "Reklama kampaniyasini rejalashtirish",
        description: "Kuzgi chegirmalar mavsumi uchun Instagram va Facebook orqali marketing rejasini tuzish.",
        status: "pending"
    },
    {
        title: "Mijozlar bilan aloqa bo'limini kengaytirish",
        description: "Call markaz uchun yangi xodimlarni ishga olish va o'qitish.",
        status: "active"
    },
    {
        title: "Yangi server xarid qilish",
        description: "Tizim yuklamasini ko'tarish uchun qo'shimcha server va xotira sotib olish.",
        status: "inactive"
    },
    {
        title: "Xavfsizlik auditini o'tkazish",
        description: "Tizimdagi ehtimoliy zaifliklarni aniqlash va xakerlik hujumlaridan himoyalanish uchun testlar.",
        status: "active"
    },
    {
        title: "Yillik hisobotni tayyorlash",
        description: "Barcha bo'limlardan olingan natijalar asosida joriy yil uchun yakuniy hisobotni shakllantirish.",
        status: "pending"
    }
];

// Ma'lumotlarga ID raqamini 1, 2, 3 tartibida biriktirib chiqamiz
const defaultData = items.map((item, index) => {
    return {
        id: (index + 1).toString(),
        ...item
    };
});

try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2), 'utf8');
    console.log('✅ Seeder muvaffaqiyatli ishladi: Haqiqiy ma\'lumotlar bilan 10 ta yozuv qo\'shildi va ID lar ketma-ket (1 dan 10 gacha) tartiblandi.');
} catch (error) {
    console.error('❌ Seeder ishlashida xatolik yuz berdi:', error);
}
